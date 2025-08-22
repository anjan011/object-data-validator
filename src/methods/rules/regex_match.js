export function __validate_regex_match({ruleObj, fieldName, fieldLabel, index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    let fieldValue = this.getNestedValue(this.data, fieldName);

    /**
     * If has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if (hasNullableRule && this._isEmptyString(fieldValue)) {
        return {
            isValid: true,
            message: ''
        };
    }

    if(!(typeof fieldValue === 'string' || typeof fieldValue === 'number')) {
        return {
            isValid: false,
            message: `For regex match value must be a string or number for ${fieldName}`
        };
    }

    fieldValue = fieldValue.toString();

    /**
     * Get regex ...
     */

    let regex = this.getNestedValue(ruleObj,'data.regex');

    if(typeof regex === 'string') {
        regex = new RegExp(regex);
    } else {

        if(!(regex instanceof RegExp)) {
            return {
                isValid: false,
                message: `For regex match value the target must be a valid regex string or an instance of RegExp for ${fieldName}`
            };
        }

    }

    /**
     * Else, value must be a strict string data type!
     */

    if (!fieldValue.match(regex)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} did not match the regular expression`;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});

        message = this.replaceTags(message,{
            value : fieldValue,
            regex : regex.toString()
        });
    }

    return {
        isValid,
        message
    };

}