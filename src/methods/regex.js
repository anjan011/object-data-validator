/**
 * Replaces tags in a string with corresponding values from an object.
 * @param {string} str The input string with tags like {tag_name}.
 * @param {object} obj The object containing key-value pairs for replacement.
 * @returns {string} The string with all tags replaced.
 */
export function replaceTags(str, obj) {
    // Check if the input is a string and the object is valid
    if (typeof str !== 'string' || typeof obj !== 'object' || obj === null) {
        return str;
    }

    let result = str;

    // Iterate over each key-value pair in the object
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // Create a dynamic regex for the current tag.
            // g: global search, i: case-insensitive (optional).
            // The curly braces {} are escaped with a backslash \.
            const regex = new RegExp(`{${key}}`, 'gi');

            // Replace all occurrences of the tag with the object's value
            result = result.replace(regex, obj[key]);
        }
    }

    return result;
}