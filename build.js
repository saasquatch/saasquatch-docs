console.log("Loading deps...");

var site = require('./site.js');

console.log("Building metal...");

/**
 * Does a production build of Metalsmith. Output static files into the `build` folder.
 */
site().build(function(err) {
  if (err){
    console.error("Build error", err);
    throw err;
  }
});

console.log("Finished. Static site content can now be found in the `/build` folder.");