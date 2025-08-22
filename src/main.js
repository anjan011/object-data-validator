import hello from "./methods/hello";

class ObjectDataValidator {
    constructor({data,rules}) {
        this.data = data;
        this.rules = rules;
    }
}

ObjectDataValidator.prototype.hello = hello;

export default ObjectDataValidator;