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
        var path, out;
        for(var i in data) {
            var entry = data[i];
            console.log("Processing...", entry.sys.id);
            if ("article" == entry.sys.contentType.sys.id) {
                var article = {
                    title: entry.fields.title['en-US'],
                    highlights: entry.fields.highlights['en-US'],
                    contents: entry.fields.content['en-US'],
                    slug: entry.fields.slug['en-US'],
                    
                    fields: entry.fields,
                    id: entry.sys.id,
                    
                    template: "hasTableOfContents.html",
                    sectionType: "successArticle"
                };

                path = entry.fields.slug['en-US'];
                out = join(path, 'index.md');
                files[out] = article;
                console.log("Pagified", out);
            }else if("faqCategory" == entry.sys.contentType.sys.id){
                var faqCategory = {
                    title: entry.fields.name['en-US'] + " FAQ",
                    slug: entry.fields.slug['en-US'],
                    contents: "", // Required because some plugins depend on it
                    
                    fields: entry.fields,
                    id: entry.sys.id,
                    
                    template: "faqCategory.html",
                    sectionType: "faq"
                };

                path = entry.fields.slug['en-US'];
                out = join(path, 'index.md');
                files[out] = faqCategory;
                console.log("Pagified", out);
            }else{
                console.log("Ignored", entry.sys.id);
            }
        }
        
        console.log("Done pagification");
        done();

    };
}