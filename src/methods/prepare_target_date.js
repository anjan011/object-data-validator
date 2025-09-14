import {DEFAULT_DATE_FORMAT} from "../constants";
import {format, isValid, parse} from "date-fns";

export function prepareTargetDate({ruleObj, keyPath = 'data.date'}) {

    /**
     * Get the date format to use
     * @type {string}
     */

    let dateFormat = this.getNestedValueAsString(ruleObj,'data.format');

    if (typeof dateFormat !== 'string' || !dateFormat.trim().length) {
        dateFormat = DEFAULT_DATE_FORMAT;
    }

    /**
     * key path ...
     */

    if(typeof keyPath !== 'string' || !keyPath.trim().length) {
        keyPath = 'data.date';
    }

    /**
     * Get the target date to compare against
     * @type {string}
     */

    let date = this.getNestedValueAsString(ruleObj,keyPath);

    /**
     * If it is an empty string or 'today', use today's date
     * in the specified format.
     */

    if (typeof date !== 'string' || !date.trim().length || 'today' === date) {
        date = format(new Date(), dateFormat);
    }

    const parsedDate = parse(date, dateFormat, new Date());

    if (!isValid(parsedDate)) {
        throw new Error(
            DEFAULT_DATE_FORMAT === dateFormat ?
                `The target date (${date}) is not a valid date` :
                `The target date (${date}) is not a valid date in the format of ${dateFormat}`
        );
    }

    return parsedDate;
}