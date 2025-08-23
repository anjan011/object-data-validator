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
    }
}