const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const extractedImgDir = path.join(baseDir, 'extracted_site_data', 'images');
const assetsDir = path.join(baseDir, 'assets', 'extracted');

// Define all 14 projects in exact order with their metadata and images
const projects2024Data = [
  {
    order: 1,
    id: "franschhoek-4-bedroom-2024",
    title: "Franshhoek 4 bedroom building and renovation existing home - 2024",
    shortTitle: "Franschhoek 4-Bedroom Renovation",
    year: "2024",
    category: "Residential Building & Renovation",
    location: "Franschhoek, Western Cape",
    description: "Complete 4-bedroom building addition and full renovation of an existing home in Franschhoek, including structural changes, roof work, electrical, plumbing, modern finishes, and interior renovations.",
    images: [
      "WhatsApp-Image-2025-01-23-at-07.39.59-4.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.56.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.56-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.56-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.57.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.57-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.57-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.57-3.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.58.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.58-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.58-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.58-3.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.59.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.59-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.59-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.39.59-3.jpeg"
    ]
  },
  {
    order: 2,
    id: "16kw-sunsynk-inverter-30-panel",
    title: "16KW Sunsynk inverter installation and 30 panel",
    shortTitle: "16KW Sunsynk Solar Installation",
    year: "2024",
    category: "Solar & Energy Solutions",
    location: "Cape Town",
    description: "High-capacity residential/commercial solar power setup featuring a 16KW Sunsynk hybrid inverter paired with 30 high-efficiency solar panels for complete energy independence and load shedding resilience.",
    images: [
      "WhatsApp-Image-2025-01-23-at-07.41.48.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.41.48-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.41.48-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.41.49.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.41.49-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.41.49-2.jpeg"
    ]
  },
  {
    order: 3,
    id: "db-relocation-thelab-franschhoek",
    title: "Distribution Board Relocation - TheLab Franshhoek",
    shortTitle: "DB Relocation - TheLab Franschhoek",
    year: "2024",
    category: "Commercial Electrical Engineering",
    location: "TheLab, Franschhoek",
    description: "Specialized commercial electrical upgrade and main distribution board (DB) relocation, wiring reorganization, surge protection, and compliant certification for commercial premises.",
    images: [
      "WhatsApp-Image-2025-02-23-at-07.48.11.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.48.11.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.48.11-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.48.11-2-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.48.12.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.51.34.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.51.34-1.jpeg"
    ]
  },
  {
    order: 4,
    id: "100kw-commercial-solar-180-panels",
    title: "100Kw x2 50Kw in parallel with 180 550w Canadian panels",
    shortTitle: "100KW Industrial Solar System",
    year: "2024",
    category: "Commercial & Industrial Solar",
    location: "Western Cape",
    description: "Large-scale 100KW commercial solar installation featuring twin 50KW inverters operating in parallel, supplied by 180 Canadian Solar 550W high-power photovoltaic panels.",
    images: [
      "WhatsApp-Image-2025-01-23-at-07.43.48-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.43.48-3.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.43.49.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.43.49-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.43.49-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.43.47.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.43.48.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.43.48-1.jpeg"
    ]
  },
  {
    order: 5,
    id: "robertson-50kw-high-voltage-80-solar-panels",
    title: "Robertson 50Kw high voltage with 80 Canadian solar panels",
    shortTitle: "Robertson 50KW High Voltage Solar",
    year: "2024",
    category: "Commercial Solar Power",
    location: "Robertson, Western Cape",
    description: "High-voltage 50KW commercial solar installation in Robertson fitted with 80 Canadian Solar panels and high-voltage battery storage for agricultural / commercial facility.",
    images: [
      "WhatsApp-Image-2025-01-23-at-07.46.42-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.46.42-3.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.46.43.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.46.43-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.46.43-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.46.43-3.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.46.42.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.46.42-1.jpeg"
    ]
  },
  {
    order: 6,
    id: "pvc-ceiling-downlights-wesbank",
    title: "PVC ceiling installation with LED down lights - Wesbank",
    shortTitle: "PVC Ceiling & LED Downlights",
    year: "2024",
    category: "Ceilings & Lighting",
    location: "Wesbank, Cape Town",
    description: "Precision installation of low-maintenance, moisture-resistant PVC ceilings with integrated energy-efficient LED downlights and modern aesthetic trim.",
    images: [
      "WhatsApp-Image-2025-01-23-at-07.54.43.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.54.43-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.54.43-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.54.44.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.54.44-1.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.54.44-2.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.54.45.jpeg",
      "WhatsApp-Image-2025-01-23-at-07.54.45-1.jpeg"
    ]
  }
];

const pastProjectsData = [
  {
    order: 7,
    id: "bathroom-renovation-2021",
    title: "Bathroom Renovation 2021",
    shortTitle: "Complete Bathroom Renovation",
    year: "2021",
    category: "Plumbing & Tiling",
    location: "Cape Town",
    description: "Modern luxury bathroom redesign, comprehensive plumbing replacement, premium large-format floor and wall tiling, walk-in shower installation, and sanitary ware fitout.",
    images: [
      "WhatsApp-Image-2022-12-15-at-22.59.46-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.46.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.45.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.20-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.20.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.19-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.19-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.19.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.18-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.18.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.17-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.17-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.59.17.jpeg"
    ]
  },
  {
    order: 8,
    id: "tamboerskloof-project-2021",
    title: "Tamboerskloof Project 2021",
    shortTitle: "Tamboerskloof Residential Transformation",
    year: "2021",
    category: "Full Home Renovation",
    location: "Tamboerskloof, Cape Town",
    description: "Extensive renovation project in Tamboerskloof covering structural renovations, interior redesign, electrical upgrades, customized painting, and bespoke finishing.",
    images: [
      "WhatsApp-Image-2022-12-15-at-23.04.14-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.14.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.13-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.13.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.12-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.12-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.12.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.11-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.11-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.11.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.10-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.10-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.10.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.04.09.jpeg"
    ]
  },
  {
    order: 9,
    id: "frank-road-project-2021",
    title: "Frank Road Project 2021",
    shortTitle: "Frank Road Building & Remodel",
    year: "2021",
    category: "Building & Construction",
    location: "Cape Town",
    description: "Comprehensive building alteration, wall removal, structural support beam installations, plastering, electrical reticulation, and complete room makeover.",
    images: [
      "WhatsApp-Image-2022-12-15-at-23.16.47.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.46-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.46-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.46.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.45-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.45.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.44-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.44-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.44.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.43-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.43-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.43.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.42-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.42-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.42.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.41-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.41.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.40-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.40-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.40.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.39-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.39.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.38-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.38-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.16.38.jpeg"
    ]
  },
  {
    order: 10,
    id: "house-woodstock-2021",
    title: "House Woodstock 2021 - Repaint waterproofing & Restoration on Decking",
    shortTitle: "House Woodstock Decking & Waterproofing",
    year: "2021",
    category: "Painting, Waterproofing & Timber Decking",
    location: "Woodstock, Cape Town",
    description: "Complete exterior restoration featuring high-grade weatherproof repainting, specialised joint and parapet waterproofing, and thorough timber decking restoration and sealing.",
    images: [
      "WhatsApp-Image-2022-12-15-at-23.10.05-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.05-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.05.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.04-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.04.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.03-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.03-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.03.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.02-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.02-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.02.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.01-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.01.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.00-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.00-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.10.00.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.09.59-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.09.59.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.09.58-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-23.09.58.jpeg"
    ]
  },
  {
    order: 11,
    id: "restaurant-marias-2022",
    title: "Restaurant Marias in Progress - 2022",
    shortTitle: "Restaurant Marias Commercial Fitout",
    year: "2022",
    category: "Commercial & Hospitality Renovation",
    location: "Cape Town",
    description: "Commercial restaurant renovation and fitout including kitchen upgrades, electrical reticulation, plumbing, custom carpentry, wall finishes, and customer dining area remodelling.",
    images: [
      "WhatsApp-Image-2022-12-15-at-22.40.47-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.47.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.46-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.46-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.46.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.45-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.45-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.45.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.44-2.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.44-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.44.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.43-1.jpeg",
      "WhatsApp-Image-2022-12-15-at-22.40.43.jpeg"
    ]
  },
  {
    order: 12,
    id: "inverter-installations",
    title: "Inverter installations",
    shortTitle: "Solar & Inverter Backup Systems",
    year: "2023",
    category: "Electrical & Solar Solutions",
    location: "Cape Town",
    description: "Residential and commercial backup power, hybrid inverters, battery management systems, and automatic transfer switch installations.",
    images: [
      "WhatsApp-Image-2023-07-23-at-09.45.38.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-1.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-2.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-3.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-4.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-5.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-6.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-7.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-8.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-9.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-10.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-11.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-12.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-13.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.45.38-14.jpeg"
    ]
  },
  {
    order: 13,
    id: "duplex-apartments-house-martin",
    title: "Duplex Apartments House Martin",
    shortTitle: "Duplex Apartments House Martin",
    year: "2023",
    category: "Multi-Unit Residential Construction",
    location: "Cape Town",
    description: "Major multi-unit duplex development, including masonry, concrete work, interior partitions, plumbing and electrical infrastructure, aluminium window frames, and full turnkey finishes.",
    images: [
      "WhatsApp-Image-2023-07-23-at-09.55.54.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-1.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-2.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-3.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-4.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-5.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-6.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-7.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-8.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-9.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-10.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-11.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-12.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-13.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-14.jpeg",
      "WhatsApp-Image-2023-07-23-at-09.55.54-15.jpeg"
    ]
  },
  {
    order: 14,
    id: "guest-house-renovation-franschhoek",
    title: "Guest house renovation Franschhoek",
    shortTitle: "Franschhoek Guest House Renovation",
    year: "2024",
    category: "Hospitality Renovation",
    location: "Franschhoek, Cape Winelands",
    description: "High-end boutique guest house remodel in Franschhoek, including luxury guest suite upgrades, bathroom revamps, modern lighting installations, flooring, and exterior painting.",
    images: [
      "WhatsApp-Image-2024-03-20-at-1.12.59-PM-1.jpeg",
      "WhatsApp-Image-2024-03-20-at-1.48.05-PM.jpeg",
      "WhatsApp-Image-2024-03-20-at-1.48.08-PM.jpeg",
      "WhatsApp-Image-2024-03-20-at-1.48.09-PM.jpeg",
      "WhatsApp-Image-2024-03-20-at-1.12.56-PM.jpeg",
      "WhatsApp-Image-2024-03-20-at-1.12.57-PM.jpeg",
      "WhatsApp-Image-2024-03-20-at-1.12.57-PM-1.jpeg",
      "WhatsApp-Image-2024-03-20-at-1.12.57-PM-2.jpeg",
      "WhatsApp-Image-2024-03-20-at-1.12.59-PM.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.17.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.16-2.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.16-1.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.16.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.15-3.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.15-2.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.14-1.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.14-2-1.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.15.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.15-1.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.18-1.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.18.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.17-3.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.17-1.jpeg",
      "WhatsApp-Image-2024-07-04-at-17.17.14-2.jpeg"
    ]
  }
];

const allProjects = [...projects2024Data, ...pastProjectsData];

// Copy each project's images into organized folders
allProjects.forEach(proj => {
  const folderName = `${String(proj.order).padStart(2, '0')}_${proj.id}`;
  const projFolder = path.join(assetsDir, 'projects', folderName);
  fs.mkdirSync(projFolder, { recursive: true });

  proj.localFiles = [];
  proj.images.forEach(imgName => {
    const src = path.join(extractedImgDir, imgName);
    const dest = path.join(projFolder, imgName);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      proj.localFiles.push(`assets/extracted/projects/${folderName}/${imgName}`);
    }
  });
});

// Branding assets
const brandingFolder = path.join(assetsDir, 'branding');
fs.mkdirSync(brandingFolder, { recursive: true });
['Black-and-White-Food-Logo-14-1.png', 'cropped-1-32x32.png', 'cropped-1-192x192.png', 'cropped-1-180x180.png', 'cropped-1-270x270.png'].forEach(file => {
  const src = path.join(extractedImgDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(brandingFolder, file));
  }
});

// Services list
const servicesList = [
  {
    id: "building-plastering",
    title: "All Building & Plastering",
    category: "Construction",
    description: "Complete bricklaying, plastering, foundation work, structural additions, alterations, and boundary walls."
  },
  {
    id: "electrical-maintenance",
    title: "Electrical & Electrical Maintenance",
    category: "Electrical",
    description: "Certified residential and commercial electrical wiring, DB board upgrades/relocation, fault finding, and compliance certificates."
  },
  {
    id: "ceilings-partitioning",
    title: "Ceilings & Partitioning",
    category: "Interior Construction",
    description: "Specialized PVC ceilings, drywall partitioning, drop ceilings, bulkheads, and integrated LED lighting solutions."
  },
  {
    id: "waterproofing",
    title: "Waterproofing",
    category: "Protection & Maintenance",
    description: "Flat roof waterproofing, parapet sealing, torch-on membrane systems, foundation waterproofing, and leak repair."
  },
  {
    id: "painting",
    title: "Painting",
    category: "Finishes",
    description: "Interior and exterior painting, roof coating, decorative finishes, waterproofing coatings, and wood/timber treatment."
  },
  {
    id: "paving",
    title: "Paving",
    category: "Exterior & Groundworks",
    description: "Driveway paving, walkway paving, patio installations, kerbing, and ground leveling."
  },
  {
    id: "plumbing",
    title: "Plumbing",
    category: "Plumbing",
    description: "Full bathroom and kitchen plumbing, geyser installations/repairs, pipe replacements, drainage, and sanitary ware fitout."
  },
  {
    id: "tiling-flooring",
    title: "Tiling, Laminated & all flooring",
    category: "Finishes",
    description: "Porcelain, ceramic, and natural stone tiling, laminate flooring installation, vinyl flooring, and floor screeding."
  },
  {
    id: "carpentry",
    title: "Carpentry",
    category: "Woodwork & Joinery",
    description: "Custom kitchen cabinets, built-in cupboards (BICs), timber decking restoration, door hanging, and roof timber work."
  },
  {
    id: "aluminium-windows",
    title: "Aluminium Windows",
    category: "Windows & Doors",
    description: "Custom aluminium window and door fabrication, installation, sliding doors, and frame replacements."
  },
  {
    id: "home-office-maintenance",
    title: "All home & office maintenance",
    category: "Maintenance",
    description: "Turnkey general property maintenance, preventative facility repairs, commercial office fitouts, and emergency repairs."
  }
];

const masterData = {
  metadata: {
    extractedAt: new Date().toISOString(),
    sourceUrl: "https://www.wkeandcprojects.co.za/",
    totalImagesDownloaded: 99,
    totalProjectsCount: allProjects.length,
    totalServicesCount: servicesList.length
  },
  company: {
    legalName: "WSK Electrical And Renovation Projects",
    tradeName: "WK Electrical & Construction Projects",
    tagline: "Creating quality urban lifestyles, building stronger communities",
    subTagline: "Quality Construction. Honest service. Great value",
    mission: "Our mission at WSK Electrical And Renovation Projects is to assist our clients with the best services to improve, upgrade & renovate their homes/offices & businesses at an affordable cost through honest & reliable quality services.",
    vision: "Our vision is to make WSK Electrical And Renovation Projects one of the leading & best renovation and maintenance companies out there.",
    values: "Our team is Responsible, Respectful & Accountable. We promote honesty, integrity & openness in all we do.",
    governance: "We at WSK Electrical And Renovation Projects are committed to maintaining the highest standards of corporate governance. As professionals we are committed to delivering excellence in service to our clients, and superior quality in what we do, everyday."
  },
  contact: {
    primaryPhone: "073 155 0289",
    secondaryPhone: "+27 63 154 9925",
    whatsapp: "+27731550289",
    whatsappLink: "https://wa.me/27731550289",
    email: "info@wkeandcprojects.co.za",
    address: {
      street: "46 Brookford Road",
      suburb: "Lotus River",
      postalCode: "7941",
      city: "Cape Town",
      province: "Western Cape",
      country: "South Africa",
      full: "46 Brookford Road, Lotus River, Cape Town, 7941, South Africa"
    },
    openingHours: "Monday - Friday: 08:00 AM - 05:00 PM",
    socialLinks: {
      facebook: "https://www.facebook.com/WKElectricalConstructionProjects/",
      instagram: "https://www.instagram.com/wkelectrical/?hl=en",
      whatsapp: "https://wa.me/27731550289"
    }
  },
  testimonials: [
    {
      id: 1,
      author: "Cheslin Mayham",
      role: "Homeowner",
      rating: 5,
      text: "WK Electrical & Construction Projects is professional, delivering extremely good work without any hassles. I can strongly recommend them since they have completed various building projects at my home within time and without any comebacks. I was impressed with the effective communication with regards to the different stages of the building projects."
    },
    {
      id: 2,
      author: "Grant",
      role: "Property Owner",
      rating: 5,
      text: "Great Service all and All Thank you Guys for assisting me on sort Notice with replacing my damaged Roof . Excellent Communication on explaining step by step what’s going to happen . i will definitely use and refer your business"
    },
    {
      id: 3,
      author: "Stacey Jansen",
      role: "Homeowner",
      rating: 5,
      text: "I had WK Electrical & Construction Projects come to help us extend our current house with two additional bedrooms. They where very informative with guidance and assisting us to understand what they daily task gone be .I have said this before to people that came to my place .when I decide to do anymore Renovations they will be the people I’ll call .Great Job Guys well done"
    },
    {
      id: 4,
      author: "Peggy Small",
      role: "Client",
      rating: 5,
      text: "What a great company that managed to give me a quote that I was happy with and listen to what I wanted and advised on my concerns. I am really impressed with the workmanship and the conduct of all employees. The work was completed to my satisfaction and I’m looking forward to do more business with them soon."
    }
  ],
  services: servicesList,
  projects: allProjects
};

fs.writeFileSync(path.join(baseDir, 'extracted_site_data', 'WEBSITE_DATA.json'), JSON.stringify(masterData, null, 2));

console.log('Master data JSON generated.');
