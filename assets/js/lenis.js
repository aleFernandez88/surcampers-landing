/* ============================================================
   SUR CAMPERS — LENIS.JS
   Inicialización de smooth scroll con Lenis
   ============================================================ */

export function initLenis() {
  // Lenis se carga desde CDN como global window.Lenis
  if (typeof window.Lenis === "undefined") {
    console.warn("Lenis no cargado aún.");
    return;
  }

  const lenis = new window.Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
  });

  // Conectar Lenis con GSAP ticker para compatibilidad con ScrollTrigger
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    // Notifica a ScrollTrigger en cada frame de Lenis para que usen la misma posición
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    // Fallback sin GSAP
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Exponer globalmente por si otra parte del código lo necesita
  window.__lenis = lenis;

  return lenis;
}
