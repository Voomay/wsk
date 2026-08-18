const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, '..', 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

const formattedDatabase = JSON.parse(fs.readFileSync(path.join(__dirname, 'formatted_database.json'), 'utf8'));

// Replace phone numbers and email in script.js
scriptContent = scriptContent.replace(/\(800\) 458-7920/g, '073 155 0289');
scriptContent = scriptContent.replace(/18004587920/g, '27731550289');
scriptContent = scriptContent.replace(/contact@wskelectricalrenovations\.com/g, 'info@wkeandcprojects.co.za');

// Find WSK_PROJECTS_DATABASE block in script.js
const dbStartIdx = scriptContent.indexOf('const WSK_PROJECTS_DATABASE = [');
const dbEndIdx = scriptContent.indexOf('/* --------------------------------------------------------------------------\n   13. Interactive 10-Photo Project Explorer Controller', dbStartIdx);

if (dbStartIdx !== -1 && dbEndIdx !== -1) {
  const newDbCode = `const WSK_PROJECTS_DATABASE = ${JSON.stringify(formattedDatabase, null, 2)};\n\n`;
  scriptContent = scriptContent.substring(0, dbStartIdx) + newDbCode + scriptContent.substring(dbEndIdx);
  fs.writeFileSync(scriptPath, scriptContent, 'utf8');
  console.log('script.js updated successfully with all 14 projects database and SA contacts!');
} else {
  console.error('Could not locate WSK_PROJECTS_DATABASE block markers in script.js', { dbStartIdx, dbEndIdx });
}
