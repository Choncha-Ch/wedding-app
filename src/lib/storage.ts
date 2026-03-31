// Local storage helpers to keep UI state in sync with Supabase

const ACCEPTED_EVENTS_KEY = 'ct-accepted-events';
const RSVP_DATA_KEY = 'ct-rsvp';
const ENTRANCE_KEY = 'ct-entrance-seen';
const GUEST_NAME_KEY = 'guest_name'; // Centralized key for security

/**
 * Get the list of IDs the user has joined
 */
export function getAcceptedEvents(): string[] {
  try {
    return JSON.parse(localStorage.getItem(ACCEPTED_EVENTS_KEY) || '[]');
  } catch { 
    return []; 
  }
}

/**
 * NEW: Explicitly save a list of events (Used by the Supabase Sync)
 */
export function saveAcceptedEvents(events: string[]) {
  localStorage.setItem(ACCEPTED_EVENTS_KEY, JSON.stringify(events));
}

/**
 * Add or remove an event ID from local storage
 */
export function toggleEvent(eventId: string): string[] {
  const current = getAcceptedEvents();
  const updated = current.includes(eventId)
    ? current.filter(id => id !== eventId)
    : [...current, eventId];
  
  saveAcceptedEvents(updated);
  return updated;
}

/**
 * Get general RSVP form data
 */
export function getRsvpData() {
  try {
    return JSON.parse(localStorage.getItem(RSVP_DATA_KEY) || 'null');
  } catch { 
    return null; 
  }
}

/**
 * Save general RSVP form data
 */
export function saveRsvpData(data: Record<string, unknown>) {
  localStorage.setItem(RSVP_DATA_KEY, JSON.stringify(data));
}

/**
 * Entrance tracking
 */
export function hasSeenEntrance(): boolean {
  return localStorage.getItem(ENTRANCE_KEY) === 'true';
}

export function markEntranceSeen() {
  localStorage.setItem(ENTRANCE_KEY, 'true');
}

/**
 * AUTHENTICATION HELPERS
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem(GUEST_NAME_KEY);
}

export function clearAuth() {
  localStorage.removeItem(GUEST_NAME_KEY);
}
