<p align="center">
  <img src="public/assets/identidad/logotipo.webp" alt="Nexus App" width="120" />
</p>

<h1 align="center">Nexus Web About</h1>

<p align="center">
  <strong>Web informativa, documentación técnica y marketing del ecosistema Nexus</strong><br/>
  Proyecto Final de Grado — DAM · IES Francisco Rodríguez Marín · Ecentia
</p>

<p align="center">
  <a href="https://nexus-app.es">nexus-app.es</a> ·
  <a href="https://nexus-app.es/documentacion">Documentación</a> ·
  <a href="https://github.com/SomosNexusApp/">GitHub</a> ·
  <a href="mailto:somosnexusapp@gmail.com">somosnexusapp@gmail.com</a>
</p>

---

## Índice

- [¿Qué es Nexus Web About?](#qué-es-nexus-web-about)
- [Ecosistema Nexus](#ecosistema-nexus)
- [Capturas de pantalla](#capturas-de-pantalla)
- [Páginas y rutas](#páginas-y-rutas)
- [Documentación técnica integrada](#documentación-técnica-integrada)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos e instalación](#requisitos-e-instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Variables de entorno](#variables-de-entorno)
- [Assets estáticos](#assets-estáticos)
- [Despliegue](#despliegue)
- [SEO y accesibilidad](#seo-y-accesibilidad)
- [Páginas legales](#páginas-legales)
- [Enlaces útiles](#enlaces-útiles)
- [Licencia y créditos](#licencia-y-créditos)

---

## ¿Qué es Nexus Web About?

**Nexus Web About** (`nexus-web-about`) es el sitio web corporativo y de documentación del proyecto **Nexus**: una plataforma digital multiplataforma que unifica **marketplace de segunda mano**, **chollometro comunitario** y **publicidad B2B** en un único ecosistema.

Este repositorio no contiene la aplicación de usuario ni el backend. Su función es:

| Rol | Descripción |
|-----|-------------|
| **Marketing** | Landing brutalista, presentación del producto y stack tecnológico |
| **Documentación** | Memoria técnica del TFG (~13.000 líneas en una sola página Astro) |
| **Soporte público** | Centro de ayuda con FAQ y contacto |
| **Legal y SEO** | Aviso legal, privacidad, cookies, condiciones de compra, sitemap |
| **Evidencias visuales** | Galería de capturas de pruebas funcionales del sistema completo |

El sitio está generado con **[Astro 6](https://astro.build)** por su rendimiento, SEO nativo y mínimo JavaScript en el cliente — ideal para contenido estático y documentación extensa.

---

## Ecosistema Nexus

Nexus se despliega como **cuatro submódulos** independientes pero interconectados. Esta web es uno de ellos:

```mermaid
flowchart TB
    subgraph clientes["Clientes"]
        APP["nexus-angular-app<br/>Web + Android (Capacitor)"]
        ADMIN["nexus-admin-web-app<br/>Panel administración"]
        ABOUT["nexus-web-about<br/>Este repositorio"]
    end

    subgraph backend["Backend"]
        API["nexus-backend<br/>Spring Boot 3 · Java 17"]
        DB[(PostgreSQL)]
    end

    subgraph servicios["Servicios externos"]
        STRIPE[Stripe]
        CLOUD[Cloudinary]
        WS[WebSocket STOMP]
    end

    APP --> API
    ADMIN --> API
    ABOUT -.->|solo enlaces / docs| APP
    API --> DB
    API --> STRIPE
    API --> CLOUD
    API --> WS
```

| Repositorio | Tecnología | Despliegue |
|-------------|------------|------------|
| `nexus-backend` | Spring Boot 3.5, Java 17, JPA, JWT, WebSocket | Render (Docker) |
| `nexus-angular-app` | Angular 21, Ionic 8, Capacitor 8 | Vercel + APK Android |
| `nexus-admin-web-app` | Angular 21 | Vercel (subdominio separado) |
| **`nexus-web-about`** | **Astro 6, HTML/CSS** | **Vercel → nexus-app.es** |

---

## Capturas de pantalla

Las imágenes viven en `public/assets/` y se referencian en la [documentación en vivo](https://nexus-app.es/documentacion#pruebas). A continuación, una selección representativa por módulo (la galería completa supera **240 capturas**).

### Autenticación y onboarding

| Registro | Verificación email | Inicio de sesión |
|:------:|:------------------:|:----------------:|
| ![Registro](public/assets/img-pruebas/registro-normal.png) | ![Verificación](public/assets/img-pruebas/verificacion-registro.png) | ![Login](public/assets/img-pruebas/inicio-sesion-normal.png) |

| Wizard: identidad | Seguridad | Estilo predeterminado |
|:-----------------:|:---------:|:---------------------:|
| ![Identidad](public/assets/img-pruebas/registro-eleccon-identidad-personal.png) | ![Seguridad](public/assets/img-pruebas/registro-eleccion-seguridad.png) | ![Estilo](public/assets/img-pruebas/registro-eleccion-estilo-predeterminado.png) |

| Google OAuth | Recuperar contraseña |
|:------------:|:--------------------:|
| ![Google](public/assets/img-pruebas/inicio-sesion-google.png) | ![Recuperar](public/assets/img-pruebas/recuperar-contrasena.png) |

---

### Navegación y home

| Invitado (sin sesión) | Chollos del día | Explora por categoría |
|:---------------------:|:---------------:|:---------------------:|
| ![Invitado](public/assets/img-pruebas/pantalla-inicio-invitado.png) | ![Chollos](public/assets/img-pruebas/pantalla-principal-Chollos-del-dia.png) | ![Categorías](public/assets/img-pruebas/pantalla-principal-Explora-por-categoria.png) |

| Lo último en Nexus | Top chollos flash | Menú notificaciones |
|:------------------:|:-----------------:|:-------------------:|
| ![Último](public/assets/img-pruebas/pantalla-principal-Lo-ultimo-en-nexus.png) | ![Flash](public/assets/img-pruebas/pantalla-principal-top-chollos-flash.png) | ![Notificaciones](public/assets/img-pruebas/menu-notificaciones.png) |

| Drawer categorías | Drawer perfil |
|:-----------------:|:-------------:|
| ![Categorías drawer](public/assets/img-pruebas/desplegable-izquierda-categorias.png) | ![Perfil drawer](public/assets/img-pruebas/desplegable-perfil.png) |

---

### Catálogo, búsqueda y geolocalización

| Categoría coches | Vehículos | Cerca de ti (50 km) |
|:----------------:|:---------:|:-------------------:|
| ![Coches](public/assets/img-pruebas/pantalla-categoria-coches.png) | ![Vehículos](public/assets/img-pruebas/pantalla-vehiculos.png) | ![Cerca](public/assets/img-pruebas/pantalla-cerca-de-ti-50km-2coches.png) |

| Ofertas flash | Gratis | Viajes | Favoritos |
|:-------------:|:------:|:------:|:---------:|
| ![Flash](public/assets/img-pruebas/pantalla-ofertas-flash.png) | ![Gratis](public/assets/img-pruebas/pantalla-gratis.png) | ![Viajes](public/assets/img-pruebas/pantalla-viajes.png) | ![Favoritos](public/assets/img-pruebas/pantalla-favoritos.png) |

| Detalle producto | Detalle coche | Detalle oferta |
|:----------------:|:-------------:|:--------------:|
| ![Producto](public/assets/img-pruebas/producto-detail.png) | ![Coche](public/assets/img-pruebas/coche-detail.png) | ![Oferta](public/assets/img-pruebas/oferta-producto-detail.png) |

---

### Publicación de anuncios

| Hub publicar | Producto — detalles | Fotos y descripción |
|:------------:|:-------------------:|:-------------------:|
| ![Publicar](public/assets/img-pruebas/publicar.png) | ![Detalles](public/assets/img-pruebas/publicar-producto-detalles-basicos.png) | ![Fotos](public/assets/img-pruebas/publicar-subir-producto-Fotos-y-descripcion.png) |

| Precio y ubicación | Revisión final | Publicado |
|:------------------:|:--------------:|:---------:|
| ![Precio](public/assets/img-pruebas/publicar-subir-producto-Precio-y-ubicacion.png) | ![Revisión](public/assets/img-pruebas/publicar-subir-producto-Revision-final.png) | ![OK](public/assets/img-pruebas/publicar-producto-publicado.png) |

| Publicar vehículo | Publicar oferta | Oferta publicada |
|:-----------------:|:---------------:|:----------------:|
| ![Vehículo](public/assets/img-pruebas/publicar-vehiculo.png) | ![Oferta 1](public/assets/img-pruebas/publicar-oferta-1.png) | ![Oferta OK](public/assets/img-pruebas/publicar-oferta-publicada.png) |

---

### Perfil, cuenta y publicidad

| Resumen perfil | Estadísticas | Mis productos |
|:--------------:|:------------:|:-------------:|
| ![Resumen](public/assets/img-pruebas/perfil-resumen.png) | ![Stats](public/assets/img-pruebas/perfil-estadisticas.png) | ![Productos](public/assets/img-pruebas/perfil-mis-productos-con-productos.png) |

| Mis compras | Mis ventas | Métodos de pago |
|:-----------:|:----------:|:---------------:|
| ![Compras](public/assets/img-pruebas/perfil-mis-compras.png) | ![Ventas](public/assets/img-pruebas/perfil-mis-ventas.png) | ![Pago](public/assets/img-pruebas/perfil-Metodos-de-pago.png) |

| Mi cuenta — perfil | Privacidad | Seguridad |
|:------------------:|:----------:|:---------:|
| ![Cuenta](public/assets/img-pruebas/micuenta-datos-del-perfil.png) | ![Privacidad](public/assets/img-pruebas/micuenta-privacidad.png) | ![Seguridad](public/assets/img-pruebas/micuenta-seguridad.png) |

| Publicidad paso 1 | Patrocinio pago | Soporte IA |
|:-----------------:|:---------------:|:----------:|
| ![Pub 1](public/assets/img-pruebas/publicidad-paso-1.png) | ![Patrocinio](public/assets/img-pruebas/pagar-patrocinio-paso-1.png) | ![IA](public/assets/img-pruebas/soporte-chat-con-ia-normal.png) |

---

### Compra con Stripe (web)

Capturas en `public/assets/img-pruebas-compra/pc/`:

| Búsqueda | Detalle producto | Datos del pedido |
|:--------:|:----------------:|:----------------:|
| ![Buscar](public/assets/img-pruebas-compra/pc/busqueda_producto_pc.png) | ![Vista](public/assets/img-pruebas-compra/pc/vista_producto_pc.png) | ![Datos](public/assets/img-pruebas-compra/pc/datos_personales_pedido.png) |

| Pago Stripe | Confirmación | Detalle pedido |
|:-----------:|:------------:|:--------------:|
| ![Pago](public/assets/img-pruebas-compra/pc/datos_pago_pc.png) | ![OK](public/assets/img-pruebas-compra/pc/confirmacion_pago_pc.png) | ![Pedido](public/assets/img-pruebas-compra/pc/detalles_pedido_pc.png) |

> El flujo móvil equivalente está documentado con capturas en `public/assets/img-pruebas-mobile/` (56 imágenes) y en la sección **Compra Móvil** de `/documentacion`.

---

### Aplicación móvil (Android / Capacitor)

| Inicio invitado | Perfil | Ajustes seguridad |
|:---------------:|:------:|:-----------------:|
| ![Móvil inicio](public/assets/img-pruebas-mobile/pantalla-inicio-invitado.png) | ![Móvil perfil](public/assets/img-pruebas-mobile/perfil-info.png) | ![Móvil seguridad](public/assets/img-pruebas-mobile/perfil-ajustes-seguridad.png) |

---

### Panel de administración

49 capturas en `public/assets/img-pruebas-admin/` — moderación, usuarios, contratos, newsletter, auditoría, etc. Consulta la sección **Admin** en [documentacion.astro](src/pages/documentacion.astro).

---

## Páginas y rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `src/pages/index.astro` | Landing: hero brutalista, features, CTA, strip de tecnologías |
| `/documentacion` | `src/pages/documentacion.astro` | Memoria técnica completa del TFG con sidebar e índice móvil |
| `/tecnologias` | `src/pages/tecnologias.astro` | Stack tecnológico por categorías |
| `/blog` | `src/pages/blog/index.astro` | Listado de artículos |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | Entrada individual del blog |
| `/ayuda` | `src/pages/ayuda.astro` | FAQ por categorías (cuenta, compras, vender, envíos…) |
| `/legal/*` | `src/pages/legal/*.astro` | Aviso legal, privacidad, cookies, condiciones, accesibilidad |
| `/404` | `src/pages/404.astro` | Página de error |

---

## Documentación técnica integrada

La página [`/documentacion`](https://nexus-app.es/documentacion) es el núcleo del proyecto académico. Está implementada en `src/pages/documentacion.astro` con el layout `DocLayout.astro` (sidebar + drawer móvil).

### Índice de secciones

#### Documento general

| ID ancla | Contenido |
|----------|-----------|
| `#introduccion` | Contexto, motivación, objetivos, tecnologías y alcance del sistema |
| `#analisis` | Actores (Visitante, Usuario, Empresa, Admin), requisitos resumidos |
| `#diseno` | Arquitectura, modelo de datos, API REST, WebSocket, diagramas |
| `#implementacion` | Estructura de carpetas backend/frontend, flujos técnicos |
| `#pruebas` | **Pruebas funcionales con galería visual** (web, móvil, admin) |
| `#despliegue` | Render (Docker), Vercel, Capacitor Android |
| `#conclusiones` | Objetivos cumplidos, dificultades, mejoras futuras |
| `#bibliografia` | Referencias técnicas |
| `#anexos` | Tablas SQL, endpoints, configuraciones |

#### Documentos adicionales

| ID ancla | Contenido |
|----------|-----------|
| `#plan-proyecto` | Planificación, hitos y recursos |
| `#viabilidad` | Estudio de viabilidad técnica y económica |
| `#requisitos-sistema` | **63 RF**, **26 RNF**, **17 RI** extraídos del código real |
| `#uml` | Diagrama de dominio |
| `#mockup` | Enlace al prototipo Figma interactivo |

### Módulos funcionales documentados

- **Autenticación**: JWT + `jwtVersion`, BCrypt, Google OAuth, reCAPTCHA v3, 2FA TOTP/Email, wizard onboarding
- **Marketplace**: productos, vehículos, ofertas/chollos, caducidad 180 días, Cloudinary (hasta 6 imágenes)
- **Búsqueda unificada**: sinónimos, filtros, geolocalización con bounding box
- **Pagos Stripe**: Payment Intents (escrow), Checkout Sessions (publicidad), webhooks HMAC
- **Chat STOMP**: texto, multimedia, propuestas de precio
- **Spark/Drip**: votación comunitaria de ofertas
- **Publicidad B2B**: contratos, patrocinios, cupones
- **Soporte IA**: Gemini / Groq con escalación humana
- **RGPD**: borrado suave, newsletter double opt-in

### Requisitos del sistema (resumen)

Extraídos del análisis del código en `#requisitos-sistema`:

- **RF-01 a RF-63**: requisitos funcionales (auth, marketplace, compras, envíos, admin…)
- **RNF-01 a RNF-26**: rendimiento, seguridad, disponibilidad, usabilidad
- **RI-01 a RI-17**: requisitos de información y datos

### Actores

| Actor | Rol | Capacidades principales |
|-------|-----|-------------------------|
| Visitante | Sin JWT | Catálogo lectura, registro/login |
| Usuario | `ROLE_USER` | Publicar, comprar/vender, chat, perfil |
| Empresa | `ROLE_EMPRESA` | Contratos publicitarios, Stripe Checkout |
| Administrador | `ROLE_ADMIN` | Panel en dominio separado, 3 niveles de acceso |

---

## Stack tecnológico

| Capa | Tecnología | Uso en este repo |
|------|------------|------------------|
| Framework | **Astro 6.1** | SSG/SSR, rutas basadas en archivos |
| Integración | **@astrojs/sitemap** | `sitemap-index.xml` para SEO |
| Estilos | CSS modular | `src/styles/` — variables, base, secciones, componentes |
| Runtime | **Node.js ≥ 22.12** | Requerido por `package.json` |
| Despliegue | **Vercel** | CI/CD por push |
| Dominio | **nexus-app.es** | Configurado en `astro.config.mjs` |

### Ecosistema completo (referencia)

| Componente | Stack |
|------------|-------|
| Backend | Spring Boot 3.5, Java 17, PostgreSQL, JWT, WebSocket STOMP |
| App usuario | Angular 21, Ionic 8, Capacitor 8, TypeScript 5.9 |
| Admin | Angular 21 (dominio separado) |
| Medios | Cloudinary |
| Pagos | Stripe Java SDK + Stripe.js |
| IA soporte | Google Gemini / Groq |
| Infra | Render (API + DB), Vercel (frontends) |

---

## Estructura del proyecto

```text
nexus-web-about/
├── astro.config.mjs          # site: https://nexus-app.es, sitemap
├── package.json
├── public/
│   ├── assets/
│   │   ├── identidad/        # Logotipo y marca
│   │   ├── herramientas/     # Iconos del stack (17)
│   │   ├── img-pruebas/      # Capturas web usuario (82)
│   │   ├── img-pruebas-mobile/     # Capturas Android (56)
│   │   ├── img-pruebas-compra/     # Flujo Stripe PC/móvil (32)
│   │   ├── img-pruebas-admin/      # Panel admin (49)
│   │   └── img-pruebas-msg-editoranuncios-reservas/  # Chat, reservas (24)
│   ├── favicon.svg
│   ├── robots.txt
│   └── site.webmanifest
└── src/
    ├── components/
    │   └── BaseHead.astro      # SEO, Open Graph, JSON-LD
    ├── layouts/
    │   ├── Layout.astro        # Nav brutalista, footer, menú hamburguesa
    │   └── DocLayout.astro     # Sidebar documentación + drawer móvil
    ├── pages/
    │   ├── index.astro
    │   ├── documentacion.astro # Memoria TFG (~13k líneas)
    │   ├── tecnologias.astro
    │   ├── ayuda.astro
    │   ├── blog/
    │   └── legal/
    ├── scripts/
    │   └── main.js
    └── styles/
        ├── variables.css
        ├── base.css
        ├── sections.css
        └── components.css
```

---

## Requisitos e instalación

### Requisitos

- **Node.js** `>= 22.12.0` (ver `engines` en `package.json`)
- **npm** 10+

### Instalación local

```bash
git clone https://github.com/SomosNexusApp/nexus-web-about.git
cd nexus-web-about
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321). La documentación completa está en [http://localhost:4321/documentacion](http://localhost:4321/documentacion).

### Build de producción

```bash
npm run build    # Genera ./dist/
npm run preview  # Previsualiza el build local
```

---

## Scripts disponibles

| Comando | Acción |
|---------|--------|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build |
| `npm run astro` | CLI de Astro (`astro check`, `astro add`, etc.) |

---

## Variables de entorno

| Variable | Descripción | Por defecto |
|----------|-------------|-------------|
| `PUBLIC_API_URL` | URL del backend (usada en `Layout.astro` para integraciones futuras) | `http://localhost:8080` |

En Vercel, configura las variables en el panel del proyecto. El sitio es mayoritariamente estático; no requiere backend propio para funcionar.

---

## Assets estáticos

Inventario de carpetas de capturas en `public/assets/`:

| Carpeta | Archivos | Contenido |
|---------|:--------:|-----------|
| `img-pruebas/` | 82 | Flujos web: auth, home, catálogo, publicar, perfil, publicidad, soporte |
| `img-pruebas-mobile/` | 56 | Misma cobertura en app Android (Capacitor) |
| `img-pruebas-compra/` | 32 | Checkout Stripe: `pc/` y flujo móvil |
| `img-pruebas-admin/` | 49 | Panel de administración |
| `img-pruebas-msg-editoranuncios-reservas/` | 24 | Mensajería, editor de anuncios, reservas |
| `herramientas/` | 17 | Logos del stack en `/tecnologias` |
| `identidad/` | 1 | Logotipo oficial |
| `CEOs/` | 4 | Fotos del equipo |

Las rutas públicas siguen el patrón `/assets/<carpeta>/<archivo>.png` y se consumen desde `documentacion.astro` y este README.

---

## Despliegue

| Entorno | Plataforma | URL |
|---------|------------|-----|
| Producción | Vercel | [https://nexus-app.es](https://nexus-app.es) |
| API (referencia) | Render | `api.nexus-app.es` |
| Sitemap | Astro sitemap | `https://nexus-app.es/sitemap-index.xml` |

**Despliegue continuo:** cada push a la rama principal en el repositorio conectado a Vercel dispara un nuevo build.

**Nota sobre el backend en Render (plan gratuito):** el servicio entra en hibernación tras ~15 min de inactividad; la primera petición tras despertar puede tardar 30–60 s. Documentado en `#despliegue`.

---

## SEO y accesibilidad

- **BaseHead.astro**: meta title/description, canonical, Open Graph, Twitter Cards, JSON-LD
- **Sitemap**: generado por `@astrojs/sitemap` (`astro.config.mjs` → `site: 'https://nexus-app.es'`)
- **robots.txt**: permite todo el sitio y apunta al sitemap
- **Página de accesibilidad**: `/legal/accesibilidad`
- **Idioma**: `lang="es"` en el layout principal

---

## Páginas legales

| Ruta | Tema |
|------|------|
| `/legal/aviso-legal` | Identificación del titular y condiciones de uso |
| `/legal/privacidad` | Política de privacidad (RGPD) |
| `/legal/cookies` | Política de cookies |
| `/legal/condiciones-compra` | Condiciones de compraventa |
| `/legal/terminos` | Términos y condiciones generales |
| `/legal/accesibilidad` | Compromiso de accesibilidad |

---

## Enlaces útiles

| Recurso | URL |
|---------|-----|
| Web en producción | https://nexus-app.es |
| Documentación | https://nexus-app.es/documentacion |
| Tecnologías | https://nexus-app.es/tecnologias |
| Blog | https://nexus-app.es/blog |
| Ayuda | https://nexus-app.es/ayuda |
| GitHub organización | https://github.com/SomosNexusApp/ |
| Instagram | https://www.instagram.com/nexusapp_es/ |
| X (Twitter) | https://x.com/somosnexusapp |
| LinkedIn (Ecentia) | https://www.linkedin.com/company/ecentia-marketing/ |
| Contacto | somosnexusapp@gmail.com |

---

## Licencia y créditos

**Nexus** — Proyecto Final de Grado en **Desarrollo de Aplicaciones Multiplataforma (DAM)**  
**IES Francisco Rodríguez Marín** · Parte del ecosistema ficticio **Ecentia**

Equipo de desarrollo: tres integrantes (diseño, arquitectura y programación compartidos).

### Exclusiones documentadas (v1.0)

- Pagos en **modo test de Stripe** (sin cargos reales en producción)
- **iOS** previsto pero no publicado en App Store
- Integración con transportistas (Correos, MRW) como **stub** preparado para integración futura

---

<p align="center">
  <sub>README generado a partir de <code>src/pages/documentacion.astro</code> y los assets en <code>public/assets/img-pruebas*</code></sub>
</p>
