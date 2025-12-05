const fs = require('fs');
// List of high-value architectural files
const files = ['angular.json', 'package.json', 'tsconfig.json', 'src/app/app.routes.ts'];

console.log('# PROJECT SKELETON');
files.forEach((f) => {
  if (fs.existsSync(f)) {
    console.log(`\n## ${f}`);
    console.log('```json'); // Formatting as JSON/TS for clarity
    console.log(fs.readFileSync(f, 'utf8').slice(0, 5000)); // Truncate if massive
    console.log('```');
  }
});
