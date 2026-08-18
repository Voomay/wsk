const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, '..', 'contact.html');
let html = fs.readFileSync(contactPath, 'utf8');

// 1. Update Service Area Chips
const oldServiceAreaRegex = /<div class="service-area-chips">[\s\S]*?<\/div>/i;
const newServiceAreaHtml = `<div class="service-area-chips">
              <span class="area-pill"><i class="fa-solid fa-check text-lime"></i> Cape Town Metro</span>
              <span class="area-pill"><i class="fa-solid fa-check text-lime"></i> Lotus River &amp; Southern Suburbs</span>
              <span class="area-pill"><i class="fa-solid fa-check text-lime"></i> Franschhoek &amp; Winelands</span>
              <span class="area-pill"><i class="fa-solid fa-check text-lime"></i> Robertson &amp; Breede River</span>
              <span class="area-pill"><i class="fa-solid fa-check text-lime"></i> Woodstock &amp; City Bowl</span>
              <span class="area-pill"><i class="fa-solid fa-check text-lime"></i> Tamboerskloof &amp; Atlantic Seaboard</span>
              <span class="area-pill"><i class="fa-solid fa-check text-lime"></i> Wesbank &amp; Northern Suburbs</span>
            </div>`;
html = html.replace(oldServiceAreaRegex, newServiceAreaHtml);

// 2. Update Budget Chips to ZAR (Rand)
const oldBudgetRegex = /<div class="budget-chips-group">[\s\S]*?<\/div>/i;
const newBudgetHtml = `<div class="budget-chips-group">
                <label class="budget-chip-label">
                  <input type="radio" name="budget-tier" value="< R50,000">
                  <div class="budget-chip-box">&lt; R50k</div>
                </label>
                <label class="budget-chip-label">
                  <input type="radio" name="budget-tier" value="R50,000 - R150,000">
                  <div class="budget-chip-box">R50k – R150k</div>
                </label>
                <label class="budget-chip-label">
                  <input type="radio" name="budget-tier" value="R150,000 - R350,000" checked>
                  <div class="budget-chip-box">R150k – R350k</div>
                </label>
                <label class="budget-chip-label">
                  <input type="radio" name="budget-tier" value="R350,000 - R750,000">
                  <div class="budget-chip-box">R350k – R750k</div>
                </label>
                <label class="budget-chip-label">
                  <input type="radio" name="budget-tier" value="R750,000+">
                  <div class="budget-chip-box">R750k+</div>
                </label>
                <label class="budget-chip-label">
                  <input type="radio" name="budget-tier" value="Need Guidance">
                  <div class="budget-chip-box">Need Guidance</div>
                </label>
              </div>`;
html = html.replace(oldBudgetRegex, newBudgetHtml);

// 3. Update Google Map Embed to Lotus River, Cape Town
const mapEmbedRegex = /<iframe[^>]*src="https:\/\/www\.google\.com\/maps\/embed[^"]*"[^>]*><\/iframe>/i;
const newMapEmbedHtml = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.4729388319694!2d18.5140889!3d-34.0203029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc43c4cbaf7749%3A0xe54d24fecf7203b5!2s46%20Brookford%20Rd%2C%20Lotus%20River%2C%20Cape%20Town%2C%207941!5e0!3m2!1sen!2sza!4v1710000000000!5m2!1sen!2sza" width="100%" height="450" style="border:0; border-radius: var(--border-radius-lg);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

if (html.match(mapEmbedRegex)) {
  html = html.replace(mapEmbedRegex, newMapEmbedHtml);
}

fs.writeFileSync(contactPath, html, 'utf8');
console.log('contact.html updated with ZAR currency, Cape Town regions, and Lotus River map!');
