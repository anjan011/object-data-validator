/**
 * Check if a value is empty. By checking if it is null or undefined,
 * or if it is an empty string, empty array or object with no keys.
 *
 * @param value
 * @return {boolean}
 * @private
 */

export function _isEmptyString(value = '') {

    if (this.isNullOrUndefined(value)) {
        return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
        return true;
    }

    return false;
}

/**
 * Is empty array?
 *
 * @param value
 * @return {boolean}
 * @private
 */

export function _isEmptyArray(value) {
    if (this.isNullOrUndefined(value)) {
        return true;
    }

    return Array.isArray(value) && value.length === 0;


}

/**
 * Is empty object?
 *
 * @param value
 * @return {boolean}
 * @private
 */

export function _isEmptyObject(value) {
    if (this.isNullOrUndefined(value)) {
        return true;
    }

    return !!(this.isPlainObject(value) && Object.keys(value).length === 0);


}

export function isEmpty(value) {

    if (this.isNullOrUndefined(value)) {
        return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
        return true;
    }

    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    return !!(this.isPlainObject(value) && Object.keys(value).length === 0);



}