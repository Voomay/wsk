const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

function showSection(id) {
  const regex = new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?<\\/section>`, 'i');
  const match = indexHtml.match(regex);
  if (match) {
    console.log(`\n================ SECTION #${id} (length: ${match[0].length}) ================`);
    console.log(match[0].substring(0, 1000) + '...\n');
  } else {
    console.log(`\nSection #${id} not found.`);
  }
}

showSection('about');
showSection('services');
showSection('portfolio');
showSection('reviews');
showSection('contact');
