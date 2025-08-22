export function prepareRuleDataFromParts({ruleName,data}) {

    let ruleData = {};

    switch(ruleName) {
        case ObjectDataValidator.GREATER:
        case ObjectDataValidator.GREATER_OR_EQUAL:
        case ObjectDataValidator.LESSER:
        case ObjectDataValidator.LESSER_OR_EQUAL:
            ruleData.target = data;
            break;
        case ObjectDataValidator.LENGTH_BETWEEN:

            let rangeParts = data.split(',',2);

            ruleData.min_length = rangeParts[0];
            ruleData.max_length = rangeParts[1];
            break;
        default:
            break;
    }

    return ruleData;
}