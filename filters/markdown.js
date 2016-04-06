var marked = require('marked');

/**
 * Convert a variable's contents from Markdown to HTML.
 *
 * @example
 * {{ foo|markdown }}
 * // => <h1>Markdown</h1>
 *
 * @param  {string} input
 * @return {string}       HTML
 */
module.exports = function (input) {
  return marked(input);
};

module.exports.safe = true;