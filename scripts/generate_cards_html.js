const fs = require('fs');
const path = require('path');

const projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'formatted_database.json'), 'utf8'));

const htmlCards = projects.map(p => {
  const photosCount = p.photos.length;
  const tagsHtml = p.tags.map(t => `<span class="project-tag">${t}</span>`).join('\n              ');
  
  return `        <!-- Project ${p.order}: ${p.shortTitle} -->
        <article class="project-card-full" data-category="${p.category}" data-year="${p.year}" onclick="openProjectExplorer('${p.id}')">
          <div class="project-thumb-wrapper">
            <img src="${p.cover}" alt="${p.title}" class="project-thumb-img" loading="lazy">
            <span class="project-badge-top">${p.badge}</span>
            <span class="project-photos-count"><i class="fa-solid fa-camera"></i> ${photosCount} Photos &amp; Specs</span>
          </div>
          <div class="project-card-body">
            <div class="project-specs-meta">
              <span><i class="fa-solid fa-location-dot text-lime"></i> ${p.location}</span>
              <span><i class="fa-solid fa-calendar text-blue"></i> ${p.year}</span>
              <span><i class="fa-solid fa-shield-check text-cream-dark"></i> Guaranteed Quality</span>
            </div>
            <h2 class="project-title-link">${p.title}</h2>
            <p class="project-summary-text">
              ${p.overview}
            </p>
            <div class="project-tags-row">
              ${tagsHtml}
            </div>
            <div class="project-card-action">
              <span class="text-lime" style="font-weight: 800; font-family: var(--font-heading);">${p.shortTitle}</span>
              <span class="project-view-btn">Inspect ${photosCount}-Photo Gallery <i class="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
        </article>`;
}).join('\n\n');

fs.writeFileSync(path.join(__dirname, 'generated_cards.html'), htmlCards);
console.log('Project cards HTML generated successfully.');
