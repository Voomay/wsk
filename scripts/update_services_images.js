const fs = require('fs');
const path = require('path');

const servicesPath = path.join(__dirname, '..', 'services.html');
let html = fs.readFileSync(servicesPath, 'utf8');

// Replace showcase images with real extracted project photos
html = html.replace('assets/images/projects/panel_main.jpg', 'assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.48.11.jpeg');
html = html.replace('assets/images/projects/villa_main.jpg', 'assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-4.jpeg');
html = html.replace('assets/images/projects/addition_main.jpg', 'assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54.jpeg');
html = html.replace('assets/images/projects/office_main.jpg', 'assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.47.jpeg');
html = html.replace('assets/images/projects/solar_main.jpg', 'assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.48-2.jpeg');

fs.writeFileSync(servicesPath, html, 'utf8');
console.log('services.html images updated to real extracted project media!');
