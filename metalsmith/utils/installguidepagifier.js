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
    console.log('fields ', fields);

    if ("programTemplate" == entry.sys.contentType.sys.id && fields.installGuide != undefined) {
        
        // if(!fields.globallyInstallable){
        //     // Don't show docs for non-globally installable things
        //     return null;
        // }
        

        file = {
            title: fields.name + " Setup Guide",
            highlights: fields.summary,
            contents: fields.installGuide,
            markdownToc: markdownToc(fields.installGuide),
            tags: fields.tags,
            slug: "program/" + fields.slug + "/setup-guide",

            fields: fields,
            id: entry.sys.id,
            sectionType: "successArticle",
            template: "article.html"
        };

        // if(fields.coverImage){
        //     let coverFields = resolveI18n(fields.coverImage.fields);
        //     file.coverImage = {
        //         url: coverFields.file.url,
        //         name: coverFields.title
        //     };
        // }
        if(fields.logo){
            let logoFields = resolveI18n(fields.logo.fields);
            file.logo = {
                url: logoFields.file.url,
                name: logoFields.title
            };
        }
        if(fields.screenshot){
            let screenshotFields = resolveI18n(fields.screenshot.fields);
            file.screenshot = {
                url: screenshotFields.file.url,
                name: screenshotFields.title
            };
        }
    }else{
        file = null;
    }
    
    return file;
}