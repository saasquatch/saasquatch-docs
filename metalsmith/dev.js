// To turn on debug logging
// process.env.DEBUG='*,-metalsmith-collections,-metalsmith-templates';

var debug = require('debug')('saasquatch-docs');

debug('Loading modules');

var site = require('./site.js');

console.log("DEV Running metal...");

var myPort = process.env.PORT || 8080;
var myIp = process.env.IP || '0.0.0.0';

/*
* Runs the Metalsmith server in development mode.
* 
* `metalsmith-watch` will autoload any changed files
*/
debug('Firing off build');
site()
.clean(false)
// .use(serve({
//   port: myPort,
//   host: myIp,
//   verbose: true
// }))
// .use(watch({
//   paths: {
//         "**/*": true,
//         "templates/**/*": "**/*.md",
//       },
//   livereload: false
// }))
.build(function(err, files) {
  if (err){
    console.error("Build error", err);
  }

  console.log("Metalsmith build done!", Object.keys(files).length, "files processed");
});