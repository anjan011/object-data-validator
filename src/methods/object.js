/**
 * Recursively checks if two values are deeply equal.
 * @param {*} val1 The first value to compare.
 * @param {*} val2 The second value to compare.
 * @returns {boolean} True if the values are deeply equal, false otherwise.
 */
export function isDeepEqual(val1, val2) {



    if((!this.isPlainObject(val1) && this.isPlainObject(val2)) || (!Array.isArray(val1) && Array.isArray(val2))) {
        return false;
    }


    // 1. Strict equality check (handles primitives, functions, and same object reference)
    if (val1 === val2) {
        return true;
    }

    // 4. Get keys for comparison
    let keys1 = Object.keys(val1);
    let keys2 = Object.keys(val2);

    keys1 = keys1.sort();
    keys2 = keys2.sort();




    // 5. Check if they have the same number of keys.
    if (keys1.length !== keys2.length) {
        return false;
    }

    // 6. Recursively compare each key's value.
    for (const key of keys1) {
        // Check if key exists in both and their values are deeply equal.
        if (!keys2.includes(key)) {
            return false;
        }

        if (this.isPlainObject(val1[key]) && !this.isDeepEqual(val1[key], val2[key])) {
            return false;
        }

        if (Array.isArray(val1[key]) && !this.isDeepEqual(val1[key], val2[key])) {
            return false;
        }
    }

    return true;
}
