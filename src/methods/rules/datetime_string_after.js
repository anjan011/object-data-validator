import {parse, isAfter} from 'date-fns';

export function __validate_datetime_string_after({ruleObj, fieldName, fieldLabel, index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValueAsString(this.data, fieldName);

    /**
     * If has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if (hasNullableRule && this.isEmpty(fieldValue)) {
        return {
            isValid: true,
            message: ''
        };
    }

    /**
     * make sure the value is a string first ...
     */

    if ('' === fieldValue) {
        return {
            isValid: false,
            message: `${fieldLabel} must be a non-empty datetime string`
        };
    }

    /**
     * Else, value must be a strict string data type!
     */

    let dateFormat = this.getNestedValueAsString(ruleObj, 'data.format');

    if (this._isEmptyString(dateFormat)) {
        dateFormat = 'yyyy-MM-dd';
    }

    let date = this.getNestedValueAsString(ruleObj, 'data.date');

    if(this._isEmptyString(date)) {
        this.ruleError({
            fieldName,
            ruleName: ruleObj.name,
            error: `Target date is required for datetime_string_after rule`
        });
    }

    const dateToCompare = parse(date, dateFormat, new Date());
    const fieldDate = parse(fieldValue, dateFormat, new Date());

    if (isAfter(dateToCompare,fieldDate)) {

        isValid = false;
        message = ruleObj.message ? ruleObj.message : `${fieldLabel} must be a valid date string after ${date} in this format: ${dateFormat}`;
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
        message,
        fieldValue
    };

}