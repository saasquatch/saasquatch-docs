import * as _ from 'lodash';

export function methodsByTag(swagger) {
    return _.transform(swagger.paths, (result, methodsAtPath, path) => {
        _.forEach(methodsAtPath, (method, httpType) => {
            _.forEach(method.tags, (tag) => {
                let out = {}
                out[path] = method;
                (result[tag] || (result[tag] = [])).push(method);
            });
        });
    }, {});
}