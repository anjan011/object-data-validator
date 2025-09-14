export function __validate_equals_string({
                                                                      ruleObj,
                                                                      fieldName,
                                                                      fieldLabel,
                                                                      index,
                                                                      hasNullableRule
                                                                  }) {

    let isValid = true;
    let message = '';

    let fieldValue = this.getNestedValueAsString(this.data, fieldName);


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

    /**
     * Else, value must be a strict string data type!
     */

    let target = this.getNestedValueAsString(ruleObj, 'data.target');

    let ignore_case = !!this.getNestedValue(ruleObj,'data.ignore_case');

    if(ignore_case) {
        fieldValue = fieldValue.toLowerCase();
        target = target.toLowerCase();
    }

    if (fieldValue !== target) {

        isValid = false;
        message = ruleObj.message ?
            ruleObj.message :
            `${fieldLabel} must be exactly same as: "${target}" ${ignore_case ? '(case insensitive)' : '(case sensitive)'}. You provided "${fieldValue}"`;
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