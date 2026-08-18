const fs = require('fs');
const path = require('path');

const mediaJsonPath = path.join(__dirname, '..', 'extracted_raw', 'media.json');
const media = JSON.parse(fs.readFileSync(mediaJsonPath, 'utf8'));

console.log(`Total media entries in media.json: ${media.length}`);

// Check media URLs
const urls = media.map(m => m.source_url || (m.guid && m.guid.rendered) || '').filter(Boolean);
console.log(`Found ${urls.length} media URLs.`);
console.log('Sample URLs:', urls.slice(0, 10));

// Count how many are already downloaded in extracted_site_data/images
const imgDir = path.join(__dirname, '..', 'extracted_site_data', 'images');
const downloadedFiles = new Set(fs.readdirSync(imgDir));

const missingUrls = urls.filter(u => {
  const filename = path.basename(u);
  return !downloadedFiles.has(filename);
});

console.log(`Already downloaded: ${downloadedFiles.size}, Missing to download: ${missingUrls.length}`);
