export function prepareRuleDataFromParts({ruleName,data}) {

    let ruleData = {};

    switch(ruleName) {
        case 'greater':
        case 'greater_or_equal':
        case 'lesser':
        case 'lesser_or_equal':
            ruleData.target = data;
            break;
        case 'min_length':
        case 'max_length':
        case 'exact_length':
            ruleData.length = data;
            break;
        case 'length_between':

            let rangeParts = data.split(',',2);

            ruleData.min_length = rangeParts[0];
            ruleData.max_length = rangeParts[1];
            break;
        default:
            break;
    }

    return ruleData;
}