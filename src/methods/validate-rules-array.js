/**
 * Validate the rules array and makes sure its in correct format ...
 *
 * @return {{validation_rule: string}|boolean}
 */

export function validateRulesArray() {

    let rules = this.rules;

    for (let i = 0; i < rules.length; i++) {

        const ruleItem = rules[i];

        if (!this.isPlainObject(ruleItem)) {
            return {
                validation_rule: `Rule item must be a valid object at index: ${i}`
            }
        }

        if (!ruleItem.hasOwnProperty('field_name')) {
            return {
                validation_rule: `Missing field name at index: ${i}`
            }
        }

        const fieldName = ruleItem.field_name;

        if (!ruleItem.hasOwnProperty('rules') || !Array.isArray(ruleItem.rules) || ruleItem.rules.length === 0) {
            return {
                validation_rule: `Missing or empty rule list for field [${fieldName}] at index: ${i}`
            }
        }

        for (let j = 0; j < ruleItem.rules.length; j += 1) {

            const r = ruleItem.rules[j];

            if(typeof r === 'string') {

                if(r.indexOf(':') !== -1) {

                    let parts = r.split(':',2);

                    ruleItem.rules[j] = {
                        name: parts[0],
                        data : this.prepareRuleDataFromParts({
                            ruleName : parts[0],
                            data: parts[1]
                        })
                    };

                } else {
                    ruleItem.rules[j] = {
                        name: r
                    };
                }


            } else if(this.isPlainObject(r)) {
                if (!r.hasOwnProperty('name') || (typeof r.name !== 'string') || r.name.trim() === '') {
                    return {
                        validation_rule: `Missing or empty rule name at index: ${j} for field [${fieldName}] at index ${i}`
                    }

                }
            } else {

                return {
                    validation_rule: `Invalid rule data at index: ${j} for field [${fieldName}] at index ${i}`
                }

            }



        }

    }

    return true;
}