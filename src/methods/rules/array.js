export function __validate_array ({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValue(this.data,fieldName);

    /**
     * If has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if(hasNullableRule && this._isEmptyArray(fieldValue)) {
        return  {
            isValid : true,
            message : ''
        };
    }

    /**
     * Else, value must be a strict string data type!
     */

    if(!Array.isArray(fieldValue)) {

        isValid = false;
        message = ruleObj.message ?
            ruleObj.message :
            `${fieldLabel} must be a valid array`;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});

        /**
         * Replace tags ...
         */

        message = this.replaceTags(message,{
            field_name : fieldName,
            field_label : fieldLabel,
            field_value : fieldValue,
            ...this.generateRuleDataTemplateTagValues(ruleObj.data)
        });
    }

    return {
        isValid,
        message
    };

}