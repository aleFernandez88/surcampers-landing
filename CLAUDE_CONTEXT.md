# CONTEXTO DEL PROYECTO — SUR CAMPERS LANDING

Sos el desarrollador frontend a cargo de esta landing. Leé todo esto antes de tocar cualquier archivo.

---

## EL PROYECTO

Landing page para **Sur Campers Uruguay** — empresa de venta de carpas de techo 0km importadas. El negocio es: montás la carpa sobre tu vehículo en minutos y podés dormir donde quieras.

- **Web actual del cliente:** https://www.surcampers.uy
- **Empresa socia de referencia visual:** https://www.verzet.com.ar (mismo diseñador, misma paleta)
- **WhatsApp:** +598 96 247 661
- **Email:** surcampersuruguay@gmail.com

---

## STACK

- HTML5 semántico + CSS3 vanilla + JS ES Modules (sin bundler, sin frameworks)
- **Lenis 1.1.14** — smooth scroll
- **GSAP 3.12.5 + ScrollTrigger** — animaciones
- **Splitting.js** — animación tipográfica letra por letra
- **Swiper 11** — slider hero y galería
- Todas las librerías cargan vía **CDN** en el HTML
- Fuentes: **Barlow Condensed 800** (display) + **DM Sans 400/500** (body) vía Google Fonts

---

## ESTRUCTURA DE ARCHIVOS

```
LANDING/
├── index.html
├── README.md
├── .gitignore
└── assets/
    ├── css/
    │   ├── variables.css     ← custom properties, NO tocar sin consenso
    │   ├── main.css          ← reset, base, importa los demás CSS
    │   ├── animations.css    ← keyframes y clases js-*
    │   └── components.css    ← todos los componentes UI
    ├── img/
    │   ├── hero/             ← hero-1.jpg, hero-2.jpg, hero-3.jpg (PLACEHOLDERS)
    │   └── icons/            ← logo.svg, favicons
    └── js/
        ├── main.js           ← entry point, importa e inicializa todo
        ├── lenis.js          ← smooth scroll
        ├── navbar.js         ← scroll effect + burger móvil
        ├── hero.js           ← Swiper slider del hero
        ├── animations.js     ← GSAP ScrollTrigger
        └── utils.js          ← debounce, throttle, whatsappLink, formatNumber
```

---

## PALETA — NO CAMBIAR

```css
--color-bg-base: #0a0a0a /* fondo principal */ --color-bg-soft: #111111
  /* secciones alternas */ --color-bg-cut: #1c1c1c /* corte entre secciones */
  --color-bg-card: #161616 /* cards */ --color-bg-surface: #222222
  /* hovers, superficies */ --color-text-primary: #f0f0f0
  --color-text-secondary: #aaaaaa --color-text-muted: #555555
  --color-accent: #ffffff /* solo CTAs y detalles clave */;
```

Paleta monocromática negro/blanco/gris. Sin colores de acento de color. Inspirada en verzet.com.ar.

---

## TIPOGRAFÍA

- **Display:** `Barlow Condensed 800`, uppercase, letter-spacing tight
- **Body:** `DM Sans 400/500`
- Los h1/h2/h3 ya tienen font-family: var(--font-display) en el reset de main.css

---

## CONVENCIONES CSS

- Nomenclatura **BEM**: `.navbar__link`, `.product-card__body`
- Estados JS con `is-`: `.is-scrolled`, `.is-open`, `.is-visible`
- Clases de animación con `js-`: `.js-fade-up`, `.js-slide-left`, `.js-slide-right`
- Atributos de datos para GSAP: `data-splitting`, `data-stagger`
- **IMPORTANTE:** Las clases `js-*` NO deben tener `opacity: 0` en el CSS. GSAP lo setea en el `from` de cada animación. Si GSAP falla, el contenido igual se ve.

---

## CONVENCIONES JS

- Una función `init*()` exportada por módulo
- GSAP y Lenis son **globales** desde CDN, no se importan
- `main.js` importa e inicializa todo en `DOMContentLoaded`
- Orden de inicialización: `initLenis` → `initNavbar` → `initHero` → `initAnimations`

---

## SECCIONES — ESTADO ACTUAL

| #   | ID               | Estado                                 | Fondo   |
| --- | ---------------- | -------------------------------------- | ------- |
| 01  | `#hero`          | ✅ Listo                               | bg-base |
| 02  | `#concepto`      | ⚠️ HTML/CSS hecho, revisar visibilidad | bg-soft |
| 03  | `#productos`     | 🔲 Pendiente                           | bg-base |
| 04  | `#como-funciona` | 🔲 Pendiente                           | bg-cut  |
| 05  | `#por-que`       | 🔲 Pendiente                           | bg-soft |
| 06  | `#galeria`       | 🔲 Pendiente                           | bg-base |
| 07  | `#contacto`      | 🔲 Pendiente                           | bg-cut  |

---

## HERO — DETALLES

- Swiper con 3 slides, efecto **crossfade**, sin autoplay
- Cada slide tiene: `.hero-slide__bg` (imagen CSS background) + `.hero-slide__overlay` + `.hero-slide__content`
- Animación de entrada por slide: el contenido arranca `opacity:0 translateY` y anima al activarse con CSS transitions (no GSAP)
- Ken Burns: `.hero-slide__bg` hace zoom out al activarse el slide
- UI: flechas cuadradas, bullets tipo barra que se expande, contador `01/03`, scroll indicator con línea animada
- **Las imágenes hero-1.jpg, hero-2.jpg, hero-3.jpg son placeholders** — el cliente las define el viernes

---

## CONCEPTO — DETALLES

- Grid 2 columnas: texto izquierda, imagen derecha
- Badge flotante `0km / Importadas` sobre la imagen
- 3 features numeradas con borde izquierdo
- Imagen es placeholder — reemplazar el viernes
- **Problema conocido:** revisar si el contenido se ve. Las clases `js-slide-left` / `js-slide-right` pueden estar bloqueando visibilidad si GSAP no inicializa correctamente

---

## GIT FLOW

```
main      ← producción, solo merges desde develop
develop   ← integración, rama de trabajo
feat/*    ← una rama por sección
fix/*     ← bugs
style/*   ← ajustes visuales
content/* ← textos e imágenes del cliente
```

**Commits:** `tipo(scope): descripción` — ej: `feat(productos): cards con swiper móvil`

**Rama actual:** `feat/concepto`

**Próximo paso:** resolver visibilidad de #concepto → commit → merge a develop → `feat/productos`

---

## NOTAS IMPORTANTES

- El cliente tiene **meet el viernes** para definir imágenes y textos finales
- Todo el copy y multimedia actual son **placeholders**
- Abrí siempre con **Live Server** (o servidor local), nunca con `file://` — los ES Modules no funcionan sin servidor
- No instalar dependencias npm salvo que sea estrictamente necesario y consensuado
- Mantener el mismo estilo visual que verzet.com.ar pero adaptado a Sur Campers

---

## PRÓXIMAS SECCIONES A DESARROLLAR

**feat/productos** — cards de modelos:

- Soft Shell y Hard Shell como productos principales
- Card con imagen, nombre, descripción corta y CTA
- En mobile: Swiper horizontal

**feat/como-funciona** — 3 pasos:

- Montá / Manejá / Dormí
- Numerados, tipografía grande display

**feat/galeria** — grid lifestyle:

- Grid asimétrico de fotos
- Placeholder hasta el viernes

**feat/contacto** — CTA final:

- WhatsApp como acción principal
- Formulario simple: nombre, email, mensaje
