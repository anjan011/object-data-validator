export function validateField(fieldRule) {

    let _this = this;

    const {field_name: fieldName, field_label : fieldLabel, rules, index} = fieldRule;


    const label = fieldLabel || fieldName;
    const indexPostfix = index !== undefined ? ` at index #${index + 1}` : '';

    /**
     * Field value exists?
     */

    const hasFieldValue = this.objHasProp(_this.data, fieldName);

    /**
     * Do we have a nullable rule?
     *
     * @type {boolean}
     */

    const hasNullableRule = rules.filter((r) => r.name === 'nullable').length > 0;

    /**
     * Has any required rule?
     *
     * @type {boolean}
     */

    const hasAnyRequiredRule = rules.filter((r) => _this._isRequiredRule(r.name)).length > 0;

    /**
     * If a field has both nullable and required rules, we stop and throw
     * an error.
     */

    if (hasNullableRule && hasAnyRequiredRule) {
        _this.errors[fieldName] = `Field [${fieldName}] must not have both nullable and any type of required rules!`;
        return;
    }


    for (const ruleObj of rules) {
        let {name, message, data: ruleData} = ruleObj;

        if (!this.isPlainObject(ruleData)) {
            ruleData = {};
        }

        let isValid = true;

        let generatedMessage = message || this.generateDefaultMessage(name, label, ruleData);

        if (index !== undefined) {
            generatedMessage = generatedMessage.replace(/{index}/g, index);
            generatedMessage += indexPostfix;
        }


        let functionName = `__validate_${name}`;

        if (typeof this[functionName] === 'function') {
            const {isValid, message, fieldValue} = this[functionName].apply(this, [{
                ruleObj,
                fieldName,
                fieldLabel: label,
                index,
                hasNullableRule
            }]);

            if (!isValid) {
                this.errors[fieldName] = this.replaceTags(message,{
                    value : fieldValue
                });
                return;
            }

        } else {
            _this.errors[fieldName] = `Unsupported rule ${name} for field: ${fieldName}`;
            break;
        }




        /*switch (name) {
            case 'string':

                if (hasNullableRule && _this._isEmptyString(fieldValue)) {
                    isValid = true;
                    break;
                }

                isValid = typeof fieldValue === 'string';

                break;
            case 'number':


                isValid = typeof fieldValue === 'number';
                break;
            case 'array':
                isValid = Array.isArray(fieldValue);
                break;
            case ''object'':
                isValid = fieldValue !== null && typeof fieldValue === 'object' && !Array.isArray(fieldValue);
                break;
            case ObjectDataValidator.DATETIME:

                if (hasNullableRule && _this._isEmptyString(fieldValue)) {
                    isValid = true;
                    break;
                }

                const date = new Date(fieldValue);
                isValid = !isNaN(date.getTime());
                if (isValid && ruleData && ruleData.format) {
                    const formatRegex = this._formatToRegex(ruleData.format);
                    isValid = formatRegex.test(fieldValue);
                    generatedMessage = generatedMessage.replace(/{format}/g, ruleData.format);
                }
                break;
            case ObjectDataValidator.EXACT_LENGTH:

                if (hasNullableRule && _this._isEmptyString(fieldValue)) {
                    isValid = true;
                    break;
                }

                isValid = typeof fieldValue === 'string' && fieldValue.length === ruleData.length;
                generatedMessage = generatedMessage.replace(/{length}/g, ruleData.length);
                break;
            case ObjectDataValidator.MIN_LENGTH:

                if (hasNullableRule && _this._isEmptyString(fieldValue)) {
                    isValid = true;
                    break;
                }

                isValid = typeof fieldValue === 'string' && fieldValue.length >= ruleData.length;
                generatedMessage = generatedMessage.replace(/{length}/g, ruleData.length);
                break;
            case ObjectDataValidator.MAX_LENGTH:

                if (hasNullableRule && _this._isEmptyString(fieldValue)) {
                    isValid = true;
                    break;
                }

                isValid = typeof fieldValue === 'string' && fieldValue.length <= ruleData.length;
                generatedMessage = generatedMessage.replace(/{length}/g, ruleData.length);
                break;
            case ObjectDataValidator.EQUALS_STRING:

                if (hasNullableRule && _this._isEmptyString(fieldValue)) {
                    isValid = true;
                    break;
                }

                isValid = typeof fieldValue === 'string' && fieldValue === ruleData.target;
                generatedMessage = generatedMessage.replace(/{target}/g, ruleData.target);
                break;
            case ObjectDataValidator.EQUALS_NUMBER:
                isValid = typeof fieldValue === 'number' && fieldValue === ruleData.target;
                generatedMessage = generatedMessage.replace(/{target}/g, ruleData.target);
                break;
            case ObjectDataValidator.EQUALS_ARRAY:
                isValid = Array.isArray(fieldValue) && JSON.stringify(fieldValue) === JSON.stringify(ruleData.target);
                generatedMessage = generatedMessage.replace(/{target}/g, JSON.stringify(ruleData.target));
                break;
            case 'lesser_or_equal':
                isValid = typeof fieldValue === 'number' && fieldValue <= ruleData.target;
                generatedMessage = generatedMessage.replace(/{target}/g, ruleData.target);
                break;
            case 'greater'_OR_EQUAL:
                isValid = typeof fieldValue === 'number' && typeof ruleData.target === 'number' && fieldValue >= ruleData.target;
                if (!isValid) {
                    generatedMessage = generatedMessage.replace(/{target}/g, ruleData.target);
                }

                break;
            case ObjectDataValidator.IN_ARRAY:

                let target = objHasProp(ruleData, 'target') && Array.isArray(ruleData.target) ? ruleData.target : [];

                if (target.length === 0) {
                    isValid = false;
                    generatedMessage = "For in_array rule target array cannot be empty";

                    break;
                }

                isValid = target.includes(fieldValue);

                if (!isValid) {
                    generatedMessage = generatedMessage.replace(/{list}/g, ruleData.target.join(', '));
                }

                break;
            case ObjectDataValidator.REGEX_MATCH:

                if (hasNullableRule && _this._isEmptyString(fieldValue)) {
                    isValid = true;
                    break;
                }

                if (typeof fieldValue === 'string' && objHasProp(ruleData, 'regex')) {
                    try {
                        const regex = new RegExp(ruleData.regex);
                        isValid = regex.test(fieldValue);
                    } catch (e) {
                        isValid = false;
                    }
                } else {
                    isValid = false;
                }
                break;
            case 'required_if_target_not_empty':

                let target_field2 = _this.objHasProp(ruleData, 'target_field') ? ruleData.target_field : null;

                if (!ruleData || !ruleData.target_field) {
                    this.errors[fieldName] = "Target field name is required";
                    return;
                }
                const targetValue = _this.getNestedValue(this.data, ruleData.target_field);
                isValid = !(targetValue && fieldValue === undefined);
                break;
            case ''required_if_target_equals'':

                let target_field = ruleData.target_field ?? '';

                if (!ruleData || !ruleData.target_field) {
                    this.errors[fieldName] = "Target field name is required";
                    return;
                }
                const targetValueEqual = this.getNestedValue(this.data, ruleData.target_field);
                isValid = !(targetValueEqual === ruleData.value && fieldValue === undefined);
                break;
            case 'required':

                isValid = this.__validate_required({
                    fieldValue: this.getNestedValue(this.data, fieldName)
                });

                break;
            case 'nullable':

                /!**
                 * Nullable is special, as it means a value for this field
                 * is not required. So, no matter what this rule will always
                 * evaluate to true.
                 *!/

                isValid = true;
                break;
            default:
                break;
        }

        if (!isValid) {
            let valueForMessage = fieldValue;
            if (typeof fieldValue === 'object' && fieldValue !== null) {
                valueForMessage = JSON.stringify(fieldValue);
            }
            this.errors[fieldName] = generatedMessage.replace(/{value}/g, valueForMessage);
            return;
        }*/
    }
}