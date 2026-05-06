/* ============================================================
   SUR CAMPERS — UNIDAD.JS
   Renderiza el detalle de una unidad a partir de ?id=xxx
   ============================================================ */

const TIPO_LABELS = {
  motorhome:    'Motorhome',
  trailer:      'Trailer',
  'food-truck': 'Food Truck',
};

const PLACEHOLDER = 'assets/img/hero/hero-1.jpg';

const PLACEHOLDERS = {
  julia:    'assets/img/galeria/galeria-1.jpg',
  ilusion:  'assets/img/galeria/galeria-2.jpg',
  buho:     'assets/img/galeria/galeria-3.jpg',
  caretta:  'assets/img/galeria/galeria-4.jpg',
  mactrail: 'assets/img/galeria/galeria-5.jpg',
};

function specsRows(u) {
  const rows = [];

  if (u.tipo)                     rows.push(['Tipo',         TIPO_LABELS[u.tipo] || u.tipo]);
  if (u.subtipo)                  rows.push(['Subtipo',      u.subtipo]);
  if (u.base)                     rows.push(['Base',         u.base]);
  if (u.capacidad_personas)       rows.push(['Capacidad',    `${u.capacidad_personas} personas`]);
  if (u.capacidad_dormir)         rows.push(['Camas',        `${u.capacidad_dormir} personas`]);

  if (u.dimensiones) {
    const d = u.dimensiones;
    if (d.largo_cm)  rows.push(['Largo',   `${(d.largo_cm / 100).toFixed(2)} m`]);
    if (d.ancho_cm)  rows.push(['Ancho',   `${(d.ancho_cm / 100).toFixed(2)} m`]);
    if (d.alto_cm)   rows.push(['Alto',    `${(d.alto_cm  / 100).toFixed(2)} m`]);
  }

  if (u.peso?.mtpm_kg)             rows.push(['Peso máx.',   `${u.peso.mtpm_kg} kg`]);
  else if (u.peso?.propio_kg)      rows.push(['Peso propio', `${u.peso.propio_kg} kg`]);

  if (u.motor?.potencia_hp)        rows.push(['Motor',       `${u.motor.potencia_hp} HP`]);
  if (u.motor?.transmision)        rows.push(['Transmisión', u.motor.transmision]);

  if (u.precio_eur)                rows.push(['Precio',      `€ ${u.precio_eur.toLocaleString('es-ES')}`]);

  return rows
    .map(([label, val]) => `
      <div class="unidad-detail__spec-row">
        <span class="unidad-detail__spec-label">${label}</span>
        <span class="unidad-detail__spec-value">${val}</span>
      </div>`)
    .join('');
}

function equipItems(equip) {
  if (!equip) return '';
  const items = Object.entries(equip)
    .filter(([, v]) => v !== null)
    .map(([, v]) => `<li class="unidad-equip__item">${v}</li>`);
  return items.length
    ? `<ul class="unidad-equip__grid" style="list-style:none;padding:0;">${items.join('')}</ul>`
    : '';
}

function renderUnidad(u) {
  const main     = document.getElementById('unidadMain');
  if (!main) return;

  const tipo     = TIPO_LABELS[u.tipo] || u.tipo;
  const imgSrc   = `assets/img/unidades/${u.imagen_carpeta}/cover.jpg`;
  const fallback = PLACEHOLDERS[u.imagen_carpeta] || PLACEHOLDER;
  const waMsg    = encodeURIComponent(`Hola! Me interesa la unidad ${u.nombre} de ${u.marca}. ¿Pueden darme más info?`);
  const waURL    = `https://wa.me/59896247661?text=${waMsg}`;

  const equipHTML = equipItems(u.equipamiento);

  // SEO dinámico
  document.title = `${u.nombre} — ${u.marca} | Sur Campers Uruguay`;

  main.innerHTML = `
    <!-- Banner -->
    <section class="unidad-detail-banner" aria-label="${u.nombre}">
      <div
        class="unidad-detail-banner__bg"
        id="detailBannerBg"
        style="background-image: url('${imgSrc}')"
        aria-hidden="true"
      ></div>
      <div class="unidad-detail-banner__overlay" aria-hidden="true"></div>
      <div class="container unidad-detail-banner__content">
        <a href="unidades.html" class="unidad-detail-banner__back">
          ← Volver al catálogo
        </a>
        <span class="unidad-detail-banner__marca">${u.marca}</span>
        <h1 class="unidad-detail-banner__title">${u.nombre}</h1>
        <p class="unidad-detail-banner__subtipo">${u.subtipo || tipo}</p>
      </div>
    </section>

    <!-- Detalle + Specs -->
    <section class="section unidad-detail">
      <div class="container unidad-detail__inner">

        <!-- Columna izquierda: info + equipamiento -->
        <div>
          <span class="eyebrow--bar" style="margin-bottom:var(--space-6);display:inline-block;">${tipo}</span>

          ${equipHTML ? `
          <div style="margin-top:var(--space-10);">
            <h2 class="unidad-equip__title">Equipamiento</h2>
            ${equipHTML}
          </div>` : ''}

          ${u.link_oficial ? `
          <a
            href="${u.link_oficial}"
            class="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
            style="margin-top:var(--space-10);"
          >Ver en sitio oficial →</a>` : ''}
        </div>

        <!-- Columna derecha: specs sticky -->
        <aside class="unidad-detail__specs-card">
          <p class="unidad-detail__specs-title">Especificaciones</p>
          ${specsRows(u)}
          <a
            href="${waURL}"
            class="btn btn-primary unidad-detail__specs-cta"
            target="_blank"
            rel="noopener noreferrer"
          >Consultar por WhatsApp</a>
        </aside>

      </div>
    </section>

    <!-- Contacto -->
    <section class="section contacto" id="contacto" aria-label="Contacto">
      <div class="container">
        <div class="contacto__inner">
          <div class="contacto__copy js-fade-up">
            <span class="eyebrow">
              <span class="eyebrow__line" aria-hidden="true"></span>
              Contacto
            </span>
            <h2 class="contacto__title">Hablemos.</h2>
            <p class="contacto__desc">
              Respondemos todas las consultas por WhatsApp.<br />
              Sin vueltas, sin esperas.
            </p>
          </div>
          <div class="contacto__links">
            <a
              href="${waURL}"
              class="contacto__card contacto__card--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="contacto__card-meta">
                <span class="contacto__card-label">WhatsApp</span>
                <span class="contacto__card-value">+598 96 247 661</span>
              </div>
              <span class="contacto__card-arrow" aria-hidden="true">→</span>
            </a>
            <a href="mailto:surcampersuruguay@gmail.com" class="contacto__card">
              <div class="contacto__card-meta">
                <span class="contacto__card-label">Email</span>
                <span class="contacto__card-value">surcampersuruguay@gmail.com</span>
              </div>
              <span class="contacto__card-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>`;

  // Fallback de imagen del banner
  const bgEl = document.getElementById('detailBannerBg');
  const testImg = new Image();
  testImg.onerror = () => {
    if (bgEl) bgEl.style.backgroundImage = `url('${fallback}')`;
  };
  testImg.src = imgSrc;
}

function renderError() {
  const main = document.getElementById('unidadMain');
  if (!main) return;
  main.innerHTML = `
    <section class="section" style="min-height:60vh;display:flex;align-items:center;">
      <div class="container" style="text-align:center;">
        <span class="eyebrow--bar" style="margin-bottom:var(--space-6);display:inline-block;">404</span>
        <h1 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:800;color:var(--color-text-primary);margin-bottom:var(--space-6);">
          Unidad no encontrada
        </h1>
        <a href="unidades.html" class="btn btn-primary">← Ver catálogo</a>
      </div>
    </section>`;
}

async function initUnidad() {
  const id = new URLSearchParams(location.search).get('id');
  if (!id) { renderError(); return; }

  try {
    const res      = await fetch('data/catalogo.json');
    const unidades = await res.json();
    const u        = unidades.find(x => x.id === id);

    if (!u) { renderError(); return; }
    renderUnidad(u);
  } catch (err) {
    console.error('Error cargando unidad:', err);
    renderError();
  }
}

document.addEventListener('DOMContentLoaded', initUnidad);
