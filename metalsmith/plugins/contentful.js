/*
 *
 *   Inspired by: https://github.com/contentful-labs/contentful-metalsmith and https://github.com/carrot/roots-contentful
 *
 */

const contentful = require('contentful');


/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to hide drafts from the output.
 *
 * @param {Object} opts
 * @return {Function}
 */

function plugin(opts) {
  opts = opts || {};

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    // console.log("createContentfulClient...");
    var client = createContentfulClient(opts.accessKey, opts.spaceId);
    // console.log("createContentfulClient...done");
    client.sync({initial: true})
    .then(function(response){
      metadata['contentful'] = response.entries;
      // console.log("contentful content", response);
      done();
    },function(error){
      // console.log("error", error);
      done(error);
    });
  // console.log("contentful Bootstrapped");
  };
}


function createContentfulClient(accessToken, spaceId) {
  return contentful.createClient({
    space: spaceId,
    accessToken: accessToken
  });
}