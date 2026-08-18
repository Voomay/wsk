const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

async function fetchJSON(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return { error: res.status, statusText: res.statusText };
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

async function fetchText(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return { error: res.status, statusText: res.statusText };
    return await res.text();
  } catch (err) {
    return { error: err.message };
  }
}

async function main() {
  console.log('Testing WP REST API endpoints...');
  const endpoints = [
    'https://www.wkeandcprojects.co.za/wp-json/',
    'https://www.wkeandcprojects.co.za/wp-json/wp/v2/pages?per_page=100',
    'https://www.wkeandcprojects.co.za/wp-json/wp/v2/posts?per_page=100',
    'https://www.wkeandcprojects.co.za/wp-json/wp/v2/media?per_page=100',
    'https://www.wkeandcprojects.co.za/wp-sitemap.xml',
    'https://www.wkeandcprojects.co.za/sitemap.xml'
  ];

  for (const ep of endpoints) {
    console.log(`\nFetching ${ep}...`);
    if (ep.endsWith('.xml')) {
      const text = await fetchText(ep);
      console.log(`Result: length ${typeof text === 'string' ? text.length : 'error'}`);
      if (typeof text === 'string') {
        console.log(text.slice(0, 300));
      }
    } else {
      const json = await fetchJSON(ep);
      if (Array.isArray(json)) {
        console.log(`Array result with ${json.length} items`);
        json.forEach((item, idx) => {
          console.log(` - [${idx}] id: ${item.id}, slug: ${item.slug}, title: ${item.title?.rendered || item.title}`);
        });
      } else if (json && typeof json === 'object') {
        console.log(`Object result keys:`, Object.keys(json));
      } else {
        console.log(`Result:`, json);
      }
    }
  }
}

main();
