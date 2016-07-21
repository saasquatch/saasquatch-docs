var debug = require('debug')('rawpaths-plugin');
var path = require('path');
// var slug = require('slug-component');
// var substitute = require('substitute');

var basename = path.basename;
var dirname = path.dirname;
var extname = path.extname;
var join = path.join;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin that renames files so that they're permalinked properly
 * for a static site, aka that `about.html` becomes `about/index.html`.
 *
 * @param {Object} options
 *   @property {String} pattern
 *   @property {String or Function} date
 * @return {Function}
 */

function plugin(options){
  options = normalize(options);

  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      if (!html(file)) return;
      var data = files[file];
      if (data['permalink'] === false) return;
      if (!data['slug']) return;
      
      var path = find(data, options) || resolve(file);
      
      // add to path data for use in links in templates
      data.path = '.' == path ? '' : path;

      var out = join(path, 'index.html');
      debug("Remmapped file: %s -> %s ",file, out);
      delete files[file];
      files[out] = data;
    });

  };
}

/**
 * Normalize an options argument.
 *
 * @param {String or Object} options
 * @return {Object}
 */

function normalize(options){
  if ('string' == typeof options) options = { pattern: options };
  options = options || {};
  options.relative = options.hasOwnProperty('relative') ? options.relative : true;
  return options;
}


/**
 * Resolve a permalink path string from an existing file `path`.
 *
 * @param {String} path
 * @return {String}
 */

function resolve(path){
  var ret = dirname(path);
  var base = basename(path, extname(path));
  if (base != 'index') ret = join(ret, base).replace('\\', '/');
  return ret;
}

/**
 * Finds path based upon a file's `data`.
 *
 * @param {Object} data
 * @param {Object} options
 * @return {String or Null}
 */

function find(data, options){
  return data.slug;
}


/**
 * Check whether a file is an HTML file.
 *
 * @param {String} path
 * @return {Boolean}
 */

function html(path){
  return /.html/.test(extname(path));
}