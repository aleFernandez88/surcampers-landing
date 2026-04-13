# Sur Campers — Landing Page

Sitio web institucional / landing para **Sur Campers Uruguay**.  
Carpas de techo 0km importadas · Montevideo, Uruguay.

---

## Índice

- [Stack](#stack)
- [Estructura de archivos](#estructura-de-archivos)
- [Sistema de diseño](#sistema-de-diseño)
- [Arquitectura CSS](#arquitectura-css)
- [Arquitectura JS](#arquitectura-js)
- [Secciones](#secciones)
- [Git Flow](#git-flow)
- [Desarrollo local](#desarrollo-local)
- [Contacto cliente](#contacto-cliente)

---

## Stack

| Capa               | Tecnología                                            | Versión |
| ------------------ | ----------------------------------------------------- | ------- |
| Markup             | HTML5 semántico                                       | —       |
| Estilos            | CSS3 vanilla (sin frameworks)                         | —       |
| Scripts            | JavaScript ES Modules (sin bundler)                   | —       |
| Smooth scroll      | [Lenis](https://github.com/darkroomengineering/lenis) | 1.1.14  |
| Animaciones        | [GSAP](https://gsap.com/) + ScrollTrigger             | 3.12.5  |
| Tipografía animada | [Splitting.js](https://splitting.js.org/)             | latest  |
| Slider             | [Swiper.js](https://swiperjs.com/)                    | 11      |
| Fuentes            | Google Fonts — Barlow Condensed + DM Sans             | —       |

> Todas las librerías se cargan vía CDN. No hay bundler ni node_modules.

---

## Estructura de archivos

```
LANDING/
├── index.html                  # Estructura base, meta SEO/OG, carga de librerías
├── README.md
├── .gitignore
└── assets/
    ├── css/
    │   ├── variables.css       # Custom properties: paleta, tipografía, espaciado, z-index
    │   ├── main.css            # Reset, base global, layout, botones — importa los demás CSS
    │   ├── animations.css      # Keyframes y clases de estado (.js-fade-up, etc.)
    │   └── components.css      # Navbar, Hero, Cards, Steps, Footer
    ├── fonts/                  # Fuentes locales (si aplica en el futuro)
    ├── img/
    │   ├── hero/               # Imagen o video de fondo del hero
    │   └── icons/              # Logo SVG, favicon, íconos
    └── js/
        ├── main.js             # Entry point — importa e inicializa todo
        ├── lenis.js            # Smooth scroll, conectado al ticker de GSAP
        ├── navbar.js           # Efecto scroll (is-scrolled) + burger móvil
        ├── animations.js       # GSAP: hero, fade-ups, parallax, stagger
        └── utils.js            # Helpers: debounce, throttle, whatsappLink, formatNumber
```

---

## Sistema de diseño

### Paleta de colores

Paleta monocromática negro/blanco/gris, alineada con el diseño de la empresa socia [Verzet](https://www.verzet.com.ar/).

| Variable                 | Valor     | Uso                          |
| ------------------------ | --------- | ---------------------------- |
| `--color-bg-base`        | `#0a0a0a` | Fondo principal              |
| `--color-bg-soft`        | `#111111` | Secciones alternas           |
| `--color-bg-cut`         | `#1c1c1c` | Corte visual entre secciones |
| `--color-bg-card`        | `#161616` | Fondo de cards               |
| `--color-bg-surface`     | `#222222` | Superficies elevadas, hovers |
| `--color-text-primary`   | `#f0f0f0` | Títulos y cuerpo principal   |
| `--color-text-secondary` | `#aaaaaa` | Texto secundario             |
| `--color-text-muted`     | `#555555` | Labels, eyebrows, metadata   |
| `--color-accent`         | `#ffffff` | CTAs y detalles clave        |

### Tipografía

| Variable         | Fuente               | Uso                                 |
| ---------------- | -------------------- | ----------------------------------- |
| `--font-display` | Barlow Condensed 800 | Títulos hero y secciones, uppercase |
| `--font-body`    | DM Sans 400/500      | Cuerpo, navegación, botones         |

### Alternancia de fondos por sección

El corte visual entre secciones se logra alternando fondos, sin usar líneas divisoras:

```
Hero          → bg-base  (#0a0a0a)
Concepto      → bg-soft  (#111111)
Productos     → bg-base  (#0a0a0a)
Cómo funciona → bg-cut   (#1c1c1c)
Por qué Sur   → bg-soft  (#111111)
Galería       → bg-base  (#0a0a0a)
Contacto      → bg-cut   (#1c1c1c)
```

---

## Arquitectura CSS

Los estilos están divididos en 4 archivos con responsabilidades claras.  
`main.css` es el único que se linkea en el HTML y se encarga de importar los demás.

```
main.css
├── @import variables.css   ← primero, siempre
├── @import animations.css
└── @import components.css
```

**Convenciones:**

- Nomenclatura BEM: `.navbar__link`, `.product-card__body`
- Estados JS con prefijo `is-`: `.is-scrolled`, `.is-open`, `.is-visible`
- Clases de animación con prefijo `js-`: `.js-fade-up`, `.js-slide-left`
- Atributos de datos para GSAP: `data-splitting`, `data-stagger`

---

## Arquitectura JS

Módulos ES (`type="module"`) sin bundler. Cada archivo tiene una responsabilidad única.

```
main.js
├── initLenis()       → lenis.js
├── initNavbar()      → navbar.js
└── initAnimations()  → animations.js
        └── utils.js  (importado donde se necesite)
```

**Convenciones:**

- Una función `init*` exportada por módulo
- GSAP y Lenis se cargan como globales desde CDN, no como imports
- Estado global mínimo expuesto en `window.__lenis` para acceso externo si se necesita

---

## Secciones

| #   | ID               | Fondo   | Contenido                                                    |
| --- | ---------------- | ------- | ------------------------------------------------------------ |
| 01  | `#hero`          | bg-base | Fullscreen, video/imagen, título animado (Splitting.js), CTA |
| 02  | `#concepto`      | bg-soft | Propuesta de valor, texto + imagen                           |
| 03  | `#productos`     | bg-base | Cards de modelos disponibles (Swiper en móvil)               |
| 04  | `#como-funciona` | bg-cut  | 3 pasos numerados                                            |
| 05  | `#por-que`       | bg-soft | Features y diferenciales                                     |
| 06  | `#galeria`       | bg-base | Grid de fotos lifestyle                                      |
| 07  | `#contacto`      | bg-cut  | CTA final + WhatsApp + formulario                            |

---

## Git Flow

Flujo simplificado para proyecto de una sola persona con cliente final.

### Ramas principales

```
main       ← producción. Solo recibe merges desde develop. Nunca se trabaja directo acá.
develop    ← integración. Rama de trabajo diaria. Se mergea a main cuando hay versión estable.
```

### Ramas de trabajo

Una rama por sección o tarea. Se crea desde `develop`, se mergea a `develop` y se elimina al terminar.

```
feat/nombre-tarea      # nueva sección o funcionalidad
fix/nombre-bug         # corrección de bug
style/nombre-ajuste    # cambio solo visual, sin lógica
content/nombre-cambio  # actualización de textos o imágenes del cliente
```

### Flujo diario

```bash
# 1. Siempre partir desde develop actualizado
git checkout develop

# 2. Crear rama para la tarea
git checkout -b feat/hero

# 3. Trabajar y commitear
git add .
git commit -m "feat(hero): fullscreen con parallax y splitting"

# 4. Al terminar, mergear a develop y borrar la rama
git checkout develop
git merge feat/hero
git branch -d feat/hero

# 5. Cuando el cliente aprueba, pasar a main y taggear
git checkout main
git merge develop
git tag v1.0.0
```

### Convención de commits

Formato: `tipo(scope): descripción corta`

| Tipo       | Cuándo usarlo                                        |
| ---------- | ---------------------------------------------------- |
| `feat`     | Nueva sección o funcionalidad                        |
| `fix`      | Corrección de bug                                    |
| `style`    | Cambios visuales sin tocar lógica                    |
| `content`  | Textos, imágenes, copys                              |
| `refactor` | Reorganización de código sin cambio de funcionalidad |
| `docs`     | Cambios en README u otra documentación               |
| `chore`    | Tareas de configuración, .gitignore, etc.            |

**Ejemplos:**

```
feat(hero): animación de título con splitting.js
fix(navbar): burger no cerraba al hacer click en link
style(productos): ajuste de espaciado en cards
content(hero): imagen de fondo actualizada por cliente
docs: actualización de README con git flow
```

### Orden de ramas previsto

```
feat/hero
feat/concepto
feat/productos
feat/como-funciona
feat/galeria
feat/contacto
feat/footer
fix/responsive-mobile
```

---

## Desarrollo local

No requiere bundler ni dependencias de npm. Abrir con cualquier servidor estático:

```bash
# VS Code — extensión Live Server
Click derecho en index.html → Open with Live Server

# Python
python -m http.server 3000

# Node
npx serve .
```

> ⚠️ Abrir directamente con `file://` puede bloquear los ES Modules. Siempre usar un servidor local.

---

## Contacto cliente

|                |                                            |
| -------------- | ------------------------------------------ |
| **Empresa**    | Sur Campers Uruguay                        |
| **WhatsApp**   | +598 96 247 661                            |
| **Email**      | surcampersuruguay@gmail.com                |
| **Web actual** | [surcampers.uy](https://www.surcampers.uy) |

---

_Diseño y desarrollo — [Play](https://play.com.uy)_
