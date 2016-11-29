import {extname} from 'path';
import parser from "swagger-parser";
import yaml from 'js-yaml';
import resolveAllOf from 'json-schema-resolve-allof';

import * as swaggerUtils from '../utils/swaggerUtils';

/**
 * Expose `plugin`.
 */

export default plugin;

var parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad
};

/**
 * Metalsmith plugin to process Swagger.io files and add them as dereferenced output
 *
 * @param {Object} opts
 * @return {Function}
 */

function plugin(opts){
  opts = opts || {};

  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();
    var exts = Object.keys(parsers);

    var file = opts.path;
    var ext = extname(file);
    if (!~exts.indexOf(ext)) return done(new Error('unsupported metadata type "' + ext + '"'));
    
    if (!files[file]){
      // TODO: Fix or replace metalsmith-watch. It doesn't live-reload all files, and doesn't cache our Swagger.yaml contents
      //return done(new Error('file "' + file + '" not found'));
      console.error('file "' + file + '" not found');
      return done();
    }
    
    var parse = parsers[ext];
    var str = files[file].contents.toString();

    // Different than `metalsmith-metadata` (we want to leave our lovely JSON files for future donwloadability)
    // delete files[file]; 
    
    try {
        var data = parse(str);
    } catch (e) {
        return done(new Error('Swagger parse error in "' + file + '":' + e.name + e.message));
    }

    if(!swaggerUtils || !swaggerUtils['methodsByTag']){
      throw new Error('Failed to import SwaggerUtils');
    }
    parser
    .dereference(data)
    .then(function(spec) {
      return resolveAllOf(spec);
    })
    .then((spec) => {
        metadata['swagger'] = spec;
        metadata['methodsByTag'] = swaggerUtils.methodsByTag(spec);
        metadata['tagMap'] = swaggerUtils.tagMap(spec);
        done();
    })
    .catch( (err) => done(new Error("Swagger parsing error: " + err.message, err)));
  };
}