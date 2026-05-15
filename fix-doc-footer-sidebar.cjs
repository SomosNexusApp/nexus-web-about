const fs = require('fs');
const file = 'src/layouts/DocLayout.astro';
let content = fs.readFileSync(file, 'utf8');

// 1. Separate Sidebar from Header
// We change:
// height: calc(100vh - 80px);
// position: sticky;
// top: 80px;
// to:
// height: calc(100vh - 120px);
// position: sticky;
// top: 120px;
// margin-top: 40px;

content = content.replace(
  /height: calc\(100vh - 80px\);\s*position: sticky;\s*top: 80px;/g,
  `height: calc(100vh - 112px);
        position: sticky;
        top: 112px;
        margin-top: 32px;`
);

// We also should reduce the top padding of the sidebar so the first item aligns well
content = content.replace(
  /padding: 3rem 2rem 3rem var\(--container-pad\);/g,
  `padding: 1rem 2rem 3rem var(--container-pad);`
);

// 2. Add Footer Overrides to `<style is:global>`
const footerCSS = `
      /* --- Light Footer Override for Doc Page --- */
      .site-footer {
        background-color: #fafafa !important;
        border-top: 1px solid var(--doc-border) !important;
        color: var(--doc-text) !important;
      }
      .footer-logo, .footer-big-brand { color: var(--doc-text) !important; }
      .footer-desc { color: var(--doc-text-muted) !important; }
      .footer-links h4, .footer-social h4, .loc-item h4 { color: var(--doc-text) !important; }
      .footer-links a, .footer-sub-links a, .footer-news-label, .loc-item p, .footer-copy { color: var(--doc-text-muted) !important; }
      .footer-main-links a { color: var(--doc-text) !important; }
      .footer-main-links a:hover, .footer-sub-links a:hover, .footer-links a:hover { color: var(--doc-accent) !important; }
      
      .social-icons a, .footer-social-logos a { 
        color: var(--doc-text-muted) !important; 
        /* The social icons in footer use background, let's invert the dark mode background */
        /* Home page uses white border, so we use a light gray */
      }
      .footer-social-logos a {
        background: transparent !important; /* It has no background by default, just color */
      }
      .footer-social-logos a:hover { opacity: 0.8 !important; color: var(--doc-accent) !important; }
      
      .footer-bottom { border-top: 1px solid var(--doc-border) !important; color: var(--doc-text-muted) !important; }
      .footer-vertical-text { color: rgba(0,0,0,0.05) !important; }
      
      .footer-newsletter { border-bottom: 2px solid rgba(0,0,0,0.1) !important; }
      .footer-newsletter:focus-within { border-bottom-color: var(--doc-accent) !important; }
      .footer-newsletter input { color: var(--doc-text) !important; }
      .footer-newsletter input::placeholder { color: #999 !important; }
      .footer-newsletter button { color: var(--doc-text) !important; }
      .footer-newsletter button:hover { color: var(--doc-accent) !important; }
`;

if (!content.includes('Light Footer Override')) {
  content = content.replace('</style>', footerCSS + '\n    </style>');
}

fs.writeFileSync(file, content);
console.log('Applied sidebar separation and footer light theme overrides.');
