export function __validate_required_if_target_empty({
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
     * First, get target field name ...
     */

    let target_field = this.getNestedValue(ruleObj,'data.target_field');

    if(this._isEmptyString(target_field)) {
        return {
            isValid: false,
            message : `Target field name is required for required if empty rule for [${fieldName}]`
        };
    }

    /**
     * If there is a valid index and target field has wild card, replace it with index.
     */

    if(!this.isEmpty(index) && target_field.indexOf('*') !== -1) {
        target_field = target_field.replaceAll('*',index);
    }

    /**
     * Now get target field value ...
     */

    let targetFieldValue = this.getNestedValue(this.data,target_field);
    let targetFieldLabel = this.getFieldLabelFromRules(target_field);

    if(!targetFieldLabel) {
        targetFieldLabel = target_field;
    }

    if (this.isEmpty(targetFieldValue) && this.isEmpty(fieldValue)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} is required if ${targetFieldLabel} is empty`;


    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});
    }

    return {
        isValid,
        message
    };

}