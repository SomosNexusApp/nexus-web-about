const fs = require('fs');
const file = 'src/layouts/DocLayout.astro';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('import BaseHead from "../components/BaseHead.astro";', 'import Layout from "./Layout.astro";');

content = content.replace('const currentYear = new Date().getFullYear();\r\n', '');
content = content.replace('const currentYear = new Date().getFullYear();\n', '');

const startIdx = content.indexOf('<!doctype html>');
const endIdx = content.indexOf('<style is:global>');

if (startIdx !== -1 && endIdx !== -1) {
  const newHtml = `<Layout title={title} description={description} image={image}>
  <!-- Menú móvil sticky solo para el índice -->
  <div class="mobile-doc-nav">
    <button class="index-btn" id="index-toggle">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
      <span>Índice de Contenidos</span>
    </button>
  </div>

  <!-- Cajón de Índice para Móvil -->
  <div class="mobile-index-drawer" id="index-drawer">
    <div class="drawer-header">
      <h3>Tabla de Contenidos</h3>
      <button id="close-index" class="close-drawer">&times;</button>
    </div>
    <div class="drawer-body">
      {
        docs.map((section) => (
          <div class="sidebar-section">
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item) => (
                <li>
                  <a href={\`#\${item.id}\`} class="drawer-link sidebar-link-mobile">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))
      }
    </div>
  </div>
  <div class="drawer-overlay" id="drawer-overlay"></div>

  <div class="doc-layout">
    <aside class="sidebar">
      <div class="sidebar-content">
        {
          docs.map((section) => (
            <div class="sidebar-section">
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li>
                    <a href={\`#\${item.id}\`} class="sidebar-link">
                      {item.name}
                      {(item as any).icon && (
                        <img
                          src={(item as any).icon}
                          alt={item.name}
                          class="sidebar-icon"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
      </div>
    </aside>

    <main class="content">
      <slot />
    </main>
  </div>
</Layout>

`;
  content = content.slice(0, startIdx) + newHtml + content.slice(endIdx);
  fs.writeFileSync(file, content);
  console.log('Success HTML replacement');
} else {
  console.log('Failed to find indices');
}
