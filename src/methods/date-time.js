import {parse, format, isValid} from 'date-fns';

/**
 * Strictly validates a date string against a given format.
 * @param {string} dateString The date string to validate.
 * @param {string} dateFormat The format string (e.g., 'dd-MM-yyyy').
 * @returns {boolean} True if the date string is valid AND matches the format.
 */

export function isValidWithDateFns(dateString, dateFormat) {

    // 1. Attempt to parse the date string using the given format.
    const parsedDate = parse(dateString, dateFormat, new Date());

    // 2. Check if the parsed date is a valid date.
    if (!isValid(parsedDate)) {
        return false;
    }

    // 3. Re-format the valid parsed date back into a string
    //    and compare it to the original input string for strictness.
    const formattedBack = format(parsedDate, dateFormat);

    // Return true only if both the date is valid AND the strings match exactly.
    return formattedBack === dateString;
}