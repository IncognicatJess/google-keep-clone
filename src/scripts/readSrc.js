// Simple script to list and print all files under src.
// Usage: from project root run `node src\scripts\readSrc.js`

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..'); // points to src

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

try {
  walk(root, (filePath) => {
    // print relative path from project root for readability
    const rel = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('--- FILE:', rel);
    console.log(content);
    console.log('--- END:', rel, '\n');
  });
} catch (err) {
  console.error('Error reading src:', err.message);
  process.exitCode = 1;
}
