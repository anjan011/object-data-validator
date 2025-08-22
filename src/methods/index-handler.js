export function handleIndexInfo({message,index, ruleObj}) {

    if (typeof index === 'number' && index >= 0) {

        if (ruleObj.message) {
            message = this.replaceTags(message, {
                index: this.asInteger(index + 1)
            });
        } else {
            message += ` @ index ${this.asInteger(index + 1)}`;
        }

    }

    return message;

}