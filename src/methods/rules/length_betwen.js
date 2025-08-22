export function __validate_length_between({
                                                                        ruleObj,
                                                                        fieldName,
                                                                        fieldLabel,
                                                                        index,
                                                                        hasNullableRule
                                                                    }) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValue(this.data, fieldName);


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
     * Ensure the value is string ...
     */

    if (typeof fieldValue !== 'string') {
        return {
            isValid: false,
            message: `${fieldLabel} must be a string to assert length range rule`,
            fieldValue
        }
    }

    /**
     * Get min length ...
     */

    // region [Min Length]

    let min_length = this.getNestedValue(ruleObj, 'data.min_length');

    if (this.isNullOrUndefined(min_length)) {
        return {
            isValid: false,
            message: `Minimum length (data.min_length) is not provided for length range match for [${fieldName}]`
        };
    }

    min_length = this.asInteger(min_length);

    if (min_length < 1) {
        return {
            isValid: false,
            message: `Minimum length must be at least 1 for length range match for [${fieldName}]`
        };
    }

    // endregion


    /**
     * Get max length ...
     */

    // region [Max Length]

    let max_length = this.getNestedValue(ruleObj, 'data.max_length');

    if (this.isNullOrUndefined(max_length)) {
        return {
            isValid: false,
            message: `Maximum length (data.max_length) is not provided for length range match for [${fieldName}]`
        };
    }

    max_length = this.asInteger(max_length);

    if (max_length < 1) {
        return {
            isValid: false,
            message: `Maximum length must be at least 1 for length range match for [${fieldName}]`
        };
    }

    if(max_length <= min_length) {
        return {
            isValid: false,
            message: `Maximum length must be greater than minimum length for length range match for [${fieldName}]`
        };
    }

    // endregion



    if (!(fieldValue.length >= min_length && fieldValue.length <= max_length)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} length must be between ${min_length} and ${max_length}`;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});
    }

    message = this.replaceTags(message, {
        min_length: min_length,
        max_length: max_length,
        value: fieldValue
    });

    return {
        isValid,
        message
    };

}