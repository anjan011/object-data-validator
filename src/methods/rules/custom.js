export function __validate_custom({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

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

    if (ruleObj.hasOwnProperty('validateFunction') && typeof ruleObj.validateFunction === 'function') {
        try {
            isValid = !!ruleObj.validateFunction(fieldValue, this.data, index, hasNullableRule);
        } catch (e) {
            isValid = false;
        }
    } else {
        isValid = false;
    }

    if (!isValid) {

        message = ruleObj.message ?
            ruleObj.message :
            `${fieldLabel} custom validation failed`;

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