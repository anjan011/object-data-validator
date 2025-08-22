import {hello} from "./methods/hello";
import {asInteger, asNumber, asString} from "./methods/data-conversion";
import {getNestedValue, isNullOrUndefined, isPlainObject, objHasProp} from "./methods/data-type-utilities";
import {targetValueString} from "./methods/data-values";
import {isValidWithDateFns} from "./methods/date-time";

class ObjectDataValidator {

    /**
     * All rules as static...
     */

    static NULLABLE = 'nullable';

    static STRING = 'string';
    static NUMBER = 'number';
    static INTEGER = 'integer';
    static ARRAY = 'array';
    static OBJECT = 'object';

    static EMAIL = 'email';


    static DATE_OBJECT = 'date_object';
    static DATETIME_STRING = 'datetime_string';

    static EXACT_LENGTH = 'exact_length';
    static MIN_LENGTH = 'min_length';
    static MAX_LENGTH = 'max_length';
    static LENGTH_BETWEEN = 'length_between';


    static IN_ARRAY = 'in_array';

    static EQUALS_STRING = 'equals_string';
    static EQUALS_NUMBER = 'equals_number';
    static EQUALS_ARRAY = 'equals_array';
    //static EQUALS_OBJECT = 'equals_object';

    static LESSER_OR_EQUAL = 'lesser_or_equal';
    static GREATER_OR_EQUAL = 'greater_or_equal';

    static LESSER = 'lesser';
    static GREATER = 'greater';

    static REGEX_MATCH = 'regex_match';

    static REQUIRED = 'required';

    static REQUIRED_IF_TARGET_EQUALS = 'required_if_target_equals';
    static REQUIRED_IF_TARGET_NOT_EQUALS = 'required_if_target_not_equals';

    static REQUIRED_IF_TARGET_EMPTY = 'required_if_target_empty';
    static REQUIRED_IF_TARGET_NOT_EMPTY = 'required_if_target_not_empty';

    constructor({data = {}, rules = []}) {

        this.data = data;
        this.rules = rules;

    }

}

/**
 * Prototype methods ...
 */

// Data conversion methods ...

ObjectDataValidator.prototype.hello = hello;
ObjectDataValidator.prototype.asString = asString;
ObjectDataValidator.prototype.asNumber = asNumber;
ObjectDataValidator.prototype.asInteger = asInteger;

// Data types utilities ...


ObjectDataValidator.prototype.isNullOrUndefined = isNullOrUndefined;
ObjectDataValidator.prototype.isPlainObject = isPlainObject;
ObjectDataValidator.prototype.objHasProp = objHasProp;
ObjectDataValidator.prototype.getNestedValue = getNestedValue;

// Data values ...

ObjectDataValidator.prototype.targetValueString = targetValueString;

// Date time ...

ObjectDataValidator.prototype.isValidWithDateFns = isValidWithDateFns;

export default ObjectDataValidator;