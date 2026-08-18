const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, '..', 'extracted_raw');
if (fs.existsSync(rawDir)) {
  const rawFolders = fs.readdirSync(rawDir);
  console.log('raw folders:', rawFolders);
  rawFolders.forEach(rf => {
    const fPath = path.join(rawDir, rf);
    if (fs.statSync(fPath).isDirectory()) {
      const files = fs.readdirSync(fPath);
      console.log(`${rf} has ${files.length} files`);
    }
  });
}
