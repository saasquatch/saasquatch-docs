const debug = require('debug')('pageify-plugin');
import path from 'path';

/**
 * Expose `plugin`.
 */
export default plugin;

/**
 * Metalsmith plugin that turns metadata into a list of pages.
 * 
 */
function plugin(options) {


    const metaname = options.metaname;
    const pagifierFn = options.pagifier;
    
    return function(files, metalsmith, done) {
        var numProcessed =0, numIgnored =0;
        
        var data = metalsmith.metadata()[metaname];
        if(!data) throw new Error("Needed Contentful data loaded to do pagination but we got none from metaname " + metaname);
        
        // JSON raw output
        var jsonfile = {
            contents: JSON.stringify(data)
        };
        files[metaname+'-processed.json'] = jsonfile;
        
        debug("Iterating entries from metaname", metaname, Object.keys(data).length);
        for(var i in data) {
            var entry = data[i];
            debug("Processing entry: %s", entry.sys.id);
            
            let file = pagifierFn(entry);
            
            if(file){
                var out = path.join(metaname, file.id + ".md");
                files[out] = file;
                numProcessed++;
            }else{
                numIgnored++;
            }
        }
        debug("Done pagifying", numProcessed, "pages created from", metaname, data.length, "total contentful entries.", numIgnored, "entired ignored.");
        done();
    };
}
