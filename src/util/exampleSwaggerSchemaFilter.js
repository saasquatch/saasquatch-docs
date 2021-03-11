import extend from 'extend';

/**
 * Exposes `exampleSwaggerSchema`.
 */
export default exampleSwaggerSchema;

function exampleSwaggerSchema(baseSchema) {
  var myOutput = {};
  
  // TODO: Add Array support
  // Doesn't support creating example objects that include Arrays yet....
  
  function extractProperties(schema, output){
    if(schema['example']){
      // By default grabs the schema-level example
      extend(true, output, schema['example']);
    }
    var props = schema.properties;
    if(!props){ return }
    Object.keys(props).forEach(function(field) {
      var item = props[field];
      if(item['example']){
        // This is a raw field
        output[field] = item['example'];
      }else if(item['properties']){
        // This is an expanded object / schema and should recusively explore it
        output[field] = {};
        // Recurses. Loops through all child props.
        extractProperties(item, output[field]);
      }else if(item['items']){
        var innerObj = {};
        output[field] = [innerObj];
        // Resurses into arrays. Builds a single-item array with the schema of the "ref'd" type
        extractProperties(item['items'], innerObj);
      }
    });
  }
  
  // Appends any `Field` with `example` set.
  // Recursively explores all `properties` if a `field` happens to also be a `schema`
  extractProperties(baseSchema, myOutput);
  
  return myOutput;
}