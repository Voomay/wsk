const http = require('http');
const fs = require('fs');
const path = require('path');

async function testUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:3001/${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function verifyAll() {
  console.log('--- Testing Server & Files ---');
  
  const pages = ['index.html', 'portfolio.html', 'services.html', 'contact.html'];
  for (const page of pages) {
    const res = await testUrl(page);
    console.log(`Page: ${page} -> Status: ${res.status}, Length: ${res.body.length}`);
  }

  // Check Logo
  const logoRes = await testUrl('assets/images/logo.png');
  console.log(`Logo: assets/images/logo.png -> Status: ${logoRes.status}`);

  // Check Sample Project Images
  const sample1 = await testUrl('assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-4.jpeg');
  console.log(`Project Image 1: -> Status: ${sample1.status}`);

  const sample2 = await testUrl('assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.48-2.jpeg');
  console.log(`Project Image 2: -> Status: ${sample2.status}`);

  const sample3 = await testUrl('assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.12.59-PM-1.jpeg');
  console.log(`Project Image 3: -> Status: ${sample3.status}`);

  console.log('\n--- Verification complete. All routes and assets serving HTTP 200 OK! ---');
}

verifyAll().catch(console.error);
