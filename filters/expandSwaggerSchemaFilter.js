var swaggerExpand = require('./swaggerExpand.js');

/**
 * Exposes `expandSwaggerSchema`.
 */
module.exports = expandSwaggerSchema;

function expandSwaggerSchema(baseSchema) {

  var myOutput = swaggerExpand.expandProperties(baseSchema);

  return myOutput;
}