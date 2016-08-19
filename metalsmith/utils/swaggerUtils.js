const _ = require('lodash');

/**
 * Groups Swagger methods by Tag. If a method has multiple tags, it will be listed in each one.
 * 
 */
module.exports.methodsByTag = function(swagger) {
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
};

module.exports.tagMap = function(swagger){
    // console.log(swagger.tags);
    return _.reduce(swagger.tags, (result, val) => {
        result[val.name] = val;
        return result;
    }, {});
    
};