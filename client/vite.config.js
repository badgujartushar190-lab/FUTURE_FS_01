import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Run our copy script
try {
  fs.writeFileSync('c:\\Users\\victo\\OneDrive\\Desktop\\task 1\\debug.txt', 'Vite config executed at ' + new Date().toString());
  const screenshotDir = 'C:\\Users\\victo\\OneDrive\\Pictures\\Screenshots';
  const assetsDir = 'c:\\Users\\victo\\OneDrive\\Desktop\\task 1\\client\\src\\assets';
  
  if (fs.existsSync(screenshotDir)) {
    const files = fs.readdirSync(screenshotDir);
    const logLines = [];
    
    files.forEach(file => {
      const filePath = path.join(screenshotDir, file);
      const stats = fs.statSync(filePath);
      logLines.push(`${file} - Size: ${stats.size} bytes - Modified: ${stats.mtime}`);
      
      // Let's copy all files matching Screenshot 2026-05-20
      if (file.startsWith('Screenshot 2026-05-20')) {
        const destPath = path.join(assetsDir, file);
        fs.copyFileSync(filePath, destPath);
      }
    });
    
    fs.writeFileSync('c:\\Users\\victo\\OneDrive\\Desktop\\task 1\\screenshots_list.txt', logLines.join('\n'));
  }
} catch (err) {
  console.error('Error in vite config script:', err);
}

export default defineConfig({
  plugins: [react()],
});
