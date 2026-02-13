#!/usr/bin/env node
/**
 * Convert absolute URLs to docs.saasquatch.com and docs.referralsaasquatch.com
 * to relative URLs in converted markdown files.
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const CONTENT_DIRS = [
  "content/articles/**/*.md",
  "content/product-news/**/*.md",
  "content/breaking-changes/**/*.md",
  "content/integrations/**/*.md",
  "content/faq/**/*.md",
];

// Patterns to match and convert
const URL_PATTERNS = [
  // https://docs.saasquatch.com/path -> /path
  /https?:\/\/docs\.saasquatch\.com(\/[^)\s"'<>]*)?/g,
  // https://docs.referralsaasquatch.com/path -> /path
  /https?:\/\/docs\.referralsaasquatch\.com(\/[^)\s"'<>]*)?/g,
  // http://docs.referralsaasquatch.com/path -> /path
  /http:\/\/docs\.referralsaasquatch\.com(\/[^)\s"'<>]*)?/g,
];

function convertUrls(content) {
  let updated = content;
  let changes = 0;

  for (const pattern of URL_PATTERNS) {
    updated = updated.replace(pattern, (match, pathPart) => {
      changes++;
      // If no path, return root
      if (!pathPart) return "/";
      return pathPart;
    });
  }

  return { updated, changes };
}

async function main() {
  let totalFiles = 0;
  let totalChanges = 0;

  for (const pattern of CONTENT_DIRS) {
    const files = glob.sync(pattern);

    for (const file of files) {
      const content = fs.readFileSync(file, "utf8");
      const { updated, changes } = convertUrls(content);

      if (changes > 0) {
        fs.writeFileSync(file, updated);
        console.log(`Updated ${file}: ${changes} URLs converted`);
        totalFiles++;
        totalChanges += changes;
      }
    }
  }

  console.log(`\nTotal: ${totalChanges} URLs converted in ${totalFiles} files`);
}

main().catch(console.error);
