#!/usr/bin/env node
/**
 * Convert Contentful faqCategory exports to local markdown files
 * with properly structured answers arrays
 */

const fs = require("fs").promises;
const path = require("path");
const globby = require("globby");

async function main() {
  const contentfulDir = path.join(__dirname, "../contentful-backup/faq");
  const outputDir = path.join(__dirname, "../content/faq");

  // Find all faqCategory JSON files
  const jsonFiles = await globby([`${contentfulDir}/faqCategory_*.json`]);

  console.log(`Found ${jsonFiles.length} faqCategory files to convert`);

  for (const jsonFile of jsonFiles) {
    const content = await fs.readFile(jsonFile, "utf8");
    const entry = JSON.parse(content);
    const fields = entry.fields;

    // Build the answers array for frontmatter
    const answers = (fields.answers || []).map((answer) => ({
      question: answer.fields?.question || "",
      answer: answer.fields?.answer || "",
    }));

    // Build frontmatter
    const frontmatter = {
      title: `${fields.name} FAQ`,
      name: fields.name,
      slug: fields.slug,
      template: "faqCategory.html",
      sectionType: "faq",
      contentType: "faqCategory",
      answers: answers,
    };

    // Convert to YAML frontmatter
    const yaml = toYaml(frontmatter);
    const markdown = `---\n${yaml}---\n`;

    // Determine output path
    let outputPath;
    if (fields.slug === "faq") {
      outputPath = path.join(outputDir, "faq.md");
    } else {
      // Nested slug like faq/pricing
      const slugParts = fields.slug.split("/");
      const subDir = path.join(outputDir, ...slugParts.slice(0, -1));
      await fs.mkdir(subDir, { recursive: true });
      outputPath = path.join(outputDir, `${slugParts.slice(-1)[0]}.md`);
      // Actually, let's preserve directory structure based on slug
      if (slugParts.length > 1) {
        outputPath = path.join(outputDir, slugParts.slice(1).join("/") + ".md");
      } else {
        outputPath = path.join(outputDir, `${fields.slug}.md`);
      }
    }

    await fs.writeFile(outputPath, markdown);
    console.log(`Converted: ${fields.slug} -> ${outputPath}`);
  }

  console.log("Done!");
}

function toYaml(obj, indent = 0) {
  const spaces = "  ".repeat(indent);
  let result = "";

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      result += `${spaces}${key}:\n`;
      for (const item of value) {
        if (typeof item === "object") {
          result += `${spaces}  -\n`;
          for (const [k, v] of Object.entries(item)) {
            if (
              typeof v === "string" &&
              (v.includes("\n") || v.includes('"') || v.includes("'"))
            ) {
              // Multi-line or complex string - use literal block
              result += `${spaces}    ${k}: |\n`;
              const lines = v.split("\n");
              for (const line of lines) {
                result += `${spaces}      ${line}\n`;
              }
            } else {
              result += `${spaces}    ${k}: ${JSON.stringify(v)}\n`;
            }
          }
        } else {
          result += `${spaces}  - ${JSON.stringify(item)}\n`;
        }
      }
    } else if (typeof value === "object") {
      result += `${spaces}${key}:\n`;
      result += toYaml(value, indent + 1);
    } else if (typeof value === "string" && value.includes("\n")) {
      result += `${spaces}${key}: |\n`;
      const lines = value.split("\n");
      for (const line of lines) {
        result += `${spaces}  ${line}\n`;
      }
    } else {
      result += `${spaces}${key}: ${JSON.stringify(value)}\n`;
    }
  }

  return result;
}

main().catch(console.error);
