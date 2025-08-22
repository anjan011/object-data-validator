export function __validate_equals_number({
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

    if (typeof fieldValue !== 'number') {
        return {
            isValid: false,
            message: `${fieldLabel} must be a number to assert equal numbers rule`,
            fieldValue
        }
    }

    /**
     * Else, value must be a strict number data type!
     */

    let target = this.getNestedValue(ruleObj, 'data.target');

    if (typeof target !== 'number') {
        return {
            isValid: false,
            message: `Target value must be a number for equal numbers match for [${fieldName}]`
        };
    }


    if (fieldValue !== target) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be exactly same as "${target}"`;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});
    }

    message = this.replaceTags(message, {
        target: target,
        value: fieldValue
    });

    return {
        isValid,
        message,
        fieldValue
    };

}