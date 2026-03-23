const fs = require('fs');
const path = require('path');

const navHtml = fs.readFileSync(path.join(__dirname, 'components/nav.html'), 'utf-8');
const footerHtml = fs.readFileSync(path.join(__dirname, 'components/footer.html'), 'utf-8');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

function replaceComponent(content, tagId, componentHtml) {
  const startStr = `<div id="${tagId}">`;
  const startIdx = content.indexOf(startStr);
  if (startIdx === -1) return content;
  
  let endIdx = content.indexOf('</div>', startIdx);
  if (endIdx === -1) return content; // Just a safety

  // Since we know the previous agent might have pasted the raw HTML inside, 
  // we just need to replace the entire block up to the LAST closing div of that block.
  // Actually, a safer way: we know the end of the nav block or we can just regex the exact known variants.
  // BUT the safest way is to use a simple loop counting <div> and </div>
  let openDivs = 0;
  let i = startIdx;
  while(i < content.length) {
    if (content.startsWith('<div', i)) {
      openDivs++;
    } else if (content.startsWith('</div', i)) {
      openDivs--;
      if (openDivs === 0) {
        endIdx = i + 6; // '</div>'.length
        break;
      }
    }
    i++;
  }
  
  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx);
  return `${before}<div id="${tagId}">\n${componentHtml}\n</div>${after}`;
}

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  content = replaceComponent(content, 'navbar-include', navHtml);
  content = replaceComponent(content, 'footer-include', footerHtml);
  
  content = content.replace(/<script src="\/js\/components\.js"><\/script>/g, '');
  content = content.replace(/<script src="js\/components\.js"><\/script>/g, '');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Injected into', file);
}

// Handle index.html separately since it's in the root
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
indexContent = replaceComponent(indexContent, 'navbar-include', navHtml);
indexContent = replaceComponent(indexContent, 'footer-include', footerHtml);
indexContent = indexContent.replace(/<script src="\/js\/components\.js"><\/script>/g, '');
indexContent = indexContent.replace(/<script src="js\/components\.js"><\/script>/g, '');

fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log('Injected into index.html');
