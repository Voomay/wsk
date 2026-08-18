const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'assets', 'extracted', 'projects');
const dirs = fs.readdirSync(projectsDir);

console.log('Project directories:');
dirs.forEach(d => {
  const fullPath = path.join(projectsDir, d);
  if (fs.statSync(fullPath).isDirectory()) {
    const files = fs.readdirSync(fullPath);
    console.log(`Directory: ${d} -> ${files.length} files`);
    if (d.includes('13_')) {
      console.log('Sample files in 13:', files.slice(0, 5));
    }
  }
});
