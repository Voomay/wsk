const fs = require('fs');
const path = require('path');

function updatePageContacts(filename) {
  const filePath = path.join(__dirname, '..', filename);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace contact details
  html = html.replace(/\(800\) 458-7920/g, '073 155 0289');
  html = html.replace(/tel:\+18004587920/g, 'tel:+27731550289');
  html = html.replace(/18004587920/g, '27731550289');
  html = html.replace(/contact@wskelectricalrenovations\.com/g, 'info@wkeandcprojects.co.za');
  html = html.replace(/742 Construction Blvd, Suite 400/g, '46 Brookford Road, Lotus River, Cape Town, 7941');
  html = html.replace(/href="#" aria-label="Facebook"/g, 'href="https://www.facebook.com/WKElectricalConstructionProjects/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"');
  html = html.replace(/href="#" aria-label="Instagram"/g, 'href="https://www.instagram.com/wkelectrical/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram"');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`${filename} updated successfully.`);
}

updatePageContacts('services.html');
updatePageContacts('contact.html');
