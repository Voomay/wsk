const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Replace contact details
html = html.replace(/\(800\) 458-7920/g, '073 155 0289');
html = html.replace(/tel:\+18004587920/g, 'tel:+27731550289');
html = html.replace(/18004587920/g, '27731550289');
html = html.replace(/contact@wskelectricalrenovations\.com/g, 'info@wkeandcprojects.co.za');
html = html.replace(/742 Construction Blvd, Suite 400/g, '46 Brookford Road, Lotus River, Cape Town, 7941');
html = html.replace(/href="#" aria-label="Facebook"/g, 'href="https://www.facebook.com/WKElectricalConstructionProjects/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"');
html = html.replace(/href="#" aria-label="Instagram"/g, 'href="https://www.instagram.com/wkelectrical/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram"');

// Update Hero Slider images
const oldSliderRegex = /<div class="hero-slider" id="hero-slider">[\s\S]*?<\/div>\s*<div class="hero-overlay"><\/div>/i;
const newSliderHtml = `<div class="hero-slider" id="hero-slider">
        <div class="hero-slide active" style="background-image: url('assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-4.jpeg');" data-caption="Franschhoek 4-Bedroom Renovation &amp; Build (2024)"></div>
        <div class="hero-slide" style="background-image: url('assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.48-2.jpeg');" data-caption="100KW Industrial Solar &amp; Inverter Installation"></div>
        <div class="hero-slide" style="background-image: url('assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.12.59-PM-1.jpeg');" data-caption="Franschhoek Luxury Guest House Renovation"></div>
        <div class="hero-slide" style="background-image: url('assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.43.jpeg');" data-caption="PVC Ceiling Installation &amp; LED Lighting — Wesbank"></div>
      </div>
      <div class="hero-overlay"></div>`;

html = html.replace(oldSliderRegex, newSliderHtml);

// Update About Section
const oldAboutRegex = /<section class="section about-section" id="about">[\s\S]*?<\/section>/i;
const newAboutHtml = `<section class="section about-section" id="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-image-column">
          <div class="about-image-stack">
            <img src="assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59.jpeg" alt="WSK Master Renovation Project" class="about-img-main" style="border-radius: var(--border-radius-lg); object-fit: cover; height: 500px; width: 100%;">
            <div class="about-floating-card">
              <div class="floating-icon">
                <i class="fa-solid fa-award text-lime"></i>
              </div>
              <div class="floating-text">
                <span class="floating-title">100% In-House Master Crews</span>
                <span class="floating-sub">Your Idea Is Our Project</span>
              </div>
            </div>
          </div>
        </div>

        <div class="about-content-column">
          <span class="section-badge badge-blue">ABOUT WSK PROJECTS</span>
          <h2 class="section-title">Driven by Quality, Delivered with Integrity</h2>
          <p class="about-lead" style="font-size: 1.12rem; line-height: 1.7; color: var(--color-slate-800); margin-bottom: 1.25rem;">
            When considering renovation and construction companies in Cape Town, <strong>WSK Electrical And Renovation Projects</strong> stands out! We offer an extensive range of building and renovation services that are suited for commercial, leisure, retail, industrial, and residential requirements.
          </p>
          <p style="color: var(--color-slate-600); line-height: 1.65; margin-bottom: 1.5rem;">
            It is our aim to make our clients’ design dreams a reality through integrity, quality, and professional service delivery. Your project is so much more than a building — it’s the next place for great ideas, community, and growth. We are passionate and hands-on with every project, from big to small and everything in-between.
          </p>

          <div class="about-pillars-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 2rem;">
            <div style="background: #ffffff; padding: 1.25rem; border-radius: var(--border-radius-md); border-left: 4px solid var(--color-lime-500); box-shadow: var(--shadow-sm);">
              <h4 style="font-size: 1rem; font-weight: 800; color: var(--color-slate-950); margin-bottom: 0.35rem;"><i class="fa-solid fa-bullseye text-lime"></i> Our Mission</h4>
              <p style="font-size: 0.88rem; color: var(--color-slate-600); line-height: 1.5;">Assist clients to improve, upgrade &amp; renovate homes/offices &amp; businesses at affordable cost through honest &amp; reliable quality services.</p>
            </div>
            <div style="background: #ffffff; padding: 1.25rem; border-radius: var(--border-radius-md); border-left: 4px solid var(--color-blue-500); box-shadow: var(--shadow-sm);">
              <h4 style="font-size: 1rem; font-weight: 800; color: var(--color-slate-950); margin-bottom: 0.35rem;"><i class="fa-solid fa-eye text-blue"></i> Our Vision</h4>
              <p style="font-size: 0.88rem; color: var(--color-slate-600); line-height: 1.5;">To make WSK Electrical And Renovation Projects one of the leading &amp; best Renovation and Maintenance companies in South Africa.</p>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="portfolio.html" class="btn btn-lime">
              <i class="fa-solid fa-images"></i>
              <span>View All 14 Projects</span>
            </a>
            <a href="contact.html" class="btn btn-blue">
              <i class="fa-solid fa-phone"></i>
              <span>Call: 073 155 0289</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>`;

html = html.replace(oldAboutRegex, newAboutHtml);

// Update Testimonials Section
const oldReviewsRegex = /<section class="section reviews-section bg-slate-dark" id="reviews">[\s\S]*?<\/section>/i;
const newReviewsHtml = `<section class="section reviews-section bg-slate-dark" id="reviews">
    <div class="container">
      <div class="section-header text-center">
        <span class="section-badge badge-lime"><i class="fa-solid fa-star"></i> 100% VERIFIED CLIENT REVIEWS</span>
        <h2 class="section-title text-white">Hear What Our Happy Clients Say</h2>
        <p class="section-subtitle text-slate-300">
          "Your Idea Is Our Project" — Read real reviews from clients across Cape Town and the Western Cape who trusted WSK.
        </p>
      </div>

      <!-- Testimonials 4 Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2.5rem;">
        
        <!-- Review 1: Cheslin Mayham -->
        <div style="background-color: #0E1626; border: 1px solid var(--color-slate-800); border-radius: var(--border-radius-lg); padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-dark-card);">
          <div>
            <div style="color: #FBBF24; font-size: 1.1rem; margin-bottom: 1rem;">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-slate-200); line-height: 1.65; font-style: italic; margin-bottom: 1.5rem;">
              "WK Electrical &amp; Construction Projects is professional, delivering extremely good work without any hassles. I can strongly recommend them since they have completed various building projects at my home within time and without any comebacks. I was impressed with the effective communication with regards to the different stages of the building projects."
            </p>
          </div>
          <div style="border-top: 1px solid var(--color-slate-800); padding-top: 1rem;">
            <div style="font-family: var(--font-heading); font-weight: 800; font-size: 1.05rem; color: var(--color-lime-400);">Cheslin Mayham</div>
            <div style="font-size: 0.82rem; color: var(--color-slate-400);"><i class="fa-solid fa-circle-check text-lime"></i> Verified Homeowner • Cape Town</div>
          </div>
        </div>

        <!-- Review 2: Grant -->
        <div style="background-color: #0E1626; border: 1px solid var(--color-slate-800); border-radius: var(--border-radius-lg); padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-dark-card);">
          <div>
            <div style="color: #FBBF24; font-size: 1.1rem; margin-bottom: 1rem;">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-slate-200); line-height: 1.65; font-style: italic; margin-bottom: 1.5rem;">
              "Great Service all and All Thank you Guys for assisting me on short Notice with replacing my damaged Roof. Excellent Communication on explaining step by step what’s going to happen. I will definitely use and refer your business."
            </p>
          </div>
          <div style="border-top: 1px solid var(--color-slate-800); padding-top: 1rem;">
            <div style="font-family: var(--font-heading); font-weight: 800; font-size: 1.05rem; color: var(--color-blue-400);">Grant</div>
            <div style="font-size: 0.82rem; color: var(--color-slate-400);"><i class="fa-solid fa-circle-check text-blue"></i> Verified Property Owner • Cape Town</div>
          </div>
        </div>

        <!-- Review 3: Stacey Jansen -->
        <div style="background-color: #0E1626; border: 1px solid var(--color-slate-800); border-radius: var(--border-radius-lg); padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-dark-card);">
          <div>
            <div style="color: #FBBF24; font-size: 1.1rem; margin-bottom: 1rem;">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-slate-200); line-height: 1.65; font-style: italic; margin-bottom: 1.5rem;">
              "I had WK Electrical &amp; Construction Projects come to help us extend our current house with two additional bedrooms. They were very informative with guidance and assisting us to understand what the daily tasks were going to be. When I decide to do anymore Renovations they will be the people I’ll call. Great Job Guys well done!"
            </p>
          </div>
          <div style="border-top: 1px solid var(--color-slate-800); padding-top: 1rem;">
            <div style="font-family: var(--font-heading); font-weight: 800; font-size: 1.05rem; color: var(--color-lime-400);">Stacey Jansen</div>
            <div style="font-size: 0.82rem; color: var(--color-slate-400);"><i class="fa-solid fa-circle-check text-lime"></i> Home Extension Client • Cape Town</div>
          </div>
        </div>

        <!-- Review 4: Peggy Small -->
        <div style="background-color: #0E1626; border: 1px solid var(--color-slate-800); border-radius: var(--border-radius-lg); padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-dark-card);">
          <div>
            <div style="color: #FBBF24; font-size: 1.1rem; margin-bottom: 1rem;">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-slate-200); line-height: 1.65; font-style: italic; margin-bottom: 1.5rem;">
              "What a great company that managed to give me a quote that I was happy with and listen to what I wanted and advised on my concerns. I am really impressed with the workmanship and the conduct of all employees. The work was completed to my satisfaction and I’m looking forward to do more business with them soon."
            </p>
          </div>
          <div style="border-top: 1px solid var(--color-slate-800); padding-top: 1rem;">
            <div style="font-family: var(--font-heading); font-weight: 800; font-size: 1.05rem; color: var(--color-blue-400);">Peggy Small</div>
            <div style="font-size: 0.82rem; color: var(--color-slate-400);"><i class="fa-solid fa-circle-check text-blue"></i> Verified Client • Cape Town</div>
          </div>
        </div>

      </div>
    </div>
  </section>`;

html = html.replace(oldReviewsRegex, newReviewsHtml);

// Update Before-After Card
const oldBaRegex = /<div class="before-after-card">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Projects Showcase Grid/i;
const newBaHtml = `<div class="before-after-card">
        <div class="ba-header">
          <div class="ba-title-wrap">
            <span class="ba-tag"><i class="fa-solid fa-wand-magic-sparkles text-lime"></i> 2024 PROJECT TRANSFORMATION</span>
            <h3 class="ba-title">Franshhoek 4 Bedroom Building and Renovation Existing Home</h3>
            <p class="ba-meta">Structural additions, roof reconstruction, full electrical wiring, plumbing, and luxury interior finishes in Franschhoek (2024).</p>
          </div>
          <span class="badge-pill"><i class="fa-solid fa-calendar text-lime"></i> 2024 Project Highlight</span>
        </div>

        <div class="ba-stage" id="ba-stage">
          <img src="assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-4.jpeg" alt="After Franschhoek 4-Bedroom Renovation" class="ba-img ba-img-after">
          <div class="ba-before-wrap" id="ba-before-wrap" style="width: 50%;">
            <img src="assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.56.jpeg" alt="Before Franschhoek 4-Bedroom Renovation" class="ba-img ba-img-before">
          </div>
          <div class="ba-divider-handle" id="ba-handle" style="left: 50%;">
            <div class="ba-handle-btn">
              <i class="fa-solid fa-left-right"></i>
            </div>
          </div>
          <span class="ba-badge-label ba-label-before">Before Construction</span>
          <span class="ba-badge-label ba-label-after">Completed Renovation</span>
        </div>
      </div>
      
      <!-- Projects Showcase Grid`;

html = html.replace(oldBaRegex, newBaHtml);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html updated successfully with real extracted content, reviews, and images!');
