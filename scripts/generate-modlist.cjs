const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlContent = fs.readFileSync(path.resolve(__dirname, '../public/modlist.html'), 'utf8');

// Regular expression to extract mod information
const modRegex = /<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g;

const mods = [];
let match;
let id = 1;

while ((match = modRegex.exec(htmlContent)) !== null) {
  const link = match[1];
  const nameWithAuthor = match[2];
  
  // Extract name and author
  let name, author;
  if (nameWithAuthor.includes(' (by ')) {
    const parts = nameWithAuthor.split(' (by ');
    name = parts[0].trim();
    author = parts[1].replace(')', '').trim();
  } else {
    name = nameWithAuthor;
    author = 'Unknown';
  }
  
  // Determine category based on keywords (simplified approach)
  let category = 'utility'; // Default category
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('tech') || nameLower.includes('mekanism') || nameLower.includes('create') || nameLower.includes('tinker')) {
    category = 'tech';
  } else if (nameLower.includes('magic') || nameLower.includes('botania') || nameLower.includes('thaumcraft')) {
    category = 'magic';
  } else if (nameLower.includes('adventure') || nameLower.includes('dungeon') || nameLower.includes('biome') || nameLower.includes('structure')) {
    category = 'adventure';
  } else if (nameLower.includes('decoration') || nameLower.includes('decor') || nameLower.includes('furniture')) {
    category = 'decoration';
  } else if (nameLower.includes('optim') || nameLower.includes('performance') || nameLower.includes('fps')) {
    category = 'optimization';
  }
  
  // Generate an image path based on mod name (you'll need to create these images or use a default)
  const imageName = name.toLowerCase().replace(/[^\w]/g, '-') + '.jpg';
  const imagePath = `/images/mods/${imageName}`;
  
  // Check if the image exists, if not use a default image
  // For this script, we'll just assume it doesn't exist for simplicity
  
  mods.push({
    id,
    name,
    author,
    category,
    link,
    // Use a default image path for now
    image: '/images/mods/default.jpg'
  });
  
  id++;
}

// Write the JSON file
fs.writeFileSync(
  path.resolve(__dirname, '../public/modlist.json'),
  JSON.stringify(mods, null, 2)
);

console.log(`Generated modlist.json with ${mods.length} mods.`);