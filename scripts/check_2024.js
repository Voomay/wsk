const fs = require('fs');

function check2024() {
  const html = fs.readFileSync('./extracted_site_data/2024-projects.html', 'utf8');
  const sections = html.split('<section');
  sections.forEach((sec, idx) => {
    const headings = [...sec.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const imgs = [...sec.matchAll(/(?:src|href)="([^"]+\.(?:jpg|jpeg|png|webp|mp4))"/gi)].map(m => m[1]);
    const cleanImgs = [...new Set(imgs)].filter(i => !i.includes('logo') && !i.includes('cropped-1') && !i.includes('icon'));
    
    if (headings.length > 0 && !headings.includes('Office Address') && !headings.includes('2024 Projects')) {
      console.log(`\n--- 2024 Sec ${idx} ---`);
      console.log('Headings:', headings);
      console.log('Images count:', cleanImgs.length);
      console.log('Images list:', cleanImgs);
    }
  });
}

check2024();
