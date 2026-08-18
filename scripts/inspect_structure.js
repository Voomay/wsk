const fs = require('fs');

function inspectSections(filename) {
  const html = fs.readFileSync(filename, 'utf8');
  console.log(`\n=================== ${filename} ===================`);
  const sectionMatches = [...html.matchAll(/<(section|main|footer|header)[^>]*id="([^"]+)"[^>]*>/gi)];
  sectionMatches.forEach(m => console.log(`Tag: <${m[1]} id="${m[2]}">`));
}

inspectSections('index.html');
inspectSections('services.html');
inspectSections('portfolio.html');
inspectSections('contact.html');
