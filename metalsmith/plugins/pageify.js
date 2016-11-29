const debug = require('debug')('pageify-plugin');
import path from 'path';
import contentfulpagifier from '../utils/contentfulpagifier';

/**
 * Expose `plugin`.
 */
export default plugin;

/**
 * Metalsmith plugin that turns metadata into a list of pages.
 * 
 */
function plugin(options) {

    return function(files, metalsmith, done) {
        var numProcessed =0, numIgnored =0;
        
        var data = metalsmith.metadata()['contentful'];
        if(!data) throw new Error("Needed Contentful data loaded to do pagination but we got none.");
        
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
