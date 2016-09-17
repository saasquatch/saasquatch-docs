var _ = require('lodash');
var resolveI18n = require('./resolveI18n');

module.exports = pageify;

var sectionTypeMap = {
    "Developer Guide": "guide",
    "Marketer Guide": "successArticle"
};

/**
 *  Pageifies a single Contentful entry
 */
function pageify(entryRaw, i18n){
    let file;

    let entry = resolveI18n(entryRaw);
    let fields = entry.fields;
    
    if ("article" == entry.sys.contentType.sys.id) {
        var contentfulSection = fields.sectionType;
        var metalsmithSection = sectionTypeMap[contentfulSection];
        if(!metalsmithSection){
            throw new Error(`Missing or undefined section type. ${JSON.stringify(contentfulSection)} mapped to ${metalsmithSection}`);
        }
        file = {
            title: fields.title,
            highlights: fields.highlights,
            contents: fields.content,
            slug: fields.slug,
             
            fields: fields,
            id: entry.sys.id,
            sectionType: metalsmithSection,
            template: "hasTableOfContents.html"
        };
        if(fields.coverImage){
            let coverFields = resolveI18n(fields.coverImage.fields);
            file.coverImage = {
                url: coverFields.file.url,
                name: coverFields.title
            };
        }
    }else if("faqCategory" == entry.sys.contentType.sys.id){
        file = {
            title: fields.name + " FAQ",
            slug: fields.slug,
            contents: "", // Required because some plugins depend on it being non-null
            
            fields: fields,
            id: entry.sys.id,
            
            template: "faqCategory.html",
            sectionType: "faq"
        };
    }else{
        file = null;
    }
    
    return file;
}