console.log("Loading deps...");

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var serve = require('metalsmith-serve');
var define = require('metalsmith-define');
var less = require('metalsmith-less');
var watch = require('metalsmith-watch');

var permalinks = require('./plugins/rawpaths.js');

console.log("Building metal...");

Metalsmith(__dirname)
  .use(define({
      "robots": process.env.ROBOTS || false,
      "dotComCdn": "http://saasquatch.wpengine.netdna-cdn.com"
  }))
  .use(markdown())
  .use(collections({
    "issues": {
      pattern: 'issues/rs*.*',
      sortBy: 'title',
      metadata:{
        name: 'Issues List',
      }
    } 
  }))
  .use(permalinks())
  .use(templates({
          engine: "swig",
          directory: 'templates'
      }))
  .use(less())
  .build(function(err) {
    if (err){
      console.error("Build error", err);
      throw err;
    }
  });
  
console.log("Finished.");