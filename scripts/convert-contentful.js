#!/usr/bin/env node
/**
 * Contentful JSON to Markdown Converter
 *
 * Converts exported Contentful JSON files to markdown with frontmatter
 * for use with the static site generator.
 */

const fs = require("fs");
const path = require("path");

const CONTENTFUL_DIR = path.join(__dirname, "../content/contentful");
const OUTPUT_BASE = path.join(__dirname, "../content");

// Map Contentful sectionType to internal sectionType
const SECTION_TYPE_MAP = {
  "Developer Guide": "guide",
  "Marketer Guide": "successArticle",
  "Designer Guide": "designerArticle",
};

/**
 * Safely get nested property
 */
function get(obj, path, defaultValue = undefined) {
  const keys = path.split(".");
  let result = obj;
  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }
  return result ?? defaultValue;
}

/**
 * Convert a value to YAML-safe string for frontmatter
 */
function yamlValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") {
    // Check if string needs quoting
    if (
      value.includes(":") ||
      value.includes("#") ||
      value.includes("\n") ||
      value.includes('"') ||
      value.includes("'") ||
      value.startsWith("-") ||
      value.startsWith("[") ||
      value.startsWith("{")
    ) {
      // Use double quotes and escape internal double quotes
      return `"${value.replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return "\n" + value.map((v) => `  - ${yamlValue(v)}`).join("\n");
  }
  return String(value);
}

/**
 * Build frontmatter string from object
 */
function buildFrontmatter(data) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined || value === "") continue;
    if (Array.isArray(value)) {
      lines.push(`${key}:${yamlValue(value)}`);
    } else {
      lines.push(`${key}: ${yamlValue(value)}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Sanitize filename from slug
 */
function slugToFilename(slug) {
  // Replace path separators with dashes, remove leading/trailing dashes
  return slug.replace(/\//g, "-").replace(/^-+|-+$/g, "") || "index";
}

/**
 * Extract logo URL from integration logo field
 */
function extractLogoUrl(logo) {
  if (!logo) return null;
  if (typeof logo === "string") return logo;
  // Contentful asset structure
  const url = get(logo, "fields.file.url");
  if (url) {
    // Ensure URL has protocol
    return url.startsWith("//") ? `https:${url}` : url;
  }
  return null;
}

/**
 * Convert article JSON to markdown
 */
function convertArticle(json) {
  const fields = json.fields;
  const sys = json.sys;

  const sectionType =
    SECTION_TYPE_MAP[fields.sectionType] || fields.sectionType;

  const frontmatter = {
    title: fields.title,
    highlights: fields.highlights,
    slug: fields.slug,
    sectionType: sectionType,
    template: "hasTableOfContents.html",
    date: sys.updatedAt ? sys.updatedAt.slice(0, 10) : null,
  };

  // Add optional SEO fields
  if (fields.seoDescription) {
    frontmatter.seoDescription = fields.seoDescription;
  }
  if (fields.robotsTag && fields.robotsTag.length > 0) {
    frontmatter.robotsTag = fields.robotsTag;
  }
  if (fields.tags && fields.tags.length > 0) {
    frontmatter.tags = fields.tags;
  }

  const content = fields.content || "";

  return {
    frontmatter: buildFrontmatter(frontmatter),
    content,
    slug: fields.slug,
    outputPath: path.join(
      OUTPUT_BASE,
      "articles",
      `${slugToFilename(fields.slug)}.md`,
    ),
  };
}

/**
 * Convert productNews JSON to markdown
 */
function convertProductNews(json) {
  const fields = json.fields;
  const sys = json.sys;

  const frontmatter = {
    title: fields.title,
    datePublished: fields.datePublished,
    tags: fields.tags,
    ctaLink: fields.ctaLink,
    ctaButtonText: fields.ctaButtonText,
    contentType: "productNews",
  };

  const content = fields.content || "";
  const filename = `${fields.datePublished || sys.id}-${slugToFilename(fields.title || sys.id)}`;

  return {
    frontmatter: buildFrontmatter(frontmatter),
    content,
    id: sys.id,
    outputPath: path.join(OUTPUT_BASE, "product-news", `${filename}.md`),
  };
}

/**
 * Convert breakingChange JSON to markdown
 */
function convertBreakingChange(json) {
  const fields = json.fields;
  const sys = json.sys;

  const frontmatter = {
    title: fields.title,
    deadline: fields.deadline,
    contentType: "breakingChange",
  };

  const content = fields.description || "";
  const filename = `${fields.deadline || sys.id}-${slugToFilename(fields.title || sys.id)}`;

  return {
    frontmatter: buildFrontmatter(frontmatter),
    content,
    id: sys.id,
    outputPath: path.join(OUTPUT_BASE, "breaking-changes", `${filename}.md`),
  };
}

/**
 * Convert integration JSON to markdown
 */
function convertIntegration(json) {
  const fields = json.fields;
  const sys = json.sys;

  const logoUrl = extractLogoUrl(fields.logo);

  const frontmatter = {
    title: fields.title || fields.integrationName,
    integrationName: fields.integrationName,
    slug: fields.slug,
    integrationDescription: fields.integrationDescription,
    logo: logoUrl,
    guideLink: fields.guideLink,
    tags: fields.tags,
    keyFeatures: fields.keyFeatures,
    moreInfo: fields.moreInfo,
    template: "intergrationLander.html",
    contentType: "integration",
  };

  // articleContent is the optional full article body
  const content = fields.articleContent || "";

  return {
    frontmatter: buildFrontmatter(frontmatter),
    content,
    slug: fields.slug,
    outputPath: path.join(OUTPUT_BASE, "integrations", `${fields.slug}.md`),
  };
}

/**
 * Convert faqCategory JSON to markdown
 * Embeds all FAQ Q&A pairs as markdown content
 */
function convertFaqCategory(json) {
  const fields = json.fields;
  const sys = json.sys;

  const frontmatter = {
    title: `${fields.name} FAQ`,
    name: fields.name,
    slug: fields.slug,
    template: "faqCategory.html",
    sectionType: "faq",
    contentType: "faqCategory",
  };

  // Build content from embedded FAQ entries
  const contentParts = [];

  if (fields.answers && Array.isArray(fields.answers)) {
    for (const faq of fields.answers) {
      const faqFields = faq.fields;
      if (faqFields) {
        contentParts.push(
          `## ${faqFields.question}\n\n${faqFields.answer || ""}`,
        );
      }
    }
  }

  const content = contentParts.join("\n\n");

  return {
    frontmatter: buildFrontmatter(frontmatter),
    content,
    slug: fields.slug,
    outputPath: path.join(OUTPUT_BASE, "faq", `${fields.slug}.md`),
  };
}

/**
 * Read and parse JSON file
 */
function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

/**
 * Write markdown file
 */
function writeMarkdown(result) {
  ensureDir(path.dirname(result.outputPath));
  const fullContent = `${result.frontmatter}\n\n${result.content}`;
  fs.writeFileSync(result.outputPath, fullContent, "utf-8");
  console.log(`  ✓ ${result.outputPath}`);
}

/**
 * Process a directory of JSON files
 */
function processDirectory(dirPath, converter, label) {
  console.log(`\nProcessing ${label}...`);

  if (!fs.existsSync(dirPath)) {
    console.log(`  Directory not found: ${dirPath}`);
    return 0;
  }

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
  let count = 0;

  for (const file of files) {
    try {
      const json = readJson(path.join(dirPath, file));
      const result = converter(json);
      writeMarkdown(result);
      count++;
    } catch (err) {
      console.error(`  ✗ Error processing ${file}: ${err.message}`);
    }
  }

  console.log(`  Converted ${count} ${label}`);
  return count;
}

/**
 * Process a directory of JSON files with filtering (converter can return null to skip)
 */
function processDirectoryFiltered(dirPath, converter, label) {
  console.log(`\nProcessing ${label}...`);

  if (!fs.existsSync(dirPath)) {
    console.log(`  Directory not found: ${dirPath}`);
    return 0;
  }

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
  let count = 0;
  let skipped = 0;

  for (const file of files) {
    try {
      const json = readJson(path.join(dirPath, file));
      const result = converter(json);
      if (result) {
        writeMarkdown(result);
        count++;
      } else {
        skipped++;
      }
    } catch (err) {
      console.error(`  ✗ Error processing ${file}: ${err.message}`);
    }
  }

  console.log(`  Converted ${count} ${label} (skipped ${skipped})`);
  return count;
}

/**
 * Main conversion function
 */
function main() {
  console.log("Contentful to Markdown Converter");
  console.log("=================================");
  console.log(`Source: ${CONTENTFUL_DIR}`);
  console.log(`Output: ${OUTPUT_BASE}`);

  let totalCount = 0;

  // Process articles
  totalCount += processDirectory(
    path.join(CONTENTFUL_DIR, "article"),
    convertArticle,
    "articles",
  );

  // Process product news
  totalCount += processDirectory(
    path.join(CONTENTFUL_DIR, "productNews"),
    convertProductNews,
    "product news",
  );

  // Process breaking changes
  totalCount += processDirectory(
    path.join(CONTENTFUL_DIR, "breakingChange"),
    convertBreakingChange,
    "breaking changes",
  );

  // Process integrations
  totalCount += processDirectory(
    path.join(CONTENTFUL_DIR, "integration"),
    convertIntegration,
    "integrations",
  );

  // Process FAQ categories
  // FAQ categories have embedded FAQ entries, individual FAQs are skipped
  totalCount += processDirectoryFiltered(
    path.join(CONTENTFUL_DIR, "faq"),
    (json) => {
      const contentType = get(json, "sys.contentType.sys.id");
      if (contentType === "faqCategory") {
        return convertFaqCategory(json);
      }
      // Skip individual FAQ entries (they're embedded in categories)
      return null;
    },
    "FAQ categories",
  );

  console.log(`\n=================================`);
  console.log(`Total converted: ${totalCount} files`);
}

// Run
main();
