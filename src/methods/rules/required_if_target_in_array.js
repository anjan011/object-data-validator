export function __validate_required_if_target_in_array(
    {
        ruleObj,
        fieldName,
        fieldLabel,
        index,
        hasNullableRule
    }
) {

    let isValid = true;
    let message = '';

    let fieldValue = this.getNestedValue(this.data, fieldName);

    /**
     * First, get target field name ...
     */

    let target_field = this.getNestedValue(ruleObj, 'data.target_field');

    if (this._isEmptyString(target_field)) {
        return {
            isValid: false,
            message: this.ruleError({
                fieldName,
                ruleName: ruleObj.name,
                error: `Target field name is required`
            })
        };
    }

    /**
     * Value to match
     */

    let arrayToCheck = this.getNestedValue(ruleObj, 'data.array');


    if (!Array.isArray(arrayToCheck) || arrayToCheck.length === 0) {
        return {
            isValid: false,
            message: this.ruleError({
                fieldName,
                ruleName: ruleObj.name,
                error: `Target array cannot be empty`
            }),
        }
    }


    /**
     * If there is a valid index and target field has wild card, replace it with index.
     */

    if (!this.isEmpty(index) && target_field.indexOf('*') !== -1) {
        target_field = target_field.replaceAll('*', index);
    }

    /**
     * Now get target field value ...
     */

    let targetFieldValue = this.getNestedValue(this.data, target_field);

    if (arrayToCheck.includes(targetFieldValue) && this.isEmpty(fieldValue)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} is required if ${target_field} value is included in ${JSON.stringify(arrayToCheck)}`;


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
        message
    };

}