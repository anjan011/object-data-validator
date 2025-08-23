export function __validate_equals_array({
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

    if (!Array.isArray(fieldValue)) {
        return {
            isValid: false,
            message: `${fieldLabel} must be an array to assert equal array rule`,
            fieldValue
        }
    }

    /**
     * Else, value must be a strict number data type!
     */

    let target = this.getNestedValue(ruleObj, 'data.target');
    let keep_order = !!this.getNestedValue(ruleObj, 'data.keep_order');

    if (!Array.isArray(target)) {
        return {
            isValid: false,
            message: this.ruleError({
                fieldName,
                ruleName: ruleObj.name,
                error: `Target must be a valid array`
            })
        };
    } else if(target.length === 0) {
        return {
            isValid: false,
            message: this.ruleError({
                fieldName,
                ruleName : ruleObj.name,
                error : `Target array cannot be empty`
            })
        };
    }

    let fieldValueSorted = [];

    if(!keep_order) {
        fieldValueSorted = fieldValue.sort();

        target = target.sort();
    } else {
        fieldValueSorted = fieldValue;
    }



    if (JSON.stringify(fieldValueSorted) !== JSON.stringify(target)) {


        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} value must be exactly same as "${target}"`;
    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});
    }

    message = this.replaceTags(message, {
        list: JSON.stringify(target),
        value: JSON.stringify(fieldValue)
    });

    return {
        isValid,
        message,
        fieldValue
    };

}