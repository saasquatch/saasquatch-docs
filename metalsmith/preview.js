// To turn on debug logging
// process.env.DEBUG='*,-metalsmith-collections,-metalsmith-templates,-metalsmith-markdown';

const debug = require('debug')('saasquatch-docs');
debug('Loading modules');

const site = require('./site');
const contentfulPreview = require('./plugins/contentful-preview');
// const contentful = require('./plugins/contentful.js');
const metadata = require('./plugins/metadata.js');

function preview(id, callback){
  
  // process.env.GOOGLE_SITE_ID = "ynZGJlNk33o1bpcfo2rLxaty1CgbwBt1SOLVtBtOdn4";
  // process.env.GCSE_CX = "014638356218796023717:iajbhojb63w";
  // process.env.GCSE_KEY  = "AIzaSyAOxNZQO2zvNFv98_HImD1BruDfITNEOFo";
  
  process.env.ROBOTS = "false";
  process.env.JSTRACKERS = "false";

  process.env.ROLLBAR_ID = "none";
  process.env.PINGDOM_ID = "none";
  process.env.ANALYTICSJS_ID = "none";
  process.env.GA_ACCOUNT = "none";
  process.env.GA_PREFIX = "/docs/";
  process.env.TYPEKIT_ID = "none";
  
  const previewPlugin = contentfulPreview({
      entryId: id,
      accessKey: "ef474279b85a211b5967d81aa11f8f9674b48cd1af1e4350a27b136636be30c7",
      spaceId: "s68ib1kj8k5n"
  });
  
  const livePlugin = metadata({
        contentful: 'contentful.json'
  });
  
  // contentful({
  //     accessKey: "ae31ffc9de0831d887cff9aa3c72d861c323bd09de2a4cafd763c205393976c9",
  //     spaceId: "s68ib1kj8k5n"
  // });
  
  debug('Firing off build');
  site([
      livePlugin,
      previewPlugin
    ])
  .clean(false)
  .build(function(err, files) {
    if (err){
      debug("Build error", err);
      callback(err);
      return;
    }
    debug("Metalsmith build done!", Object.keys(files).length, "files processed");
    callback();
  });
}


module.exports = preview;