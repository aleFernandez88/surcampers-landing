/* ============================================================
   SUR CAMPERS — CATALOGO.JS
   Renderiza el grid de unidades desde data/catalogo.json
   ============================================================ */

const TIPO_LABELS = {
  motorhome:    'Motorhome',
  trailer:      'Trailer',
  'food-truck': 'Food Truck',
};

const PLACEHOLDERS = {
  julia:    'assets/img/galeria/galeria-1.jpg',
  ilusion:  'assets/img/galeria/galeria-2.jpg',
  buho:     'assets/img/galeria/galeria-3.jpg',
  caretta:  'assets/img/galeria/galeria-4.jpg',
  mactrail: 'assets/img/galeria/galeria-5.jpg',
};

const ICON_PERSONAS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952
       4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07
       M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766
       l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0
       3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
</svg>`;

const ICON_LARGO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5
       m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5
       m4.5 0v-4.5m0 4.5L15 15"/>
</svg>`;

function buildCard(u) {
  const tipo       = TIPO_LABELS[u.tipo] || u.tipo;
  const imgSrc     = `assets/img/unidades/${u.imagen_carpeta}/cover.jpg`;
  const brandKey   = u.imagen_carpeta.split('-')[0];
  const fallback   = PLACEHOLDERS[brandKey] || 'assets/img/hero/hero-1.jpg';

  const specs = [];
  if (u.capacidad_personas) {
    specs.push(`<span class="unidad-card__spec">${ICON_PERSONAS}${u.capacidad_personas} pers.</span>`);
  }
  if (u.dimensiones?.largo_cm) {
    const m = (u.dimensiones.largo_cm / 100).toFixed(2);
    specs.push(`<span class="unidad-card__spec">${ICON_LARGO}${m} m</span>`);
  }

  const specsHTML = specs.length
    ? `<div class="unidad-card__specs">${specs.join('')}</div>`
    : '';

  const mediaContent = u.completo
    ? `<img src="${imgSrc}" alt="${u.nombre} — ${u.marca}" loading="lazy" data-fallback="${fallback}" />`
    : `<div class="img-placeholder">Próximamente</div>`;

  const ctaHTML = u.completo
    ? `<a href="unidad.html?id=${u.id}" class="btn btn-primary unidad-card__cta">Ver ficha →</a>`
    : `<span class="btn btn-ghost unidad-card__cta" style="pointer-events:none;opacity:.45;">Próximamente</span>`;

  return `
    <article class="unidad-card${!u.completo ? ' unidad-card--incomplete' : ''}" data-tipo="${u.tipo}">
      <div class="unidad-card__media">
        ${mediaContent}
        <span class="unidad-card__brand">${u.marca}</span>
      </div>
      <div class="unidad-card__body">
        <span class="eyebrow--bar unidad-card__tipo">${tipo}</span>
        <h3 class="unidad-card__title">${u.nombre}</h3>
        ${specsHTML}
        ${ctaHTML}
      </div>
    </article>`;
}

function renderGrid(unidades) {
  const grid = document.getElementById('unidadesGrid');
  if (!grid) return;
  grid.innerHTML = unidades.map(buildCard).join('');

  // Fallback de imágenes sin src válido
  grid.querySelectorAll('.unidad-card__media img').forEach(img => {
    img.addEventListener('error', () => {
      const fb = img.dataset.fallback;
      if (fb && img.src !== new URL(fb, location.href).href) img.src = fb;
    });
  });
}

function renderFilters(unidades) {
  const container = document.getElementById('catalogoFilters');
  if (!container) return;

  const tipos = [...new Set(unidades.map(u => u.tipo))];

  const btns = [
    `<button class="catalogo-filter active" data-filter="todos">Todos</button>`,
    ...tipos.map(t =>
      `<button class="catalogo-filter" data-filter="${t}">${TIPO_LABELS[t] || t}</button>`
    ),
  ].join('');

  container.innerHTML = btns;

  container.addEventListener('click', e => {
    const btn = e.target.closest('.catalogo-filter');
    if (!btn) return;
    container.querySelectorAll('.catalogo-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.unidad-card').forEach(card => {
      card.hidden = f !== 'todos' && card.dataset.tipo !== f;
    });
  });
}

async function initCatalogo() {
  try {
    const res      = await fetch('data/catalogo.json');
    const unidades = await res.json();
    renderGrid(unidades);
    renderFilters(unidades);
  } catch (err) {
    console.error('Error cargando catálogo:', err);
  }
}

document.addEventListener('DOMContentLoaded', initCatalogo);
