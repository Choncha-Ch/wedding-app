// Local storage helpers until database is connected

export function getAcceptedEvents(): string[] {
  try {
    return JSON.parse(localStorage.getItem('ct-accepted-events') || '[]');
  } catch { return []; }
}

export function toggleEvent(eventId: string): string[] {
  const current = getAcceptedEvents();
  const updated = current.includes(eventId)
    ? current.filter(id => id !== eventId)
    : [...current, eventId];
  localStorage.setItem('ct-accepted-events', JSON.stringify(updated));
  return updated;
}

export function getRsvpData() {
  try {
    return JSON.parse(localStorage.getItem('ct-rsvp') || 'null');
  } catch { return null; }
}

export function saveRsvpData(data: Record<string, unknown>) {
  localStorage.setItem('ct-rsvp', JSON.stringify(data));
}

export function hasSeenEntrance(): boolean {
  return localStorage.getItem('ct-entrance-seen') === 'true';
}

export function markEntranceSeen() {
  localStorage.setItem('ct-entrance-seen', 'true');
}
