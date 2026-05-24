const { execSync } = require('child_process');
const fs = require('fs');

const gitPaths = [
  'git',
  'C:\\Program Files\\Git\\cmd\\git.exe',
  'C:\\Program Files\\Git\\bin\\git.exe',
  'C:\\Program Files (x86)\\Git\\cmd\\git.exe'
];

let gitPath = null;
for (const p of gitPaths) {
  try {
    execSync(`"${p}" --version`);
    gitPath = p;
    break;
  } catch (e) {}
}

if (!gitPath) {
  console.log('Git not found.');
} else {
  console.log('Using Git path:', gitPath);
  try {
    const diff = execSync(`"${gitPath}" diff`, { encoding: 'utf8' });
    console.log('--- GIT DIFF ---');
    console.log(diff || 'No unstaged changes');
    const status = execSync(`"${gitPath}" status`, { encoding: 'utf8' });
    console.log('--- GIT STATUS ---');
    console.log(status);
  } catch (err) {
    console.error('Git command failed:', err.message);
  }
}
