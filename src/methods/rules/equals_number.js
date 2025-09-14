export function __validate_equals_number({
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

    fieldValue = fieldValue.trim();

    if(fieldValue !== '') {

        fieldValue = Number(fieldValue);

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
            message = ruleObj.message ?
                ruleObj.message :
                `${fieldLabel} must be exactly same as: ${target}`;
        }

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