export function __validate_length_between({
                                                                        ruleObj,
                                                                        fieldName,
                                                                        fieldLabel,
                                                                        index,
                                                                        hasNullableRule
                                                                    }) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValueAsString(this.data, fieldName);


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
     * Get min length ...
     */

    // region [Min & Max Length]

    let min_length = this.getNestedValueAsInteger(ruleObj, 'data.min_length');
    let max_length = this.getNestedValueAsInteger(ruleObj, 'data.max_length');

    if (min_length < 0) {
        return {
            isValid: false,
            message: this.ruleError({
                fieldName,
                ruleName: ruleObj.name,
                error: `Minimum length (data.min_length) must be at least 0`
            })
        };
    }

    if (max_length < 0) {
        return {
            isValid: false,
            message: this.ruleError({
                fieldName,
                ruleName: ruleObj.name,
                error: `Maximum length (data.max_length) must be at least 0`
            })
        };
    }

    if(min_length >= max_length) {
        return {
            isValid: false,
            message: this.ruleError({
                fieldName,
                ruleName: ruleObj.name,
                error: `Maximum length (data.max_length) must be greater than minimum length (data.min_length)`
            })
        };
    }

    // endregion



    if (!(fieldValue.length >= min_length && fieldValue.length <= max_length)) {

        isValid = false;
        message = ruleObj.message ?
            ruleObj.message :
            `${fieldLabel} length must be between and including ${min_length} and ${max_length}`;
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