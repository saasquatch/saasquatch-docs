var debug = require('debug')('saasquatch-docs');

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var define = require('metalsmith-define');
var request = require('metalsmith-request');
var path = require('path');

var swig = require('swig');
var extras = require('swig-extras');

var permalinks = require('./plugins/rawpaths.js');
var swagger = require('./plugins/swagger.js');
var metadata = require('./plugins/metadata.js');
var pageify = require('./plugins/pageify.js');
var categoryManager = require('./plugins/categoryManager.js');
var dumplog = require('./plugins/dumplog.js');


var exampleSwaggerSchemaFilter = require('./filters/exampleSwaggerSchemaFilter.js');
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
function site(baseplugin){

  debug("Bootstrapping the Docs build process using Metalsmith");

  // Does this approach work here? Yes it does. http://quabr.com/26160954/set-swig-options-with-consolidate
  // extras.useFilter(swig, 'markdown');
  swig.setFilter('markdown', mardownFilter);
  swig.setFilter('slug', slugFilter);
  swig.setFilter('exampleSwaggerSchema', exampleSwaggerSchemaFilter);
  swig.setFilter('tableOfContents', tocFilter);
  
  var baseMetadata = {
    "robots": process.env.ROBOTS || "true",
    "jsTrackers":  process.env.JSTRACKERS || "true",
    "useTypekit":  (process.env.TYPEKIT_ID != "none"),
    "googleSiteId": process.env.GOOGLE_SITE_ID || "240GodHWd0rPOGqZxZo3-fDym0MeTAYYHSnkwZV9xSE",
    "windowDotEnv": {
      // Google Custom Search (GCSE) params
      "GCSE_CX": process.env.GCSE_CX || "012261857935385488279:zvjz-tcsjnm",
      "GCSE_KEY": process.env.GCSE_KEY || "AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU",
      "ROLLBAR_ID": process.env.ROLLBAR_ID || "c8fd34f79430479a98f49007397a11db",
      "PINGDOM_ID": process.env.PINGDOM_ID || "52c61993abe53d650f000000",
      "ANALYTICSJS_ID": process.env.ANALYTICSJS_ID || "kjj37zev7u",
      "GA_ACCOUNT": process.env.GA_ACCOUNT || "UA-39831433-1",
      "GA_PREFIX": process.env.GA_PREFIX || "/docs/",
      "TYPEKIT_ID": process.env.TYPEKIT_ID || "hqf0oje"
    }
  };
  
  var ms = Metalsmith(path.resolve(__dirname, "../"));

  if(baseplugin){
    ms = ms.use(baseplugin);
    debug("Using base plugin");
  }
  /**
   *  Build up all the metadata
   */
  ms = ms.use(define(baseMetadata))
  .use(swagger({
      path: "saasquatch-api.yaml"
    }))
  .use(dumplog('pageify'))
  .use(pageify())
  .use(dumplog('categoryManager'))
  .use(categoryManager())
  .use(dumplog('collections'))
  .use(collections({
    "issues": {
      pattern: 'issues/rs*.*',
      sortBy: 'title',
      metadata:{
        name: 'Issues List',
      }
    } 
  }))
  .use(dumplog('metadata'))
  .use(metadata({
      shorttags: 'metadata/shorttags.yaml',
      shorttagsMap: 'metadata/shorttagmap.json',
      branchFields: 'metadata/branchFields.yaml',
      integrations: 'metadata/integrations.yaml',
      }))

  /**
   *    Formats contents and urls
   */
  .use(dumplog('markdown'))
  .use(markdown())
  .use(dumplog('permalinks'))
  .use(permalinks())
  .use(dumplog('templates'))
  .use(templates({
          engine: "swig",
          directory: 'templates'
      }));

  debug("Finished bootstrapping the Docs build process using Metalsmith");

  return ms;
}
