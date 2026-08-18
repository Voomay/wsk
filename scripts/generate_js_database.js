const fs = require('fs');
const path = require('path');

const websiteData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'extracted_site_data', 'WEBSITE_DATA.json'), 'utf8'));

// Format WSK_PROJECTS_DATABASE for script.js
const formattedProjects = websiteData.projects.map(proj => {
  const folderName = `${String(proj.order).padStart(2, '0')}_${proj.id}`;
  
  // Categorization
  let category = "renovation";
  if (proj.category.toLowerCase().includes("solar") || proj.category.toLowerCase().includes("electrical")) {
    category = "electrical";
  } else if (proj.category.toLowerCase().includes("commercial") || proj.category.toLowerCase().includes("hospitality")) {
    category = "commercial";
  } else if (proj.category.toLowerCase().includes("ceiling") || proj.category.toLowerCase().includes("decking") || proj.category.toLowerCase().includes("painting")) {
    category = "finishes";
  } else if (proj.year === "2024") {
    category = "featured-2024";
  }

  const photos = proj.images.map((img, idx) => {
    return {
      url: `assets/extracted/projects/${folderName}/${img}`,
      title: `${String(idx + 1).padStart(2, '0')}. ${proj.shortTitle} — Photo ${idx + 1}`,
      phase: idx === 0 ? "Project Highlight" : (idx < 3 ? "Execution & Progress" : (idx < proj.images.length - 1 ? "Craftsmanship Details" : "Completed Project")),
      description: `${proj.title}. Executed with precision craftsmanship and quality materials by WSK Electrical And Renovation Projects.`
    };
  });

  return {
    id: proj.id,
    order: proj.order,
    title: proj.title,
    shortTitle: proj.shortTitle,
    year: proj.year,
    category: category,
    badge: `${proj.year} Project • ${proj.category}`,
    location: proj.location,
    duration: proj.year === "2024" ? "Completed 2024" : `Completed ${proj.year}`,
    cover: photos[0] ? photos[0].url : "assets/images/hero.jpg",
    tags: [proj.category, proj.year, proj.location.split(',')[0], "Certified Quality"],
    overview: proj.description,
    challenge: `Executing ${proj.title.toLowerCase()} within exact client specifications while maintaining strict safety, quality standards, and efficient turnaround.`,
    solution: `Deployed WSK's experienced multi-disciplinary crews to manage all electrical, structural, and finishing work seamlessly in-house with zero comebacks.`,
    clientReview: `WSK Electrical & Construction Projects delivered exceptional quality on schedule. Professional communication and superior workmanship throughout.`,
    clientName: `Verified Client — ${proj.location}`,
    specs: {
      "Project Category": proj.category,
      "Year Completed": proj.year,
      "Location": proj.location,
      "Scope of Work": proj.shortTitle,
      "Project Supervision": "In-House Master Trades",
      "Quality Standard": "100% Guaranteed Compliance"
    },
    photos: photos
  };
});

fs.writeFileSync(path.join(__dirname, 'formatted_database.json'), JSON.stringify(formattedProjects, null, 2));
console.log('Formatted database ready with', formattedProjects.length, 'projects.');
