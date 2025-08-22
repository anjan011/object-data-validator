export function validate() {

    this.errors = {};

    /**
     * Make sure data is a plain object.
     */

    if (!this.isPlainObject(this.data)) {
        return {
            validation_rule: `Data to be validated must be a valid object format`
        }
    }

    /**
     * Then check if rules list is empty ...
     */

    if (!Array.isArray(this.rules) || this.rules.length === 0) {
        return {
            validation_error: 'Validation rules list cannot be empty'
        };
    }

    /**
     * Then, Check for field name and rules list for each rule ...
     */

    const resValidateRulesArray = this.validateRulesArray();

    if (resValidateRulesArray !== true) {
        return resValidateRulesArray;
    }

    /**
     * Now carry on to validate data ...
     */

    for (const fieldRule of this.rules) {

        const fieldName = fieldRule.field_name;

        if (this.errors[fieldName]) {
            continue;
        }

        if (fieldName.includes('*')) {
            this.validateWildcard(fieldRule);
        } else {
            this.validateField(fieldRule);
        }


    }

    return Object.keys(this.errors).length === 0 ? true : this.errors;
}