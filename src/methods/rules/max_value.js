export function __validate_max_value({ruleObj, fieldName, fieldLabel, index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValue(this.data, fieldName);


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

    const num = Number(fieldValue);
    const maxValue = this.getNestedValueAsNumber(ruleObj.data, 'value', null);

    if (null === maxValue) {
        return {
            isValid: false,
            message : this.ruleError({
                fieldName,
                ruleName: ruleObj.name,
                error: 'The rule "max_value" requires a numeric "value" property to be set.'
            })
        };
    }

    /**
     * Else, value must be a strict string data type!
     */

    if (!(!isNaN(num) && num <= maxValue)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be lesser than or equal to ${maxValue}`;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});

        /**
         * Replace tags
         */

        message = this.replaceTags(message, {
            value: fieldValue,
            max_value : maxValue
        });
    }

    return {
        isValid,
        message
    };

}