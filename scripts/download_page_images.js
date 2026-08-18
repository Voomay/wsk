const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'extracted_raw', 'pages.json'), 'utf8'));

const allImageUrls = new Set();

pages.forEach(p => {
  const content = (p.content && p.content.rendered) || '';
  const matches = [...content.matchAll(/https?:\/\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi)];
  matches.forEach(m => allImageUrls.add(m[0]));
});

console.log(`Total unique image URLs found across all pages HTML: ${allImageUrls.size}`);

const imgDir = path.join(__dirname, '..', 'extracted_site_data', 'images');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const downloadedFiles = new Set(fs.readdirSync(imgDir));
const toDownload = [...allImageUrls].filter(u => !downloadedFiles.has(path.basename(u)));

console.log(`Already downloaded: ${downloadedFiles.size}, Needs download: ${toDownload.length}`);
console.log('List of URLs to download:', toDownload);

async function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`Failed ${url}: status ${res.statusCode}`);
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    });
    req.on('error', (err) => {
      console.log(`Error ${url}: ${err.message}`);
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
    req.on('timeout', () => {
      req.destroy();
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

async function run() {
  for (let i = 0; i < toDownload.length; i++) {
    const u = toDownload[i];
    const filename = path.basename(u);
    const dest = path.join(imgDir, filename);
    console.log(`[${i+1}/${toDownload.length}] Downloading ${filename}...`);
    await downloadFile(u, dest);
  }
  console.log('Download complete!');
}

run().catch(console.error);
