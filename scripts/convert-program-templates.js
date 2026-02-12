#!/usr/bin/env node
/**
 * Convert Contentful programTemplate exports to Markdown files.
 *
 * This script:
 * 1. Reads programTemplate JSON exports from contentful-backup/programTemplate/
 * 2. Fetches asset URLs from Contentful API (for logo and screenshot)
 * 3. Downloads images locally
 * 4. Creates Markdown files in content/programs/
 *
 * Usage:
 *   CONTENTFUL_PRODUCT_SPACEID=xxx CONTENTFUL_PRODUCT_ACCESS_KEY=xxx node scripts/convert-program-templates.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// Configuration - set via environment variables
const SPACE_ID = process.env.CONTENTFUL_PRODUCT_SPACEID;
const ACCESS_TOKEN = process.env.CONTENTFUL_PRODUCT_ACCESS_KEY;

const INPUT_DIR = "contentful-backup/programTemplate";
const OUTPUT_DIR = "content/programs";
const IMAGES_DIR = "public/assets/images/programs";

// Fetch asset details from Contentful API
async function fetchAsset(assetId) {
  return new Promise((resolve, reject) => {
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/assets/${assetId}?access_token=${ACCESS_TOKEN}`;

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              const asset = JSON.parse(data);
              resolve(asset);
            } catch (e) {
              reject(
                new Error(`Failed to parse asset ${assetId}: ${e.message}`),
              );
            }
          } else {
            reject(
              new Error(`Failed to fetch asset ${assetId}: ${res.statusCode}`),
            );
          }
        });
      })
      .on("error", reject);
  });
}

// Download image from URL
async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const fullUrl = url.startsWith("//") ? `https:${url}` : url;

    https
      .get(fullUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          downloadImage(res.headers.location, filename)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download ${fullUrl}: ${res.statusCode}`));
          return;
        }

        const filePath = path.join(IMAGES_DIR, filename);
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          resolve(filePath);
        });
        fileStream.on("error", reject);
      })
      .on("error", reject);
  });
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
}

function escapeYaml(str) {
  if (!str) return "";
  return str.replace(/"/g, '\\"').replace(/\n/g, " ");
}

async function convertProgramTemplate(json) {
  const fields = json.fields;
  const sysId = json.sys.id;
  const updatedAt = json.sys.updatedAt;

  if (!fields.globallyInstallable) {
    console.log(`  Skipping ${fields.name} (not globally installable)`);
    return null;
  }

  const slug = fields.slug;
  const filename = `${slug}.md`;

  // Resolve logo asset
  let logoPath = null;
  if (fields.logo && fields.logo.sys && fields.logo.sys.id) {
    try {
      const logoAsset = await fetchAsset(fields.logo.sys.id);
      const logoUrl = logoAsset.fields.file.url;
      const logoExt = path.extname(logoAsset.fields.file.fileName) || ".png";
      const logoFilename = `${sanitizeFilename(slug)}-logo${logoExt}`;
      await downloadImage(logoUrl, logoFilename);
      logoPath = `/assets/images/programs/${logoFilename}`;
      console.log(`  Downloaded logo: ${logoFilename}`);
    } catch (e) {
      console.error(`  Failed to fetch logo for ${slug}: ${e.message}`);
    }
  }

  // Resolve screenshot asset
  let screenshotPath = null;
  if (fields.screenshot && fields.screenshot.sys && fields.screenshot.sys.id) {
    try {
      const screenshotAsset = await fetchAsset(fields.screenshot.sys.id);
      const screenshotUrl = screenshotAsset.fields.file.url;
      const screenshotExt =
        path.extname(screenshotAsset.fields.file.fileName) || ".png";
      const screenshotFilename = `${sanitizeFilename(slug)}-screenshot${screenshotExt}`;
      await downloadImage(screenshotUrl, screenshotFilename);
      screenshotPath = `/assets/images/programs/${screenshotFilename}`;
      console.log(`  Downloaded screenshot: ${screenshotFilename}`);
    } catch (e) {
      console.error(`  Failed to fetch screenshot for ${slug}: ${e.message}`);
    }
  }

  // Build YAML frontmatter
  const yamlLines = ["---"];
  yamlLines.push(`title: "${escapeYaml(fields.name)}"`);
  yamlLines.push(`highlights: "${escapeYaml(fields.summary || "")}"`);
  yamlLines.push(`slug: program/${slug}`);
  yamlLines.push(`template: pages/program.html`);
  yamlLines.push(`sectionType: successArticle`);
  yamlLines.push(`date: ${updatedAt}`);
  yamlLines.push(`id: ${sysId}`);
  yamlLines.push(`globallyInstallable: ${fields.globallyInstallable}`);

  if (fields.icon) {
    yamlLines.push(`icon: ${fields.icon}`);
  }

  if (fields.tags && fields.tags.length > 0) {
    yamlLines.push("tags:");
    fields.tags.forEach((tag) => yamlLines.push(`  - ${tag}`));
  }

  if (logoPath) {
    yamlLines.push("logo:");
    yamlLines.push(`  url: ${logoPath}`);
    yamlLines.push(`  name: "${escapeYaml(fields.name)}"`);
  }

  if (screenshotPath) {
    yamlLines.push("screenshot:");
    yamlLines.push(`  url: ${screenshotPath}`);
    yamlLines.push(`  name: "${escapeYaml(fields.name)} Screenshot"`);
  }

  yamlLines.push("---");
  yamlLines.push("");
  yamlLines.push(fields.longDescription || "");

  return { filename, content: yamlLines.join("\n") };
}

async function main() {
  if (!SPACE_ID || !ACCESS_TOKEN) {
    console.error(
      "Error: Set CONTENTFUL_PRODUCT_SPACEID and CONTENTFUL_PRODUCT_ACCESS_KEY",
    );
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const files = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith(".json"));
  console.log(`Found ${files.length} programTemplate files\n`);

  let converted = 0,
    skipped = 0;

  for (const file of files) {
    const json = JSON.parse(
      fs.readFileSync(path.join(INPUT_DIR, file), "utf8"),
    );
    console.log(`Processing: ${json.fields.name}`);

    try {
      const result = await convertProgramTemplate(json);
      if (result) {
        fs.writeFileSync(
          path.join(OUTPUT_DIR, result.filename),
          result.content,
        );
        console.log(`  -> ${OUTPUT_DIR}/${result.filename}\n`);
        converted++;
      } else {
        skipped++;
      }
    } catch (e) {
      console.error(`  Error: ${e.message}\n`);
      skipped++;
    }
  }

  console.log(`\nDone! Converted: ${converted}, Skipped: ${skipped}`);
}

main().catch(console.error);
