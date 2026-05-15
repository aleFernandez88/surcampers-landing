/* ============================================================
   SUR CAMPERS — UNIDAD.JS
   Detalle dinámico con tabs: Exterior / Interior / Equipamiento / Especificaciones
   ============================================================ */

const TIPO_LABELS = {
  motorhome:      'Motorhome',
  'casa-rodante': 'Casa Rodante',
  minicamper:     'Minicamper',
  trailer:        'Trailer',
  'food-truck':   'Food Truck',
};

const PLACEHOLDERS = {
  julia:    'assets/img/galeria/galeria-1.jpg',
  ilusion:  'assets/img/galeria/galeria-2.jpg',
  buho:     'assets/img/galeria/galeria-3.jpg',
  caretta:  'assets/img/galeria/galeria-4.jpg',
  mactrail: 'assets/img/galeria/galeria-5.jpg',
};

const GALLERY_FALLBACKS = [
  'assets/img/galeria/galeria-1.jpg',
  'assets/img/galeria/galeria-2.jpg',
  'assets/img/galeria/galeria-3.jpg',
  'assets/img/galeria/galeria-4.jpg',
];

function imgSrc(u) {
  return `assets/img/unidades/${u.imagen_carpeta}/cover.jpg`;
}

function fallback(u) {
  const brandKey = u.imagen_carpeta.split('-')[0];
  return PLACEHOLDERS[brandKey] || GALLERY_FALLBACKS[0];
}

function imgOrPlaceholder(u, src, fb, alt) {
  if (!u.completo) return `<div class="img-placeholder">Próximamente</div>`;
  return imgWithFallback(src, fb, alt);
}

function imgWithFallback(src, fb, alt) {
  return `<img src="${src}" alt="${alt}" loading="lazy" data-fallback="${fb}" />`;
}

// ── TABS ─────────────────────────────────────────────

function tabExterior(u) {
  const rows = [];
  const d    = u.dimensiones;

  if (u.subtipo)          rows.push(['Subtipo',    u.subtipo]);
  if (u.base)             rows.push(['Base',       u.base]);
  if (d?.largo_cm)        rows.push(['Largo',      `${(d.largo_cm / 100).toFixed(2)} m`]);
  if (d?.ancho_cm)        rows.push(['Ancho',      `${(d.ancho_cm / 100).toFixed(2)} m`]);
  if (d?.alto_cm)         rows.push(['Alto',       `${(d.alto_cm  / 100).toFixed(2)} m`]);
  if (d?.altura_interior_cm) rows.push(['Alt. interior', `${(d.altura_interior_cm / 100).toFixed(2)} m`]);
  if (u.peso?.propio_kg)  rows.push(['Peso propio', `${u.peso.propio_kg} kg`]);
  if (u.peso?.mtpm_kg)    rows.push(['Peso máx.',  `${u.peso.mtpm_kg} kg`]);

  const content = rows.length
    ? rows.map(([l, v]) => `
        <div class="unidad-tab__spec-row">
          <span class="unidad-tab__spec-label">${l}</span>
          <span class="unidad-tab__spec-value">${v}</span>
        </div>`).join('')
    : `<p class="unidad-tab__consultar">Dimensiones disponibles próximamente. Consultanos por WhatsApp.</p>`;

  return { left: `<span class="unidad-tab__eyebrow">Dimensiones y carrocería</span>${content}` };
}

function tabInterior(u) {
  const e = u.equipamiento || {};
  const INTERIOR_KEYS = ['cama', 'cocina', 'bano', 'refrigerador', 'calefaccion',
                         'agua_caliente', 'agua_limpia_l', 'agua_gris_l', 'agua_negra_l'];

  const items = INTERIOR_KEYS
    .filter(k => e[k] != null)
    .map(k => {
      const labels = {
        cama:          'Cama',
        cocina:        'Cocina',
        bano:          'Baño',
        refrigerador:  'Refrigerador',
        calefaccion:   'Calefacción',
        agua_caliente: 'Agua caliente',
        agua_limpia_l: 'Agua limpia',
        agua_gris_l:   'Agua gris',
        agua_negra_l:  'Agua negra',
      };
      const val = String(e[k]).endsWith('l') || typeof e[k] === 'number' && k.endsWith('_l')
        ? `${e[k]} L`
        : e[k];
      return `<li class="unidad-tab__item">${labels[k] || k}: ${val}</li>`;
    });

  if (u.capacidad_personas) items.unshift(`<li class="unidad-tab__item">Capacidad: ${u.capacidad_personas} personas</li>`);
  if (u.capacidad_dormir)   items.unshift(`<li class="unidad-tab__item">Camas para: ${u.capacidad_dormir} personas</li>`);

  const content = items.length
    ? `<ul class="unidad-tab__list">${items.join('')}</ul>`
    : `<p class="unidad-tab__consultar">Detalles de interior disponibles próximamente. Consultanos por WhatsApp.</p>`;

  return { left: `<span class="unidad-tab__eyebrow">Comodidades</span>${content}` };
}

function tabEquipamiento(u) {
  const e = u.equipamiento || {};
  const SKIP = ['cama','cocina','bano','refrigerador','calefaccion','agua_caliente',
                'agua_limpia_l','agua_gris_l','agua_negra_l'];

  const items = Object.entries(e)
    .filter(([k, v]) => v != null && !SKIP.includes(k))
    .map(([, v]) => `<li class="unidad-tab__item">${v}</li>`);

  const content = items.length
    ? `<ul class="unidad-tab__list">${items.join('')}</ul>`
    : `<p class="unidad-tab__consultar">Lista de equipamiento disponible próximamente.</p>`;

  return { left: `<span class="unidad-tab__eyebrow">Equipamiento incluido</span>${content}` };
}

function tabEspecificaciones(u) {
  const rows = [];
  const m = u.motor || {};
  const e = u.equipamiento || {};

  if (m.tipo)         rows.push(['Motor',       m.tipo]);
  if (m.potencia_hp)  rows.push(['Potencia',    `${m.potencia_hp} HP`]);
  if (m.norma)        rows.push(['Norma',       m.norma]);
  if (m.transmision)  rows.push(['Transmisión', m.transmision]);
  if (m.traccion)     rows.push(['Tracción',    m.traccion]);
  if (m.suspension)   rows.push(['Suspensión',  m.suspension]);
  if (e.chasis)       rows.push(['Chasis',      e.chasis]);
  if (e.suspension)   rows.push(['Suspensión',  e.suspension]);
  if (e.neumaticos)   rows.push(['Neumáticos',  e.neumaticos]);
  if (e.bateria)      rows.push(['Batería',     e.bateria]);
  if (e.energia)      rows.push(['Energía',     e.energia]);
  if (e.acoplamiento) rows.push(['Acoplamiento',e.acoplamiento]);

  const content = rows.length
    ? rows.map(([l, v]) => `
        <div class="unidad-tab__spec-row">
          <span class="unidad-tab__spec-label">${l}</span>
          <span class="unidad-tab__spec-value">${v}</span>
        </div>`).join('')
    : `<p class="unidad-tab__consultar">Especificaciones técnicas disponibles próximamente. Consultanos.</p>`;

  return { left: `<span class="unidad-tab__eyebrow">Datos técnicos</span>${content}` };
}

// ── GALLERY ──────────────────────────────────────────

function galleryHTML(u) {
  const imgs = Array.from({ length: 4 }, (_, i) => {
    const src = `assets/img/unidades/${u.imagen_carpeta}/gallery-${i + 1}.jpg`;
    const fb  = GALLERY_FALLBACKS[i] || fallback(u);
    return `
      <div class="unidad-gallery__item">
        ${imgOrPlaceholder(u, src, fb, `${u.nombre} — foto ${i + 1}`)}
      </div>`;
  }).join('');

  return `
    <section class="section bg-slate unidad-gallery">
      <div class="container">
        <div class="unidad-gallery__header js-fade-up">
          <h2 class="unidad-gallery__title">Galería</h2>
        </div>
        <div class="unidad-gallery__grid">${imgs}</div>
      </div>
    </section>`;
}

// ── RENDER PRINCIPAL ─────────────────────────────────

function renderUnidad(u) {
  const main   = document.getElementById('unidadMain');
  if (!main) return;

  const tipo   = TIPO_LABELS[u.tipo] || u.tipo;
  const cover  = imgSrc(u);
  const fb     = fallback(u);
  const waMsg  = encodeURIComponent(`Hola! Me interesa la unidad ${u.nombre} de ${u.marca}. ¿Pueden darme más info?`);
  const waURL  = `https://wa.me/59896247661?text=${waMsg}`;

  document.title = `${u.nombre} — ${u.marca} | Sur Campers Uruguay`;

  const tabs = [
    { id: 'exterior',       label: 'Exterior',         fn: tabExterior },
    { id: 'interior',       label: 'Interior',         fn: tabInterior },
    { id: 'equipamiento',   label: 'Equipamiento',     fn: tabEquipamiento },
    { id: 'especificaciones', label: 'Especificaciones', fn: tabEspecificaciones },
  ];

  const tabBtns = tabs.map((t, i) =>
    `<button class="unidad-tab-btn${i === 0 ? ' active' : ''}" data-tab="${t.id}">${t.label}</button>`
  ).join('');

  const tabPanels = tabs.map((t, i) => {
    const { left } = t.fn(u);
    return `
      <div class="unidad-tab-panel${i === 0 ? ' active' : ''}" id="tab-${t.id}">
        <div class="unidad-tab__text">${left}</div>
        <div class="unidad-tab__media">
          ${imgOrPlaceholder(u, cover, fb, `${u.nombre} — ${u.marca}`)}
        </div>
      </div>`;
  }).join('');

  main.innerHTML = `
    <!-- Banner -->
    <section class="unidad-detail-banner">
      <div
        class="unidad-detail-banner__bg"
        id="detailBannerBg"
        ${u.completo ? `style="background-image: url('${cover}')"` : ''}
        aria-hidden="true"
      ></div>
      <div class="unidad-detail-banner__overlay" aria-hidden="true"></div>
      <div class="container unidad-detail-banner__content">
        <a href="unidades.html" class="unidad-detail-banner__back">← Volver al catálogo</a>
        <span class="unidad-detail-banner__marca">${u.marca}</span>
        <h1 class="unidad-detail-banner__title">${u.nombre}</h1>
        <p class="unidad-detail-banner__subtipo">${u.subtipo || tipo}</p>
      </div>
    </section>

    <!-- Descripción -->
    ${u.descripcion ? `
    <section class="section bg-soft unidad-intro" style="padding-top:0;">
      <div class="container">
        <p class="unidad-intro__text js-fade-up">${u.descripcion}</p>
      </div>
    </section>` : ''}

    <!-- Tabs -->
    <section class="section bg-soft" style="padding-top:0;">
      <div class="container">
        <div class="unidad-tabs">
          <nav class="unidad-tabs__nav" role="tablist" aria-label="Secciones de la unidad">
            ${tabBtns}
          </nav>
          <div class="unidad-tabs__content">
            ${tabPanels}
          </div>
        </div>
        <div style="text-align:right; margin-top:var(--space-4);">
          <a href="${waURL}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Consultar esta unidad →
          </a>
        </div>
      </div>
    </section>

    <!-- Galería -->
    ${galleryHTML(u)}

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
            <a href="${waURL}" class="contacto__card contacto__card--primary" target="_blank" rel="noopener noreferrer">
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

  if (u.completo) {
    // Fallback banner bg
    const testImg = new Image();
    testImg.onerror = () => {
      const bgEl = document.getElementById('detailBannerBg');
      if (bgEl) bgEl.style.backgroundImage = `url('${fb}')`;
    };
    testImg.src = cover;

    // Fallback galería e imágenes de tabs
    main.querySelectorAll('img[data-fallback]').forEach(img => {
      img.addEventListener('error', () => {
        const f = img.dataset.fallback;
        if (f && img.src !== new URL(f, location.href).href) img.src = f;
      });
    });
  }

  // Tabs interactivos
  const navEl = main.querySelector('.unidad-tabs__nav');
  navEl.addEventListener('click', e => {
    const btn = e.target.closest('.unidad-tab-btn');
    if (!btn) return;

    navEl.querySelectorAll('.unidad-tab-btn').forEach(b => b.classList.remove('active'));
    main.querySelectorAll('.unidad-tab-panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    main.querySelector(`#tab-${btn.dataset.tab}`)?.classList.add('active');
  });
}

function renderError() {
  const main = document.getElementById('unidadMain');
  if (!main) return;
  main.innerHTML = `
    <section class="section" style="min-height:60vh;display:flex;align-items:center;">
      <div class="container" style="text-align:center;">
        <span class="eyebrow--bar" style="display:inline-block;margin-bottom:var(--space-6);">404</span>
        <h1 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);
                   font-weight:800;color:var(--color-text-primary);margin-bottom:var(--space-6);">
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
