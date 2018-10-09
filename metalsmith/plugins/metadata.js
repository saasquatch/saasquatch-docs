/*
*
*   Forked from: https://github.com/segmentio/metalsmith-metadata
*
*/

import {extname, } from 'path';

import yaml from 'js-yaml';

/**
 * Expose `plugin`.
 */

export default plugin;

/**
 * Supported metadata parsers.
 */

var parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad
};

/**
 * Metalsmith plugin to hide drafts from the output.
 *
 * @param {Object} opts
 * @return {Function}
 */

function plugin(opts){
  opts = opts || {};
  return function(files, metalsmith, done){
    var hasErrors = false;
    var metadata = metalsmith.metadata();
    var exts = Object.keys(parsers);

    for (var key in opts) {
      var file = opts[key];
      var ext = extname(file);
      if (!~exts.indexOf(ext)){
        console.error('unsupported metadata type "' + ext + '"', file);
        hasErrors = true;
        continue;
      }
      
      if (!files[file]){
        console.error('file "' + file + '" not found');
        hasErrors = true;
        continue;
      }
      
      var parse = parsers[ext];
      var str = files[file].contents.toString();
      delete files[file];

      try {
        var data = parse(str);
      } catch (e) {
        console.error('malformed data in "' + file + '"');
        hasErrors = true;
        continue;
      }

      metadata[key] = data;
    }

    if(hasErrors){
      done(new Error("One or several bad files!"))
    }else{
      done();
    }
  };
}