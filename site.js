var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var define = require('metalsmith-define');
var less = require('metalsmith-less');

var permalinks = require('./plugins/rawpaths.js');

module.exports = site;

/**
 * SaaSquatch-Docs MetalSmith site
 * 
 * This script:
 * 
 *  - Set basic configuration options
 *  - Scaffolds the metalsmith plugins together
 *  - Remember to add plugins to `package.json` so `NPM` can find them, then `require` them here
 * 
 * Doesn't actually build the site. There's a different dev build and production build, but
 * both dev mode and production build use this as the basic building block
 * 
 * @author loganv
 */
function site(){

  var ms = Metalsmith(__dirname)
  .use(define({
      "robots": process.env.ROBOTS || "true",
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
  .use(less());

  return ms;
}
