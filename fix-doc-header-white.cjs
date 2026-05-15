const fs = require('fs');
const file = 'src/layouts/DocLayout.astro';
let content = fs.readFileSync(file, 'utf8');

const oldHeaderCSS = `      /* Force header to ALWAYS be dark and visible on this page */
      nav.site-nav {
        background-color: rgba(10, 10, 10, 0.95) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      }`;

const newHeaderCSS = `      /* Header Blanco Adaptado (igual que Tecnologías) */
      nav.site-nav {
        background-color: rgba(255, 255, 255, 0.8) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border-bottom: 1px solid #eee !important;
      }

      nav.site-nav a, 
      nav.site-nav span,
      nav.site-nav .nav-contact span {
        color: #000000 !important;
      }

      nav.site-nav .nav-line {
        background-color: #ddd !important;
      }

      nav.site-nav .social-icon {
        background: #f0f0f0 !important;
        color: #111 !important;
      }

      nav.site-nav .social-icon:hover {
        background: #e0e0e0 !important;
      }

      nav.site-nav .hamburger-line {
        background-color: #000000 !important;
      }

      nav.site-nav .social-icon svg {
        stroke: #111 !important;
      }

      .is-menu-open .header-inline-nav {
        background: rgba(255, 255, 255, 0.98) !important;
      }

      .is-menu-open .header-inline-nav a {
        color: #000000 !important;
      }`;

content = content.replace(oldHeaderCSS, newHeaderCSS);

fs.writeFileSync(file, content);
console.log('Replaced header CSS with white/transparent style.');
