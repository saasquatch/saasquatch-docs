import resolveI18n from "./resolveI18n";
export default pageify;

var sectionTypeMap = {
  "Developer Guide": "guide",
  "Marketer Guide": "successArticle",
  "Designer Guide": "designerArticle",
};

/**
 *  Pageifies a single Contentful entry
 */
function pageify(entryRaw, i18n) {
  let file;

  let entry = resolveI18n(entryRaw);
  let fields = entry.fields;

  if ("article" == entry.sys.contentType.sys.id) {
    var contentfulSection = fields.sectionType;
    var metalsmithSection = sectionTypeMap[contentfulSection];
    if (!metalsmithSection) {
      throw new Error(
        `Missing or undefined section type. ${JSON.stringify(
          contentfulSection
        )} mapped to ${metalsmithSection}`
      );
    }

    file = {
      title: fields.title,
      highlights: fields.highlights,
      contents: fields.content,
      tags: fields.tags,
      slug: fields.slug,

      fields: fields,
      date: entry.sys.updatedAt,
      id: entry.sys.id,
      sectionType: metalsmithSection,
      template: "hasTableOfContents.html",
    };

    if (fields.tags && fields.tags.includes("integrations")) {
      return null;
      file.logo = `${fields.slug}-integration.png`;
      file.template = "intergrationLanderIntro.html";
    }

    if (fields.coverImage) {
      let coverFields = resolveI18n(fields.coverImage.fields);
      file.coverImage = {
        url: coverFields.file.url,
        name: coverFields.title,
      };
    }
  } else if ("faqCategory" == entry.sys.contentType.sys.id) {
    file = {
      title: fields.name + " FAQ",
      slug: fields.slug,
      contents: "", // Required because some plugins depend on it being non-null

      fields: fields,
      id: entry.sys.id,

      template: "faqCategory.html",
      sectionType: "faq",
    };
  } else if ("integration" == entry.sys.contentType.sys.id) {
    let logoFields = resolveI18n(fields.logo.fields);
    file = {
      ...fields,
      fields: fields,
      logo: {
        url: logoFields.file.url,
        name: logoFields.title,
      },
      id: entry.sys.id,
      template: "intergrationLander.html",
    };
  } else {
    file = null;
  }

  return file;
}
