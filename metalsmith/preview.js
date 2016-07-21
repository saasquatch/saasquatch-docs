console.log("Loading deps...");

var express = require('express');
var site = require('./site.js');

console.log("Running metal...");

var myPort = process.env.PORT || 8080;
// var myIp = process.env.IP || '0.0.0.0';


process.env.ROBOTS = "false"; 

// process.env.GOOGLE_SITE_ID = "ynZGJlNk33o1bpcfo2rLxaty1CgbwBt1SOLVtBtOdn4";
// process.env.GCSE_CX = "014638356218796023717:iajbhojb63w";
// process.env.GCSE_KEY  = "AIzaSyAOxNZQO2zvNFv98_HImD1BruDfITNEOFo";

process.env.ROLLBAR_ID = "none";
process.env.PINGDOM_ID = "none";
process.env.ANALYTICSJS_ID = "none";
process.env.GA_ACCOUNT = "none";
process.env.GA_PREFIX = "/docs/";
process.env.TYPEKIT_ID = "none";
        
const THIRTY_SECONDS = 30*1000;

var lastBuild = 0;
var metalsmithCompile = function (req, res, next) {
    
    if(Date.now() > (lastBuild + THIRTY_SECONDS)){
        console.log('Rebuilding the docs from scratch....');
        // More than 30 seconds since last build.        
        site()
        .clean(false) // Prevent deleting `assets` folder
        .build(function(err) {
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

var app = express();
app.use(metalsmithCompile, express.static('build'));
app.listen(myPort);

console.log("Preview server running. Refreshes the build every 30 seconds....");