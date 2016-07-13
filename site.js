var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var define = require('metalsmith-define');
var less = require('metalsmith-less');
var request = require('metalsmith-request');

var swig = require('swig');
var extras = require('swig-extras');

var permalinks = require('./plugins/rawpaths.js');
var swagger = require('./plugins/swagger.js');
var metadata = require('./plugins/metadata.js');
var contentful = require('./plugins/contentful.js');
var pageify = require('./plugins/pageify.js');
var categoryManager = require('./plugins/categoryManager.js');

var exampleSwaggerSchemaFilter = require('./filters/exampleSwaggerSchemaFilter.js');
var expandSwaggerSchemaFilter = require('./filters/expandSwaggerSchemaFilter.js');
var mardownFilter = require('./filters/markdown.js');
var slugFilter = require('./filters/slug.js');
var tocFilter = require('./filters/tableOfContents.js');

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
  // extras.useFilter(swig, 'markdown');
  swig.setFilter('markdown', mardownFilter);
  swig.setFilter('slug', slugFilter);
  swig.setFilter('exampleSwaggerSchema', exampleSwaggerSchemaFilter);
  swig.setFilter('expandSwaggerSchemaFilter', expandSwaggerSchemaFilter);
  swig.setFilter('tableOfContents', tocFilter);

  var ms = Metalsmith(__dirname)
  .use(define({
      "robots": process.env.ROBOTS || "true"
  }))
  .use(swagger({
      path: "saasquatch-api.yaml"
    }))
  .use(contentful({
    accessKey: "ae31ffc9de0831d887cff9aa3c72d861c323bd09de2a4cafd763c205393976c9",
    spaceId: "s68ib1kj8k5n"
  }))
  .use(pageify())
  
  .use(categoryManager())
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
      shorttagsMap: 'metadata/shorttagmap.json',
      branchFields: 'metadata/branchFields.yaml',
      integrations: 'metadata/integrations.yaml',
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
