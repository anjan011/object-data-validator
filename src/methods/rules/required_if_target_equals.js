export function __validate_required_if_target_equals({
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

    if(typeof valueToMatch !== 'string' && typeof valueToMatch !== 'number') {
        return {
            isValid:  false,
            message : this.ruleError({
                fieldName,
                ruleName : ruleObj.name,
                error : `Value to match must be a string, or number`
            }),
        }
    }

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

    let targetFieldValue = this.getNestedValueAsString(this.data,target_field);

    console.log(`Target field value for ${target_field} is: `,targetFieldValue);
    console.log(`Value to match is: `,valueToMatch);

    if ((JSON.stringify(valueToMatch) === JSON.stringify(targetFieldValue)) && this.isEmpty(fieldValue)) {

        isValid = false;
        message = ruleObj.message ?
            ruleObj.message :
            `${fieldLabel} is required if ${target_field} value equals to ${valueToMatch}`;


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