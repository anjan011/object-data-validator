import {parse, isAfter, isBefore, format, addHours} from 'date-fns';
import {isValid as isDateValid} from 'date-fns/isValid';
import {DEFAULT_DATE_FORMAT} from "../../constants";

export function __validate_date_string_before({ruleObj, fieldName, fieldLabel, index, hasNullableRule}) {

    let isValid = true;
    let message = '';

    const fieldValue = this.getNestedValueAsString(this.data, fieldName);

    /**
     * If it has the nullable rule and value is an empty string,
     * the rule passes.
     */

    if (hasNullableRule && this.isEmpty(fieldValue)) {
        return {
            isValid: true,
            message: ''
        };
    }

    if (typeof fieldValue === 'string' && fieldValue.trim() !== '') {

        let dateFormat = this.getNestedValueAsDaeFormat(
            ruleObj,
            'data.format',
            'yyyy-MM-dd'
        );

        let inclusive = this.getNestedValueAsBoolean(ruleObj, 'data.inclusive', true);


        let dateToCompare = null;

        try {
            dateToCompare = this.prepareTargetDate({
                ruleObj,
                keyPath: 'data.date'
            });
        } catch (e) {
            return {
                isValid: false,
                message: this.ruleError({
                    fieldName,
                    ruleName: ruleObj.name,
                    error: e.message
                })
            }
        }

        const fieldDate = parse(fieldValue, dateFormat, new Date());

        if (isDateValid(fieldDate)) {

            if(!inclusive) {

                if(!isBefore(fieldDate, dateToCompare)) {
                    isValid = false;
                    message = ruleObj.message ?
                        ruleObj.message :
                        (
                            DEFAULT_DATE_FORMAT === dateFormat ?
                                `${fieldLabel} must be earlier than ${format(dateToCompare, dateFormat)}` :
                                `${fieldLabel} must be earlier than ${format(dateToCompare, dateFormat)} in this format: ${dateFormat}`
                        );
                }

            } else {

                if(!isBefore(fieldDate, addHours(dateToCompare,24))) {
                    isValid = false;
                    message = ruleObj.message ?
                        ruleObj.message :
                        (
                            DEFAULT_DATE_FORMAT === dateFormat ?
                                `${fieldLabel} must be earlier than or equal to ${format(dateToCompare, dateFormat)}` :
                                `${fieldLabel} must be earlier than or equal to ${format(dateToCompare, dateFormat)} in this format: ${dateFormat}`
                        );
                }
            }


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