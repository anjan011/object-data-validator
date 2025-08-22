export function getFieldLabelFromRules(fieldName) {

    let found = this.rules.filter((item) => {
       return item.field_name === fieldName
    });

    if(found.length === 0){
        return '';
    }

    let rule = found[0];

    return rule.field_label ?? rule.field_name;

}