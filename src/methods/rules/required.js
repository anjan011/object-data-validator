export function __validate_required({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValue(this.data,fieldName);

    if(this.isEmpty(fieldValue)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} is required`;


    }

    if(!isValid) {
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