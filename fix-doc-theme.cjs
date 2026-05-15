const fs = require('fs');
const file = 'src/layouts/DocLayout.astro';
let content = fs.readFileSync(file, 'utf8');

// 1. We replace the CSS block
const styleStart = content.indexOf('<style is:global>');
const styleEnd = content.indexOf('</style>', styleStart) + '</style>'.length;

const newStyle = `<style is:global>
      body {
        background-color: #ffffff !important;
        color: #1a1a1a;
      }
      
      :root {
        --doc-bg: #ffffff;
        --doc-sidebar-bg: transparent;
        --doc-text: #1a1a1a;
        --doc-text-muted: #666666;
        --doc-accent: #7c3aed;
        --doc-accent-soft: rgba(124, 58, 237, 0.08);
        --doc-border: #eaeaea;
        --doc-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      }

      /* Layout */
      .doc-layout {
        display: flex;
        min-height: 100vh;
        padding-top: 80px; /* Account for fixed header */
        max-width: 1600px;
        margin: 0 auto;
        position: relative;
      }

      /* Premium Sidebar */
      .sidebar {
        /* Width will be set dynamically via JS to match nav-brand exactly */
        width: 300px; /* fallback */
        height: calc(100vh - 80px);
        position: sticky;
        top: 80px;
        background: var(--doc-sidebar-bg);
        border-right: 1px solid var(--doc-border);
        padding: 3rem 2rem;
        overflow-y: auto;
        /* Scrollbar styles for webkit */
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
      }

      .sidebar::-webkit-scrollbar {
        width: 4px;
      }
      .sidebar::-webkit-scrollbar-track {
        background: transparent;
      }
      .sidebar::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }

      .sidebar-section {
        margin-bottom: 2.5rem;
      }

      .sidebar-section h3 {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--doc-text-muted);
        margin-bottom: 1.2rem;
        font-weight: 700;
      }

      .sidebar-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .sidebar-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0.6rem 1rem;
        color: var(--doc-text-muted);
        text-decoration: none;
        font-size: 0.95rem;
        font-weight: 500;
        transition: all 0.25s ease;
        border-radius: 8px;
        margin-bottom: 4px;
        border: 1px solid transparent;
      }

      .sidebar-icon {
        width: 16px;
        height: 16px;
        object-fit: contain;
        opacity: 0.7;
        transition: opacity 0.25s ease;
        filter: invert(1); /* Since we are in light theme, if icons are white, invert them. Actually figma icon is colored, no need to invert unless needed, but let's assume it's fine */
      }

      .sidebar-link:hover {
        color: var(--doc-text);
        background: rgba(0, 0, 0, 0.03);
      }

      .sidebar-link:hover .sidebar-icon {
        opacity: 1;
      }

      .sidebar-link.active {
        color: var(--doc-accent);
        font-weight: 600;
        background: var(--doc-accent-soft);
        border-color: rgba(124, 58, 237, 0.15);
      }
      
      .sidebar-link.active .sidebar-icon {
        opacity: 1;
      }

      /* Main Content Premium Styling */
      .content {
        flex: 1;
        padding: 4rem 5rem;
        max-width: 950px;
        color: var(--doc-text);
      }

      .content h1 {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        letter-spacing: -0.03em;
        color: var(--doc-text);
      }

      .content h2 {
        font-size: 2.2rem;
        font-weight: 700;
        margin: 4rem 0 1.5rem;
        scroll-margin-top: 120px;
        letter-spacing: -0.02em;
        border-bottom: 1px solid var(--doc-border);
        padding-bottom: 0.5rem;
        color: var(--doc-text);
      }

      .content p {
        font-size: 1.15rem;
        color: var(--doc-text);
        margin-bottom: 1.8rem;
        line-height: 1.8;
      }

      .content .lead {
        font-size: 1.4rem;
        color: var(--doc-text-muted);
        margin-bottom: 3rem;
        line-height: 1.6;
        font-weight: 400;
      }

      /* Cards and elements inside docs */
      .doc-card {
        background: #fafafa;
        border: 1px solid var(--doc-border);
        border-radius: 16px;
        padding: 2.5rem;
        margin-bottom: 2.5rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        box-shadow: var(--doc-shadow);
      }

      .doc-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        border-color: rgba(0, 0, 0, 0.1);
      }

      /* Mobile Navigation Index */
      .mobile-doc-nav {
        display: none;
        position: sticky;
        top: 70px;
        z-index: 900;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--doc-border);
        padding: 12px 20px;
      }

      .index-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(0, 0, 0, 0.03);
        border: 1px solid rgba(0, 0, 0, 0.05);
        color: var(--doc-text);
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        transition: all 0.2s ease;
      }

      .index-btn:hover, .index-btn:active {
        background: rgba(0, 0, 0, 0.06);
      }

      /* Drawer Mobile */
      .mobile-index-drawer {
        position: fixed;
        top: 0;
        right: -100%;
        width: 85%;
        max-width: 360px;
        height: 100vh;
        background: #ffffff;
        z-index: 3000;
        transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        border-left: 1px solid var(--doc-border);
        box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
      }

      .mobile-index-drawer.open {
        right: 0;
      }

      .drawer-header {
        padding: 24px;
        border-bottom: 1px solid var(--doc-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.02);
      }

      .drawer-header h3 {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0;
        color: var(--doc-text);
        letter-spacing: -0.01em;
      }

      .close-drawer {
        background: rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        width: 36px;
        height: 36px;
        font-size: 24px;
        color: var(--doc-text-muted);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        transition: all 0.2s ease;
      }

      .close-drawer:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #111;
      }

      .drawer-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
      }

      .drawer-link {
        display: block;
        padding: 14px 16px;
        color: var(--doc-text-muted);
        text-decoration: none;
        font-size: 1.05rem;
        font-weight: 500;
        border-radius: 8px;
        margin-bottom: 4px;
        transition: all 0.2s ease;
        border: 1px solid transparent;
      }

      .drawer-link:active,
      .drawer-link:hover {
        background: var(--doc-accent-soft);
        color: var(--doc-accent);
        border-color: rgba(124, 58, 237, 0.1);
      }
      
      .drawer-link.active {
        background: var(--doc-accent-soft);
        color: var(--doc-accent);
        font-weight: 600;
        border-color: rgba(124, 58, 237, 0.2);
      }

      .drawer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 2900;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .drawer-overlay.visible {
        opacity: 1;
        visibility: visible;
      }

      /* Responsive adjustments */
      @media (max-width: 1024px) {
        .sidebar {
          display: none;
        }
        .content {
          padding: 3rem 2rem;
        }
        .doc-layout {
          display: block;
        }
        .mobile-doc-nav {
          display: block;
        }
      }
      
      @media (max-width: 768px) {
        .content h1 {
          font-size: 2.5rem;
        }
        .content h2 {
          font-size: 1.8rem;
        }
        .content {
          padding: 2rem 1.5rem;
        }
      }
    </style>`;

content = content.slice(0, styleStart) + newStyle + content.slice(styleEnd);

// 2. We add the script to dynamically match sidebar width to nav-brand width
const jsStart = content.indexOf('// Mobile Menu Logic');
if (jsStart !== -1) {
  const alignScript = `// Sidebar Alignment Logic
      function alignSidebar() {
        const navBrand = document.querySelector(".nav-brand");
        const sidebar = document.querySelector(".sidebar");
        if (navBrand && sidebar && window.innerWidth > 1024) {
          const brandWidth = navBrand.getBoundingClientRect().width;
          if (brandWidth > 0) {
            sidebar.style.width = brandWidth + "px";
          }
        } else if (sidebar) {
          sidebar.style.width = ""; // reset on mobile
        }
      }
      
      // Initialize alignment
      alignSidebar();
      window.addEventListener("resize", alignSidebar);
      document.addEventListener("astro:after-swap", alignSidebar);

      `;
  
  content = content.slice(0, jsStart) + alignScript + content.slice(jsStart);
}

fs.writeFileSync(file, content);
console.log('Success theme change and alignment fix');
