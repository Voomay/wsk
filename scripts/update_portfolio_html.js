const fs = require('fs');
const path = require('path');

const portfolioPath = path.join(__dirname, '..', 'portfolio.html');
let html = fs.readFileSync(portfolioPath, 'utf8');

// Replace contact details
html = html.replace(/\(800\) 458-7920/g, '073 155 0289');
html = html.replace(/tel:\+18004587920/g, 'tel:+27731550289');
html = html.replace(/18004587920/g, '27731550289');
html = html.replace(/contact@wskelectricalrenovations\.com/g, 'info@wkeandcprojects.co.za');
html = html.replace(/742 Construction Blvd, Suite 400/g, '46 Brookford Road, Lotus River, Cape Town, 7941');
html = html.replace(/href="#" aria-label="Facebook"/g, 'href="https://www.facebook.com/WKElectricalConstructionProjects/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"');
html = html.replace(/href="#" aria-label="Instagram"/g, 'href="https://www.instagram.com/wkelectrical/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram"');

// Update Filter Buttons
const oldFiltersRegex = /<div class="portfolio-filters-list">[\s\S]*?<\/div>/i;
const newFiltersHtml = `<div class="portfolio-filters-list">
          <button class="pfilter-btn active" data-filter="all">
            <i class="fa-solid fa-border-all"></i> All Projects (14)
          </button>
          <button class="pfilter-btn" data-filter="featured-2024">
            <i class="fa-solid fa-star text-lime"></i> 2024 Projects
          </button>
          <button class="pfilter-btn" data-filter="electrical">
            <i class="fa-solid fa-bolt"></i> Solar &amp; Electrical
          </button>
          <button class="pfilter-btn" data-filter="renovation">
            <i class="fa-solid fa-house-chimney"></i> Building &amp; Renovation
          </button>
          <button class="pfilter-btn" data-filter="commercial">
            <i class="fa-solid fa-building"></i> Commercial &amp; Hospitality
          </button>
          <button class="pfilter-btn" data-filter="finishes">
            <i class="fa-solid fa-paint-roller"></i> Ceilings &amp; Finishes
          </button>
        </div>`;

html = html.replace(oldFiltersRegex, newFiltersHtml);

// Update Cards Grid
const generatedCards = fs.readFileSync(path.join(__dirname, 'generated_cards.html'), 'utf8');
const oldGridRegex = /<div class="portfolio-grid-v2" id="portfolio-grid-v2">[\s\S]*?<\/div>\s*<\/div>\s*<\/main>/i;
const newGridHtml = `<div class="portfolio-grid-v2" id="portfolio-grid-v2">\n\n${generatedCards}\n\n      </div>\n    </div>\n  </main>`;

html = html.replace(oldGridRegex, newGridHtml);

fs.writeFileSync(portfolioPath, html, 'utf8');
console.log('portfolio.html updated successfully with all 14 projects and real assets!');
