const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Full 11 Services HTML for index.html
const newServicesGridHtml = `<div class="services-grid" id="services-container">
        <!-- Service 1: Building & Plastering -->
        <article class="service-card" data-category="construction">
          <div class="service-icon-wrap icon-cream">
            <i class="fa-solid fa-trowel-bricks"></i>
          </div>
          <span class="service-badge text-cream-dark">Construction</span>
          <h3 class="service-title">All Building &amp; Plastering</h3>
          <p class="service-desc">
            Complete bricklaying, plastering, foundation work, structural additions, alterations, and boundary walls with guaranteed structural integrity.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-lime"></i> Home Extensions &amp; Alterations</li>
            <li><i class="fa-solid fa-check text-lime"></i> Bricklaying &amp; Smooth Plastering</li>
            <li><i class="fa-solid fa-check text-lime"></i> Structural Reinforcement</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> Custom Scope</span>
            <a href="services.html" class="service-btn text-lime">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 2: Electrical & Maintenance -->
        <article class="service-card" data-category="electrical">
          <div class="service-icon-wrap icon-blue">
            <i class="fa-solid fa-bolt-lightning text-blue"></i>
          </div>
          <span class="service-badge text-blue">Electrical</span>
          <h3 class="service-title">Electrical &amp; Electrical Maintenance</h3>
          <p class="service-desc">
            Certified residential and commercial electrical wiring, DB board upgrades/relocation, fault finding, and Certificates of Compliance (CoC).
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-blue"></i> DB Relocations &amp; Upgrades</li>
            <li><i class="fa-solid fa-check text-blue"></i> Solar &amp; Inverter Power Wiring</li>
            <li><i class="fa-solid fa-check text-blue"></i> Fault Finding &amp; Maintenance</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> Rapid Response</span>
            <a href="services.html" class="service-btn text-blue">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 3: Ceilings & Partitioning -->
        <article class="service-card" data-category="renovation">
          <div class="service-icon-wrap icon-lime">
            <i class="fa-solid fa-border-all text-lime"></i>
          </div>
          <span class="service-badge text-lime">Finishes</span>
          <h3 class="service-title">Ceilings &amp; Partitioning</h3>
          <p class="service-desc">
            Specialized PVC ceilings, drywall partitioning, drop ceilings, bulkheads, and integrated energy-efficient LED downlights.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-lime"></i> Moisture-Resistant PVC Ceilings</li>
            <li><i class="fa-solid fa-check text-lime"></i> Integrated LED Downlight Wiring</li>
            <li><i class="fa-solid fa-check text-lime"></i> Drywall &amp; Office Partitions</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> 1 - 2 Weeks</span>
            <a href="services.html" class="service-btn text-lime">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 4: Waterproofing -->
        <article class="service-card" data-category="renovation">
          <div class="service-icon-wrap icon-blue">
            <i class="fa-solid fa-shield-halved text-blue"></i>
          </div>
          <span class="service-badge text-blue">Protection</span>
          <h3 class="service-title">Waterproofing &amp; Roof Sealing</h3>
          <p class="service-desc">
            Flat roof waterproofing, parapet wall sealing, torch-on membrane systems, foundation waterproofing, and permanent leak remediation.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-blue"></i> Torch-On Membrane Systems</li>
            <li><i class="fa-solid fa-check text-blue"></i> Parapet &amp; Joint Waterproofing</li>
            <li><i class="fa-solid fa-check text-blue"></i> Guaranteed Leak-Free Protection</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> Fast Turnaround</span>
            <a href="services.html" class="service-btn text-blue">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 5: Painting -->
        <article class="service-card" data-category="renovation">
          <div class="service-icon-wrap icon-lime">
            <i class="fa-solid fa-paint-roller text-lime"></i>
          </div>
          <span class="service-badge text-lime">Finishes</span>
          <h3 class="service-title">Interior &amp; Exterior Painting</h3>
          <p class="service-desc">
            High-grade interior and exterior weatherproof painting, roof coatings, decorative plaster finishes, and timber/decking protection.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-lime"></i> Weather-Resistant Exterior Paint</li>
            <li><i class="fa-solid fa-check text-lime"></i> Premium Interior Wall Coatings</li>
            <li><i class="fa-solid fa-check text-lime"></i> Timber Deck Restoration &amp; Sealing</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> 1 - 2 Weeks</span>
            <a href="services.html" class="service-btn text-lime">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 6: Paving -->
        <article class="service-card" data-category="construction">
          <div class="service-icon-wrap icon-cream">
            <i class="fa-solid fa-road text-cream-dark"></i>
          </div>
          <span class="service-badge text-cream-dark">Groundworks</span>
          <h3 class="service-title">Paving &amp; Outdoor Groundworks</h3>
          <p class="service-desc">
            Driveway paving, walkway paving, patio installations, kerbing, and ground leveling built for durability and clean curb appeal.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-lime"></i> Interlocking &amp; Cobble Paving</li>
            <li><i class="fa-solid fa-check text-lime"></i> Commercial &amp; Residential Paving</li>
            <li><i class="fa-solid fa-check text-lime"></i> Site Compaction &amp; Kerbing</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> 1 - 3 Weeks</span>
            <a href="services.html" class="service-btn text-cream">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 7: Plumbing -->
        <article class="service-card" data-category="renovation">
          <div class="service-icon-wrap icon-blue">
            <i class="fa-solid fa-faucet-drip text-blue"></i>
          </div>
          <span class="service-badge text-blue">Plumbing</span>
          <h3 class="service-title">Full Plumbing &amp; Sanitary Ware</h3>
          <p class="service-desc">
            Complete bathroom and kitchen plumbing installations, geyser replacements/repairs, pipe rerouting, drainage, and modern sanitary fitout.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-blue"></i> Bathroom &amp; Kitchen Plumbing</li>
            <li><i class="fa-solid fa-check text-blue"></i> Geyser Installations &amp; Valves</li>
            <li><i class="fa-solid fa-check text-blue"></i> Drainage &amp; High-Pressure Systems</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> Fast Service</span>
            <a href="services.html" class="service-btn text-blue">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 8: Tiling & Flooring -->
        <article class="service-card" data-category="renovation">
          <div class="service-icon-wrap icon-lime">
            <i class="fa-solid fa-layer-group text-lime"></i>
          </div>
          <span class="service-badge text-lime">Flooring</span>
          <h3 class="service-title">Tiling, Laminated &amp; All Flooring</h3>
          <p class="service-desc">
            Precision porcelain, ceramic, and natural stone tiling, laminate flooring installation, vinyl flooring, and sub-floor screeding.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-lime"></i> Large-Format Floor &amp; Wall Tiling</li>
            <li><i class="fa-solid fa-check text-lime"></i> Laminated &amp; Luxury Vinyl Flooring</li>
            <li><i class="fa-solid fa-check text-lime"></i> Laser-Level Screeding</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> 1 - 2 Weeks</span>
            <a href="services.html" class="service-btn text-lime">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 9: Carpentry -->
        <article class="service-card" data-category="renovation">
          <div class="service-icon-wrap icon-cream">
            <i class="fa-solid fa-hammer text-cream-dark"></i>
          </div>
          <span class="service-badge text-cream-dark">Joinery</span>
          <h3 class="service-title">Carpentry &amp; Custom Cabinetry</h3>
          <p class="service-desc">
            Custom kitchen cabinets, built-in cupboards (BICs), timber decking restoration, door hanging, and roof timber structural work.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-lime"></i> Built-In Bedroom &amp; Kitchen Cupboards</li>
            <li><i class="fa-solid fa-check text-lime"></i> Hardwood Decking &amp; Pergolas</li>
            <li><i class="fa-solid fa-check text-lime"></i> Custom Timber Woodwork</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> 2 - 4 Weeks</span>
            <a href="services.html" class="service-btn text-cream">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 10: Aluminium Windows -->
        <article class="service-card" data-category="renovation">
          <div class="service-icon-wrap icon-blue">
            <i class="fa-solid fa-window-maximize text-blue"></i>
          </div>
          <span class="service-badge text-blue">Windows &amp; Doors</span>
          <h3 class="service-title">Aluminium Windows &amp; Doors</h3>
          <p class="service-desc">
            Custom aluminium window and sliding door fabrication and installation, folding stack doors, and frame replacements for modern security.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-blue"></i> Modern Sliding &amp; Stacker Doors</li>
            <li><i class="fa-solid fa-check text-blue"></i> Energy-Efficient Window Frames</li>
            <li><i class="fa-solid fa-check text-blue"></i> Custom Architectural Sizing</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> 1 - 3 Weeks</span>
            <a href="services.html" class="service-btn text-blue">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>

        <!-- Service 11: Property Maintenance -->
        <article class="service-card" data-category="renovation">
          <div class="service-icon-wrap icon-lime">
            <i class="fa-solid fa-wrench text-lime"></i>
          </div>
          <span class="service-badge text-lime">Maintenance</span>
          <h3 class="service-title">All Home &amp; Office Maintenance</h3>
          <p class="service-desc">
            Turnkey general property maintenance, preventative commercial facility repairs, office fitouts, and fast diagnostic repairs.
          </p>
          <ul class="service-specs">
            <li><i class="fa-solid fa-check text-lime"></i> Commercial Office Maintenance</li>
            <li><i class="fa-solid fa-check text-lime"></i> Residential Turnkey Repairs</li>
            <li><i class="fa-solid fa-check text-lime"></i> General Facility Upkeep</li>
          </ul>
          <div class="service-footer">
            <span class="service-lead-time"><i class="fa-regular fa-clock"></i> On Demand</span>
            <a href="services.html" class="service-btn text-lime">Details <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>
      </div>`;

// Replace services container
const oldServicesGridRegex = /<div class="services-grid" id="services-container">[\s\S]*?<\/div>\s*<!-- View Full Services Catalog CTA -->/i;
html = html.replace(oldServicesGridRegex, `${newServicesGridHtml}\n\n      <!-- View Full Services Catalog CTA -->`);

// 2. Featured 6 Projects HTML for index.html
const newFeaturedProjectsHtml = `<div class="project-grid" id="project-grid">
        <!-- Project 1: Franschhoek 4-Bedroom Renovation -->
        <div class="project-card" data-type="renovation" onclick="window.location.href='portfolio.html'">
          <div class="project-img-wrap">
            <img src="assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-4.jpeg" alt="Franshhoek 4 bedroom building and renovation existing home" loading="lazy">
            <div class="project-overlay">
              <span class="btn btn-sm btn-lime">View 16 Photos</span>
            </div>
            <span class="project-badge badge-lime-pill">2024 Building &amp; Renovation</span>
          </div>
          <div class="project-details">
            <h4 class="project-name">Franshhoek 4 Bedroom Building &amp; Renovation</h4>
            <p class="project-location"><i class="fa-solid fa-location-dot text-lime"></i> Franschhoek, Western Cape • 2024</p>
            <div class="project-tags">
              <span>Full Addition</span>
              <span>Roof Rebuild</span>
              <span>Luxury Finishes</span>
            </div>
          </div>
        </div>

        <!-- Project 2: 16KW Sunsynk Solar -->
        <div class="project-card" data-type="electrical" onclick="window.location.href='portfolio.html'">
          <div class="project-img-wrap">
            <img src="assets/extracted/projects/02_16kw-sunsynk-inverter-30-panel/WhatsApp-Image-2025-01-23-at-07.41.48.jpeg" alt="16KW Sunsynk inverter installation and 30 panel" loading="lazy">
            <div class="project-overlay">
              <span class="btn btn-sm btn-blue">View 6 Photos</span>
            </div>
            <span class="project-badge badge-blue-pill">2024 Solar &amp; Inverter</span>
          </div>
          <div class="project-details">
            <h4 class="project-name">16KW Sunsynk Inverter &amp; 30 Solar Panels</h4>
            <p class="project-location"><i class="fa-solid fa-location-dot text-blue"></i> Cape Town • 2024</p>
            <div class="project-tags">
              <span>16KW Sunsynk</span>
              <span>30 High-Output Panels</span>
              <span>Load Shedding Backup</span>
            </div>
          </div>
        </div>

        <!-- Project 3: DB Relocation TheLab Franschhoek -->
        <div class="project-card" data-type="electrical" onclick="window.location.href='portfolio.html'">
          <div class="project-img-wrap">
            <img src="assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.48.11.jpeg" alt="Distribution Board Relocation - TheLab Franshhoek" loading="lazy">
            <div class="project-overlay">
              <span class="btn btn-sm btn-blue">View 6 Photos</span>
            </div>
            <span class="project-badge badge-blue-pill">Commercial Electrical</span>
          </div>
          <div class="project-details">
            <h4 class="project-name">DB Relocation — TheLab Franschhoek</h4>
            <p class="project-location"><i class="fa-solid fa-location-dot text-blue"></i> TheLab, Franschhoek • 2024</p>
            <div class="project-tags">
              <span>Main DB Relocation</span>
              <span>Surge Protection</span>
              <span>Compliance Certified</span>
            </div>
          </div>
        </div>

        <!-- Project 4: 100KW Industrial Solar -->
        <div class="project-card" data-type="electrical" onclick="window.location.href='portfolio.html'">
          <div class="project-img-wrap">
            <img src="assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.48-2.jpeg" alt="100Kw x2 50Kw in parallel with 180 550w Canadian panels" loading="lazy">
            <div class="project-overlay">
              <span class="btn btn-sm btn-blue">View 8 Photos</span>
            </div>
            <span class="project-badge badge-blue-pill">Industrial Solar Power</span>
          </div>
          <div class="project-details">
            <h4 class="project-name">100KW Industrial Solar (180 Canadian Panels)</h4>
            <p class="project-location"><i class="fa-solid fa-location-dot text-blue"></i> Western Cape • 2024</p>
            <div class="project-tags">
              <span>2x 50KW Inverters</span>
              <span>180x 550W Panels</span>
              <span>High Voltage Storage</span>
            </div>
          </div>
        </div>

        <!-- Project 5: Robertson 50KW Solar -->
        <div class="project-card" data-type="electrical" onclick="window.location.href='portfolio.html'">
          <div class="project-img-wrap">
            <img src="assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.42-2.jpeg" alt="Robertson 50Kw high voltage with 80 Canadian solar panels" loading="lazy">
            <div class="project-overlay">
              <span class="btn btn-sm btn-blue">View 8 Photos</span>
            </div>
            <span class="project-badge badge-blue-pill">Commercial Solar Power</span>
          </div>
          <div class="project-details">
            <h4 class="project-name">Robertson 50KW High-Voltage Solar</h4>
            <p class="project-location"><i class="fa-solid fa-location-dot text-blue"></i> Robertson, Western Cape • 2024</p>
            <div class="project-tags">
              <span>50KW High Voltage</span>
              <span>80 Canadian Panels</span>
              <span>Off-Grid Capability</span>
            </div>
          </div>
        </div>

        <!-- Project 6: PVC Ceiling & LED Downlights -->
        <div class="project-card" data-type="renovation" onclick="window.location.href='portfolio.html'">
          <div class="project-img-wrap">
            <img src="assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.43.jpeg" alt="PVC ceiling installation with LED down lights - Wesbank" loading="lazy">
            <div class="project-overlay">
              <span class="btn btn-sm btn-lime">View 8 Photos</span>
            </div>
            <span class="project-badge badge-lime-pill">Ceilings &amp; Lighting</span>
          </div>
          <div class="project-details">
            <h4 class="project-name">PVC Ceiling &amp; LED Downlights — Wesbank</h4>
            <p class="project-location"><i class="fa-solid fa-location-dot text-lime"></i> Wesbank, Cape Town • 2024</p>
            <div class="project-tags">
              <span>PVC Ceilings</span>
              <span>LED Downlights</span>
              <span>Modern Finishes</span>
            </div>
          </div>
        </div>
      </div>`;

// Replace project grid
const oldProjectGridRegex = /<div class="project-grid" id="project-grid">[\s\S]*?<\/div>\s*<!-- View All Projects CTA Banner -->/i;
html = html.replace(oldProjectGridRegex, `${newFeaturedProjectsHtml}\n\n      <!-- View All Projects CTA Banner -->`);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html services and featured projects grids updated with 100% real data!');
