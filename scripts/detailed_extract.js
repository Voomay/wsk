const fs = require('fs');

async function fetchJSON(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return { error: res.status, statusText: res.statusText };
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

async function run() {
  console.log('Fetching all pages...');
  const pages = await fetchJSON('https://www.wkeandcprojects.co.za/wp-json/wp/v2/pages?per_page=100');
  console.log(`Found ${pages.length} pages`);
  
  console.log('Fetching all posts...');
  const posts = await fetchJSON('https://www.wkeandcprojects.co.za/wp-json/wp/v2/posts?per_page=100');
  console.log(`Found ${posts.length} posts`);

  console.log('Fetching all types...');
  const types = await fetchJSON('https://www.wkeandcprojects.co.za/wp-json/wp/v2/types');
  console.log('Post types:', Object.keys(types));

  // Let's check all media pages
  let allMedia = [];
  let page = 1;
  while (true) {
    console.log(`Fetching media page ${page}...`);
    const mediaPage = await fetchJSON(`https://www.wkeandcprojects.co.za/wp-json/wp/v2/media?per_page=100&page=${page}`);
    if (!Array.isArray(mediaPage) || mediaPage.length === 0) break;
    allMedia = allMedia.concat(mediaPage);
    if (mediaPage.length < 100) break;
    page++;
  }
  console.log(`Total media items found: ${allMedia.length}`);

  // Save raw data
  fs.mkdirSync('./extracted_raw', { recursive: true });
  fs.writeFileSync('./extracted_raw/pages.json', JSON.stringify(pages, null, 2));
  fs.writeFileSync('./extracted_raw/posts.json', JSON.stringify(posts, null, 2));
  fs.writeFileSync('./extracted_raw/media.json', JSON.stringify(allMedia, null, 2));
  
  // Output summary of pages
  console.log('\n--- PAGES ---');
  pages.forEach(p => {
    console.log(`ID: ${p.id} | Slug: ${p.slug} | Title: "${p.title.rendered}" | Link: ${p.link}`);
  });

  console.log('\n--- POSTS ---');
  posts.forEach(p => {
    console.log(`ID: ${p.id} | Slug: ${p.slug} | Title: "${p.title.rendered}" | Link: ${p.link}`);
  });
}

run();
