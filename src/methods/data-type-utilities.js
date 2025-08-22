/**
 * Is null or empty?
 */

export function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

export function isPlainObject(obj) {

    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const prototype = Object.getPrototypeOf(obj);
    return prototype === null || prototype === Object.prototype;

}

export function objHasProp(obj, propName) {

    return this.isPlainObject(obj) && obj.hasOwnProperty(propName);

}

export function getNestedValue(obj = {}, path = '') {

    if (!obj || typeof path !== 'string' || path.trim() === '') {
        return undefined;
    }

    const parts = path.split('.');

    let value = obj;

    for (const part of parts) {

        if (undefined === value || null === value) {
            return undefined;
        }

        if (typeof value !== 'object' && !value.hasOwnProperty(part)) {
            return undefined;
        }


        value = value[part];
    }
    return value;
}