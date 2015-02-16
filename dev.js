console.log("Loading deps...");

var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

var site = require('./site.js');

console.log("Running metal...");

var myPort = process.env.PORT || 8080;
var myIp = process.env.IP || '0.0.0.0';

/*
* Runs the Metalsmith server in development mode.
* 
* `metalsmith-watch` will autoload any changed files
*/
site().use(serve({
  port: myPort,
  host: myIp,
  verbose: true
}))
.use(watch({
  pattern : '**/*',
  livereload: false
}))
.build(function(err) {
  if (err){
    console.error("Build error", err);
  }
});

console.log("Server running.");

console.log("NOTE: Only hot-reloads files in `/src`! Any changes to files in `/templates` or `site.js` require a restart");