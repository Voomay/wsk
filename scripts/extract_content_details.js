const fs = require('fs');
const path = require('path');

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

function extractElementorWidgets(html) {
  // Let's extract testimonial carousels, icon boxes, galleries, headings, etc.
  const results = {
    testimonials: [],
    iconBoxes: [],
    projects: [],
    textBlocks: [],
    contactInfo: {}
  };

  // Extract testimonials from testimonial widgets or review widgets
  const testimonialBlocks = html.match(/<div[^>]*class="[^"]*(?:elementor-testimonial|testimonial-item|elementor-star-rating)[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi) || [];
  
  return results;
}

// Let's write detailed extractors for home, about, services, projects, 2024-projects, contact
const homeHtml = fs.readFileSync('./extracted_site_data/home.html', 'utf8');
const aboutHtml = fs.readFileSync('./extracted_site_data/about.html', 'utf8');
const servicesHtml = fs.readFileSync('./extracted_site_data/services.html', 'utf8');
const projectsHtml = fs.readFileSync('./extracted_site_data/projects.html', 'utf8');
const projects2024Html = fs.readFileSync('./extracted_site_data/2024-projects.html', 'utf8');
const contactHtml = fs.readFileSync('./extracted_site_data/contact-us.html', 'utf8');

// Let's extract contact info block from header and footer
console.log('--- HEADER & FOOTER CONTACT DATA ---');
const contactSnippets = [];
const headerFooterMatches = homeHtml.match(/<div[^>]*class="[^"]*elementor-widget-icon-box[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi) || [];
headerFooterMatches.forEach(m => {
  contactSnippets.push(stripTags(m));
});

console.log('Icon boxes / contact snippets:');
contactSnippets.forEach((s, idx) => console.log(`[${idx}] ${s}`));

// Let's extract testimonials from home.html
console.log('\n--- TESTIMONIALS ---');
const testimonialMatches = homeHtml.match(/<div[^>]*class="[^"]*elementor-testimonial[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi) || [];
console.log(`Found ${testimonialMatches.length} testimonial matches in home.html`);
testimonialMatches.forEach((t, i) => console.log(`Testimonial ${i}: ${stripTags(t)}`));

// Also check general swiper slide / review slides in home.html
const swiperSlides = homeHtml.match(/<div[^>]*class="[^"]*swiper-slide[^"]*"[\s\S]*?<\/div>/gi) || [];
console.log(`Found ${swiperSlides.length} swiper slides in home.html`);
swiperSlides.forEach((s, i) => {
  const text = stripTags(s);
  if (text.length > 20) {
    console.log(`Slide ${i}: ${text}`);
  }
});
