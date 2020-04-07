// @ts-check
import path from "path";
import parser from "swagger-parser";
import yaml from "js-yaml";
import resolveAllOf from "json-schema-resolve-allof";
import contentful from "contentful";
import fs from "mz/fs";
import globby from "globby";

import contentfulpagifier from "./metalsmith/utils/contentfulpagifier";
import productSpaceContentfulpagifier from "./metalsmith/utils/productSpaceContentfulpagifier";
import installguidepagifier from "./metalsmith/utils/installguidepagifier";
import { Bottom } from "./src/templates/bottom";
import resolveI18n from "./metalsmith/utils/resolveI18n";

/**
 * Map of legacy SWIG to REACT templates
 */
const TEMPLATES = {
  "article.html": "src/containers/Article",
  "faqCategory.html": "src/containers/FaqCategory",
  "fullpage.html": "src/containers/Fullpage",
  "hasTableOfContents.html": "src/containers/HasTOC",
  "intergrationLander.html": "src/containers/IntegrationLander",
  "intergrationLanderIntro.html": "src/containers/IntegrationLanderIntro",
  "pages/rscode.html": "src/containers/RsCode",
  "pages/program.html": "src/containers/Program",
  "pages/branchReference.html": "src/containers/single/BranchMetrics",
  "pages/themeGallery.html": "src/containers/single/themeGallery",
  "pages/shorttags.html": "src/containers/single/shortTags.tsx",
};

/**
 * Gets the React-static template from the old metalsmith/swig template path.
 */
function getTemplate(legacy) {
  const newTemplate = TEMPLATES[legacy];
  if (!newTemplate) {
    // return "src/containers/HasTOC";
    throw new Error(
      "Unhanlded template!" +
        legacy +
        " -- either add an entry in TEMPLATES in static.config.js or refactor some code"
    );
  }
  return newTemplate;
}

/**
 * Read files from the `content` directy, & parse the frontmatter
 */
async function getRawFiles() {
  const paths = await globby(["content/**/*"]);

  const all = await Promise.all(
    paths
      // Ignore some files
      .filter((p) => !p.endsWith("_template.md"))
      .map(async (p) => ({
        source: await fs.readFile(p, { encoding: "utf8" }),
        fpath: p,
      }))
  );

  const matter = require("gray-matter");

  return all
    .map(({ source, fpath }) => {
      const parsed = matter(source);
      if (!parsed.data || !parsed.data.slug) {
        return null;
      }
      return {
        path: parsed.data.slug.toLowerCase(),
        getData() {
          return {
            entry: {
              ...parsed.data,
              contents: parsed.content,
              isHtml: fpath.endsWith("html"),
            },
            // tocContents: markdownToc(parsed.content).content
          };
        },
        template: getTemplate(parsed.data.template),
      };
    })
    .filter((x) => x);
}

/**
 * Read a Yaml file
 *
 * @returns parsed object
 */
async function getYaml(file) {
  const text = await fs.readFile(path.resolve(__dirname, "content", file), {
    encoding: "utf8",
  });
  const data = yaml.safeLoad(text);
  return data;
}

/**
 * Read our Swagger file
 *
 * Parses, derefences and merges it for easier templating
 */
async function getSwagger() {
  const data = await getYaml("saasquatch-api.yaml");

  const spec = await parser.dereference(data);
  const resolved = await resolveAllOf(spec);

  return {
    swagger: resolved,
  };
}

export default {
  Document: Bottom,
  entry: path.join(__dirname, "src", "index.tsx"),
  paths: {
    // root: process.cwd(), // The root of your project. Don't change this unless you know what you're doing.
    // src: "src", // The source directory. Must include an index.js entry file.
    // temp: "tmp", // Temp output directory for build files not to be published.
    dist: "build", // The production output directory.
    // devDist: "tmp/dev-server", // The development scratch directory.
    // public: "public", // The public directory (files copied to dist during build)
    // assets: "build2", // The output directory for bundled JS and CSS
    // buildArtifacts: "artifacts" // The output directory for generated (internal) resources
  },
  getSiteData() {
    return {
      robots: process.env.ROBOTS || "true",
      // TODO: Turn this off after dev
      jsTrackers: (false && process.env.JSTRACKERS) || "true",
      googleSiteId:
        process.env.GOOGLE_SITE_ID ||
        "240GodHWd0rPOGqZxZo3-fDym0MeTAYYHSnkwZV9xSE",
      windowDotEnv: {
        // Google Custom Search (GCSE) params
        GCSE_CX: process.env.GCSE_CX || "012261857935385488279:90grrsobq40",
        GCSE_KEY:
          process.env.GCSE_KEY || "AIzaSyC3Lc2HenETRKNS3VIsHAMobTYhnKYG6dE",
        ROLLBAR_TOKEN:
          process.env.ROLLBAR_TOKEN || "a865008ca04947acb3d0a1c719e2d93c",
        PINGDOM_ID: process.env.PINGDOM_ID || "52c61993abe53d650f000000",
        GTMID: process.env.GTMID || "GTM-PK98FJF",
      },
    };
  },
  getRoutes: getRoutes,
  plugins: [
    [
      "saasquatch-webpack",
      {
        externals: {
          jquery: "jQuery",
          "highlight.js": "hljs",
        },
      },
    ],
    "react-static-plugin-typescript",
    "react-static-plugin-less",
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages"),
      },
    ],
    // require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
  ],
};

/**
 * Load all the entries from a Contentful space
 *
 */
async function getContentful(opts) {
  var client = createContentfulClient(opts.accessKey, opts.spaceId);
  const response = await client.sync({
    initial: true,
    resolveLinks: true,
  });
  return response.entries;
}

function createContentfulClient(accessToken, spaceId) {
  return contentful.createClient({
    space: spaceId,
    accessToken: accessToken,
  });
}

/**
 *  Most of the magic happens here.
 *
 *
 * 1) Download lots of things
 * 2) Load lots of things from the filesystem
 * 3) Build a big array of files
 *
 */
async function getRoutes() {
  const spec = await getSwagger();
  const entries = await getContentful({
    accessKey:
      "ae31ffc9de0831d887cff9aa3c72d861c323bd09de2a4cafd763c205393976c9",
    spaceId: "s68ib1kj8k5n",
  });

  // Sorted list of news items
  const productNews = entries
    .reduce((acc, entryRaw) => {
      const entry = resolveI18n(entryRaw);
      let fields = entry.fields;
      if ("productNews" !== entry.sys.contentType.sys.id) {
        return acc;
      }
      const newsItem = fields;
      return [...acc, newsItem];
    }, [])
    .sort((a, b) => a.datePublished > b.datePublished);

  const guides = await getYaml("metadata/guides.yaml");

  const contentfulProduct = await getContentful({
    accessKey:
      "950546088e303e9d2328c21ea448fac45dd469b899a36d739bc7300c70512d3b",
    spaceId: "48ji72u659z5",
  });
  const programs = contentfulProduct
    .map(productSpaceContentfulpagifier)
    .filter((e) => e);

  const rawFiles = await getRawFiles();

  // TODO: Move this to a plugin, to allow content to me moved to contentful, or `src` directory
  const issues = rawFiles
    // .filter(r => multimatch([r.path], ["issues/rs*.*"]).length > 0)
    .filter(
      (r) => r.path.includes("squatchjs/issue") && !r.path.includes("template")
    )
    .map((r) => r.getData().entry);

  const integrations = entries
    .map(contentfulpagifier)
    .filter((x) => x)
    .filter((d) => d.tags && d.tags.some((i) => i == "in-directory"));

  const staticPages = [
    {
      path: "/api/methods",
      getData: () => spec,
      template: "src/containers/single/api",
    },
    {
      path: "/product-news",
      getData: async () => ({ productNews }),
      template: "src/containers/single/product-news",
    },
    {
      path: "/program/library",
      getData: async () => ({ programs }),
      template: "src/containers/single/programLibrary",
    },
    {
      path: "/developer/squatchjs/issue",
      getData: () => ({ issues }),
      template: "src/containers/single/issues",
    },
    {
      path: "/themes/fields",
      getData: () => ({ ThemeContext: spec.swagger.definitions.ThemeContext }),
      template: "src/containers/single/ThemeFields",
    },
    {
      path: "/integrations",
      getData: () => ({ integrations }),
      template: "src/containers/single/integrations",
    },
    {
      path: "/guides",
      getData: () => ({ guides, integrations }),
      template: "src/containers/single/guides",
    },
  ];
  const contentfulPages = entries
    .map(contentfulpagifier)
    .filter((e) => e)
    .map(legacyPagifierToStatic);

  const contentfulProductPages = programs.map(legacyPagifierToStatic);

  const installGuides = contentfulProduct
    .map(installguidepagifier)
    .filter((e) => e)
    .map(legacyPagifierToStatic);

  return [
    ...rawFiles,
    ...contentfulPages,
    ...contentfulProductPages,
    ...installGuides,
    ...staticPages,
  ];
}

// TODO: Update all the pagifiers to incorporate this functionality directly there
function legacyPagifierToStatic(entry) {
  return {
    path: entry.slug.toLowerCase(),
    getData: () => ({ entry }),
    template: getTemplate(entry.template),
  };
}
