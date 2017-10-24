var debug = require('debug')('saasquatch-docs');

import Metalsmith from 'metalsmith';
import markdown from 'metalsmith-markdown';
import templates from 'metalsmith-templates';
import collections from 'metalsmith-collections';
import define from 'metalsmith-define';

import path from 'path';

import swig from 'swig';

// var extras = require('swig-extras');

import permalinks from './plugins/rawpaths.js';

import swagger from './plugins/swagger.js';
import metadata from './plugins/metadata.js';
import contentful from './plugins/contentful.js';
import pageify from './plugins/pageify.js';
import categoryManager from './plugins/categoryManager.js';

// var dumplog = require('./plugins/dumplog.js');
//import squatchjsAutoInclude from './plugins/squatchjsAutoInclude.js';

import exampleSwaggerSchemaFilter from './filters/exampleSwaggerSchemaFilter.js';
import mardownFilter from './filters/markdown.js';
import slugFilter from './filters/slug.js';
import tocFilter from './filters/tableOfContents.js';


import contentfulpagifier from './utils/contentfulpagifier';
import productpagifiger from './utils/productSpaceContentfulpagifier';



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
function site(baseplugin=null){

  debug("Bootstrapping the Docs build process using Metalsmith");

  // Does this approach work here? Yes it does. http://quabr.com/26160954/set-swig-options-with-consolidate
  // extras.useFilter(swig, 'markdown');
  swig.setFilter('markdown', mardownFilter);
  swig.setFilter('slug', slugFilter);
  swig.setFilter('exampleSwaggerSchema', exampleSwaggerSchemaFilter);
  swig.setFilter('tableOfContents', tocFilter);

  const baseMetadata = {
    "robots": process.env.ROBOTS || "true",
    "jsTrackers":  process.env.JSTRACKERS || "true",
    "googleSiteId": process.env.GOOGLE_SITE_ID || "240GodHWd0rPOGqZxZo3-fDym0MeTAYYHSnkwZV9xSE",
    "windowDotEnv": {
      // Google Custom Search (GCSE) params
      "GCSE_CX": process.env.GCSE_CX || "012261857935385488279:90grrsobq40",
      "GCSE_KEY": process.env.GCSE_KEY || "AIzaSyC3Lc2HenETRKNS3VIsHAMobTYhnKYG6dE",
      "ROLLBAR_TOKEN": process.env.ROLLBAR_TOKEN || "a865008ca04947acb3d0a1c719e2d93c",
      "PINGDOM_ID": process.env.PINGDOM_ID || "52c61993abe53d650f000000",
      "GTMID": process.env.GTMID || "GTM-PK98FJF"
    }
  };
  
  const ms = Metalsmith(path.resolve(__dirname, "../"));

  if(baseplugin){
    if(baseplugin instanceof Array){
      baseplugin.map((plug)=>ms.use(plug));
    }else{
      ms.use(baseplugin);
    }
    debug("Using base plugin");
  }

  ms
  /*
   *  Build up all the metadata
   */
  .use(define(baseMetadata))
  .use(contentful({
      accessKey: "ae31ffc9de0831d887cff9aa3c72d861c323bd09de2a4cafd763c205393976c9",
      spaceId: "s68ib1kj8k5n"
  }))
  .use(contentful({
      accessKey: "19e2e0a24e24723b36d87e68bf856453a9f136f104c0df0ad2d0376dcf617464",
      spaceId: "1th1ybv0b2n4",
      metaname: "contentfulProduct"
  }))
  .use(swagger({
      path: "saasquatch-api.yaml"
    }))
  .use(metadata({
      shorttags: 'metadata/shorttags.yaml',
      shorttagsMap: 'metadata/shorttagmap.json',
      branchFields: 'metadata/branchFields.yaml',
      //integrations: 'metadata/integrations.yaml',
      guides: 'metadata/guides.yaml',
      themeGallery: 'metadata/themeGallery.yaml',
      productNews: 'metadata/productNews.yaml',
      }))

  /*
  * Automatic page generation
  */
  .use(pageify({
    metaname: "contentful",
    pagifier: contentfulpagifier
  }))
  .use(pageify({
    metaname: "contentfulProduct",
    pagifier: productpagifiger
  }))
    
  
  //.use(squatchjsAutoInclude())

  /*
  * Page grouping and whatnot
  */
  .use(categoryManager())
  .use(collections({
    "issues": {
      pattern: 'issues/rs*.*',
      sortBy: 'title',
      metadata:{
        name: 'Issues List',
      }
    },
    "integrationsList": {
      pattern: 'integrations/*-integration.*',
      sortBy: 'title',
      metadata:{
        name: 'Integration List',
      }
    }
  }))

  /**
   *    Formats contents and urls
   */
  .use(markdown())
  .use(permalinks())
  .use(templates({
          engine: "swig",
          directory: 'templates'
      }));

  debug("Finished bootstrapping the Docs build process using Metalsmith");

  return ms;
}

export default site;
