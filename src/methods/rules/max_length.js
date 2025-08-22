export function __validate_max_length({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValue(this.data,fieldName);



    /**
     * If has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if(hasNullableRule && this._isEmptyString(fieldValue)) {
        return  {
            isValid : true,
            message : ''
        };
    }

    /**
     * Ensure the value is string ...
     */

    if (typeof fieldValue !== 'string') {
        return {
            isValid: false,
            message: `${fieldLabel} must be a string to assert maximum length rule`,
            fieldValue
        }
    }

    /**
     * Else, value must be a strict string data type!
     */

    let length = this.getNestedValue(ruleObj,'data.length');

    if(this.isNullOrUndefined(length)) {
        return {
            isValid: false,
            message : `Target length is not provided for maximum length match for [${fieldName}]`
        };
    }

    length = this.asInteger(length);

    if (length < 1) {
        return {
            isValid: false,
            message: `Target length must be at least 1 for maximum length match for [${fieldName}]`
        };
    }

    if(fieldValue.length > length) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be at most ${length} character${length > 1 ? 's' : ''} long`;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});
    }

    message = this.replaceTags(message,{
        length : length,
        value : fieldValue
    });

    return {
        isValid,
        message
    };

}