export function __validate_in_array({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

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
     * Ensure the value is string or number ...
     */

    if (typeof fieldValue !== 'string' && typeof fieldValue !== 'number') {
        return {
            isValid: false,
            message: `${fieldLabel} must be a string or number to assert in array rule`,
            fieldValue
        }
    }

    /**
     * Else, get the target array first
     */

    let array = this.getNestedValue(ruleObj,'data.array');

    if(!Array.isArray(array) || array.length === 0) {
        return {
            isValid: false,
            message : `Target array is not provided or empty for in array match for [${fieldName}]`
        };
    }

    if(!array.includes(fieldValue)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be one of the values from this list: ${JSON.stringify(array)}`;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});
    }



    message = this.replaceTags(message,{
        array: JSON.stringify(array),
        list: JSON.stringify(array),
        value : fieldValue,
    });

    return {
        isValid,
        message
    };

}