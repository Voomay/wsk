const fs = require('fs');
const path = require('path');

async function downloadFile(url, destPath) {
  try {
    const encodedUrl = encodeURI(url);
    const res = await fetch(encodedUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      // try without encodeURI if it was already encoded
      const res2 = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res2.ok) return false;
      const arrayBuffer = await res2.arrayBuffer();
      fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
      return true;
    }
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
    return true;
  } catch (e) {
    console.error(`Retry failed for ${url}:`, e.message);
    return false;
  }
}

async function retryFailedDownloads() {
  const allMedia = JSON.parse(fs.readFileSync('./extracted_site_data/all_media.json', 'utf8'));
  const imgDir = path.join(__dirname, 'extracted_site_data', 'images');
  
  for (const item of allMedia) {
    if (!item.source_url) continue;
    const filename = path.basename(new URL(item.source_url).pathname);
    const dest = path.join(imgDir, filename);
    if (!fs.existsSync(dest) || fs.statSync(dest).size === 0) {
      console.log(`Retrying download for: ${item.source_url}`);
      const ok = await downloadFile(item.source_url, dest);
      console.log(`Result: ${ok ? 'SUCCESS' : 'FAILED'}`);
    }
  }
}

async function main() {
  await retryFailedDownloads();
  console.log('Retry check complete.');
}

main();
