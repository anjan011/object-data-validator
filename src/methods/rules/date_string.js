export function __validate_date_string({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValue(this.data,fieldName);

    /**
     * If has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if(hasNullableRule && this.isEmpty(fieldValue)) {
        return  {
            isValid : true,
            message : ''
        };
    }

    /**
     * We will only validate if value is non-empty string
     * (after trimming any leading/trailing spaces).
     * Otherwise, the rule passes.
     *
     * Any other validation rules (e.g. required, etc.)
     * should be handled by dedicated rules like required, and others.
     */


    if(typeof fieldValue === 'string' && fieldValue.trim().length) {

        /**
         * Else, value must be a strict string data type!
         */

        let dateFormat = this.getNestedValue(ruleObj,'data.format');

        if(this._isEmptyString(dateFormat)) {
            dateFormat = 'yyyy-MM-dd';
        }

        if(!this.isValidWithDateFns(fieldValue,dateFormat)) {

            isValid = false;
            message = ruleObj.message ?
                ruleObj.message :
                (
                    'yyyy-MM-dd' === dateFormat ?
                        `${fieldLabel} must be a valid date string` :
                        `${fieldLabel} must be a valid date string in the format of ${dateFormat}`
                );
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