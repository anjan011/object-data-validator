export function __validate_integer({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValue(this.data,fieldName);

    /**
     * If has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if(hasNullableRule && this.isNullOrUndefined(fieldValue)) {
        return  {
            isValid : true,
            message : ''
        };
    }

    const num = Number(fieldValue);

    /**
     * Else, value must be a strict string data type!
     */

    if(!(!isNaN(num) && Number.isInteger(num))) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be a valid integer`;
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