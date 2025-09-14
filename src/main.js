import {asInteger, asNumber, asString} from "./methods/data-conversion";
import {
    getNestedValue, getNestedValueAsArray, getNestedValueAsBoolean,
    getNestedValueAsDateFormat, getNestedValueAsInteger, getNestedValueAsNumber,
    getNestedValueAsPlainObject,
    getNestedValueAsString,
    isNullOrUndefined,
    isPlainObject,
    objHasProp
} from "./methods/data-type-utilities";
import {targetValueString} from "./methods/data-values";
import {isValidWithDateFns} from "./methods/date-time";
import {generateDefaultMessage} from "./methods/default-message";
import {getFieldLabelFromRules} from "./methods/fields";
import {handleIndexInfo} from "./methods/index-handler";
import {_isEmptyArray, _isEmptyObject, _isEmptyString, isEmpty} from "./methods/is-empty-values";
import {isDeepEqual} from "./methods/object";
import {prepareRuleDataFromParts} from "./methods/prepare-rule-data";
import {replaceTags} from "./methods/regex";
import {ruleError} from "./methods/rule-error";
import {_isRequiredRule} from "./methods/rules";
import {validate} from "./methods/validate";
import {validateField} from "./methods/validate-field";
import {validateRulesArray} from "./methods/validate-rules-array";
import {validateWildcard} from "./methods/validate-wildcard";
import {__validate_array} from "./methods/rules/array";
import {__validate_date_object} from "./methods/rules/date_object";
import {__validate_date_string} from "./methods/rules/date_string";
import {__validate_email} from "./methods/rules/email";
import {__validate_equals_array} from "./methods/rules/equals_array";
import {__validate_equals_number} from "./methods/rules/equals_number";
import {__validate_equals_string} from "./methods/rules/equals_string";
import {__validate_exact_length} from "./methods/rules/exact_length";
import {__validate_greater} from "./methods/rules/greater";
import {__validate_greater_or_equal} from "./methods/rules/greater_or_equal";
import {__validate_in_array} from "./methods/rules/in_array";
import {__validate_integer} from "./methods/rules/integer";
import {__validate_lesser} from "./methods/rules/lesser";
import {__validate_lesser_or_equal} from "./methods/rules/lesser_or_equal";
import {__validate_max_length} from "./methods/rules/max_length";
import {__validate_min_length} from "./methods/rules/min_length";
import {__validate_nullable} from "./methods/rules/nullable";
import {__validate_number} from "./methods/rules/number";
import {__validate_object} from "./methods/rules/object";
import {__validate_regex_match} from "./methods/rules/regex_match";
import {__validate_required} from "./methods/rules/required";
import {__validate_required_if_target_empty} from "./methods/rules/required_if_target_empty";
import {__validate_required_if_target_equals} from "./methods/rules/required_if_target_equals";
import {__validate_required_if_target_not_empty} from "./methods/rules/required_if_target_not_empty";
import {__validate_required_if_target_not_equals} from "./methods/rules/required_if_target_not_equals";
import {__validate_string} from "./methods/rules/string";
import {__validate_length_between} from "./methods/rules/length_betwen";
import {__validate_required_if_target_in_array} from "./methods/rules/required_if_target_in_array";
import {__validate_date_string_before} from "./methods/rules/date_string_before";
import {__validate_custom} from "./methods/rules/custom";
import {__validate_min_value} from "./methods/rules/min_value";
import {__validate_max_value} from "./methods/rules/max_value";
import {__validate_date_string_after} from "./methods/rules/date_string_after";
import {prepareTargetDate} from "./methods/prepare_target_date";
import {__validate_date_string_between} from "./methods/rules/date_string_between";
import {generateRuleDataTemplateTagValues} from "./methods/rule-data-template-tags";

class ObjectDataValidator {

    /**
     * All rules as static...
     */

    constructor({data = {}, rules = []}) {

        this.data = data;
        this.rules = rules;

    }

}

/**
 * Prototype methods ...
 */

// Data conversion methods ...

ObjectDataValidator.prototype.asString = asString;
ObjectDataValidator.prototype.asNumber = asNumber;
ObjectDataValidator.prototype.asInteger = asInteger;

// Data types utilities ...


ObjectDataValidator.prototype.isNullOrUndefined = isNullOrUndefined;
ObjectDataValidator.prototype.isPlainObject = isPlainObject;
ObjectDataValidator.prototype.objHasProp = objHasProp;

// Nested value ...

ObjectDataValidator.prototype.getNestedValue = getNestedValue;
ObjectDataValidator.prototype.getNestedValueAsString = getNestedValueAsString;
ObjectDataValidator.prototype.getNestedValueAsDaeFormat = getNestedValueAsDateFormat;
ObjectDataValidator.prototype.getNestedValueAsArray = getNestedValueAsArray;
ObjectDataValidator.prototype.getNestedValueAsBoolean = getNestedValueAsBoolean;
ObjectDataValidator.prototype.getNestedValueAsInteger = getNestedValueAsInteger;
ObjectDataValidator.prototype.getNestedValueAsNumber = getNestedValueAsNumber;
ObjectDataValidator.prototype.getNestedValueAsPlainObject = getNestedValueAsPlainObject;

// Data values ...

ObjectDataValidator.prototype.targetValueString = targetValueString;

// Date time ...

ObjectDataValidator.prototype.isValidWithDateFns = isValidWithDateFns;

// Default message ...

ObjectDataValidator.prototype.generateDefaultMessage = generateDefaultMessage;

// Fields ...

ObjectDataValidator.prototype.getFieldLabelFromRules = getFieldLabelFromRules;

// Index handlers ...

ObjectDataValidator.prototype.handleIndexInfo = handleIndexInfo;

// Empty values ...

ObjectDataValidator.prototype._isEmptyString = _isEmptyString;
ObjectDataValidator.prototype._isEmptyArray = _isEmptyArray;
ObjectDataValidator.prototype._isEmptyObject = _isEmptyObject;
ObjectDataValidator.prototype.isEmpty = isEmpty;

// Object related ...

ObjectDataValidator.prototype.isDeepEqual = isDeepEqual;

// Prepare rule data ...

ObjectDataValidator.prototype.prepareRuleDataFromParts = prepareRuleDataFromParts;

// Regex tag replacer ...

ObjectDataValidator.prototype.replaceTags = replaceTags;

// Rule error related ...

ObjectDataValidator.prototype.ruleError = ruleError;

// Rules related ...

ObjectDataValidator.prototype._isRequiredRule = _isRequiredRule;

// Validate method ...

ObjectDataValidator.prototype.validate = validate;
ObjectDataValidator.prototype.validateField = validateField;
ObjectDataValidator.prototype.validateRulesArray = validateRulesArray;
ObjectDataValidator.prototype.validateWildcard = validateWildcard;

// individual rule validation handlers ...

ObjectDataValidator.prototype.__validate_array = __validate_array;
ObjectDataValidator.prototype.__validate_email = __validate_email;
ObjectDataValidator.prototype.__validate_equals_array = __validate_equals_array;
ObjectDataValidator.prototype.__validate_equals_number = __validate_equals_number;
ObjectDataValidator.prototype.__validate_equals_string = __validate_equals_string;
ObjectDataValidator.prototype.__validate_exact_length = __validate_exact_length;
ObjectDataValidator.prototype.__validate_greater = __validate_greater;
ObjectDataValidator.prototype.__validate_greater_or_equal = __validate_greater_or_equal;
ObjectDataValidator.prototype.__validate_in_array = __validate_in_array;
ObjectDataValidator.prototype.__validate_integer = __validate_integer;
ObjectDataValidator.prototype.__validate_lesser = __validate_lesser;
ObjectDataValidator.prototype.__validate_lesser_or_equal = __validate_lesser_or_equal;
ObjectDataValidator.prototype.__validate_max_length = __validate_max_length;
ObjectDataValidator.prototype.__validate_min_length = __validate_min_length;
ObjectDataValidator.prototype.__validate_length_between = __validate_length_between;
ObjectDataValidator.prototype.__validate_nullable = __validate_nullable;
ObjectDataValidator.prototype.__validate_number = __validate_number;
ObjectDataValidator.prototype.__validate_object = __validate_object;
ObjectDataValidator.prototype.__validate_regex_match = __validate_regex_match;
ObjectDataValidator.prototype.__validate_required = __validate_required;
ObjectDataValidator.prototype.__validate_required_if_target_empty = __validate_required_if_target_empty;
ObjectDataValidator.prototype.__validate_required_if_target_equals = __validate_required_if_target_equals;
ObjectDataValidator.prototype.__validate_required_if_target_not_empty = __validate_required_if_target_not_empty;
ObjectDataValidator.prototype.__validate_required_if_target_not_equals = __validate_required_if_target_not_equals;
ObjectDataValidator.prototype.__validate_string = __validate_string;
ObjectDataValidator.prototype.__validate_required_if_target_in_array = __validate_required_if_target_in_array;

/**
 * Date related ...
 */

ObjectDataValidator.prototype.__validate_date_object = __validate_date_object;
ObjectDataValidator.prototype.__validate_date_string = __validate_date_string;
ObjectDataValidator.prototype.__validate_date_string_before = __validate_date_string_before;
ObjectDataValidator.prototype.__validate_date_string_after = __validate_date_string_after;
ObjectDataValidator.prototype.__validate_date_string_between = __validate_date_string_between;

ObjectDataValidator.prototype.__validate_custom = __validate_custom;
ObjectDataValidator.prototype.__validate_min_value = __validate_min_value;
ObjectDataValidator.prototype.__validate_max_value = __validate_max_value;

/**
 * Prepare target date ...
 */

ObjectDataValidator.prototype.prepareTargetDate = prepareTargetDate;

/**
 * Others ...
 */

ObjectDataValidator.prototype.generateRuleDataTemplateTagValues = generateRuleDataTemplateTagValues;

/**
 * Finally export!
 */

export default ObjectDataValidator;