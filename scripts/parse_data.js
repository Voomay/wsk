const fs = require('fs');
const path = require('path');

function stripTags(html) {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
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

function extractMatches(html, regex) {
  const matches = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    matches.push(m);
  }
  return matches;
}

function analyzePages() {
  const files = fs.readdirSync('./extracted_site_data').filter(f => f.endsWith('.html'));
  console.log(`Analyzing ${files.length} HTML files...`);

  const summary = {};

  for (const file of files) {
    const filePath = path.join('./extracted_site_data', file);
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Find all phone numbers
    const phones = [...new Set((html.match(/(?:\+27|0)[0-9\s\-()]{8,15}/g) || []).map(p => p.trim()))];
    
    // Find all emails
    const emails = [...new Set((html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []).map(e => e.toLowerCase()))];
    
    // Find social links
    const socials = [...new Set((html.match(/https?:\/\/(?:www\.)?(?:facebook|instagram|linkedin|twitter|youtube|wa\.me|api\.whatsapp)\.com\/[^\s"']+/g) || []))];
    
    // Find headings
    const h1s = extractMatches(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map(m => stripTags(m[1]));
    const h2s = extractMatches(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi).map(m => stripTags(m[1]));
    const h3s = extractMatches(html, /<h3[^>]*>([\s\S]*?)<\/h3>/gi).map(m => stripTags(m[1]));

    summary[file] = {
      phones,
      emails,
      socials,
      h1s,
      h2s,
      h3s: h3s.slice(0, 15),
      rawLength: html.length
    };
  }

  fs.writeFileSync('./extracted_site_data/summary_overview.json', JSON.stringify(summary, null, 2));
  console.log('Summary overview written.');
}

analyzePages();
