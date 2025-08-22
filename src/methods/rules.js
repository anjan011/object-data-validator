export function _isRequiredRule(name = '') {

    return [
        ObjectDataValidator.REQUIRED,
        ObjectDataValidator.REQUIRED_IF_TARGET_EQUALS,
        ObjectDataValidator.REQUIRED_IF_TARGET_NOT_EMPTY,
    ].includes(name);

}