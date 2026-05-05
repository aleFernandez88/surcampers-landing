/* ============================================================
   SUR CAMPERS — ANIMATIONS.JS
   GSAP + ScrollTrigger: hero, fade-ups, splitting
   ============================================================ */

export function initAnimations() {
  if (typeof gsap === "undefined") {
    console.warn("GSAP no cargado.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── HERO ────────────────────────────────────────────

  // Splitting: anima el título letra por letra
  if (typeof Splitting !== "undefined") {
    Splitting({ target: "[data-splitting]", by: "chars" });

    // CORREGIDO: Clase del HTML
    const heroChars = document.querySelectorAll(".hero-slide__title .char");
    if (heroChars.length) {
      gsap.from(heroChars, {
        opacity: 0,
        y: 60,
        rotateX: -40,
        stagger: 0.018,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.3,
      });
    }
  }

  // eyebrow, subtitle y actions del hero los maneja el CSS
  // via .swiper-slide-active — no tocar con GSAP o el inline
  // style sobreescribe la transición en slides 2 y 3.

  gsap.from(".hero-scroll", {
    opacity: 0,
    duration: 1,
    ease: "power1.out",
    delay: 1.4,
  });

  // Parallax sutil en la imagen de fondo del hero
  // CORREGIDO: Clase del background del hero
  const heroMedia = document.querySelector(".hero-slide__bg");
  if (heroMedia) {
    gsap.to(heroMedia, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // ── FADE UPS GENÉRICOS (ScrollTrigger) ──────────────

  const fadeUpEls = document.querySelectorAll(".js-fade-up");
  fadeUpEls.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });

  const fadeInEls = document.querySelectorAll(".js-fade-in");
  fadeInEls.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });

  const slideLeftEls = document.querySelectorAll(".js-slide-left");
  slideLeftEls.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: -40,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });

  const slideRightEls = document.querySelectorAll(".js-slide-right");
  slideRightEls.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: 40,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });

  // Animar grupos staggered (cards, steps)
  const staggerGroups = document.querySelectorAll("[data-stagger]");
  staggerGroups.forEach((group) => {
    const children = group.children;
    gsap.from(children, {
      opacity: 0,
      y: 32,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // ── NAVBAR (fade down al cargar) ────────────────────
  gsap.from("#navbar", {
    opacity: 0,
    y: -16,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.1,
  });

  // ── EL FIX PARA EL SCROLL ───────────────────────────
  // Obliga a ScrollTrigger a recalcular todas las posiciones una vez
  // que las imágenes y recursos externos (como fuentes) hayan cargado.
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}
