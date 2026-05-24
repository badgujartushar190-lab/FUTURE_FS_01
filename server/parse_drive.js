import https from 'https';
import fs from 'fs';

const url = 'https://drive.google.com/drive/folders/1Brfmpms9-o2eaWAk224acWya1TLu-DA4?usp=drive_link';

https.get(url, (res) => {
  let html = '';
  res.on('data', (chunk) => html += chunk);
  res.on('end', () => {
    html = html.replace(/&quot;/g, '"');
    const pattern = /null,"([^"]+)"\],null,null,null,"video\/mp4"/g;
    const ids = [];
    let match;
    while ((match = pattern.exec(html)) !== null) {
      ids.push(match[1]);
    }
    fs.writeFileSync('drive_ids.txt', ids.join('\n'));
    console.log('wrote', ids.length, 'ids to drive_ids.txt');
  });
}).on('error', (err) => {
  console.error('error', err.message);
});
