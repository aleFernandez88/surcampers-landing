# Sur Campers — Landing Page

Sitio web institucional / landing para **Sur Campers Uruguay**.  
Carpas de techo 0km importadas · Montevideo, Uruguay.

---

## Stack

| Capa               | Tecnología                                            |
| ------------------ | ----------------------------------------------------- |
| Markup             | HTML5 semántico                                       |
| Estilos            | CSS3 vanilla (custom properties, sin frameworks)      |
| Scripts            | JavaScript ES Modules (sin bundler)                   |
| Smooth scroll      | [Lenis](https://github.com/darkroomengineering/lenis) |
| Animaciones        | [GSAP](https://gsap.com/) + ScrollTrigger             |
| Tipografía animada | [Splitting.js](https://splitting.js.org/)             |
| Slider             | [Swiper.js](https://swiperjs.com/)                    |
| Fuentes            | Google Fonts — Barlow Condensed + DM Sans             |

---

## Estructura

```
LANDING/
├── index.html
├── assets/
│   ├── css/
│   │   ├── variables.css     # Custom properties: paleta, tipografía, espaciado
│   │   ├── main.css          # Reset, base global, layout, botones
│   │   ├── animations.css    # Keyframes y clases de animación
│   │   └── components.css    # Navbar, Hero, Cards, Footer
│   ├── fonts/                # Fuentes locales (si aplica)
│   ├── img/
│   │   ├── hero/             # Imágenes/video de fondo del hero
│   │   └── icons/            # Logo, favicon, íconos SVG
│   └── js/
│       ├── main.js           # Entry point — inicializa todo
│       ├── lenis.js          # Smooth scroll
│       ├── navbar.js         # Scroll effect + burger móvil
│       ├── animations.js     # GSAP ScrollTrigger
│       └── utils.js          # Helpers: debounce, throttle, whatsappLink
└── README.md
```

---

## Paleta

| Variable                 | Valor     | Uso                          |
| ------------------------ | --------- | ---------------------------- |
| `--color-bg-base`        | `#0a0a0a` | Fondo principal              |
| `--color-bg-soft`        | `#111111` | Secciones alternas           |
| `--color-bg-cut`         | `#1c1c1c` | Corte visual entre secciones |
| `--color-text-primary`   | `#f0f0f0` | Títulos y texto principal    |
| `--color-text-secondary` | `#aaaaaa` | Texto secundario             |
| `--color-text-muted`     | `#555555` | Labels, eyebrows             |
| `--color-accent`         | `#ffffff` | CTAs, detalles clave         |

---

## Secciones

1. **Hero** — fullscreen con video/imagen, título animado (Splitting.js), CTA
2. **Concepto** — propuesta de valor, texto + imagen
3. **Productos** — cards de modelos disponibles
4. **Cómo funciona** — 3 pasos
5. **Por qué Sur Campers** — features y diferenciales
6. **Galería** — grid de fotos lifestyle
7. **Contacto / CTA final** — WhatsApp + formulario

---

## Desarrollo local

No requiere bundler ni dependencias de npm.  
Abrir con cualquier servidor estático local:

```bash
# Con VS Code
Live Server (extensión) → click derecho en index.html → Open with Live Server

# Con Python
python -m http.server 3000

# Con Node
npx serve .
```

---

## Contacto cliente

- **WhatsApp:** +598 96 247 661
- **Email:** surcampersuruguay@gmail.com
- **Web:** [surcampers.uy](https://www.surcampers.uy)

---

_Diseño y desarrollo — [Play](https://play.com.uy)_
