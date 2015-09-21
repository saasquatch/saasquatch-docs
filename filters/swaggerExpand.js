var extend = require('extend');
var _ = require('lodash');


var $each = function(obj,callback) {
  if(!obj || typeof obj !== "object") return;
  var i;
  if(Array.isArray(obj) || (typeof obj.length === 'number' && obj.length > 0 && (obj.length - 1) in obj)) {
    for(i=0; i<obj.length; i++) {
      if(callback(i,obj[i])===false) return;
    }
  }
  else {
    for(i in obj) {
      if(!obj.hasOwnProperty(i)) continue;
      if(callback(i,obj[i])===false) return;
    }
  }
};


module.exports = {
  expandProperties: function(schema){
    var self = this;
    return _.transform(schema, function(result, val, key) {
      console.log(key);
      result[key] = self.expandSchema(val);
    });
  },
  expandRefs: function(schema) {
    schema = extend({},schema);
    
    while (schema.$ref) {
      var ref = schema.$ref;
      delete schema.$ref;
      
      if(!this.refs[ref]) ref = decodeURIComponent(ref);
      
      schema = this.extendSchemas(schema,this.refs[ref]);
    }
    return schema;
  },
  expandSchema: function(schema) {
    var self = this;
    var extended = extend({},schema);
    var i;

    // Version 4 `anyOf`
    if(schema.anyOf) {
      $each(schema.anyOf, function(key,value) {
        schema.anyOf[key] = self.expandSchema(value);
      });
    }
    // Version 4 `dependencies` (schema dependencies)
    if(schema.dependencies) {
      $each(schema.dependencies,function(key,value) {
        if(typeof value === "object" && !(Array.isArray(value))) {
          schema.dependencies[key] = self.expandSchema(value);
        }
      });
    }
    // Version 4 `not`
    if(schema.not) {
      schema.not = this.expandSchema(schema.not);
    }
    
    // allOf schemas should be merged into the parent
    if(schema.allOf) {
      for(i=0; i<schema.allOf.length; i++) {
        extended = this.extendSchemas(extended,this.expandSchema(schema.allOf[i]));
      }
      delete extended.allOf;
    }
    // parent should be merged into oneOf schemas
    if(schema.oneOf) {
      var tmp = extend({},extended);
      delete tmp.oneOf;
      for(i=0; i<schema.oneOf.length; i++) {
        extended.oneOf[i] = this.extendSchemas(this.expandSchema(schema.oneOf[i]),tmp);
      }
    }
    
    return this.expandRefs(extended);
  },
  extendSchemas: function(obj1, obj2) {
    obj1 = extend({},obj1);
    obj2 = extend({},obj2);

    var self = this;
    var extended = {};
    $each(obj1, function(prop,val) {
      // If this key is also defined in obj2, merge them
      if(typeof obj2[prop] !== "undefined") {
        // Required arrays should be unioned together
        if(prop === 'required' && typeof val === "object" && Array.isArray(val)) {
          // Union arrays and unique
          extended.required = val.concat(obj2[prop]).reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
          }, []);
        }
        // Type should be intersected and is either an array or string
        else if(prop === 'type' && (typeof val === "string" || Array.isArray(val))) {
          // Make sure we're dealing with arrays
          if(typeof val === "string") val = [val];
          if(typeof obj2.type === "string") obj2.type = [obj2.type];


          extended.type = val.filter(function(n) {
            return obj2.type.indexOf(n) !== -1;
          });

          // If there's only 1 type and it's a primitive, use a string instead of array
          if(extended.type.length === 1 && typeof extended.type[0] === "string") {
            extended.type = extended.type[0];
          }
        }
        // All other arrays should be intersected (enum, etc.)
        else if(typeof val === "object" && Array.isArray(val)){
          extended[prop] = val.filter(function(n) {
            return obj2[prop].indexOf(n) !== -1;
          });
        }
        // Objects should be recursively merged
        else if(typeof val === "object" && val !== null) {
          extended[prop] = self.extendSchemas(val,obj2[prop]);
        }
        // Otherwise, use the first value
        else {
          extended[prop] = val;
        }
      }
      // Otherwise, just use the one in obj1
      else {
        extended[prop] = val;
      }
    });
    // Properties in obj2 that aren't in obj1
    $each(obj2, function(prop,val) {
      if(typeof obj1[prop] === "undefined") {
        extended[prop] = val;
      }
    });

    return extended;
  }
};
