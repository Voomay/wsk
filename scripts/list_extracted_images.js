const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'extracted_site_data', 'images');
const files = fs.readdirSync(imgDir);

console.log(`Found ${files.length} images in extracted_site_data/images:`);
console.log(files.slice(0, 30));
