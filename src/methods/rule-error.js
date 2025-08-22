export function ruleError({
    fieldName,
    ruleName,
    error
                                                   }) {

    return `Rule error: ${fieldName}.${ruleName} -> ${error}`;

}