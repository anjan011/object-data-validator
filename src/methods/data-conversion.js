export function asString(value = '', defaultValue = '', doTrim = true) {

    if(typeof value === 'string' || typeof value === 'number') {
        value = value.toString();

        return doTrim ? value.trim() : value;
    }

    return defaultValue;

}

export function asNumber(value = 0, defaultValue = 0) {

    if (typeof value === 'number') {
        return value;
    } else if(typeof value === 'string') {

        value = parseFloat(value);

        if(isNaN(value)) {
            return defaultValue;
        }

        return value;

    }

    return defaultValue;

}

export function asInteger(value = 0, defaultValue = 0) {

    if (typeof value === 'number') {
        return Math.trunc(value);
    } else if (typeof value === 'string') {

        value = parseInt(value);

        if (isNaN(value)) {
            return defaultValue;
        }

        return value;

    }

    return defaultValue;

}

export function asArray(value = [], defaultValue = []) {

    if (Array.isArray(value)) {
        return value;
    }

    return defaultValue;

}