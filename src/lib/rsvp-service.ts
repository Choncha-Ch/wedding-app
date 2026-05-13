import { supabase } from './supabase';

export interface FlightData {
  flight?: string;
  date?: string;
  time?: string;
  bangkokFlight?: string;
  bangkokDate?: string;
  bangkokTime?: string;
  bangkokAirport?: string;
  toSuphan?: string;
  toBangkok?: string;
  numberSuphan?: string | number; 
  numberBangkok?: string | number; 
}

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
  'freedom-beach': 'is_freedom_beach',
  'outfit-rental': 'is_outfit_rental',
  'ayutthaya': 'is_ayutthaya',
  'suphan-travel': 'is_suphan_travel'
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

export const updateFlightInfo = async (flightData: FlightData) => {
  const savedPin = getCleanPin();
  if (!savedPin) throw new Error("No session found");

  // Helper to ensure empty strings are sent as NULL to prevent DB format errors
  const clean = (val: any) => (val && String(val).trim() !== '' ? val : null);
  
  // Helper to ensure numbers are sent as integers for int8 columns
  const cleanInt = (val: any) => {
    const parsed = parseInt(val);
    return isNaN(parsed) ? null : parsed;
  };

  const { error } = await supabase
    .from('rsvps')
    .update({ 
      phuket_flight: clean(flightData.flight),
      phuket_date: clean(flightData.date),
      phuket_time: clean(flightData.time),
      bangkok_flight: clean(flightData.bangkokFlight),
      bangkok_date: clean(flightData.bangkokDate),
      bangkok_time: clean(flightData.bangkokTime),
      bangkok_airport: clean(flightData.bangkokAirport),
      to_suphan: clean(flightData.toSuphan),
      to_bangkok: clean(flightData.toBangkok),
      number_suphan: cleanInt(flightData.numberSuphan),
      number_bangkok: cleanInt(flightData.numberBangkok)
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
