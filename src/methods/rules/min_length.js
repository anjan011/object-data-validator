export function __validate_min_length({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValueAsString(this.data,fieldName);



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
     * Else, value must be a strict string data type!
     */

    let length = this.getNestedValueAsInteger(ruleObj,'data.length');

    if(length <= 0) {
        return {
            isValid: false,
            message : this.ruleError({
                fieldName,
                ruleName: ruleObj.name,
                error : `Length must be greater than 0`
            })
        };
    }

    if(!(fieldValue.length >= length)) {

        isValid = false;
        message = ruleObj.message ?
            ruleObj.message :
            `${fieldLabel} must be at least ${length} character${length > 1 ? 's' : ''} long`;
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
        message,
        fieldValue
    };

}