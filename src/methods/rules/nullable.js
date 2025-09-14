export function __validate_nullable({ruleObj, fieldName, fieldLabel,index, hasNullableRule}) {

    /**
     * Its nullable!
     * So, it always passes!
     */

    return {
        isValid : true,
        message : ''
    };

}