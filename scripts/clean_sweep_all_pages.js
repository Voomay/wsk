const fs = require('fs');
const path = require('path');

const files = ['index.html', 'services.html', 'portfolio.html', 'contact.html'];

files.forEach(f => {
  const filePath = path.join(__dirname, '..', f);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace any leftover dummy emails
  html = html.replace(/info@wskprojects\.com/g, 'info@wkeandcprojects.co.za');
  html = html.replace(/contact@wskelectricalrenovations\.com/g, 'info@wkeandcprojects.co.za');
  html = html.replace(/contact@wskprojects\.com/g, 'info@wkeandcprojects.co.za');

  // Replace any leftover dummy addresses
  html = html.replace(/WSK Design &amp; Project Center/g, '46 Brookford Road, Lotus River, Cape Town, 7941');
  html = html.replace(/Metro Area &amp; Surrounds/g, 'Western Cape, South Africa');
  html = html.replace(/Metro Area &amp; Surrounding 50-Mile Radius/g, 'Cape Town &amp; Western Cape');
  html = html.replace(/742 Construction Blvd, Suite 400/g, '46 Brookford Road, Lotus River, Cape Town, 7941');

  // Replace any dollar budget values in select dropdowns
  html = html.replace(/<option value="\$10,000 - \$25,000">[\s\S]*?<\/select>/i, `<option value="< R50,000">&lt; R50,000 (Maintenance / Minor)</option>
                    <option value="R50,000 - R150,000">R50,000 - R150,000 (Kitchen / Bath / DB)</option>
                    <option value="R150,000 - R350,000">R150,000 - R350,000 (Major Renovation / Solar)</option>
                    <option value="R350,000 - R750,000">R350,000 - R750,000 (Full Home Addition / Commercial)</option>
                    <option value="R750,000+">R750,000+ (Turnkey Development)</option>
                  </select>`);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Verified and polished ${f}`);
});
