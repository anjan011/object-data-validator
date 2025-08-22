export function __validate_datetime_string({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValue(this.data,fieldName);

    /**
     * If has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if(hasNullableRule && this.isEmpty(fieldValue)) {
        return  {
            isValid : true,
            message : ''
        };
    }

    /**
     * make sure the value is a string first ...
     */

    if (typeof fieldValue !== 'string') {
        return {
            isValid: false,
            message: `${fieldLabel} must a string data type`
        };
    }

    /**
     * Else, value must be a strict string data type!
     */

    let dateFormat = this.getNestedValue(ruleObj,'data.format');

    if(this._isEmptyString(dateFormat)) {
        dateFormat = 'yyyy-MM-dd';
    }

    if(!this.isValidWithDateFns(fieldValue,dateFormat)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be a valid date string in this format: ${dateFormat}`;
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
        message,
        fieldValue
    };

}