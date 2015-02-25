var extname = require('path').extname;
var parser = require("swagger-parser");
var yaml = require('js-yaml');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

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
    if (!files[file]) return done(new Error('file "' + file + '" not found'));
    
    var parse = parsers[ext];
    var str = files[file].contents.toString();

    // Different than `metalsmith-metadata` (we want to leave our lovely JSON files for future donwloadability)
    // delete files[file]; 
    
    try {
        var data = parse(str);
    } catch (e) {
        return done(new Error('malformed data in "' + file + '"'));
    }

    parser.parse(data, function(err, api, swaggerMetaD) {
        if(err){
            return done(new Error("Swagger parsing error: " + err.message, err));
        }
    
        metadata['swagger'] = api;
    
        done();
    });

  };
}