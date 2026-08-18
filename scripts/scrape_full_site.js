const fs = require('fs');
const path = require('path');

async function fetchJSON(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return { error: res.status, statusText: res.statusText };
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

async function fetchHTML(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return null;
    return await res.text();
  } catch (err) {
    return null;
  }
}

async function downloadFile(url, destPath) {
  try {
    if (fs.existsSync(destPath)) {
      // already downloaded
      return true;
    }
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return false;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (e) {
    console.error(`Failed to download ${url}:`, e.message);
    return false;
  }
}

async function main() {
  const outputDir = path.join(__dirname, 'extracted_site_data');
  const imgDir = path.join(outputDir, 'images');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

  console.log('1. Checking portfolio custom post type...');
  const portfolioData = await fetchJSON('https://www.wkeandcprojects.co.za/wp-json/wp/v2/portfolio?per_page=100');
  fs.writeFileSync(path.join(outputDir, 'portfolio_api.json'), JSON.stringify(portfolioData, null, 2));
  console.log(`Portfolio items from API: ${Array.isArray(portfolioData) ? portfolioData.length : 'none/error'}`);

  console.log('2. Checking elementor library...');
  const elementorData = await fetchJSON('https://www.wkeandcprojects.co.za/wp-json/wp/v2/elementor_library?per_page=100');
  fs.writeFileSync(path.join(outputDir, 'elementor_library_api.json'), JSON.stringify(elementorData, null, 2));

  console.log('3. Fetching all media items...');
  let allMedia = [];
  let page = 1;
  while (true) {
    const mediaPage = await fetchJSON(`https://www.wkeandcprojects.co.za/wp-json/wp/v2/media?per_page=100&page=${page}`);
    if (!Array.isArray(mediaPage) || mediaPage.length === 0) break;
    allMedia = allMedia.concat(mediaPage);
    if (mediaPage.length < 100) break;
    page++;
  }
  fs.writeFileSync(path.join(outputDir, 'all_media.json'), JSON.stringify(allMedia, null, 2));
  console.log(`Saved ${allMedia.length} media metadata items.`);

  console.log('4. Fetching rendered HTML for all main pages...');
  const urlsToScrape = [
    { name: 'home', url: 'https://www.wkeandcprojects.co.za/' },
    { name: 'about', url: 'https://www.wkeandcprojects.co.za/about/' },
    { name: 'services', url: 'https://www.wkeandcprojects.co.za/services/' },
    { name: 'service-details', url: 'https://www.wkeandcprojects.co.za/service-details/' },
    { name: 'projects', url: 'https://www.wkeandcprojects.co.za/projects/' },
    { name: '2024-projects', url: 'https://www.wkeandcprojects.co.za/2024-projects/' },
    { name: 'portfolio-details', url: 'https://www.wkeandcprojects.co.za/portfolio-details/' },
    { name: 'contact-us', url: 'https://www.wkeandcprojects.co.za/contact-us/' },
    { name: 'faq', url: 'https://www.wkeandcprojects.co.za/faq/' },
    { name: 'our-team', url: 'https://www.wkeandcprojects.co.za/our-team/' },
    { name: 'home-1', url: 'https://www.wkeandcprojects.co.za/home-1/' },
    { name: 'home-3', url: 'https://www.wkeandcprojects.co.za/home-3/' },
    { name: 'home-4', url: 'https://www.wkeandcprojects.co.za/home-4/' }
  ];

  const htmlPages = {};
  for (const item of urlsToScrape) {
    console.log(`Scraping ${item.name} (${item.url})...`);
    const html = await fetchHTML(item.url);
    if (html) {
      htmlPages[item.name] = html;
      fs.writeFileSync(path.join(outputDir, `${item.name}.html`), html);
    } else {
      console.log(`Failed to scrape ${item.name}`);
    }
  }

  console.log('5. Downloading all media / images...');
  let downloadedCount = 0;
  for (let i = 0; i < allMedia.length; i++) {
    const item = allMedia[i];
    const sourceUrl = item.source_url;
    if (!sourceUrl) continue;
    
    const parsedUrl = new URL(sourceUrl);
    const filename = path.basename(parsedUrl.pathname);
    const destPath = path.join(imgDir, filename);

    const ok = await downloadFile(sourceUrl, destPath);
    if (ok) downloadedCount++;
    if ((i + 1) % 10 === 0 || i === allMedia.length - 1) {
      console.log(`Downloaded ${downloadedCount}/${allMedia.length} files...`);
    }
  }

  console.log(`All media download complete! Total downloaded: ${downloadedCount}`);
}

main().catch(console.error);
