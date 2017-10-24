import markdownToc from 'markdown-toc';
import resolveI18n from './resolveI18n';
export default pageify;

/**
 *  Pageifies a single Contentful entry
 */
function pageify(entryRaw, i18n){
    let file;

    let entry = resolveI18n(entryRaw);
    let fields = entry.fields;
    
    if ("programTemplate" == entry.sys.contentType.sys.id) {
        
        
        if(!fields.globallyInstallable){
            // Don't show docs for non-globally installable things
            return null;
        }

        file = {
            title: fields.name,
            highlights: fields.summary,
            contents: fields.longDescription,
            markdownToc: markdownToc(fields.longDescription),
            tags: fields.tags,
            slug: "marketplace/program/" + fields.slug,
             
            fields: fields,
            id: entry.sys.id,
            sectionType: "successArticle",
            template: "hasTableOfContents.html"
        };
        // if(fields.coverImage){
        //     let coverFields = resolveI18n(fields.coverImage.fields);
        //     file.coverImage = {
        //         url: coverFields.file.url,
        //         name: coverFields.title
        //     };
        // }
    }else{
        file = null;
    }
    
    return file;
}