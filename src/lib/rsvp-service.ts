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

const getCleanPin = () => {
  const pin = localStorage.getItem('guest_pin');
  return pin ? pin.trim().toUpperCase() : null;
};

export const verifyGuestCode = async (inputCode: string) => {
  const cleanCode = inputCode.trim().toUpperCase();

  const { data: codeData, error: codeError } = await supabase
    .from('guest_codes')
    .select('*')
    .eq('code', cleanCode)
    .single();

  if (codeError || !codeData) return { success: false };
  
  const { error: rsvpError } = await supabase
    .from('rsvps')
    .upsert({ 
      access_code: cleanCode, 
    }, { onConflict: 'access_code' });

  if (rsvpError) console.error("Init Error:", rsvpError.message);

  localStorage.setItem('guest_pin', cleanCode);
  localStorage.setItem('guest_name', codeData.guest_name);
  
  return { success: true, data: codeData };
};

export const fetchRSVPStatus = async () => {
  const savedPin = getCleanPin();
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
 * UPDATED: Optimized for Auto-Save
 * We removed the 'acceptedActivities' requirement here to avoid 
 * conflicts with the separate Activities page logic.
 */
export const submitRSVP = async (form: any, weddingResponses: Record<string, boolean | null>) => {
  const savedPin = getCleanPin();
  if (!savedPin) throw new Error("No session found");

  const payload: any = {
    access_code: savedPin,
    first_name: form.firstName,
    last_name: form.lastName,
    email: form.email,
    phone_number: form.whatsapp,
    allergy: form.allergy || ''
  };

  // Only update wedding columns if they are present in the responses object
  Object.keys(weddingResponses).forEach(id => {
    const dbCol = EVENT_MAP[id];
    // We check for !== null so we don't overwrite with 'false' if the user hasn't touched it
    if (dbCol && weddingResponses[id] !== null) {
      payload[dbCol] = weddingResponses[id];
    }
  });

  const { error } = await supabase
    .from('rsvps')
    .upsert(payload, { onConflict: 'access_code' });

  if (error) throw error;
  return true;
};

export const updateSingleActivity = async (eventId: string, isJoining: boolean) => {
  const savedPin = getCleanPin();
  const columnName = EVENT_MAP[eventId];

  if (!savedPin || !columnName) return;

  const { error } = await supabase
    .from('rsvps')
    .update({ [columnName]: isJoining })
    .eq('access_code', savedPin);

  if (error) throw error;
};

export const updateHotelBooking = async (isBooking: boolean, dateRange: string | null, shareInfo: string = '') => {
  const savedPin = getCleanPin();
  if (!savedPin) throw new Error("No session found");

  const { error } = await supabase
    .from('rsvps')
    .update({ 
      is_suphan_hotel: isBooking,
      suphan_date: dateRange,
      suphan_share: shareInfo
    })
    .eq('access_code', savedPin);

  if (error) throw error;
  return true;
};

export const updateFlightInfo = async (flightData: { flight: string, date: string, time: string }) => {
  const savedPin = getCleanPin();
  if (!savedPin) throw new Error("No session found");

  // Clean the data to ensure we don't send empty strings where Supabase expects nulls
  const { error } = await supabase
    .from('rsvps')
    .update({ 
      phuket_flight: flightData.flight || null,
      phuket_date: flightData.date || null,
      phuket_time: flightData.time || null
    })
    .eq('access_code', savedPin);

  if (error) throw error;
  return true;
};

export const updateNakaBooking = async (isBooking: boolean, dateRange: string | null, shareInfo: string = '') => {
  const savedPin = getCleanPin();
  if (!savedPin) throw new Error("No session found");

  const { error } = await supabase
    .from('rsvps')
    .update({ 
      is_nakaisland_hotel: isBooking,
      nakaisland_date: dateRange,
      nakaisland_share: shareInfo
    })
    .eq('access_code', savedPin);

  if (error) throw error;
  return true;
};
