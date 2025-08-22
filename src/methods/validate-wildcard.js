export function validateWildcard(fieldRule) {

    const data = this.data;

    const fieldName = fieldRule.field_name;
    const [arrayPath, subPath] = fieldName.split('.*.');
    const arrayToValidate = this.getNestedValue(data, arrayPath);

    if (!Array.isArray(arrayToValidate)) {
        return;
    }

    for (let i = 0; i < arrayToValidate.length; i++) {
        const item = arrayToValidate[i];
        const subFieldName = `${arrayPath}.${i}.${subPath}`;
        const subFieldValue = this.getNestedValue(item, subPath);

        const clonedRule = {
            ...fieldRule,
            field_name: subFieldName,
            index: i
        };
        this.validateField(clonedRule, subFieldValue);
    }
}