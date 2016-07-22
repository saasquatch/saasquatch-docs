var debug = require('debug')('saasquatch-docs');

var site = require('./site.js');
var contentful = require('./plugins/contentful.js');

function prod(callback){
  debug("Building metal...");
  var basePlugin = contentful({
      accessKey: "ae31ffc9de0831d887cff9aa3c72d861c323bd09de2a4cafd763c205393976c9",
      spaceId: "s68ib1kj8k5n"
  });
  /**
   * Does a production build of Metalsmith. Output static files into the `build` folder.
   */
  site(basePlugin)
  .clean(false) // Prevents deleting `assets` folder
  .build(function(err, files) {
    if (err){
      debug("Build error", err);
      callback(err);
      return;
    }
    debug("Metalsmith build done!", Object.keys(files).length, "files processed");
    callback();
  });
}

module.exports = prod;