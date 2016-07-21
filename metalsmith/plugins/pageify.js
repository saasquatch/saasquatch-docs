var path = require('path');
var debug = require('debug')('pageify-plugin');

/**
 * Expose `plugin`.
 */

module.exports = plugin;


var sectionTypeMap = {
    "Developer Guide": "guide",
    "Marketer Guide": "successArticle"
};

/**
 * Metalsmith plugin that turns metadata into a list of pages.
 * 
 */

function plugin(options) {

    return function(files, metalsmith, done) {
        var numFaq =0, numArticles =0, numIgnored =0;
        
        var data = metalsmith.metadata()['contentful'];

        // JSON raw output
        var jsonfile = {
            contents: JSON.stringify(data)
        };
        files['contentful-entries.json'] = jsonfile;

        debug("Iterating entries", Object.keys(data).length);
        for(var i in data) {
            var out, file;
            var entry = data[i];
            debug("Processing entry: %s", entry.sys.id);
            if ("article" == entry.sys.contentType.sys.id) {
                var contentfulSection = entry.fields.sectionType['en-US'];
                file = {
                    title: entry.fields.title['en-US'],
                    highlights: entry.fields.highlights['en-US'],
                    contents: entry.fields.content['en-US'],
                    slug: entry.fields.slug['en-US'],
                    
                    fields: entry.fields,
                    id: entry.sys.id,
                    sectionType: sectionTypeMap[contentfulSection],
                    template: "hasTableOfContents.html"
                };
                numArticles++;
            }else if("faqCategory" == entry.sys.contentType.sys.id){
                file = {
                    title: entry.fields.name['en-US'] + " FAQ",
                    slug: entry.fields.slug['en-US'],
                    contents: "", // Required because some plugins depend on it being non-null
                    
                    fields: entry.fields,
                    id: entry.sys.id,
                    
                    template: "faqCategory.html",
                    sectionType: "faq"
                };
                numFaq++;
            }else{
                file = null;
                numIgnored++;
            }
            
            if(file){
                out = path.join('contentful', file.id + ".md");
                files[out] = file;
            }

        }
        debug("Done pagifying", numArticles, "articles and", numFaq, "faq articles from", data.length, "total contentful entries.", numIgnored, "entired ignored.");
        done();
    };
}