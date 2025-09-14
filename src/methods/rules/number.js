export function __validate_number({ruleObj, fieldName, fieldLabel, index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValueAsString(this.data, fieldName);

    /**
     * If has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if (hasNullableRule && this.isNullOrUndefined(fieldValue)) {
        return {
            isValid: true,
            message: ''
        };
    }

    if(!(fieldValue !== '' && !isNaN(Number(fieldValue)))) {
        isValid = false;
        message = ruleObj.message ?
            ruleObj.message :
            `${fieldLabel} must be a valid number`;
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