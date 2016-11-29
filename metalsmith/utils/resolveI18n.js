import _ from 'lodash';

export default function resolveI18n(flds, locale = 'en-US', stripLocale = false) {
    let out;
    if (_.isArray(flds)) {
        out = _.map(flds, function square(val) {
            return resolveI18n(val, locale);
        });
    }
    else if (_.isObject(flds)) {
        let subObj;
        // When the `locale` matches, we need to fold the child up one level
        if (flds[locale]) {
            subObj = flds[locale];
        } else {
            subObj = flds;
        }
        if (_.isArray(subObj)) {
            out = _.map(subObj, function square(val) {
                return resolveI18n(val, locale);
            });
        }
        else if (_.isObject(subObj)) {
            out = _.transform(subObj, function(result, value, key) {
                result[key] = resolveI18n(value, locale);
            }, {});
        }
        else {
            out = subObj;
        }
    }
    else {
        out = flds;
    }
    return out;
};