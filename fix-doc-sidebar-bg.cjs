const fs = require('fs');
const file = 'src/layouts/DocLayout.astro';
let content = fs.readFileSync(file, 'utf8');

// Change the transparent sidebar background to a subtle gray
content = content.replace(
  /--doc-sidebar-bg: transparent;/g,
  '--doc-sidebar-bg: #fafafa;'
);

fs.writeFileSync(file, content);
console.log('Sidebar background updated to #fafafa for minimalist differentiation.');
