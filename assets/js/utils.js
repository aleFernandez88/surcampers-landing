/* ============================================================
   SUR CAMPERS — UTILS.JS
   Helpers generales reutilizables
   ============================================================ */

/**
 * Debounce: retrasa la ejecución de fn hasta que pasen `wait` ms
 * Útil para resize, scroll handlers costosos
 */
export function debounce(fn, wait = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Throttle: ejecuta fn como máximo una vez cada `limit` ms
 */
export function throttle(fn, limit = 100) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Detecta si el usuario prefiere reducir el movimiento
 */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Carga una imagen y devuelve una promesa
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Formatea número con puntos de miles (ej: 1500 → "1.500")
 */
export function formatNumber(n) {
  return new Intl.NumberFormat("es-UY").format(n);
}

/**
 * Genera query string para WhatsApp con mensaje predefinido
 */
export function whatsappLink(phone, message = "") {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}${encoded ? `?text=${encoded}` : ""}`;
}
