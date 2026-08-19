/**
 * WSK Electrical & Renovation Projects
 * "Your Idea Is Our Project"
 * Interactive Controller & Dynamic Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeroSlider();
  initStickyHeader();
  initMobileDrawer();
  initStatCounters();
  initServiceFilters();
  initBeforeAfterSlider();
  initPortfolioFilters();
  initPortfolioSearchAndFilter();
  initProjectDetailsPage();
  initTestimonialsFilter();
  initFaqAccordion();
  initModalTriggers();
  initWhatsAppGreeting();
  initYear();
});

/* --------------------------------------------------------------------------
   0. Hero Background Slider
   -------------------------------------------------------------------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('#hero-slider .hero-slide');
  const dots = document.querySelectorAll('#hero-slider-dots .hero-dot');
  const captionTitle = document.getElementById('hero-slider-caption')?.querySelector('.slide-caption-title');
  const indicatorNum = document.getElementById('hero-slider-caption')?.querySelector('.slide-indicator-num');
  const prevBtn = document.getElementById('hero-prev-slide');
  const nextBtn = document.getElementById('hero-next-slide');
  const heroSection = document.getElementById('hero');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let sliderTimer = null;

  function updateSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    const activeSlide = slides[currentSlide];
    const caption = activeSlide ? activeSlide.getAttribute('data-caption') : 'Architectural Excellence';
    if (captionTitle) captionTitle.textContent = caption;
    if (indicatorNum) indicatorNum.textContent = `0${currentSlide + 1} / 0${slides.length}`;
  }

  function startAutoSlider() {
    stopAutoSlider();
    sliderTimer = setInterval(() => {
      updateSlide(currentSlide + 1);
    }, 6000);
  }

  function stopAutoSlider() {
    if (sliderTimer) clearInterval(sliderTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateSlide(currentSlide - 1);
      startAutoSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateSlide(currentSlide + 1);
      startAutoSlider();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIdx = parseInt(dot.getAttribute('data-slide'), 10);
      updateSlide(targetIdx);
      startAutoSlider();
    });
  });

  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoSlider);
    heroSection.addEventListener('mouseleave', startAutoSlider);
  }

  // Initial setup
  updateSlide(0);
  startAutoSlider();
}

/* --------------------------------------------------------------------------
   1. Sticky Header & Scroll Spy
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky shadow toggle
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy active link updater
    let currentSectionId = '';
    const sectionMap = {
      'hero': 'hero',
      'about': 'about',
      'pillars': 'about',
      'services': 'services',
      'portfolio': 'portfolio',
      'why-us': 'why-us',
      'reviews': 'reviews',
      'faq': 'why-us',
      'contact': 'contact'
    };

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    const targetNavId = sectionMap[currentSectionId] || currentSectionId;
    if (targetNavId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${targetNavId}` || (targetNavId === 'hero' && href === 'index.html')) {
          link.classList.add('active');
        } else if (href.startsWith('#') || href === 'index.html') {
          link.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const menuToggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  window.closeDrawer = function () {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', window.closeDrawer);
  if (backdrop) backdrop.addEventListener('click', window.closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', window.closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   3. Animated Stat Numbers
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const stats = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        stats.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          animateCount(stat, target, 1600);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) observer.observe(heroSection);
}

function animateCount(element, target, duration) {
  let startTimestamp = null;
  const startValue = 0;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easeProgress * (target - startValue) + startValue);
    element.textContent = currentValue.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  window.requestAnimationFrame(step);
}


/* --------------------------------------------------------------------------
   4. Interactive Services Filter & View More Toggle
   -------------------------------------------------------------------------- */
let servicesExpanded = false;
let currentServiceFilter = 'all';

function initServiceFilters() {
  const filterTabs = document.querySelectorAll('#service-filters .filter-tab');
  
  window.toggleMoreServices = function () {
    servicesExpanded = !servicesExpanded;
    applyServicesVisibility();
  };

  window.filterServices = function (category) {
    currentServiceFilter = category;
    
    filterTabs.forEach((tab) => {
      if (tab.getAttribute('data-filter') === category) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    applyServicesVisibility();
  };

  function applyServicesVisibility() {
    const cards = document.querySelectorAll('#services-container .service-card');
    const toggleWrap = document.querySelector('.services-toggle-wrap');
    const toggleText = document.getElementById('toggle-services-text');
    const toggleChevron = document.getElementById('toggle-services-chevron');
    
    if (!cards.length) return;

    let matchingCards = [];
    cards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      if (currentServiceFilter === 'all' || cardCategory === currentServiceFilter) {
        matchingCards.push(card);
      } else {
        card.style.display = 'none';
      }
    });

    if (currentServiceFilter === 'all') {
      if (toggleWrap) toggleWrap.style.display = 'block';
      
      matchingCards.forEach((card, index) => {
        if (index < 4 || servicesExpanded) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });

      if (toggleText && toggleChevron) {
        if (servicesExpanded) {
          toggleText.textContent = 'Show Fewer Services';
          toggleChevron.className = 'fa-solid fa-chevron-up toggle-services-icon';
        } else {
          toggleText.textContent = 'View More Services (7 More)';
          toggleChevron.className = 'fa-solid fa-chevron-down toggle-services-icon';
        }
      }
    } else {
      // When filtering specific category, show all matching cards
      matchingCards.forEach((card) => {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease forwards';
      });
      if (toggleWrap) toggleWrap.style.display = 'none';
    }
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      window.filterServices(filter);
    });
  });

  // Initial call to set state
  applyServicesVisibility();
}

/* --------------------------------------------------------------------------
   4b. Why Choose Us Image Catalog Controller
   -------------------------------------------------------------------------- */
const catalogData = [
  {
    src: 'assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-4.jpeg',
    tag: 'Franschhoek Project',
    title: '4-Bedroom Luxury Renovation & Build',
    desc: 'Complete turnkey architectural remodel, custom joinery, and certified electrical wiring.',
    badge: 'Featured Master Project'
  },
  {
    src: 'assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.48-2.jpeg',
    tag: 'Commercial Solar',
    title: '100KW Industrial Solar & 180 Canadian Panels',
    desc: 'Dual 50KW inverters, high-voltage battery storage, and complete 3-phase off-grid engineering.',
    badge: 'Industrial Clean Energy'
  },
  {
    src: 'assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.48.11.jpeg',
    tag: 'TheLab Franschhoek',
    title: 'Commercial DB Relocation & Surge Protection',
    desc: 'Full distribution board upgrade, precision cable management, and CoC electrical compliance.',
    badge: 'Certified Master Electrical'
  },
  {
    src: 'assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.43.jpeg',
    tag: 'Wesbank Project',
    title: 'PVC Ceiling Installation & LED Downlights',
    desc: 'Moisture-resistant high-gloss PVC ceilings with integrated energy-efficient LED downlighting.',
    badge: 'Architectural Finishes'
  },
  {
    src: 'assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2025-01-23-at-08.06.49.jpeg',
    tag: 'Luxury Bathrooms',
    title: 'Master Ensuite Remodel & Precision Tiling',
    desc: 'Large-format porcelain wall and floor tiles, concealed plumbing, and designer sanitary fixtures.',
    badge: 'Luxury Renovation'
  },
  {
    src: 'assets/extracted/projects/02_16kw-sunsynk-inverter-30-panel/WhatsApp-Image-2025-01-23-at-07.41.48-1.jpeg',
    tag: 'Backup Power',
    title: '16KW Sunsynk Inverter & 30-Panel Microgrid',
    desc: 'Seamless load-shedding protection, lithium storage integration, and smart app load management.',
    badge: 'Solar Microgrid'
  }
];

window.switchCatalogImage = function (index) {
  const item = catalogData[index];
  if (!item) return;

  const mainImg = document.getElementById('catalog-main-img');
  const tag = document.getElementById('catalog-tag');
  const title = document.getElementById('catalog-title');
  const desc = document.getElementById('catalog-desc');
  const badge = document.getElementById('catalog-category-badge');
  const thumbs = document.querySelectorAll('#catalog-thumbs .catalog-thumb');

  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = item.src;
      mainImg.alt = item.title;
      mainImg.style.opacity = '1';
    }, 150);
  }

  if (tag) tag.textContent = item.tag;
  if (title) title.textContent = item.title;
  if (desc) desc.textContent = item.desc;
  if (badge) badge.innerHTML = `<i class="fa-solid fa-certificate text-lime"></i> ${item.badge}`;

  thumbs.forEach((t, i) => {
    if (i === index) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
};

window.openServiceModal = function (serviceName) {
  const serviceSelect = document.getElementById('m-service');
  if (serviceSelect) {
    for (let opt of serviceSelect.options) {
      if (opt.text.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(opt.value.toLowerCase())) {
        serviceSelect.value = opt.value;
        break;
      }
    }
  }
  openQuoteModal();
};

/* --------------------------------------------------------------------------
   6. Interactive Before & After Image Comparison Slider
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('kitchen-comparison-slider');
  const beforeWrapper = document.getElementById('before-wrapper');
  const handle = document.getElementById('slider-handle');
  const beforeImg = document.getElementById('img-before');

  if (!container || !beforeWrapper || !handle || !beforeImg) return;

  let isDragging = false;

  function updateSlider(xPosition) {
    const rect = container.getBoundingClientRect();
    if (!rect.width) return;
    let posX = xPosition - rect.left;

    // Bounds checking
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;

    const percentage = Math.max(0, Math.min(100, (posX / rect.width) * 100));

    beforeWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;

    // Ensure the inner image width stays constant with the container width
    beforeImg.style.width = `${rect.width}px`;
  }

  // Adjust inner before image width on window resize and load
  function syncImageWidth() {
    const rect = container.getBoundingClientRect();
    if (rect.width) {
      beforeImg.style.width = `${rect.width}px`;
    }
  }

  window.addEventListener('resize', syncImageWidth);
  window.addEventListener('orientationchange', () => {
    setTimeout(syncImageWidth, 150);
  });

  if (beforeImg.complete) {
    syncImageWidth();
  } else {
    beforeImg.addEventListener('load', syncImageWidth);
  }
  setTimeout(syncImageWidth, 100);
  setTimeout(syncImageWidth, 500);

  // Mouse events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch events for mobile/tablet devices
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches && e.touches[0]) {
      updateSlider(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchcancel', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      updateSlider(e.touches[0].clientX);
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   7. Portfolio Project Category Filtering
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const pfilterTabs = document.querySelectorAll('#project-filters .filter-tab');
  const projectCards = document.querySelectorAll('#project-grid .project-card');

  pfilterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      pfilterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-pfilter');

      projectCards.forEach((card) => {
        const type = card.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

window.openProjectModal = function (projectName) {
  const notesField = document.getElementById('m-notes');
  if (notesField) {
    notesField.value = `I am interested in discussing a project similar in scope to: ${projectName}.`;
  }
  openQuoteModal();
};

/* --------------------------------------------------------------------------
   7. Testimonials Interactive Filtering
   -------------------------------------------------------------------------- */
function initTestimonialsFilter() {
  const tabs = document.querySelectorAll('#review-filter-tabs .filter-tab');
  const cards = document.querySelectorAll('#testimonials-grid .testimonial-card-v2');

  if (tabs.length === 0 || cards.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-test-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-test-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   9. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. Modal & Form Submission Handlers
   -------------------------------------------------------------------------- */
function initModalTriggers() {
  const modal = document.getElementById('quote-modal');
  if (!modal) return;

  window.openQuoteModal = function () {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeQuoteModal = function () {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeQuoteModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      window.closeQuoteModal();
    }
  });
}

window.handleHeroFormSubmit = function (e) {
  e.preventDefault();
  const form = document.getElementById('hero-quick-form');
  const nameInput = document.getElementById('hq-name');
  const serviceInput = document.getElementById('hq-service');
  const name = nameInput && nameInput.value ? nameInput.value.trim() : 'Valued Client';
  const service = serviceInput && serviceInput.value ? serviceInput.value : 'Your Project';

  showToast(`Thank you, ${name}! Your free estimate request for "${service}" has been received. Our Master Specialist will contact you within 2 hours.`, 'success');
  if (form) form.reset();
};

window.handleFormSubmit = function (e) {
  e.preventDefault();
  const form = document.getElementById('main-contact-form');
  const nameInput = document.getElementById('contact-name');
  const name = nameInput ? nameInput.value : 'Valued Client';

  showToast(`Thank you, ${name}! Your consultation request has been received. A Master Specialist will contact you within 2 hours.`, 'success');
  if (form) form.reset();
};

window.handleModalSubmit = function (e) {
  e.preventDefault();
  const form = document.getElementById('modal-quote-form');
  const nameInput = document.getElementById('m-name');
  const name = nameInput ? nameInput.value : 'Valued Client';

  showToast(`Proposal request submitted for ${name}! We will review your specs and send an itemized breakdown shortly.`, 'success');
  window.closeQuoteModal();
  if (form) form.reset();
};

function showToast(message, type = 'default') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check text-success"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

/* --------------------------------------------------------------------------
   11. Current Year & WhatsApp Greeting Popup
   -------------------------------------------------------------------------- */
function initYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function initWhatsAppGreeting() {
  const popup = document.getElementById('whatsapp-greeting-popup');
  const closeBtn = document.getElementById('wpg-close-btn');
  const whatsappBtn = document.getElementById('float-whatsapp-btn');

  if (!popup) return;

  // Show after 1.2s delay when entering the website
  let popupTimer = setTimeout(() => {
    popup.classList.add('open');
  }, 1200);

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.remove('open');
      clearTimeout(popupTimer);
    });
  }

  // Hovering on WhatsApp float button can show greeting
  if (whatsappBtn) {
    whatsappBtn.addEventListener('mouseenter', () => {
      popup.classList.add('open');
    });
  }
}

/* ==========================================================================
   12. Rich Project Portfolio Dataset (10 Photos + Descriptions per Project)
   ========================================================================== */
const WSK_PROJECTS_DATABASE = [
  {
    "id": "franschhoek-4-bedroom-2024",
    "order": 1,
    "title": "Franshhoek 4 bedroom building and renovation existing home - 2024",
    "shortTitle": "Franschhoek 4-Bedroom Renovation",
    "year": "2024",
    "category": "featured-2024",
    "badge": "2024 Project • Residential Building & Renovation",
    "location": "Franschhoek, Western Cape",
    "duration": "Completed 2024",
    "cover": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.56-1.jpeg",
    "tags": [
      "Residential Building & Renovation",
      "2024",
      "Franschhoek",
      "Certified Quality"
    ],
    "overview": "Complete 4-bedroom building addition and full renovation of an existing home in Franschhoek, including structural changes, roof work, electrical, plumbing, modern finishes, and interior renovations.",
    "challenge": "Executing franshhoek 4 bedroom building and renovation existing home - 2024 within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Franschhoek, Western Cape",
    "specs": {
      "Project Category": "Residential Building & Renovation",
      "Year Completed": "2024",
      "Location": "Franschhoek, Western Cape",
      "Scope of Work": "Franschhoek 4-Bedroom Renovation",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.56-1.jpeg",
        "title": "01. Franschhoek 4-Bedroom Renovation — Photo 1",
        "phase": "Project Highlight",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.56-2.jpeg",
        "title": "02. Franschhoek 4-Bedroom Renovation — Photo 2",
        "phase": "Execution & Progress",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.56.jpeg",
        "title": "03. Franschhoek 4-Bedroom Renovation — Photo 3",
        "phase": "Execution & Progress",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.57-1.jpeg",
        "title": "04. Franschhoek 4-Bedroom Renovation — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.57-2.jpeg",
        "title": "05. Franschhoek 4-Bedroom Renovation — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.57-3.jpeg",
        "title": "06. Franschhoek 4-Bedroom Renovation — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.57.jpeg",
        "title": "07. Franschhoek 4-Bedroom Renovation — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.58-1.jpeg",
        "title": "08. Franschhoek 4-Bedroom Renovation — Photo 8",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.58-2.jpeg",
        "title": "09. Franschhoek 4-Bedroom Renovation — Photo 9",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.58-3.jpeg",
        "title": "10. Franschhoek 4-Bedroom Renovation — Photo 10",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.58.jpeg",
        "title": "11. Franschhoek 4-Bedroom Renovation — Photo 11",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-1.jpeg",
        "title": "12. Franschhoek 4-Bedroom Renovation — Photo 12",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-2.jpeg",
        "title": "13. Franschhoek 4-Bedroom Renovation — Photo 13",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-3.jpeg",
        "title": "14. Franschhoek 4-Bedroom Renovation — Photo 14",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59-4.jpeg",
        "title": "15. Franschhoek 4-Bedroom Renovation — Photo 15",
        "phase": "Craftsmanship Details",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/01_franschhoek-4-bedroom-2024/WhatsApp-Image-2025-01-23-at-07.39.59.jpeg",
        "title": "16. Franschhoek 4-Bedroom Renovation — Photo 16",
        "phase": "Completed Project",
        "description": "Franshhoek 4 bedroom building and renovation existing home - 2024. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "16kw-sunsynk-inverter-30-panel",
    "order": 2,
    "title": "16KW Sunsynk inverter installation and 30 panel",
    "shortTitle": "16KW Sunsynk Solar Installation",
    "year": "2024",
    "category": "electrical",
    "badge": "2024 Project • Solar & Energy Solutions",
    "location": "Cape Town",
    "duration": "Completed 2024",
    "cover": "assets/extracted/projects/02_16kw-sunsynk-inverter-30-panel/WhatsApp-Image-2025-01-23-at-07.41.48-1.jpeg",
    "tags": [
      "Solar & Energy Solutions",
      "2024",
      "Cape Town",
      "Certified Quality"
    ],
    "overview": "High-capacity residential/commercial solar power setup featuring a 16KW Sunsynk hybrid inverter paired with 30 high-efficiency solar panels for complete energy independence and load shedding resilience.",
    "challenge": "Executing 16kw sunsynk inverter installation and 30 panel within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Cape Town",
    "specs": {
      "Project Category": "Solar & Energy Solutions",
      "Year Completed": "2024",
      "Location": "Cape Town",
      "Scope of Work": "16KW Sunsynk Solar Installation",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/02_16kw-sunsynk-inverter-30-panel/WhatsApp-Image-2025-01-23-at-07.41.48-1.jpeg",
        "title": "01. 16KW Sunsynk Solar Installation — Photo 1",
        "phase": "Project Highlight",
        "description": "16KW Sunsynk inverter installation and 30 panel. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/02_16kw-sunsynk-inverter-30-panel/WhatsApp-Image-2025-01-23-at-07.41.48-2.jpeg",
        "title": "02. 16KW Sunsynk Solar Installation — Photo 2",
        "phase": "Execution & Progress",
        "description": "16KW Sunsynk inverter installation and 30 panel. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/02_16kw-sunsynk-inverter-30-panel/WhatsApp-Image-2025-01-23-at-07.41.48.jpeg",
        "title": "03. 16KW Sunsynk Solar Installation — Photo 3",
        "phase": "Execution & Progress",
        "description": "16KW Sunsynk inverter installation and 30 panel. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/02_16kw-sunsynk-inverter-30-panel/WhatsApp-Image-2025-01-23-at-07.41.49-1.jpeg",
        "title": "04. 16KW Sunsynk Solar Installation — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "16KW Sunsynk inverter installation and 30 panel. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/02_16kw-sunsynk-inverter-30-panel/WhatsApp-Image-2025-01-23-at-07.41.49-2.jpeg",
        "title": "05. 16KW Sunsynk Solar Installation — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "16KW Sunsynk inverter installation and 30 panel. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/02_16kw-sunsynk-inverter-30-panel/WhatsApp-Image-2025-01-23-at-07.41.49.jpeg",
        "title": "06. 16KW Sunsynk Solar Installation — Photo 6",
        "phase": "Completed Project",
        "description": "16KW Sunsynk inverter installation and 30 panel. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "db-relocation-thelab-franschhoek",
    "order": 3,
    "title": "Distribution Board Relocation - TheLab Franshhoek",
    "shortTitle": "DB Relocation - TheLab Franschhoek",
    "year": "2024",
    "category": "electrical",
    "badge": "2024 Project • Commercial Electrical Engineering",
    "location": "TheLab, Franschhoek",
    "duration": "Completed 2024",
    "cover": "assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.48.11-1.jpeg",
    "tags": [
      "Commercial Electrical Engineering",
      "2024",
      "TheLab",
      "Certified Quality"
    ],
    "overview": "Specialized commercial electrical upgrade and main distribution board (DB) relocation, wiring reorganization, surge protection, and compliant certification for commercial premises.",
    "challenge": "Executing distribution board relocation - thelab franshhoek within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — TheLab, Franschhoek",
    "specs": {
      "Project Category": "Commercial Electrical Engineering",
      "Year Completed": "2024",
      "Location": "TheLab, Franschhoek",
      "Scope of Work": "DB Relocation - TheLab Franschhoek",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.48.11-1.jpeg",
        "title": "01. DB Relocation - TheLab Franschhoek — Photo 1",
        "phase": "Project Highlight",
        "description": "Distribution Board Relocation - TheLab Franshhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.48.11-2-1.jpeg",
        "title": "02. DB Relocation - TheLab Franschhoek — Photo 2",
        "phase": "Execution & Progress",
        "description": "Distribution Board Relocation - TheLab Franshhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.48.11.jpeg",
        "title": "03. DB Relocation - TheLab Franschhoek — Photo 3",
        "phase": "Execution & Progress",
        "description": "Distribution Board Relocation - TheLab Franshhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.48.12.jpeg",
        "title": "04. DB Relocation - TheLab Franschhoek — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Distribution Board Relocation - TheLab Franshhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.51.34-1.jpeg",
        "title": "05. DB Relocation - TheLab Franschhoek — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Distribution Board Relocation - TheLab Franshhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/03_db-relocation-thelab-franschhoek/WhatsApp-Image-2025-01-23-at-07.51.34.jpeg",
        "title": "06. DB Relocation - TheLab Franschhoek — Photo 6",
        "phase": "Completed Project",
        "description": "Distribution Board Relocation - TheLab Franshhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "100kw-commercial-solar-180-panels",
    "order": 4,
    "title": "100Kw x2 50Kw in parallel with 180 550w Canadian panels",
    "shortTitle": "100KW Industrial Solar System",
    "year": "2024",
    "category": "electrical",
    "badge": "2024 Project • Commercial & Industrial Solar",
    "location": "Western Cape",
    "duration": "Completed 2024",
    "cover": "assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.47.jpeg",
    "tags": [
      "Commercial & Industrial Solar",
      "2024",
      "Western Cape",
      "Certified Quality"
    ],
    "overview": "Large-scale 100KW commercial solar installation featuring twin 50KW inverters operating in parallel, supplied by 180 Canadian Solar 550W high-power photovoltaic panels.",
    "challenge": "Executing 100kw x2 50kw in parallel with 180 550w canadian panels within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Western Cape",
    "specs": {
      "Project Category": "Commercial & Industrial Solar",
      "Year Completed": "2024",
      "Location": "Western Cape",
      "Scope of Work": "100KW Industrial Solar System",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.47.jpeg",
        "title": "01. 100KW Industrial Solar System — Photo 1",
        "phase": "Project Highlight",
        "description": "100Kw x2 50Kw in parallel with 180 550w Canadian panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.48-1.jpeg",
        "title": "02. 100KW Industrial Solar System — Photo 2",
        "phase": "Execution & Progress",
        "description": "100Kw x2 50Kw in parallel with 180 550w Canadian panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.48-2.jpeg",
        "title": "03. 100KW Industrial Solar System — Photo 3",
        "phase": "Execution & Progress",
        "description": "100Kw x2 50Kw in parallel with 180 550w Canadian panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.48-3.jpeg",
        "title": "04. 100KW Industrial Solar System — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "100Kw x2 50Kw in parallel with 180 550w Canadian panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.48.jpeg",
        "title": "05. 100KW Industrial Solar System — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "100Kw x2 50Kw in parallel with 180 550w Canadian panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.49-1.jpeg",
        "title": "06. 100KW Industrial Solar System — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "100Kw x2 50Kw in parallel with 180 550w Canadian panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.49-2.jpeg",
        "title": "07. 100KW Industrial Solar System — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "100Kw x2 50Kw in parallel with 180 550w Canadian panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/04_100kw-commercial-solar-180-panels/WhatsApp-Image-2025-01-23-at-07.43.49.jpeg",
        "title": "08. 100KW Industrial Solar System — Photo 8",
        "phase": "Completed Project",
        "description": "100Kw x2 50Kw in parallel with 180 550w Canadian panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "robertson-50kw-high-voltage-80-solar-panels",
    "order": 5,
    "title": "Robertson 50Kw high voltage with 80 Canadian solar panels",
    "shortTitle": "Robertson 50KW High Voltage Solar",
    "year": "2024",
    "category": "electrical",
    "badge": "2024 Project • Commercial Solar Power",
    "location": "Robertson, Western Cape",
    "duration": "Completed 2024",
    "cover": "assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.42-1.jpeg",
    "tags": [
      "Commercial Solar Power",
      "2024",
      "Robertson",
      "Certified Quality"
    ],
    "overview": "High-voltage 50KW commercial solar installation in Robertson fitted with 80 Canadian Solar panels and high-voltage battery storage for agricultural / commercial facility.",
    "challenge": "Executing robertson 50kw high voltage with 80 canadian solar panels within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Robertson, Western Cape",
    "specs": {
      "Project Category": "Commercial Solar Power",
      "Year Completed": "2024",
      "Location": "Robertson, Western Cape",
      "Scope of Work": "Robertson 50KW High Voltage Solar",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.42-1.jpeg",
        "title": "01. Robertson 50KW High Voltage Solar — Photo 1",
        "phase": "Project Highlight",
        "description": "Robertson 50Kw high voltage with 80 Canadian solar panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.42-2.jpeg",
        "title": "02. Robertson 50KW High Voltage Solar — Photo 2",
        "phase": "Execution & Progress",
        "description": "Robertson 50Kw high voltage with 80 Canadian solar panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.42-3.jpeg",
        "title": "03. Robertson 50KW High Voltage Solar — Photo 3",
        "phase": "Execution & Progress",
        "description": "Robertson 50Kw high voltage with 80 Canadian solar panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.42.jpeg",
        "title": "04. Robertson 50KW High Voltage Solar — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Robertson 50Kw high voltage with 80 Canadian solar panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.43-1.jpeg",
        "title": "05. Robertson 50KW High Voltage Solar — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Robertson 50Kw high voltage with 80 Canadian solar panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.43-2.jpeg",
        "title": "06. Robertson 50KW High Voltage Solar — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "Robertson 50Kw high voltage with 80 Canadian solar panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.43-3.jpeg",
        "title": "07. Robertson 50KW High Voltage Solar — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "Robertson 50Kw high voltage with 80 Canadian solar panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/05_robertson-50kw-high-voltage-80-solar-panels/WhatsApp-Image-2025-01-23-at-07.46.43.jpeg",
        "title": "08. Robertson 50KW High Voltage Solar — Photo 8",
        "phase": "Completed Project",
        "description": "Robertson 50Kw high voltage with 80 Canadian solar panels. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "pvc-ceiling-downlights-wesbank",
    "order": 6,
    "title": "PVC ceiling installation with LED down lights - Wesbank",
    "shortTitle": "PVC Ceiling & LED Downlights",
    "year": "2024",
    "category": "finishes",
    "badge": "2024 Project • Ceilings & Lighting",
    "location": "Wesbank, Cape Town",
    "duration": "Completed 2024",
    "cover": "assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.43-1.jpeg",
    "tags": [
      "Ceilings & Lighting",
      "2024",
      "Wesbank",
      "Certified Quality"
    ],
    "overview": "Precision installation of low-maintenance, moisture-resistant PVC ceilings with integrated energy-efficient LED downlights and modern aesthetic trim.",
    "challenge": "Executing pvc ceiling installation with led down lights - wesbank within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Wesbank, Cape Town",
    "specs": {
      "Project Category": "Ceilings & Lighting",
      "Year Completed": "2024",
      "Location": "Wesbank, Cape Town",
      "Scope of Work": "PVC Ceiling & LED Downlights",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.43-1.jpeg",
        "title": "01. PVC Ceiling & LED Downlights — Photo 1",
        "phase": "Project Highlight",
        "description": "PVC ceiling installation with LED down lights - Wesbank. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.43-2.jpeg",
        "title": "02. PVC Ceiling & LED Downlights — Photo 2",
        "phase": "Execution & Progress",
        "description": "PVC ceiling installation with LED down lights - Wesbank. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.43.jpeg",
        "title": "03. PVC Ceiling & LED Downlights — Photo 3",
        "phase": "Execution & Progress",
        "description": "PVC ceiling installation with LED down lights - Wesbank. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.44-1.jpeg",
        "title": "04. PVC Ceiling & LED Downlights — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "PVC ceiling installation with LED down lights - Wesbank. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.44-2.jpeg",
        "title": "05. PVC Ceiling & LED Downlights — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "PVC ceiling installation with LED down lights - Wesbank. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.44.jpeg",
        "title": "06. PVC Ceiling & LED Downlights — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "PVC ceiling installation with LED down lights - Wesbank. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.45-1.jpeg",
        "title": "07. PVC Ceiling & LED Downlights — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "PVC ceiling installation with LED down lights - Wesbank. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/06_pvc-ceiling-downlights-wesbank/WhatsApp-Image-2025-01-23-at-07.54.45.jpeg",
        "title": "08. PVC Ceiling & LED Downlights — Photo 8",
        "phase": "Completed Project",
        "description": "PVC ceiling installation with LED down lights - Wesbank. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "bathroom-renovation-2021",
    "order": 7,
    "title": "Bathroom Renovation 2021",
    "shortTitle": "Complete Bathroom Renovation",
    "year": "2021",
    "category": "renovation",
    "badge": "2021 Project • Plumbing & Tiling",
    "location": "Cape Town",
    "duration": "Completed 2021",
    "cover": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.17-1.jpeg",
    "tags": [
      "Plumbing & Tiling",
      "2021",
      "Cape Town",
      "Certified Quality"
    ],
    "overview": "Modern luxury bathroom redesign, comprehensive plumbing replacement, premium large-format floor and wall tiling, walk-in shower installation, and sanitary ware fitout.",
    "challenge": "Executing bathroom renovation 2021 within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Cape Town",
    "specs": {
      "Project Category": "Plumbing & Tiling",
      "Year Completed": "2021",
      "Location": "Cape Town",
      "Scope of Work": "Complete Bathroom Renovation",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.17-1.jpeg",
        "title": "01. Complete Bathroom Renovation — Photo 1",
        "phase": "Project Highlight",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.17.jpeg",
        "title": "02. Complete Bathroom Renovation — Photo 2",
        "phase": "Execution & Progress",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.18-1.jpeg",
        "title": "03. Complete Bathroom Renovation — Photo 3",
        "phase": "Execution & Progress",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.18.jpeg",
        "title": "04. Complete Bathroom Renovation — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.19-1.jpeg",
        "title": "05. Complete Bathroom Renovation — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.19.jpeg",
        "title": "06. Complete Bathroom Renovation — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.20-1.jpeg",
        "title": "07. Complete Bathroom Renovation — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.20.jpeg",
        "title": "08. Complete Bathroom Renovation — Photo 8",
        "phase": "Craftsmanship Details",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.45.jpeg",
        "title": "09. Complete Bathroom Renovation — Photo 9",
        "phase": "Craftsmanship Details",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.46-1.jpeg",
        "title": "10. Complete Bathroom Renovation — Photo 10",
        "phase": "Craftsmanship Details",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/07_bathroom-renovation-2021/WhatsApp-Image-2022-12-15-at-22.59.46.jpeg",
        "title": "11. Complete Bathroom Renovation — Photo 11",
        "phase": "Completed Project",
        "description": "Bathroom Renovation 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "tamboerskloof-project-2021",
    "order": 8,
    "title": "Tamboerskloof Project 2021",
    "shortTitle": "Tamboerskloof Residential Transformation",
    "year": "2021",
    "category": "renovation",
    "badge": "2021 Project • Full Home Renovation",
    "location": "Tamboerskloof, Cape Town",
    "duration": "Completed 2021",
    "cover": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.09.jpeg",
    "tags": [
      "Full Home Renovation",
      "2021",
      "Tamboerskloof",
      "Certified Quality"
    ],
    "overview": "Extensive renovation project in Tamboerskloof covering structural renovations, interior redesign, electrical upgrades, customized painting, and bespoke finishing.",
    "challenge": "Executing tamboerskloof project 2021 within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Tamboerskloof, Cape Town",
    "specs": {
      "Project Category": "Full Home Renovation",
      "Year Completed": "2021",
      "Location": "Tamboerskloof, Cape Town",
      "Scope of Work": "Tamboerskloof Residential Transformation",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.09.jpeg",
        "title": "01. Tamboerskloof Residential Transformation — Photo 1",
        "phase": "Project Highlight",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.10-1.jpeg",
        "title": "02. Tamboerskloof Residential Transformation — Photo 2",
        "phase": "Execution & Progress",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.10.jpeg",
        "title": "03. Tamboerskloof Residential Transformation — Photo 3",
        "phase": "Execution & Progress",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.11-1.jpeg",
        "title": "04. Tamboerskloof Residential Transformation — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.11.jpeg",
        "title": "05. Tamboerskloof Residential Transformation — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.12-1.jpeg",
        "title": "06. Tamboerskloof Residential Transformation — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.12-2.jpeg",
        "title": "07. Tamboerskloof Residential Transformation — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.12.jpeg",
        "title": "08. Tamboerskloof Residential Transformation — Photo 8",
        "phase": "Craftsmanship Details",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.13-1.jpeg",
        "title": "09. Tamboerskloof Residential Transformation — Photo 9",
        "phase": "Craftsmanship Details",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.13.jpeg",
        "title": "10. Tamboerskloof Residential Transformation — Photo 10",
        "phase": "Craftsmanship Details",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.14-1.jpeg",
        "title": "11. Tamboerskloof Residential Transformation — Photo 11",
        "phase": "Craftsmanship Details",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/08_tamboerskloof-project-2021/WhatsApp-Image-2022-12-15-at-23.04.14.jpeg",
        "title": "12. Tamboerskloof Residential Transformation — Photo 12",
        "phase": "Completed Project",
        "description": "Tamboerskloof Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "frank-road-project-2021",
    "order": 9,
    "title": "Frank Road Project 2021",
    "shortTitle": "Frank Road Building & Remodel",
    "year": "2021",
    "category": "renovation",
    "badge": "2021 Project • Building & Construction",
    "location": "Cape Town",
    "duration": "Completed 2021",
    "cover": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.38-1.jpeg",
    "tags": [
      "Building & Construction",
      "2021",
      "Cape Town",
      "Certified Quality"
    ],
    "overview": "Comprehensive building alteration, wall removal, structural support beam installations, plastering, electrical reticulation, and complete room makeover.",
    "challenge": "Executing frank road project 2021 within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Cape Town",
    "specs": {
      "Project Category": "Building & Construction",
      "Year Completed": "2021",
      "Location": "Cape Town",
      "Scope of Work": "Frank Road Building & Remodel",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.38-1.jpeg",
        "title": "01. Frank Road Building & Remodel — Photo 1",
        "phase": "Project Highlight",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.38-2.jpeg",
        "title": "02. Frank Road Building & Remodel — Photo 2",
        "phase": "Execution & Progress",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.38.jpeg",
        "title": "03. Frank Road Building & Remodel — Photo 3",
        "phase": "Execution & Progress",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.39-1.jpeg",
        "title": "04. Frank Road Building & Remodel — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.39.jpeg",
        "title": "05. Frank Road Building & Remodel — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.40-1.jpeg",
        "title": "06. Frank Road Building & Remodel — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.40.jpeg",
        "title": "07. Frank Road Building & Remodel — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.41-1.jpeg",
        "title": "08. Frank Road Building & Remodel — Photo 8",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.41.jpeg",
        "title": "09. Frank Road Building & Remodel — Photo 9",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.42-1.jpeg",
        "title": "10. Frank Road Building & Remodel — Photo 10",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.42.jpeg",
        "title": "11. Frank Road Building & Remodel — Photo 11",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.43-1.jpeg",
        "title": "12. Frank Road Building & Remodel — Photo 12",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.43-2.jpeg",
        "title": "13. Frank Road Building & Remodel — Photo 13",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.43.jpeg",
        "title": "14. Frank Road Building & Remodel — Photo 14",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.44-1.jpeg",
        "title": "15. Frank Road Building & Remodel — Photo 15",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.44-2.jpeg",
        "title": "16. Frank Road Building & Remodel — Photo 16",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.44.jpeg",
        "title": "17. Frank Road Building & Remodel — Photo 17",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.45-1.jpeg",
        "title": "18. Frank Road Building & Remodel — Photo 18",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.45.jpeg",
        "title": "19. Frank Road Building & Remodel — Photo 19",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.46-1.jpeg",
        "title": "20. Frank Road Building & Remodel — Photo 20",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.46-2.jpeg",
        "title": "21. Frank Road Building & Remodel — Photo 21",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.46.jpeg",
        "title": "22. Frank Road Building & Remodel — Photo 22",
        "phase": "Craftsmanship Details",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/09_frank-road-project-2021/WhatsApp-Image-2022-12-15-at-23.16.47.jpeg",
        "title": "23. Frank Road Building & Remodel — Photo 23",
        "phase": "Completed Project",
        "description": "Frank Road Project 2021. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "house-woodstock-2021",
    "order": 10,
    "title": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking",
    "shortTitle": "House Woodstock Decking & Waterproofing",
    "year": "2021",
    "category": "finishes",
    "badge": "2021 Project • Painting, Waterproofing & Timber Decking",
    "location": "Woodstock, Cape Town",
    "duration": "Completed 2021",
    "cover": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.09.58-1.jpeg",
    "tags": [
      "Painting, Waterproofing & Timber Decking",
      "2021",
      "Woodstock",
      "Certified Quality"
    ],
    "overview": "Complete exterior restoration featuring high-grade weatherproof repainting, specialised joint and parapet waterproofing, and thorough timber decking restoration and sealing.",
    "challenge": "Executing house woodstock 2021 - repaint waterproofing & restoration on decking within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Woodstock, Cape Town",
    "specs": {
      "Project Category": "Painting, Waterproofing & Timber Decking",
      "Year Completed": "2021",
      "Location": "Woodstock, Cape Town",
      "Scope of Work": "House Woodstock Decking & Waterproofing",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.09.58-1.jpeg",
        "title": "01. House Woodstock Decking & Waterproofing — Photo 1",
        "phase": "Project Highlight",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.09.58.jpeg",
        "title": "02. House Woodstock Decking & Waterproofing — Photo 2",
        "phase": "Execution & Progress",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.09.59-1.jpeg",
        "title": "03. House Woodstock Decking & Waterproofing — Photo 3",
        "phase": "Execution & Progress",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.09.59.jpeg",
        "title": "04. House Woodstock Decking & Waterproofing — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.00-1.jpeg",
        "title": "05. House Woodstock Decking & Waterproofing — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.00-2.jpeg",
        "title": "06. House Woodstock Decking & Waterproofing — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.00.jpeg",
        "title": "07. House Woodstock Decking & Waterproofing — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.01-1.jpeg",
        "title": "08. House Woodstock Decking & Waterproofing — Photo 8",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.01.jpeg",
        "title": "09. House Woodstock Decking & Waterproofing — Photo 9",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.02-1.jpeg",
        "title": "10. House Woodstock Decking & Waterproofing — Photo 10",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.02-2.jpeg",
        "title": "11. House Woodstock Decking & Waterproofing — Photo 11",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.02.jpeg",
        "title": "12. House Woodstock Decking & Waterproofing — Photo 12",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.03-1.jpeg",
        "title": "13. House Woodstock Decking & Waterproofing — Photo 13",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.03-2.jpeg",
        "title": "14. House Woodstock Decking & Waterproofing — Photo 14",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.03.jpeg",
        "title": "15. House Woodstock Decking & Waterproofing — Photo 15",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.04-1.jpeg",
        "title": "16. House Woodstock Decking & Waterproofing — Photo 16",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.04.jpeg",
        "title": "17. House Woodstock Decking & Waterproofing — Photo 17",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.05-1.jpeg",
        "title": "18. House Woodstock Decking & Waterproofing — Photo 18",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.05-2.jpeg",
        "title": "19. House Woodstock Decking & Waterproofing — Photo 19",
        "phase": "Craftsmanship Details",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/10_house-woodstock-2021/WhatsApp-Image-2022-12-15-at-23.10.05.jpeg",
        "title": "20. House Woodstock Decking & Waterproofing — Photo 20",
        "phase": "Completed Project",
        "description": "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "restaurant-marias-2022",
    "order": 11,
    "title": "Restaurant Marias in Progress - 2022",
    "shortTitle": "Restaurant Marias Commercial Fitout",
    "year": "2022",
    "category": "commercial",
    "badge": "2022 Project • Commercial & Hospitality Renovation",
    "location": "Cape Town",
    "duration": "Completed 2022",
    "cover": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.43-1.jpeg",
    "tags": [
      "Commercial & Hospitality Renovation",
      "2022",
      "Cape Town",
      "Certified Quality"
    ],
    "overview": "Commercial restaurant renovation and fitout including kitchen upgrades, electrical reticulation, plumbing, custom carpentry, wall finishes, and customer dining area remodelling.",
    "challenge": "Executing restaurant marias in progress - 2022 within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Cape Town",
    "specs": {
      "Project Category": "Commercial & Hospitality Renovation",
      "Year Completed": "2022",
      "Location": "Cape Town",
      "Scope of Work": "Restaurant Marias Commercial Fitout",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.43-1.jpeg",
        "title": "01. Restaurant Marias Commercial Fitout — Photo 1",
        "phase": "Project Highlight",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.43.jpeg",
        "title": "02. Restaurant Marias Commercial Fitout — Photo 2",
        "phase": "Execution & Progress",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.44-1.jpeg",
        "title": "03. Restaurant Marias Commercial Fitout — Photo 3",
        "phase": "Execution & Progress",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.44-2.jpeg",
        "title": "04. Restaurant Marias Commercial Fitout — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.44.jpeg",
        "title": "05. Restaurant Marias Commercial Fitout — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.45-1.jpeg",
        "title": "06. Restaurant Marias Commercial Fitout — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.45-2.jpeg",
        "title": "07. Restaurant Marias Commercial Fitout — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.45.jpeg",
        "title": "08. Restaurant Marias Commercial Fitout — Photo 8",
        "phase": "Craftsmanship Details",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.46-1.jpeg",
        "title": "09. Restaurant Marias Commercial Fitout — Photo 9",
        "phase": "Craftsmanship Details",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.46-2.jpeg",
        "title": "10. Restaurant Marias Commercial Fitout — Photo 10",
        "phase": "Craftsmanship Details",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.46.jpeg",
        "title": "11. Restaurant Marias Commercial Fitout — Photo 11",
        "phase": "Craftsmanship Details",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.47-1.jpeg",
        "title": "12. Restaurant Marias Commercial Fitout — Photo 12",
        "phase": "Craftsmanship Details",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/11_restaurant-marias-2022/WhatsApp-Image-2022-12-15-at-22.40.47.jpeg",
        "title": "13. Restaurant Marias Commercial Fitout — Photo 13",
        "phase": "Completed Project",
        "description": "Restaurant Marias in Progress - 2022. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "inverter-installations",
    "order": 12,
    "title": "Inverter installations",
    "shortTitle": "Solar & Inverter Backup Systems",
    "year": "2023",
    "category": "electrical",
    "badge": "2023 Project • Electrical & Solar Solutions",
    "location": "Cape Town",
    "duration": "Completed 2023",
    "cover": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-1.jpeg",
    "tags": [
      "Electrical & Solar Solutions",
      "2023",
      "Cape Town",
      "Certified Quality"
    ],
    "overview": "Residential and commercial backup power, hybrid inverters, battery management systems, and automatic transfer switch installations.",
    "challenge": "Executing inverter installations within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Cape Town",
    "specs": {
      "Project Category": "Electrical & Solar Solutions",
      "Year Completed": "2023",
      "Location": "Cape Town",
      "Scope of Work": "Solar & Inverter Backup Systems",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-1.jpeg",
        "title": "01. Solar & Inverter Backup Systems — Photo 1",
        "phase": "Project Highlight",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-10.jpeg",
        "title": "02. Solar & Inverter Backup Systems — Photo 2",
        "phase": "Execution & Progress",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-11.jpeg",
        "title": "03. Solar & Inverter Backup Systems — Photo 3",
        "phase": "Execution & Progress",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-12.jpeg",
        "title": "04. Solar & Inverter Backup Systems — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-13.jpeg",
        "title": "05. Solar & Inverter Backup Systems — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-14.jpeg",
        "title": "06. Solar & Inverter Backup Systems — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-2.jpeg",
        "title": "07. Solar & Inverter Backup Systems — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-3.jpeg",
        "title": "08. Solar & Inverter Backup Systems — Photo 8",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-4.jpeg",
        "title": "09. Solar & Inverter Backup Systems — Photo 9",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-5.jpeg",
        "title": "10. Solar & Inverter Backup Systems — Photo 10",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-6.jpeg",
        "title": "11. Solar & Inverter Backup Systems — Photo 11",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-7.jpeg",
        "title": "12. Solar & Inverter Backup Systems — Photo 12",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-8.jpeg",
        "title": "13. Solar & Inverter Backup Systems — Photo 13",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38-9.jpeg",
        "title": "14. Solar & Inverter Backup Systems — Photo 14",
        "phase": "Craftsmanship Details",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/12_inverter-installations/WhatsApp-Image-2023-07-23-at-09.45.38.jpeg",
        "title": "15. Solar & Inverter Backup Systems — Photo 15",
        "phase": "Completed Project",
        "description": "Inverter installations. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "duplex-apartments-house-martin",
    "order": 13,
    "title": "Duplex Apartments House Martin",
    "shortTitle": "Duplex Apartments House Martin",
    "year": "2023",
    "category": "renovation",
    "badge": "2023 Project • Multi-Unit Residential Construction",
    "location": "Cape Town",
    "duration": "Completed 2023",
    "cover": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-1.jpeg",
    "tags": [
      "Multi-Unit Residential Construction",
      "2023",
      "Cape Town",
      "Certified Quality"
    ],
    "overview": "Major multi-unit duplex development, including masonry, concrete work, interior partitions, plumbing and electrical infrastructure, aluminium window frames, and full turnkey finishes.",
    "challenge": "Executing duplex apartments house martin within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Cape Town",
    "specs": {
      "Project Category": "Multi-Unit Residential Construction",
      "Year Completed": "2023",
      "Location": "Cape Town",
      "Scope of Work": "Duplex Apartments House Martin",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-1.jpeg",
        "title": "01. Duplex Apartments House Martin — Photo 1",
        "phase": "Project Highlight",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-10.jpeg",
        "title": "02. Duplex Apartments House Martin — Photo 2",
        "phase": "Execution & Progress",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-11.jpeg",
        "title": "03. Duplex Apartments House Martin — Photo 3",
        "phase": "Execution & Progress",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-12.jpeg",
        "title": "04. Duplex Apartments House Martin — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-13.jpeg",
        "title": "05. Duplex Apartments House Martin — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-14.jpeg",
        "title": "06. Duplex Apartments House Martin — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-15.jpeg",
        "title": "07. Duplex Apartments House Martin — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-2.jpeg",
        "title": "08. Duplex Apartments House Martin — Photo 8",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-3.jpeg",
        "title": "09. Duplex Apartments House Martin — Photo 9",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-4.jpeg",
        "title": "10. Duplex Apartments House Martin — Photo 10",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-5.jpeg",
        "title": "11. Duplex Apartments House Martin — Photo 11",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-6.jpeg",
        "title": "12. Duplex Apartments House Martin — Photo 12",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-7.jpeg",
        "title": "13. Duplex Apartments House Martin — Photo 13",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-8.jpeg",
        "title": "14. Duplex Apartments House Martin — Photo 14",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54-9.jpeg",
        "title": "15. Duplex Apartments House Martin — Photo 15",
        "phase": "Craftsmanship Details",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/13_duplex-apartments-house-martin/WhatsApp-Image-2023-07-23-at-09.55.54.jpeg",
        "title": "16. Duplex Apartments House Martin — Photo 16",
        "phase": "Completed Project",
        "description": "Duplex Apartments House Martin. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  },
  {
    "id": "guest-house-renovation-franschhoek",
    "order": 14,
    "title": "Guest house renovation Franschhoek",
    "shortTitle": "Franschhoek Guest House Renovation",
    "year": "2024",
    "category": "commercial",
    "badge": "2024 Project • Hospitality Renovation",
    "location": "Franschhoek, Cape Winelands",
    "duration": "Completed 2024",
    "cover": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.12.56-PM.jpeg",
    "tags": [
      "Hospitality Renovation",
      "2024",
      "Franschhoek",
      "Certified Quality"
    ],
    "overview": "High-end boutique guest house remodel in Franschhoek, including luxury guest suite upgrades, bathroom revamps, modern lighting installations, flooring, and exterior painting.",
    "challenge": "Executing guest house renovation franschhoek within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.",
    "solution": "Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.",
    "clientReview": "WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.",
    "clientName": "Verified Client — Franschhoek, Cape Winelands",
    "specs": {
      "Project Category": "Hospitality Renovation",
      "Year Completed": "2024",
      "Location": "Franschhoek, Cape Winelands",
      "Scope of Work": "Franschhoek Guest House Renovation",
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    "photos": [
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.12.56-PM.jpeg",
        "title": "01. Franschhoek Guest House Renovation — Photo 1",
        "phase": "Project Highlight",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.12.57-PM-1.jpeg",
        "title": "02. Franschhoek Guest House Renovation — Photo 2",
        "phase": "Execution & Progress",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.12.57-PM-2.jpeg",
        "title": "03. Franschhoek Guest House Renovation — Photo 3",
        "phase": "Execution & Progress",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.12.57-PM.jpeg",
        "title": "04. Franschhoek Guest House Renovation — Photo 4",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.12.59-PM-1.jpeg",
        "title": "05. Franschhoek Guest House Renovation — Photo 5",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.12.59-PM.jpeg",
        "title": "06. Franschhoek Guest House Renovation — Photo 6",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.48.05-PM.jpeg",
        "title": "07. Franschhoek Guest House Renovation — Photo 7",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.48.08-PM.jpeg",
        "title": "08. Franschhoek Guest House Renovation — Photo 8",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-03-20-at-1.48.09-PM.jpeg",
        "title": "09. Franschhoek Guest House Renovation — Photo 9",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.14-1.jpeg",
        "title": "10. Franschhoek Guest House Renovation — Photo 10",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.14-2-1.jpeg",
        "title": "11. Franschhoek Guest House Renovation — Photo 11",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.14-2.jpeg",
        "title": "12. Franschhoek Guest House Renovation — Photo 12",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.15-1.jpeg",
        "title": "13. Franschhoek Guest House Renovation — Photo 13",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.15-2.jpeg",
        "title": "14. Franschhoek Guest House Renovation — Photo 14",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.15-3.jpeg",
        "title": "15. Franschhoek Guest House Renovation — Photo 15",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.15.jpeg",
        "title": "16. Franschhoek Guest House Renovation — Photo 16",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.16-1.jpeg",
        "title": "17. Franschhoek Guest House Renovation — Photo 17",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.16-2.jpeg",
        "title": "18. Franschhoek Guest House Renovation — Photo 18",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.16.jpeg",
        "title": "19. Franschhoek Guest House Renovation — Photo 19",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.17-1.jpeg",
        "title": "20. Franschhoek Guest House Renovation — Photo 20",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.17-3.jpeg",
        "title": "21. Franschhoek Guest House Renovation — Photo 21",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.17.jpeg",
        "title": "22. Franschhoek Guest House Renovation — Photo 22",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.18-1.jpeg",
        "title": "23. Franschhoek Guest House Renovation — Photo 23",
        "phase": "Craftsmanship Details",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      },
      {
        "url": "assets/extracted/projects/14_guest-house-renovation-franschhoek/WhatsApp-Image-2024-07-04-at-17.17.18.jpeg",
        "title": "24. Franschhoek Guest House Renovation — Photo 24",
        "phase": "Completed Project",
        "description": "Guest house renovation Franschhoek. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects."
      }
    ]
  }
];

/* --------------------------------------------------------------------------
   13. Dedicated Project Details Controller & Quick Lightbox
   -------------------------------------------------------------------------- */
window.openProjectExplorer = function (projectId) {
  if (!projectId) return;
  window.location.href = `project-details.html?id=${encodeURIComponent(projectId)}`;
};

function initProjectDetailsPage() {
  const container = document.getElementById('project-details-container');
  if (!container) return;

  // Get project ID from URL query param ?id=... or hash #...
  const urlParams = new URLSearchParams(window.location.search);
  let projectId = urlParams.get('id');
  if (!projectId && window.location.hash) {
    projectId = window.location.hash.replace('#', '');
  }

  // Find project in database or default to first project
  const project = WSK_PROJECTS_DATABASE.find(p => p.id === projectId) || WSK_PROJECTS_DATABASE[0];

  // Update Page Title
  document.title = `${project.shortTitle || project.title} | WSK Electrical & Renovation Projects`;

  // Update Breadcrumb & Header Info
  const crumbTitle = document.getElementById('crumb-project-title');
  if (crumbTitle) crumbTitle.textContent = project.shortTitle || project.title;

  const detailCoverImg = document.getElementById('detail-cover-img');
  if (detailCoverImg) {
    detailCoverImg.src = project.cover || (project.photos && project.photos[0] ? project.photos[0].url : '');
    detailCoverImg.alt = project.title;
  }

  const detailBadge = document.getElementById('detail-badge');
  if (detailBadge) detailBadge.textContent = project.badge || `${project.year} Project`;

  const detailLocation = document.getElementById('detail-location');
  if (detailLocation) detailLocation.innerHTML = `<i class="fa-solid fa-location-dot text-lime"></i> ${project.location}`;

  const detailYear = document.getElementById('detail-year');
  if (detailYear) detailYear.innerHTML = `<i class="fa-solid fa-calendar text-blue"></i> ${project.year}`;

  const detailTitle = document.getElementById('detail-title');
  if (detailTitle) detailTitle.textContent = project.title;

  const detailOverview = document.getElementById('detail-overview');
  if (detailOverview) detailOverview.textContent = project.overview || project.summary || '';

  // Update Tags
  const tagsContainer = document.getElementById('detail-tags');
  if (tagsContainer && project.tags) {
    tagsContainer.innerHTML = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
  }

  // Photo Gallery with Initial 9 Photos (3 Rows x 3 Columns) & View More Toggle
  const galleryGrid = document.getElementById('project-gallery-grid');
  const loadMoreWrap = document.getElementById('gallery-load-more-wrap');
  const photos = project.photos || [];
  let isGalleryExpanded = false;

  function renderGallery() {
    if (!galleryGrid || photos.length === 0) return;

    const visiblePhotos = isGalleryExpanded ? photos : photos.slice(0, 9);

    galleryGrid.innerHTML = visiblePhotos.map((photo, idx) => `
      <div class="gallery-photo-card" onclick="openImageLightbox('${photo.url}', '${(photo.title || project.title).replace(/'/g, "\\'")}')">
        <div class="gallery-photo-img-wrap">
          <img src="${photo.url}" alt="${photo.title || project.title + ' Photo ' + (idx + 1)}" loading="lazy">
          <div class="gallery-photo-overlay">
            <div class="gallery-zoom-icon"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
        </div>
      </div>
    `).join('');

    if (loadMoreWrap) {
      if (photos.length > 9) {
        loadMoreWrap.style.display = 'block';
        const loadMoreText = document.getElementById('load-more-text');
        const loadMoreIcon = document.getElementById('load-more-icon');
        if (loadMoreText && loadMoreIcon) {
          if (isGalleryExpanded) {
            loadMoreText.textContent = 'Show Fewer Photos';
            loadMoreIcon.className = 'fa-solid fa-chevron-up';
          } else {
            loadMoreText.textContent = `View More Photos (${photos.length - 9} More)`;
            loadMoreIcon.className = 'fa-solid fa-chevron-down';
          }
        }
      } else {
        loadMoreWrap.style.display = 'none';
      }
    }
  }

  window.toggleMoreProjectPhotos = function () {
    isGalleryExpanded = !isGalleryExpanded;
    renderGallery();
    if (!isGalleryExpanded && galleryGrid) {
      galleryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  renderGallery();

  // Render Related / Other Projects (exclude current)
  const relatedGrid = document.getElementById('related-projects-grid');
  if (relatedGrid) {
    const otherProjects = WSK_PROJECTS_DATABASE.filter(p => p.id !== project.id).slice(0, 3);
    relatedGrid.innerHTML = otherProjects.map(p => `
      <a href="project-details.html?id=${p.id}" class="related-project-card">
        <img src="${p.cover}" alt="${p.title}" class="related-project-img" loading="lazy">
        <div class="related-project-body">
          <div class="project-specs-meta mb-2">
            <span><i class="fa-solid fa-location-dot text-lime"></i> ${p.location}</span>
            <span><i class="fa-solid fa-calendar text-blue"></i> ${p.year}</span>
          </div>
          <h4 class="related-project-title">${p.shortTitle || p.title}</h4>
          <div class="related-project-action">
            <span>View More</span> <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </a>
    `).join('');
  }
}

// Image Lightbox Helpers
window.openImageLightbox = function (imgSrc, caption) {
  const modal = document.getElementById('image-lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (!modal || !img) return;

  img.src = imgSrc;
  if (cap) cap.textContent = caption || '';
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeImageLightbox = function () {
  const modal = document.getElementById('image-lightbox-modal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Global escape key listener for lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeImageLightbox();
  }
});

/* --------------------------------------------------------------------------
   14. Multi-Page Portfolio Search & Category Filtering
   -------------------------------------------------------------------------- */
function initPortfolioSearchAndFilter() {
  const filterBtns = document.querySelectorAll('.portfolio-filters-list .pfilter-btn');
  const searchInput = document.getElementById('portfolio-search-input');
  const projectCards = document.querySelectorAll('.portfolio-grid-v2 .project-card-full');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function applyFilters() {
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardTitle = (card.querySelector('.project-title-link')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.project-summary-text')?.textContent || '').toLowerCase();
      const cardTags = (card.querySelector('.project-tags-row')?.textContent || '').toLowerCase();
      const cardLocation = (card.querySelector('.project-specs-meta')?.textContent || '').toLowerCase();

      const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
      const matchesSearch = !currentSearchQuery || 
        cardTitle.includes(currentSearchQuery) || 
        cardDesc.includes(currentSearchQuery) || 
        cardTags.includes(currentSearchQuery) || 
        cardLocation.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* --------------------------------------------------------------------------
   15. Contact Page Interactive Features (File Upload & Budget Selector)
   -------------------------------------------------------------------------- */
function initContactPageFeatures() {
  const dropzone = document.getElementById('file-dropzone');
  const fileInput = document.getElementById('file-input');
  const fileDisplay = document.getElementById('dropzone-file-display');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--color-lime-500)';
      dropzone.style.backgroundColor = 'rgba(141, 198, 63, 0.1)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = '';
      dropzone.style.backgroundColor = '';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '';
      dropzone.style.backgroundColor = '';
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        updateFileDisplay(fileInput.files[0].name);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        updateFileDisplay(fileInput.files[0].name);
      }
    });

    function updateFileDisplay(fileName) {
      if (fileDisplay) {
        fileDisplay.innerHTML = `<i class="fa-solid fa-file-circle-check text-lime"></i> <strong>Selected:</strong> ${fileName}`;
      }
    }
  }
}

// Auto-run additional multi-page modules
document.addEventListener('DOMContentLoaded', () => {
  initProjectExplorer();
  initPortfolioSearchAndFilter();
  initContactPageFeatures();
});

