/** @type {import('tailwindcss').Config} */
import fs from 'fs';
import path from 'path';

try {
  const screenshotDir = 'C:\\Users\\victo\\OneDrive\\Pictures\\Screenshots';
  const assetsDir = 'c:\\Users\\victo\\OneDrive\\Desktop\\task 1\\client\\src\\assets';
  
  fs.writeFileSync('test.txt', 'Tailwind config executed at ' + new Date().toString());
  
  if (fs.existsSync(screenshotDir)) {
    const files = fs.readdirSync(screenshotDir);
    const logLines = [];
    
    files.forEach(file => {
      if (file.startsWith('Screenshot 2026-05-20')) {
        const filePath = path.join(screenshotDir, file);
        const stats = fs.statSync(filePath);
        logLines.push(`${file} - Size: ${stats.size} bytes - Modified: ${stats.mtime}`);
        
        // Copy to assets folder
        const destPath = path.join(assetsDir, file);
        fs.copyFileSync(filePath, destPath);
      }
    });
    
    fs.writeFileSync('screenshots_list.txt', logLines.join('\n'));
  }
} catch (err) {
  fs.writeFileSync('error.txt', 'Error: ' + err.stack);
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B00FF", // Electric Purple
        secondary: "#00FFE5", // Cyan
        dark: "#050508",
        charcoal: "#121212",
        neonBlue: "#00E5FF",
        neonGold: "#FFD700",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        'glitch': 'glitch 3s infinite linear alternate-reverse',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
