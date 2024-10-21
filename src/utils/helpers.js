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

/** 
 * Formats a timestamp into a human-readable date and time string.
 * @function formatFullDateTime
 * 
 * @param {string | number} timestamp - The timestamp to format.
 * @param {boolean} [isUtc=false] - A flag to indicate if the date is in UTC format.
 * @returns {string} The formatted date and time string in the following formats:
 * - 19 Apr 2024, 06:30PM.
 * 
 * @throws {Error} If the input date is invalid.
*/
export function formatFullDateTime(timestamp, isUtc = false) {
    const date = new Date(parseInt(timestamp));

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date input');
    }

    const day = isUtc ? date.getUTCDate().toString().padStart(2, '0') : date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', {
        month: 'short',
        timeZone: isUtc ? 'UTC' : undefined,
    });
    const year = isUtc ? date.getUTCFullYear() : date.getFullYear();
    const time = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: isUtc ? 'UTC' : undefined,
    }).replace(' ', '');

    return `${day} ${month} ${year}, ${time} ${isUtc ? 'UTC' : ''}`;
}