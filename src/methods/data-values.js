export function targetValueString(target = '') {

    if (typeof target === 'string' || typeof target === 'number') {
        return target.toString();
    } else {
        return JSON.stringify(target);
    }

}