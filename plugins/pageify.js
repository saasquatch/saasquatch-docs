var path = require('path');
var join = path.join;

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

        var data = metalsmith.metadata()['contentful'];

        // JSON raw output
        var jsonfile = {
            contents: JSON.stringify(data)
        };
        files['contentful-entries.json'] = jsonfile;

        console.log("Iterating entries", data);
        for(var i in data) {
            var entry = data[i];
            if ("article" == entry.sys.contentType.sys.id) {
                var file = {
                    title: entry.fields.title['en-US'],
                    highlights: entry.fields.highlights['en-US'],
                    contents: entry.fields.content['en-US'],
                    slug: entry.fields.slug['en-US'],
                    
                    fields: entry.fields,
                    id: entry.sys.id,
                    
                    template: "guides.html"
                };

                var path = entry.fields.slug['en-US'];
                var out = join(path, 'index.md');
                files[out] = file;
                console.log("Pagified", out);
            }else{
                console.log("Ignored", entry.sys.id);
            }
        }

        done();

    };
}