export function __validate_equals_number({
                                                                      ruleObj,
                                                                      fieldName,
                                                                      fieldLabel,
                                                                      index,
                                                                      hasNullableRule
                                                                  }) {

    let isValid = true;
    let message = '';

    let fieldValue = this.getNestedValue(this.data, fieldName);


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

    fieldValue = Number(fieldValue);

    /**
     * Ensure the value is string ...
     */

    if (typeof fieldValue !== 'number' || isNaN(fieldValue)) {
        return {
            isValid: false,
            message: `${fieldLabel} must be a valid number`,
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
            message: this.ruleError({
                fieldName,
                ruleName : ruleObj.name,
                error : `Target must be a valid number`
            })
        };
    }


    if (fieldValue !== target) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be exactly same as: ${target}`;
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