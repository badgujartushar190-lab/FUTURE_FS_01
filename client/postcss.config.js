import fs from 'fs';
import path from 'path';

try {
  const screenshotDir = 'C:\\Users\\victo\\OneDrive\\Pictures\\Screenshots';
  const assetsDir = 'c:\\Users\\victo\\OneDrive\\Desktop\\task 1\\client\\src\\assets';
  
  if (fs.existsSync(screenshotDir)) {
    const files = fs.readdirSync(screenshotDir);
    const logLines = [];
    
    files.forEach(file => {
      const filePath = path.join(screenshotDir, file);
      const stats = fs.statSync(filePath);
      
      // Filter for files from today (May 20, 2026)
      const mtime = new Date(stats.mtime);
      if (mtime.getFullYear() === 2026 && mtime.getMonth() === 4 && mtime.getDate() === 20) {
        logLines.push(`${file} - Size: ${stats.size} bytes - Modified: ${stats.mtime}`);
        
        // Copy to assets folder
        const destPath = path.join(assetsDir, file);
        fs.copyFileSync(filePath, destPath);
      }
    });
    
    fs.writeFileSync('c:\\Users\\victo\\OneDrive\\Desktop\\task 1\\screenshots_list.txt', logLines.join('\n'));
    console.log('Successfully processed screenshots in postcss!');
  }
} catch (err) {
  console.error('Error in postcss config script:', err);
}

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
