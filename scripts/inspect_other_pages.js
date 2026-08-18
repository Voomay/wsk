const fs = require('fs');

function inspectPage(filename) {
  const html = fs.readFileSync(`./extracted_site_data/${filename}`, 'utf8');
  console.log(`\n=== DETAILED ${filename.toUpperCase()} TEXT ===`);
  const regex = /<div class="elementor-widget-container">([\s\S]*?)<\/div>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length > 20 && !text.includes('Menu') && !text.includes('Voomay')) {
      console.log(`- ${text}\n`);
    }
  }
}

inspectPage('faq.html');
inspectPage('contact-us.html');
inspectPage('our-team.html');
