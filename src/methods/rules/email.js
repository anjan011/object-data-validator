export function __validate_email({ruleObj, fieldName, fieldLabel, index, hasNullableRule}) {

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

    if(!(typeof fieldValue === 'string')) {
        return {
            isValid: false,
            message: `For email address check the field value must be a string for field ${fieldName}`
        };
    }

    const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

    const regex = new RegExp(emailRegex);

    /**
     * Else, value must be a strict string data type!
     */

    if (!fieldValue.match(regex)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} is not a valid email address`;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});

        message = this.replaceTags(message,{
            value : fieldValue,
        });
    }

    return {
        isValid,
        message
    };

}