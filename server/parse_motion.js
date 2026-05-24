import https from 'https';
import fs from 'fs';

const url = 'https://drive.google.com/drive/folders/1K9kp8j7A9PI94ivUsdec86LpJJQ-sLxB?usp=drive_link';

https.get(url, (res) => {
  let html = '';
  res.on('data', (chunk) => html += chunk);
  res.on('end', () => {
    const normalized = html
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\\u003c/g, '<')
      .replace(/\\u003e/g, '>');

    const pattern = /null,"([^"]+)"\],null,null,null,"video\/mp4"/g;
    const ids = [];
    let match;
    while ((match = pattern.exec(normalized)) !== null) {
      if (!ids.includes(match[1])) {
        ids.push(match[1]);
      }
    }
    fs.writeFileSync('motion_ids.txt', ids.join('\n'));
    console.log('Successfully wrote', ids.length, 'motion graphics video IDs to motion_ids.txt');
    console.log('IDs found:', ids);
  });
}).on('error', (err) => {
  console.error('Error fetching Drive folder:', err.message);
});
