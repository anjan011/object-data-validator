export function _isRequiredRule(name = '') {

    return [
        'required',
        'required_if_target_equals',
        'required_if_target_not_empty',
    ].includes(name);

}