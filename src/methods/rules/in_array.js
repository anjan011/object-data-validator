export function __validate_in_array({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    let fieldValue = this.getNestedValueAsString(this.data,fieldName);



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

    let target_data_type = this.getNestedValueAsString(ruleObj,'data.item_data_type','string');

    if(!['string','number'].includes(target_data_type)) {
        target_data_type = 'string';
    }

    if(target_data_type === 'number') {
        fieldValue = this.getNestedValueAsNumber(this.data,fieldName);
    }

    /**
     * Else, get the target array first
     */

    let array = this.getNestedValue(ruleObj,'data.array');

    if(!Array.isArray(array) || array.length === 0) {
        return {
            isValid: false,
            message : this.ruleError({
                fieldName,
                ruleName : ruleObj.name,
                error : `Target must be a non-empty array`
            })
        };
    }

    if(!array.includes(fieldValue)) {

        isValid = false;
        message = ruleObj.message ?
            ruleObj.message :
            `${fieldLabel} must included in the target set of values`;
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