const fs = require('fs');

function stripTags(html) {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p[^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log('=== EXTRACTING SERVICES ===');
const servicesHtml = fs.readFileSync('./extracted_site_data/services.html', 'utf8');
const serviceSections = servicesHtml.match(/<h2[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h2>[\s\S]*?(?:<div class="elementor-text-editor[^"]*"[^>]*>([\s\S]*?)<\/div>)?/gi) || [];

serviceSections.forEach((s, idx) => {
  console.log(`\n--- SERVICE HEADING/SECTION ${idx} ---`);
  console.log(stripTags(s));
});

console.log('\n=== EXTRACTING 2024 PROJECTS ===');
const p2024Html = fs.readFileSync('./extracted_site_data/2024-projects.html', 'utf8');
// Look for sections / columns with headings and images
const p2024Sections = p2024Html.match(/<section[^>]*class="[^"]*elementor-top-section[^"]*"[\s\S]*?<\/section>/gi) || [];
console.log(`Found ${p2024Sections.length} top sections in 2024-projects.html`);

p2024Sections.forEach((sec, idx) => {
  const headings = (sec.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || []).map(stripTags);
  const images = (sec.match(/src="([^"]+)"/gi) || []).map(m => m.replace(/src="|"/g, ''));
  const text = stripTags(sec);
  if (headings.length > 0 && !headings.every(h => ['Office Address', 'Opening Hours:', 'Email Us:', 'Call Us Now', '2024 Projects'].includes(h))) {
    console.log(`\n--- 2024 Project Section ${idx} ---`);
    console.log(`Headings:`, headings);
    console.log(`Text summary:`, text.slice(0, 300));
    console.log(`Images count: ${images.length}`);
    images.forEach(img => {
      if (!img.includes('logo') && !img.includes('icon') && !img.includes('cropped-1')) {
        console.log(`   Image: ${img}`);
      }
    });
  }
});

console.log('\n=== EXTRACTING PROJECTS (General) ===');
const pGeneralHtml = fs.readFileSync('./extracted_site_data/projects.html', 'utf8');
const pGeneralSections = pGeneralHtml.match(/<section[^>]*class="[^"]*elementor-top-section[^"]*"[\s\S]*?<\/section>/gi) || [];
console.log(`Found ${pGeneralSections.length} top sections in projects.html`);

pGeneralSections.forEach((sec, idx) => {
  const headings = (sec.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || []).map(stripTags);
  const images = (sec.match(/src="([^"]+)"/gi) || []).map(m => m.replace(/src="|"/g, ''));
  const text = stripTags(sec);
  if (headings.length > 0 && !headings.every(h => ['Office Address', 'Opening Hours:', 'Email Us:', 'Call Us Now', 'Our Projects'].includes(h))) {
    console.log(`\n--- Project Section ${idx} ---`);
    console.log(`Headings:`, headings);
    console.log(`Text summary:`, text.slice(0, 300));
    console.log(`Images count: ${images.length}`);
    images.forEach(img => {
      if (!img.includes('logo') && !img.includes('icon') && !img.includes('cropped-1')) {
        console.log(`   Image: ${img}`);
      }
    });
  }
});
