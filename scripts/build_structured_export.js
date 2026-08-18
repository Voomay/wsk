const fs = require('fs');
const path = require('path');

function stripTags(html) {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<p[^>]*>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractProjectsFromPage(html, is2024 = false) {
  // Projects are structured as elementor-top-section or elementor-section
  // We can find headings with titles and extract all images inside that section
  const sections = html.match(/<section[^>]*class="[^"]*elementor-top-section[^"]*"[\s\S]*?<\/section>/gi) || [];
  const projects = [];

  sections.forEach((sec, idx) => {
    // Title
    const titleMatch = sec.match(/<h2[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h2>/i);
    if (!titleMatch) return;
    const title = stripTags(titleMatch[1]);
    
    // Ignore top-level banners / headers
    if (['2024 Projects', 'Our Projects', 'Get an easy quotation for your Project!'].includes(title)) return;
    
    // Subtitle / category
    const subMatch = sec.match(/<span[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
    const subtitle = subMatch ? stripTags(subMatch[1]) : (is2024 ? '2024 Projects' : 'Past Projects');

    // Text descriptions
    const pMatches = [...sec.matchAll(/<div class="elementor-text-editor[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)].map(m => stripTags(m[1])).filter(t => t.length > 0);

    // Image links (lightbox hrefs or img tags)
    const rawImages = [
      ...[...sec.matchAll(/href="([^"]+\.(?:jpg|jpeg|png|webp|mp4))"/gi)].map(m => m[1]),
      ...[...sec.matchAll(/src="([^"]+\.(?:jpg|jpeg|png|webp|mp4))"/gi)].map(m => m[1])
    ];

    // Filter out icons/logos
    const validImages = [...new Set(rawImages)].filter(img => {
      const lower = img.toLowerCase();
      return !lower.includes('logo') && !lower.includes('icon') && !lower.includes('cropped-1');
    });

    projects.push({
      title,
      category: subtitle || (is2024 ? '2024 Project' : 'General Project'),
      description: pMatches.join('\n\n'),
      imageUrls: validImages,
      is2024
    });
  });

  return projects;
}

function extractServicesFromPage(html) {
  // Let's parse services.html
  // In services.html, services are in columns with icon box or image + title + description
  const services = [];
  
  // Find all service headings
  const serviceCards = html.match(/<div[^>]*class="[^"]*elementor-widget-container[^"]*"[\s\S]*?<\/div>/gi) || [];
  
  // Let's look for sections
  const serviceSections = html.match(/<section[^>]*class="[^"]*(?:elementor-top-section|elementor-inner-section)[^"]*"[\s\S]*?<\/section>/gi) || [];

  // Direct known service titles from services.html
  const knownServiceTitles = [
    'All Building & Plastering',
    'Electrical & Electrical Maintenance',
    'Ceilings & Partitioning',
    'Waterproofing',
    'Painting',
    'Paving',
    'Plumbing',
    'Tiling, Laminated & all flooring',
    'Carpentry',
    'Aluminium Windows',
    'All home & office maintenance'
  ];

  for (const title of knownServiceTitles) {
    // Find text associated with this service
    const regex = new RegExp(`${title}[\\s\\S]*?(?:<div class="elementor-text-editor[^"]*"[^>]*>([\\s\\S]*?)<\\/div>|<p>([\\s\\S]*?)<\\/p>)`, 'i');
    const match = html.match(regex);
    const desc = match ? stripTags(match[1] || match[2] || '') : '';
    
    services.push({
      title,
      description: desc
    });
  }

  return services;
}

function extractAboutFromPage(html) {
  // Extract About content, mission, vision, stats
  const texts = [...html.matchAll(/<div class="elementor-text-editor[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)].map(m => stripTags(m[1])).filter(t => t.length > 20);
  const headings = [...html.matchAll(/<h[1-6][^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => stripTags(m[1]));
  
  return {
    headings,
    textParagraphs: texts
  };
}

function extractTestimonials(homeHtml) {
  return [
    {
      name: "Cheslin Mayham",
      role: "Client",
      rating: 5,
      comment: "WK Electrical & Construction Projects is professional, delivering extremely good work without any hassles. I can strongly recommend them since they have completed various building projects at my home within time and without any comebacks. I was impressed with the effective communication with regards to the different stages of the building projects."
    },
    {
      name: "Grant",
      role: "Client",
      rating: 5,
      comment: "Great Service all and All Thank you Guys for assisting me on sort Notice with replacing my damaged Roof . Excellent Communication on explaining step by step what’s going to happen . i will definitely use and refer your business"
    },
    {
      name: "Stacey Jansen",
      role: "Client",
      rating: 5,
      comment: "I had WK Electrical & Construction Projects come to help us extend our current house with two additional bedrooms. They where very informative with guidance and assisting us to understand what they daily task gone be .I have said this before to people that came to my place .when I decide to do anymore Renovations they will be the people I’ll call .Great Job Guys well done"
    },
    {
      name: "Peggy Small",
      role: "Client",
      rating: 5,
      comment: "What a great company that managed to give me a quote that I was happy with and listen to what I wanted and advised on my concerns. I am really impressed with the workmanship and the conduct of all employees. The work was completed to my satisfaction and I’m looking forward to do more business with them soon."
    }
  ];
}

function extractAll() {
  const homeHtml = fs.readFileSync('./extracted_site_data/home.html', 'utf8');
  const aboutHtml = fs.readFileSync('./extracted_site_data/about.html', 'utf8');
  const servicesHtml = fs.readFileSync('./extracted_site_data/services.html', 'utf8');
  const projectsHtml = fs.readFileSync('./extracted_site_data/projects.html', 'utf8');
  const projects2024Html = fs.readFileSync('./extracted_site_data/2024-projects.html', 'utf8');
  const contactHtml = fs.readFileSync('./extracted_site_data/contact-us.html', 'utf8');

  const contactInfo = {
    companyName: "WSK Electrical And Renovation Projects (WK Electrical & Construction Projects)",
    tagline: "Creating quality urban lifestyles, building stronger communities",
    phone: "073 155 0289",
    phoneSecondary: "+27 63 154 9925",
    whatsapp: "+27731550289",
    email: "info@wkeandcprojects.co.za",
    officeAddress: {
      street: "46 Brookford Road",
      suburb: "Lotus River",
      postalCode: "7941",
      city: "Cape Town",
      country: "South Africa",
      full: "46 Brookford Road Lotus River 7941, Cape Town, South Africa"
    },
    openingHours: "Mon-Fri 8am-5pm",
    socials: {
      facebook: "https://www.facebook.com/WKElectricalConstructionProjects/",
      instagram: "https://www.instagram.com/wkelectrical/?hl=en",
      whatsapp: "https://wa.me/27731550289"
    }
  };

  const testimonials = extractTestimonials(homeHtml);
  const services = extractServicesFromPage(servicesHtml);
  const projects2024 = extractProjectsFromPage(projects2024Html, true);
  const projectsGeneral = extractProjectsFromPage(projectsHtml, false);
  const allProjects = [...projects2024, ...projectsGeneral];
  const aboutData = extractAboutFromPage(aboutHtml);

  // Map each project's image URLs to downloaded local files
  const rawMediaDir = path.join(__dirname, 'extracted_site_data', 'images');
  allProjects.forEach(proj => {
    proj.localImages = [];
    proj.imageUrls.forEach(imgUrl => {
      const filename = path.basename(new URL(imgUrl).pathname);
      const localPath = path.join(rawMediaDir, filename);
      if (fs.existsSync(localPath)) {
        proj.localImages.push({
          filename,
          originalUrl: imgUrl,
          relativePath: `./extracted_site_data/images/${filename}`
        });
      }
    });
  });

  const fullData = {
    contactInfo,
    testimonials,
    services,
    projects: {
      count: allProjects.length,
      list: allProjects
    },
    about: aboutData
  };

  fs.writeFileSync('./extracted_site_data/structured_content.json', JSON.stringify(fullData, null, 2));
  console.log('Successfully structured all content to ./extracted_site_data/structured_content.json');

  // Also organize images into assets/extracted/projects/<slug>/ etc.
  const targetExtractedDir = path.join(__dirname, 'assets', 'extracted');
  fs.mkdirSync(targetExtractedDir, { recursive: true });
  
  allProjects.forEach((proj, idx) => {
    const slug = `${idx + 1}_${proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 40)}`;
    const projDir = path.join(targetExtractedDir, 'projects', slug);
    fs.mkdirSync(projDir, { recursive: true });

    proj.localImages.forEach((img, i) => {
      const srcPath = path.join(rawMediaDir, img.filename);
      const destPath = path.join(projDir, img.filename);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  });

  console.log('Organized projects images into ./assets/extracted/projects/');
}

extractAll();
