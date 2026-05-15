const fs = require('fs');
const file = 'src/layouts/DocLayout.astro';
let content = fs.readFileSync(file, 'utf8');

const startStr = '// Mobile Menu Logic\r\n      function initMenu() {';
const endStr = '// Compatibilidad con transiciones de Astro\r\n      document.addEventListener("astro:after-swap", initMenu);';

// We should also try without \r
const startStr2 = '// Mobile Menu Logic\n      function initMenu() {';
const endStr2 = '// Compatibilidad con transiciones de Astro\n      document.addEventListener("astro:after-swap", initMenu);';

let startIdx = content.indexOf(startStr);
let isCrLf = true;
if (startIdx === -1) {
  startIdx = content.indexOf(startStr2);
  isCrLf = false;
}

const targetEndStr = isCrLf ? endStr : endStr2;
const endIdx = content.indexOf(targetEndStr);

if (startIdx !== -1 && endIdx !== -1) {
  const newJs = `// Mobile Menu Logic (Index Drawer only)
      function initDocMenu() {
        // Index Drawer Elements
        const indexToggle = document.getElementById("index-toggle");
        const indexDrawer = document.getElementById("index-drawer");
        const closeIndex = document.getElementById("close-index");
        const drawerOverlay = document.getElementById("drawer-overlay");

        // Lógica del Índice
        if (indexToggle && indexDrawer) {
          indexToggle.onclick = () => {
            indexDrawer.classList.add("open");
            if (drawerOverlay) drawerOverlay.classList.add("visible");
            document.body.style.overflow = "hidden";
          };

          const closeDrawerFunc = () => {
            indexDrawer.classList.remove("open");
            if (drawerOverlay) drawerOverlay.classList.remove("visible");
            document.body.style.overflow = "";
          };

          if (closeIndex) closeIndex.onclick = closeDrawerFunc;
          if (drawerOverlay) drawerOverlay.onclick = closeDrawerFunc;

          // Cerrar al pulsar un enlace del índice
          const drawerLinks = indexDrawer.querySelectorAll(".drawer-link");
          drawerLinks.forEach((link) => {
            link.onclick = closeDrawerFunc;
          });
        }
      }

      // Inicializar
      initDocMenu();

      // Compatibilidad con transiciones de Astro
      document.addEventListener("astro:after-swap", initDocMenu);`;
  
  content = content.slice(0, startIdx) + newJs + content.slice(endIdx + targetEndStr.length);
  
  // also remove duplicate gsap imports
  const gsap1 = '<script\r\n      is:inline\r\n      src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"\r\n    ></script>';
  const gsap2 = '<script\n      is:inline\n      src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"\n    ></script>';
  const scrolltrigger1 = '<script\r\n      is:inline\r\n      src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"\r\n    ></script>';
  const scrolltrigger2 = '<script\n      is:inline\n      src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"\n    ></script>';
  
  content = content.replace(gsap1, '');
  content = content.replace(gsap2, '');
  content = content.replace(scrolltrigger1, '');
  content = content.replace(scrolltrigger2, '');
  
  fs.writeFileSync(file, content);
  console.log('Success JS replacement');
} else {
  console.log('Failed to find JS indices');
  console.log('start:', startIdx, 'end:', endIdx);
}
