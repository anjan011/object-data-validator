export function generateRuleDataTemplateTagValues(data = {}, prefix = 'data') {

    prefix = (typeof prefix !== 'string' || this._isEmptyString(prefix)) ? 'data' : prefix;

    data = this.isPlainObject(data) ? data : {};

    let tags = {};

    Object.keys(data).forEach(key => {

        let value = data[key];

        let tag_key = `${prefix}.${key}`;

        if (this.isPlainObject(value)) {
            Object.assign(tags, this.generateRuleDataTemplateTagValues(value, tag_key));
        } else {
            tags[tag_key] = value;
        }

    });

    return tags;
}