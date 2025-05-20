// This is a simple build script for Vercel
const { execSync } = require('child_process');

console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

console.log('Building the application...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Build completed successfully!');
