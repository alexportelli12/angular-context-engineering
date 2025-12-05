const fs = require('fs');
const path = require('path');
const target = process.argv[2];

if (!target || !fs.existsSync(target)) {
  console.log('(No specific context provided or path invalid)');
  process.exit(0);
}

console.log(`# DEEP DIVE: ${target}`);
const files = fs.readdirSync(target).filter((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts'));
files.forEach((f) => {
  const content = fs.readFileSync(path.join(target, f), 'utf8');
  console.log(`\n## ${f}\n\`\`\`typescript\n${content}\n\`\`\``);
});
