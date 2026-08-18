const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'extracted_site_data', 'images');
const projectsBaseDir = path.join(__dirname, '..', 'assets', 'extracted', 'projects');

const websiteDataPath = path.join(__dirname, '..', 'extracted_site_data', 'WEBSITE_DATA.json');
const websiteData = JSON.parse(fs.readFileSync(websiteDataPath, 'utf8'));

console.log(`Organizing assets for ${websiteData.projects.length} projects...`);

const availableFiles = new Set(fs.readdirSync(srcDir));

websiteData.projects.forEach(proj => {
  const folderName = `${String(proj.order).padStart(2, '0')}_${proj.id}`;
  const targetDir = path.join(projectsBaseDir, folderName);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  let copied = 0;
  proj.images.forEach(imgName => {
    // If exact name exists in srcDir
    if (availableFiles.has(imgName)) {
      fs.copyFileSync(path.join(srcDir, imgName), path.join(targetDir, imgName));
      copied++;
    } else {
      // Look for case-insensitive or partial match
      const found = [...availableFiles].find(f => f.toLowerCase() === imgName.toLowerCase());
      if (found) {
        fs.copyFileSync(path.join(srcDir, found), path.join(targetDir, imgName));
        copied++;
      }
    }
  });

  console.log(`[Project ${proj.order}] ${folderName}: ${copied}/${proj.images.length} images copied.`);
});

console.log('All project folders populated successfully.');
