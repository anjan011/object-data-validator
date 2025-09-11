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

export function getNestedValueAsString(obj = {}, path = '', defaultValue = '') {

    let value = this.getNestedValue(obj, path);

    if (this.isNullOrUndefined(value) || (typeof value !== 'string' && typeof value !== 'number')) {
        return defaultValue;
    }

    return String(value);
}

export function getNestedValueAsNumber(obj = {}, path = '', defaultValue = 0) {

    let value = this.getNestedValue(obj, path);

    if (this.isNullOrUndefined(value) || isNaN(Number(value))) {
        return defaultValue;
    }

    return Number(value);
}

export function getNestedValueAsInteger(obj = {}, path = '', defaultValue = 0) {

    let value = this.getNestedValue(obj, path);

    if (this.isNullOrUndefined(value) || isNaN(parseInt(value))) {
        return defaultValue;
    }

    return parseInt(value);
}

export function getNestedValueAsBoolean(obj = {}, path = '', defaultValue = false) {

    let value = this.getNestedValue(obj, path);

    if (this.isNullOrUndefined(value)) {
        return defaultValue;
    }

    if (typeof value === 'boolean') {
        return value;
    }

    if (typeof value === 'string') {
        const val = value.toLowerCase().trim();
        if (val === 'true' || val === '1') {
            return true;
        }
        if (val === 'false' || val === '0') {
            return false;
        }
        return defaultValue;
    }

    if (typeof value === 'number') {
        return value !== 0;
    }

    return defaultValue;
}

export function getNestedValueAsArray(obj = {}, path = '', defaultValue = []) {

    let value = this.getNestedValue(obj, path);

    if (!Array.isArray(value)) {
        return defaultValue;
    }

    return value;
}

export function getNestedValueAsPlainObject(obj = {}, path = '', defaultValue = {}) {

    let value = this.getNestedValue(obj, path);

    if (!this.isPlainObject(value)) {
        return defaultValue;
    }

    return value;
}