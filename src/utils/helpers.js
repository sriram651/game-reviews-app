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

/**
 * Get a human-readable relative time string for a given timestamp.
 *
 * @param {number} timeStamp - The timestamp to compare against the current time. 
 * This should be a time in milliseconds (e.g., from Date.now()).
 * 
 * @returns {string} A string representing the relative time (e.g., '2 days ago', 'in 3 hours', 'just now').
 */
export function getRelativeTime(timeStamp) {
    const now = Date.now(); // Get the current time in milliseconds
    const differenceInMs = timeStamp - now; // Calculate the difference in milliseconds

    // Define time units in terms of milliseconds
    const units = [
        { unit: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
        { unit: 'month', ms: 1000 * 60 * 60 * 24 * 30 },
        { unit: 'week', ms: 1000 * 60 * 60 * 24 * 7 },
        { unit: 'day', ms: 1000 * 60 * 60 * 24 },
        { unit: 'hour', ms: 1000 * 60 * 60 },
        { unit: 'minute', ms: 1000 * 60 },
        { unit: 'second', ms: 1000 },
    ];

    // Loop through each unit and find the appropriate one to use
    for (const { unit, ms } of units) {
        const amount = differenceInMs / ms;
        if (Math.abs(amount) >= 1) {
            // Use Intl.RelativeTimeFormat to generate the relative time string
            const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
            return formatter.format(Math.round(amount), unit);
        }
    }

    return 'just now'; // If the time difference is too small, return 'just now'
}