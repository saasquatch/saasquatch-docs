import debugBuilder from 'debug';

/**
 * Expose `plugin`.
 */

export default plugin;

/**
 * Metalsmith plugin to hide drafts from the output.
 *
 * @param {Object} opts
 * @return {Function}
 */

function plugin(name) {
  var debug = debugBuilder(name);
  return function(files, metalsmith, done) {
      debug("Started processing", Object.keys(files).length, "files");
      done();
  };
}