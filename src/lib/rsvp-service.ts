import { supabase } from './supabase';

export const EVENT_MAP: Record<string, string> = {
  'phuket-wedding': 'is_phuket_wedding',
  'traditional-wedding': 'is_thai_wedding',
  'official-wedding': 'is_suphan_wedding',
  'beach-club': 'is_beach_club',
  'dinner': 'is_dinner',
  'cruise': 'is_cruise',
  'sundowner': 'is_sundowner',
  'boat-party': 'is_boat_party',
  'after-party': 'is_after_party',
  'outfit-rental': 'is_outfit_rental',
  'ayutthaya': 'is_ayutthaya'
};

/**
 * HELPER: Always get the pin in Uppercase and Trimmed
 */
const getCleanPin = () => {
  const pin = localStorage.getItem('guest_pin');
  return pin ? pin.trim().toUpperCase() : null;
};

/**
 * 1. Verify & Auto-Initialize RSVP Row
 */
export const verifyGuestCode = async (inputCode: string) => {
  // TRANSFORM: Ensure input is Uppercase and Trimmed before even checking Supabase
  const cleanCode = inputCode.trim().toUpperCase();

  const { data: codeData, error: codeError } = await supabase
    .from('guest_codes')
    .select('*')
    .eq('code', cleanCode)
    .single();

  if (codeError || !codeData) return { success: false };
  
  // UPSERT: Use the cleaned Uppercase code
  const { error: rsvpError } = await supabase
    .from('rsvps')
    .upsert({ 
      access_code: cleanCode, 
    }, { onConflict: 'access_code' });

  if (rsvpError) console.error("Init Error:", rsvpError.message);

  // SAVE: Store it cleaned in localStorage for other functions to use
  localStorage.setItem('guest_pin', cleanCode);
  localStorage.setItem('guest_name', codeData.guest_name);
  
  return { success: true, data: codeData };
};

/**
 * 2. Fetch Current Status
 */
export const fetchRSVPStatus = async () => {
  const savedPin = getCleanPin(); // Use helper
  if (!savedPin) return null;

  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .eq('access_code', savedPin)
    .single();

  if (error) return null;
  return data;
};

/**
 * 3. Full RSVP Submit
 */
export const submitRSVP = async (form: any, weddingResponses: Record<string, boolean | null>, acceptedActivities: string[]) => {
  const savedPin = getCleanPin(); // Use helper
  if (!savedPin) throw new Error("No session found");

  const payload: any = {
    access_code: savedPin, // Saved as UPPERCASE
    first_name: form.firstName,
    last_name: form.lastName,
    email: form.email,
    phone_number: form.whatsapp,
    allergy: form.allergy || ''
  };

  Object.keys(weddingResponses).forEach(id => {
    const dbCol = EVENT_MAP[id];
    if (dbCol) payload[dbCol] = weddingResponses[id] === true;
  });

  acceptedActivities.forEach(id => {
    const dbCol = EVENT_MAP[id];
    if (dbCol) payload[dbCol] = true;
  });

  const { error } = await supabase
    .from('rsvps')
    .upsert(payload, { onConflict: 'access_code' });

  if (error) throw error;
  return true;
};

/**
 * 4. Toggle Single Activity
 */
export const updateSingleActivity = async (eventId: string, isJoining: boolean) => {
  const savedPin = getCleanPin(); // Use helper
  const columnName = EVENT_MAP[eventId];

  if (!savedPin || !columnName) return;

  const { error } = await supabase
    .from('rsvps')
    .update({ [columnName]: isJoining })
    .eq('access_code', savedPin);

  if (error) throw error;
};

/**
 * 5. Special Hotel Booking for Sri Uthong Grand
 */
export const updateHotelBooking = async (isBooking: boolean, dateRange: string | null) => {
  const savedPin = getCleanPin(); // Use helper
  if (!savedPin) throw new Error("No session found");

  const { error } = await supabase
    .from('rsvps')
    .update({ 
      is_suphan_hotel: isBooking,
      suphan_date: dateRange 
    })
    .eq('access_code', savedPin);

  if (error) throw error;
  return true;
};
