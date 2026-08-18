const fs = require('fs');

function inspectSections(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  console.log(`\n================= INSPECTING ${htmlFile} =================`);
  
  // Find all image URLs, srcset URLs, href to images, data-src, background-image URLs
  const imgUrls = (html.match(/https?:\/\/[^"'<>\s]+\.(?:jpg|jpeg|png|webp|gif|mp4)/gi) || []);
  console.log(`Total media URLs found in file: ${imgUrls.length}`);
  
  // Split by project heading
  const projectHeadings = html.match(/<h2[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  console.log(`Headings found: ${projectHeadings.length}`);
  
  projectHeadings.forEach((h, idx) => {
    console.log(`\nHeading [${idx}]: ${h.replace(/<[^>]+>/g, '').trim()}`);
  });

  // Let's find galleries or image widgets
  const galleryMatches = html.match(/<div[^>]*class="[^"]*gallery[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi) || [];
  console.log(`Galleries found: ${galleryMatches.length}`);

  // Let's find all images and their nearest headings
  const allImgsInDoc = [...html.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/gi)].map(m => m[1]);
  console.log(`<img> tags count: ${allImgsInDoc.length}`);
  allImgsInDoc.forEach((src, idx) => {
    console.log(`Img tag [${idx}]: ${src}`);
  });

  // Let's check background-image or video or gallery data
  const bgMatches = [...html.matchAll(/url\(&quot;([^&]+)&quot;\)|url\('([^']+)'\)|url\(([^)]+)\)/gi)];
  console.log(`Background URL matches: ${bgMatches.length}`);
  bgMatches.forEach((m, idx) => {
    console.log(`BG [${idx}]: ${m[1] || m[2] || m[3]}`);
  });

  // Also check <a> tags linking to images (Elementor lightboxes)
  const aLinks = [...html.matchAll(/<a[^>]+href="([^">]+\.(?:jpg|jpeg|png|webp|mp4))"[^>]*>/gi)].map(m => m[1]);
  console.log(`<a> lightbox image links count: ${aLinks.length}`);
  aLinks.forEach((src, idx) => {
    console.log(`Lightbox link [${idx}]: ${src}`);
  });
}

inspectSections('./extracted_site_data/2024-projects.html');
inspectSections('./extracted_site_data/projects.html');
