import _ from 'lodash';

/**
 * Groups Swagger methods by Tag. If a method has multiple tags, it will be listed in each one.
 * 
 */
export function methodsByTag(swagger) {
    return _.transform(swagger.paths, (result, methodsAtPath, path) => {
        _.forEach(methodsAtPath, (method, httpType) => {
            _.forEach(method.tags, (tag) => {
                let out = {};
                out[path] = {};
                out[path][httpType] = method;
                (result[tag] || (result[tag] = [])).push(out);
            });
        });
    }, {});
}

export function tagMap(swagger) {
    // console.log(swagger.tags);
    return _.reduce(swagger.tags, (result, val) => {
        result[val.name] = val;
        return result;
    }, {});
    
}