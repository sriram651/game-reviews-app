/**
 * Formats a date input into a string representation.
 * @function formatDate
 * 
 * @param {number} dateInput - The date input to be formatted.
 * @param {boolean} [isUtc=false] - A flag to indicate if the date is in UTC format.
 * @returns {string} The formatted date string in the format "DD Mon YYYY".
 */
export function formatDate(dateInput, isUtc = false) {
    const date = new Date(parseInt(dateInput));
    const day = isUtc ? date.getUTCDate().toString().padStart(2, '0') : date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: isUtc ? 'UTC' : undefined });
    const year = isUtc ? date.getUTCFullYear() : date.getFullYear();

    return `${day} ${month} ${year}`;
}