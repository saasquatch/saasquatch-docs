var debug = require('debug')('saasquatch-docs');

import site from './site.js';

function prod(callback){
  debug("Building metal...");
  /**
   * Does a production build of Metalsmith. Output static files into the `build` folder.
   */
  site()
  .clean(false) // Prevents deleting `assets` folder. Any clean-build stuff should be managed externally, e.g. in Gulp
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

export default prod;