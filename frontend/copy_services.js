const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../old_crm_frontend/src/api/services');
const destDir = path.join(__dirname, './src/api/services');

const filesToCopy = [
  'leadService.js',
  'userService.js',
  'contactService.js',
  'clientService.js',
  'projectService.js'
];

filesToCopy.forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file}`);
  } else {
    console.log(`Missing ${file}`);
  }
});
