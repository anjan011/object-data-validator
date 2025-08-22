export function __validate_number({ruleObj, fieldName, fieldLabel, index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValue(this.data, fieldName);

    /**
     * If has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if (hasNullableRule && this.isNullOrUndefined(fieldValue)) {
        return {
            isValid: true,
            message: ''
        };
    }

    /**
     * Else, value must be a strict string data type!
     */

    switch (typeof fieldValue) {
        case 'number':
            isValid = true;
            break;
        case 'string':

            if (this._isEmptyString(fieldValue) || isNaN(Number(fieldValue))) {

                isValid = false;
                message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be a valid number`;

            }

            break;
        default:
            isValid = false;
            message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be a valid number`;
            break;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});
    }

    return {
        isValid,
        message
    };

}