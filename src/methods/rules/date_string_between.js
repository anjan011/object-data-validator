import {parse, isAfter, isBefore, format, isWithinInterval} from 'date-fns';
import {isValid as isDateValid} from 'date-fns/isValid';
import {DEFAULT_DATE_FORMAT} from "../../constants";

export function __validate_date_string_between({ruleObj, fieldName, fieldLabel, index, hasNullableRule}) {

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

    let minDateToCompare = null;
    let maxDateToCompare = null;
    let range = {};

    const dateFormat = this.getNestedValueAsString(ruleObj, 'data.format');
    const inclusive = this.getNestedValueAsBoolean(ruleObj, 'data.inclusive', true);

    if (typeof fieldValue === 'string' && fieldValue.trim() !== '') {

        try {
            minDateToCompare = this.prepareTargetDate({
                ruleObj,
                keyPath: 'data.min_date'
            });

            maxDateToCompare = this.prepareTargetDate({
                ruleObj,
                keyPath: 'data.max_date'
            });

            if (isAfter(minDateToCompare, maxDateToCompare)) {
                throw new Error(`The min_date must be before or equal to the max_date`);
            }

            if (inclusive) {
                range = {
                    start: minDateToCompare,
                    end: maxDateToCompare
                };
            }

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

            if (!inclusive) {
                if (!(isAfter(fieldDate, minDateToCompare) && isBefore(fieldDate, maxDateToCompare))) {
                    isValid = false;
                    message = ruleObj.message ?
                        ruleObj.message :
                        (
                            DEFAULT_DATE_FORMAT === dateFormat ?
                                `${fieldLabel} must be later than ${format(minDateToCompare, dateFormat)} but earlier than ${format(maxDateToCompare, dateFormat)}` :
                                `${fieldLabel} must be later than ${format(minDateToCompare, dateFormat)} but earlier than ${format(maxDateToCompare, dateFormat)} in this format: ${dateFormat}`
                        );
                }
            } else {

                if (!isWithinInterval(fieldDate, range)) {

                    isValid = false;
                    message = ruleObj.message ?
                        ruleObj.message :
                        (
                            DEFAULT_DATE_FORMAT === dateFormat ?
                                `${fieldLabel} must be later than or equal to ${format(minDateToCompare, dateFormat)} but earlier than or equal ${format(maxDateToCompare, dateFormat)}` :
                                `${fieldLabel} must be later than  or equal ${format(minDateToCompare, dateFormat)} but earlier than or equal ${format(maxDateToCompare, dateFormat)} in this format: ${dateFormat}`
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