const fs = require('fs');

function inspectAbout() {
  const html = fs.readFileSync('./extracted_site_data/about.html', 'utf8');
  console.log('=== ABOUT PAGE TEXT ===');
  // Match all paragraphs or text blocks
  const textBlocks = [...html.matchAll(/<(?:p|h[1-6]|span|div)[^>]*class="[^"]*(?:elementor-text-editor|elementor-heading-title|elementor-icon-box-description|elementor-icon-box-title)[^"]*"[^>]*>([\s\S]*?)<\/(?:p|h[1-6]|span|div)>/gi)];
  textBlocks.forEach((m, idx) => {
    const text = m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length > 5) {
      console.log(`[About ${idx}] ${text}`);
    }
  });
}

function inspectProjects2024() {
  const html = fs.readFileSync('./extracted_site_data/2024-projects.html', 'utf8');
  console.log('\n=== 2024 PROJECTS TEXT & IMAGES ===');
  const sections = html.split('<section');
  sections.forEach((sec, idx) => {
    const headings = [...sec.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const imgs = [...sec.matchAll(/(?:src|href)="([^"]+\.(?:jpg|jpeg|png|webp|mp4))"/gi)].map(m => m[1]);
    const cleanImgs = [...new Set(imgs)].filter(i => !i.includes('logo') && !i.includes('cropped-1') && !i.includes('icon'));
    const text = sec.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    if (headings.length > 0 && !headings.includes('Office Address') && !headings.includes('2024 Projects')) {
      console.log(`\n--- 2024 Sec ${idx} ---`);
      console.log('Headings:', headings);
      console.log('Images count:', cleanImgs.length);
      console.log('Sample images:', cleanImgs.slice(0, 5));
      console.log('Text snippet:', text.slice(0, 200));
    }
  });
}

function inspectProjectsGeneral() {
  const html = fs.readFileSync('./extracted_site_data/projects.html', 'utf8');
  console.log('\n=== GENERAL PROJECTS TEXT & IMAGES ===');
  const sections = html.split('<section');
  sections.forEach((sec, idx) => {
    const headings = [...sec.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const imgs = [...sec.matchAll(/(?:src|href)="([^"]+\.(?:jpg|jpeg|png|webp|mp4))"/gi)].map(m => m[1]);
    const cleanImgs = [...new Set(imgs)].filter(i => !i.includes('logo') && !i.includes('cropped-1') && !i.includes('icon'));
    const text = sec.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    if (headings.length > 0 && !headings.includes('Office Address') && !headings.includes('Our Projects')) {
      console.log(`\n--- Projects Sec ${idx} ---`);
      console.log('Headings:', headings);
      console.log('Images count:', cleanImgs.length);
      console.log('Sample images:', cleanImgs.slice(0, 5));
      console.log('Text snippet:', text.slice(0, 200));
    }
  });
}

inspectAbout();
inspectProjects2024();
inspectProjectsGeneral();
