#!/usr/bin/env node
/**
 * Contentful Image Downloader and URL Replacer
 * 
 * Scans markdown files for Contentful CDN image URLs, downloads them locally,
 * and updates the references to use local paths.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Directories to scan for markdown files
const CONTENT_DIRS = [
  'content/articles',
  'content/product-news',
  'content/breaking-changes',
  'content/integrations',
  'content/faq',
];

// Additional source files to scan and update
const SOURCE_FILES = [
  'src/containers/single/integrations.tsx',
];

const OUTPUT_DIR = 'public/assets/images/contentful';
const LOCAL_PATH_PREFIX = '/assets/images/contentful';

// Regex to match Contentful CDN URLs
// Matches both //images.ctfassets.net/... and //images.contentful.com/...
// Also matches https:// prefixed versions
const CONTENTFUL_URL_REGEX = /(https?:)?\/\/(images\.ctfassets\.net|images\.contentful\.com)\/[^\s"')\]>]+/gi;

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Extract filename from URL, handling query strings and special chars
 */
function urlToFilename(urlString) {
  try {
    // Handle protocol-relative URLs
    const fullUrl = urlString.startsWith('//') ? `https:${urlString}` : urlString;
    const url = new URL(fullUrl);
    
    // Get the pathname and extract filename
    const pathname = url.pathname;
    const parts = pathname.split('/');
    let filename = parts[parts.length - 1];
    
    // Remove query string if present in filename itself
    filename = filename.split('?')[0];
    
    // Handle case where filename might be empty
    if (!filename) {
      filename = parts[parts.length - 2] || 'image';
    }
    
    // Contentful URLs have structure: /spaceid/assetid/hash/filename
    // We want to preserve uniqueness, so include assetid in filename
    const assetId = parts.length >= 3 ? parts[parts.length - 3] : '';
    if (assetId && !filename.includes(assetId)) {
      const ext = path.extname(filename);
      const base = path.basename(filename, ext);
      filename = `${base}_${assetId}${ext}`;
    }
    
    // Sanitize filename
    filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    
    return filename;
  } catch (err) {
    // Fallback: hash the URL
    const hash = Buffer.from(urlString).toString('base64').replace(/[/+=]/g, '_').slice(0, 20);
    return `image_${hash}.png`;
  }
}

/**
 * Download a file from URL
 */
function downloadFile(urlString, destPath) {
  return new Promise((resolve, reject) => {
    // Handle protocol-relative URLs
    const fullUrl = urlString.startsWith('//') ? `https:${urlString}` : urlString;
    
    const protocol = fullUrl.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(destPath);
    
    protocol.get(fullUrl, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.unlinkSync(destPath);
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`HTTP ${response.statusCode} for ${fullUrl}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      reject(err);
    });
  });
}

/**
 * Find all Contentful CDN URLs in a file
 */
function findContentfulUrls(content) {
  const urls = new Set();
  let match;
  
  // Reset regex state
  CONTENTFUL_URL_REGEX.lastIndex = 0;
  
  while ((match = CONTENTFUL_URL_REGEX.exec(content)) !== null) {
    urls.add(match[0]);
  }
  
  return Array.from(urls);
}

/**
 * Scan all markdown files and collect unique URLs
 */
function collectAllUrls() {
  const allUrls = new Map(); // URL -> local filename
  
  const scanFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const urls = findContentfulUrls(content);
    
    for (const url of urls) {
      if (!allUrls.has(url)) {
        allUrls.set(url, urlToFilename(url));
      }
    }
  };
  
  // Scan content directories
  for (const dir of CONTENT_DIRS) {
    const fullDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDir)) continue;
    
    const scanDir = (dirPath) => {
      const files = fs.readdirSync(dirPath);
      for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (file.endsWith('.md')) {
          scanFile(fullPath);
        }
      }
    };
    
    scanDir(fullDir);
  }
  
  // Scan source files
  for (const file of SOURCE_FILES) {
    scanFile(path.join(process.cwd(), file));
  }
  
  return allUrls;
}

/**
 * Download all images
 */
async function downloadAllImages(urlMap) {
  const outputDir = path.join(process.cwd(), OUTPUT_DIR);
  ensureDir(outputDir);
  
  console.log(`\nDownloading ${urlMap.size} images to ${OUTPUT_DIR}...`);
  
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const [url, filename] of urlMap) {
    const destPath = path.join(outputDir, filename);
    
    // Skip if already downloaded
    if (fs.existsSync(destPath)) {
      skipped++;
      continue;
    }
    
    try {
      await downloadFile(url, destPath);
      downloaded++;
      process.stdout.write(`\r  Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`);
    } catch (err) {
      failed++;
      console.error(`\n  ✗ Failed to download ${url}: ${err.message}`);
    }
  }
  
  console.log(`\n  Complete: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`);
}

/**
 * Update file content, replacing Contentful URLs with local paths
 */
function updateFileContent(content, urlMap) {
  let updated = content;
  
  for (const [url, filename] of urlMap) {
    const localPath = `${LOCAL_PATH_PREFIX}/${filename}`;
    // Replace all occurrences of this URL
    updated = updated.split(url).join(localPath);
  }
  
  return updated;
}

/**
 * Update all files with local image paths
 */
function updateAllFiles(urlMap) {
  console.log('\nUpdating file references...');
  
  let filesUpdated = 0;
  
  const updateFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const updated = updateFileContent(content, urlMap);
    
    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf-8');
      filesUpdated++;
      console.log(`  ✓ ${filePath}`);
    }
  };
  
  // Update content directories
  for (const dir of CONTENT_DIRS) {
    const fullDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDir)) continue;
    
    const scanDir = (dirPath) => {
      const files = fs.readdirSync(dirPath);
      for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (file.endsWith('.md')) {
          updateFile(fullPath);
        }
      }
    };
    
    scanDir(fullDir);
  }
  
  // Update source files
  for (const file of SOURCE_FILES) {
    updateFile(path.join(process.cwd(), file));
  }
  
  console.log(`  Updated ${filesUpdated} files`);
}

/**
 * Main function
 */
async function main() {
  console.log('Contentful Image Downloader');
  console.log('===========================');
  
  // Step 1: Collect all URLs
  console.log('\nScanning for Contentful CDN URLs...');
  const urlMap = collectAllUrls();
  console.log(`  Found ${urlMap.size} unique images`);
  
  if (urlMap.size === 0) {
    console.log('\nNo Contentful images found. Nothing to do.');
    return;
  }
  
  // Step 2: Download images
  await downloadAllImages(urlMap);
  
  // Step 3: Update file references
  updateAllFiles(urlMap);
  
  console.log('\n===========================');
  console.log('Image migration complete!');
}

// Run
main().catch(console.error);
