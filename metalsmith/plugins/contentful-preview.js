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
        client.getEntries({
                'sys.id': entryId,
                locale: '*',
                resolveLinks: true
            })
            // .getEntry(entryId, {
            //     resolveLinks: true
            //   })
            .then((response) => {
                // console.log(response);
                let entries = response.items;
                for (var i in entries) {
                    var entry = entries[i];
                    // console.log(entry);
                    let file = contentfulpagifier(entry);
                    if(file){
                        file.slug = 'preview/' + file.id; // Overrides the Preview ID;
                        if (file.id != entryId) {
                            done(new Error("Pageification of preview artile ID failed..."));
                        }
                        let out = path.join('preview', entry.sys.id + ".md");
                        // console.log(file);
                        files[out] = file;
                    }
                }
                done();
            })
            .catch((err) => done(err));
    };
}