/*
 Formats an ISO date string into a human-readable date and time.
 e.g., "2025-11-02T17:30:00.000Z" -> "2 Nov 2025, 5:30 PM"

 @param {string} isoDate - The ISO 8601 date string.
 @returns {string} A human-readable date and time.
 */
export const formatDisplayDate = (isoDate) => {
  if (!isoDate) return 'Invalid Date';
  const date = new Date(isoDate);
  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};