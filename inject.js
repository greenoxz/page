const fs = require('fs');
const path = require('path');

const navHtml = fs.readFileSync(path.join(__dirname, 'components/nav.html'), 'utf-8');
const footerHtml = fs.readFileSync(path.join(__dirname, 'components/footer.html'), 'utf-8');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
files.push('../index.html'); // include index.html too

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // replace navbar-include
  content = content.replace(/<div id="navbar-include"><\/div>/g, navHtml);
  content = content.replace(/<div id="navbar-include">[\s\S]*?<\/div>/g, navHtml);
  
  // replace footer-include
  content = content.replace(/<div id="footer-include"><\/div>/g, footerHtml);
  content = content.replace(/<div id="footer-include">[\s\S]*?<\/div>/g, footerHtml);
  
  // remove script components.js
  content = content.replace(/<script src="\/js\/components.js"><\/script>/g, '');
  content = content.replace(/<script src="js\/components.js"><\/script>/g, '');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Injected into', file);
}
