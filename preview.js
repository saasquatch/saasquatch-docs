console.log("Loading deps...");

var express = require('express');
var site = require('./site.js');

console.log("Running metal...");

var myPort = process.env.PORT || 8080;
var myIp = process.env.IP || '0.0.0.0';


var app = express();

const THIRTY_SECONDS = 30*1000;
var lastBuild = 0;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

var metalsmithCompile = function (req, res, next) {
    
    if(Date.now() > (lastBuild + THIRTY_SECONDS)){
        console.log('Rebuilding from Scratch....');
        // More than 30 seconds since last build.        
        site().build(function(err) {
          if (err){
            console.error("Build error", err);
            throw err;
          }
          lastBuild = Date.now();
          next();
        });
    }else{
        next();
    }
};

app.use(metalsmithCompile, express.static('build'));

app.listen(myPort);

console.log("Server running.");

console.log("NOTE: Only hot-reloads files in `/src`! Any changes to files in `/templates` or `site.js` require a restart");