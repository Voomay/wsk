const fs = require('fs');

function inspectAboutDetails() {
  const html = fs.readFileSync('./extracted_site_data/about.html', 'utf8');
  // Extract all text inside elementor-widget-text-editor or elementor-widget-heading
  const regex = /<div class="elementor-widget-container">([\s\S]*?)<\/div>/gi;
  let match;
  console.log('=== DETAILED ABOUT PAGE TEXT ===');
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length > 25 && !text.includes('Office Address') && !text.includes('Menu')) {
      console.log(`- ${text}\n`);
    }
  }
}

function inspectServicesDetails() {
  const html = fs.readFileSync('./extracted_site_data/services.html', 'utf8');
  const regex = /<div class="elementor-widget-container">([\s\S]*?)<\/div>/gi;
  let match;
  console.log('=== DETAILED SERVICES PAGE TEXT ===');
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length > 25 && !text.includes('Office Address') && !text.includes('Menu')) {
      console.log(`- ${text}\n`);
    }
  }
}

inspectAboutDetails();
inspectServicesDetails();
