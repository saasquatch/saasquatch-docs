const debug = require('debug')('pageify-plugin');
const path = require('path');

const contentfulpagifier = require('../utils/contentfulpagifier');

/**
 * Expose `plugin`.
 */
module.exports = plugin;

/**
 * Metalsmith plugin that turns metadata into a list of pages.
 * 
 */

function plugin(options) {

    return function(files, metalsmith, done) {
        var numProcessed =0, numIgnored =0;
        
        var data = metalsmith.metadata()['contentful'];

        // JSON raw output
        var jsonfile = {
            contents: JSON.stringify(data)
        };
        files['contentful-processed.json'] = jsonfile;

        debug("Iterating entries", Object.keys(data).length);
        for(var i in data) {
            var entry = data[i];
            debug("Processing entry: %s", entry.sys.id);
            
            let file = contentfulpagifier(entry);
            
            if(file){
                var out = path.join('contentful', file.id + ".md");
                files[out] = file;
                numProcessed++;
            }else{
                numIgnored++;
            }
        }
        debug("Done pagifying", numProcessed, "pages created from", data.length, "total contentful entries.", numIgnored, "entired ignored.");
        done();
    };
}
