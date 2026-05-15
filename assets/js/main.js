/* ============================================================
   SUR CAMPERS — MAIN.JS
   Entry point: inicialización de todas las funciones
   ============================================================ */

import { initLenis } from "./lenis.js";
import { initNavbar } from "./navbar.js";
import { initAnimations } from "./animations.js";
import { initHero } from "./hero.js";

// ── PRELOADER ────────────────────────────────────────
const preloaderStart = Date.now();

window.addEventListener("load", () => {
  const elapsed = Date.now() - preloaderStart;
  const remaining = Math.max(0, 1000 - elapsed);

  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    preloader.classList.add("is-hidden");
    preloader.addEventListener("transitionend", () => preloader.remove(), { once: true });
  }, remaining);
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth scroll
  initLenis();

  // 2. Navbar (scroll + burger)
  initNavbar();

  // 3. Hero slider
  initHero();

  // 4. Animaciones GSAP
  initAnimations();

  // 4. Año dinámico en el footer
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
