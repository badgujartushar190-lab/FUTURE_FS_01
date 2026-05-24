const fs = require('fs');
const path = require('path');

function search(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist') search(p);
    } else if (p.endsWith('.jsx') || p.endsWith('.js')) {
      const c = fs.readFileSync(p, 'utf8');
      if (c.includes('Services')) {
        console.log(p);
        c.split('\n').forEach((l, i) => {
          if (l.includes('Services')) console.log('  ' + (i+1) + ': ' + l.trim());
        });
      }
    }
  });
}

search('client/src');
