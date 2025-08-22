export function generateDefaultMessage(rule, fieldLabel, ruleData) {
    switch (rule) {
        case 'string':
            return `${fieldLabel} must be a valid string`;
        case 'number':
            return `${fieldLabel} must be a valid number`;
        case 'array':
            return `${fieldLabel} must be a valid array`;
        case 'object':
            return `${fieldLabel} must be a valid object`;
        case 'datetime':
            return `${fieldLabel} must be a valid datetime`;
        case 'exact_length':
            return `${fieldLabel} must be exactly ${ruleData.length} characters long`;
        case 'min_length':
            return `${fieldLabel} must be at least ${ruleData.length} characters long`;
        case 'max_length':
            return `${fieldLabel} cannot exceed ${ruleData.length} characters`;
        case 'equals_string':
            return `${fieldLabel} must be equal to ${ruleData.target}`;
        case 'equals_number':
            return `${fieldLabel} must be equal to ${ruleData.target}`;
        case 'equals_array':
            return `${fieldLabel} must be equal to ${JSON.stringify(ruleData.target)}`;
        case 'lesser_or_equal':
            return `${fieldLabel} must be lesser than or equal to ${ruleData.target}`;
        case 'greater_or_equal':
            return `${fieldLabel} must be greater than or equal to ${ruleData.target}`;
        case 'in_array':
            return `${fieldLabel} is not a valid selection`;
        case 'regex_match':
            return `${fieldLabel} has an invalid format`;
        case 'required':
            return `${fieldLabel} is required`;
        case 'nullable':
            return `${fieldLabel} can be null`;
        case 'required_if_target_equals':
            return `${fieldLabel} is required is ${this.targetValueString(ruleData.target)}`;
        default:
            return `${fieldLabel} is invalid`;
    }
}