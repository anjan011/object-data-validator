export function __validate_min_value({ruleObj, fieldName, fieldLabel, index, hasNullableRule}) {

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
    const minValue = this.getNestedValueAsNumber(ruleObj.data, 'value', null);

    if (null === minValue) {
        return {
            isValid: false,
            message: this.ruleError({
                fieldName,
                ruleName: ruleObj.name,
                error: 'The rule "min_value" requires a numeric "value" property to be set.'
            })
        };
    }

    /**
     * Else, value must be a strict string data type!
     */

    if (!(!isNaN(num) && num >= minValue)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be greater than or equal to ${minValue}`;
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
            min_value : minValue
        });
    }

    return {
        isValid,
        message
    };

}