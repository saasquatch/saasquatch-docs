/*
 *
 *   Inspired by: https://github.com/contentful-labs/contentful-metalsmith and https://github.com/carrot/roots-contentful
 *
 */

const contentful = require('contentful');
const path = require('path');

const contentfulpagifier = require('../utils/contentfulpagifier');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to create pages from Contentful drafts
 *
 * @param {Object} opts
 * @return {Function}
 */

function plugin(opts) {

  return function(files, metalsmith, done) {
    var client = contentful.createClient({
      space: opts.spaceId,
      accessToken: opts.accessKey,
      host: 'preview.contentful.com'
    });
    
    var entryId = opts.entryId;
    client.getEntry(entryId)
    .then((entry) => {
      let file = contentfulpagifier(entry, false);
      file.slug = 'preview/' + file.id;// Overrides the Preview ID;
      if(file.id != entryId){
        done(new Error("Pageification of preview artile ID failed..."));
      }
      let out = path.join('preview', file.id + ".md");
      // console.log(file);
      files[out]=file;
      done();
    })
    .catch((err)=>{
      done(err);
    });
  };
}