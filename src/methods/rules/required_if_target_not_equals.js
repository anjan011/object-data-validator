export function __validate_required_if_target_not_equals({
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
     * First, get target field name ...
     */

    let target_field = this.getNestedValue(ruleObj,'data.target_field');

    if(this._isEmptyString(target_field)) {
        return {
            isValid: false,
            message : this.ruleError({
                fieldName,
                ruleName : ruleObj.name,
                error : `Target field name is required`
            })
        };
    }

    /**
     * Value to match
     */

    let valueToMatch = this.getNestedValue(ruleObj,'data.value');




    if(this.isEmpty(valueToMatch)) {
        return {
            isValid:  false,
            message : this.ruleError({
                fieldName,
                ruleName : ruleObj.name,
                error : `Value to match cannot be empty`
            }),
        }
    }

    //valueToMatch = valueToMatch.toString();


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

    if ((JSON.stringify(valueToMatch) !== JSON.stringify(targetFieldValue)) && this.isEmpty(fieldValue)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} is required if ${target_field} value not equals to ${valueToMatch}`;


    }

    if (!isValid) {
        /**
         * handle index in case this is applied via wildcard or dot
         * syntax. E.g. person.name, employee.*.name, etc.
         */

        message = this.handleIndexInfo({message, index, ruleObj});

        message = this.replaceTags(message,{
            target : targetFieldValue,
            match : valueToMatch
        });
    }

    return {
        isValid,
        message
    };

}