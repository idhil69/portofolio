const fs = require('fs');
const path = require('path');

function replaceColor(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceColor(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content.replace(/#E04343/gi, '#bf4b4b');
            newContent = newContent.replace(/#e14343/gi, '#bf4b4b');
            
            // Also handle the OKLCH version in globals.css if any
            newContent = newContent.replace(/oklch\(0.58 0.2 25\)/g, '#bf4b4b');
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceColor(path.join(__dirname, 'components'));
replaceColor(path.join(__dirname, 'app'));
