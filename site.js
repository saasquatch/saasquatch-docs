var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var metadata = require('metalsmith-metadata');
var define = require('metalsmith-define');
var less = require('metalsmith-less');
var request = require('metalsmith-request');

var swig = require('swig');
var extras = require('swig-extras');

var permalinks = require('./plugins/rawpaths.js');
var swagger = require('./plugins/swagger.js');
var exampleSwaggerSchemaFilter = require('./plugins/exampleSwaggerSchemaFilter.js');

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

  // Does this approach work here? Yes it does. http://quabr.com/26160954/set-swig-options-with-consolidate
  extras.useFilter(swig, 'markdown');
  swig.setFilter('exampleSwaggerSchema', exampleSwaggerSchemaFilter);

  var ms = Metalsmith(__dirname)
  .use(define({
      "robots": process.env.ROBOTS || "true"
  }))
  .use(swagger({
      path: "saasquatch-api.yaml"
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
  .use(metadata({
      shorttags: 'metadata/shorttags.yaml',
      shorttagsMap: 'metadata/shorttagmap.json'
      }))
  // TODO: Migrate to Prod dependency
  // .use(request({
  //     shorttagsMap: 'https://staging.referralsaasquatch.com/assets/javascripts/themeshorttags.json'
  //   }, 
  //   {
  //     json: true
  //   }
  //   ))
  .use(permalinks())
  .use(templates({
          engine: "swig",
          directory: 'templates'
      }))
  .use(less());

  return ms;
}
