/* ============================================================
   SUR CAMPERS — HERO.JS
   Swiper slider fullscreen con contador y animación de entrada
   ============================================================ */

export function initHero() {
  if (typeof Swiper === "undefined") {
    console.warn("Swiper no cargado.");
    return;
  }

  const counterCurrent = document.querySelector(".hero-counter__current");
  const counterTotal = document.querySelector(".hero-counter__total");

  const heroSwiper = new Swiper(".hero-swiper", {
    loop: true,
    speed: 900,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },

    // Flechas custom
    navigation: {
      prevEl: "#heroPrev",
      nextEl: "#heroNext",
    },

    // Bullets custom
    pagination: {
      el: "#heroPagination",
      clickable: true,
    },

    // Actualizar contador al cambiar slide
    on: {
      slideChange() {
        updateCounter(this);
      },
      init() {
        updateCounter(this);
      },
    },
  });

  function updateCounter(swiper) {
    if (!counterCurrent || !counterTotal) return;

    // Con loop, realIndex da el índice real
    const current = swiper.realIndex + 1;
    const total = swiper.slides.length - 2; // descontar slides clonados del loop

    counterCurrent.textContent = String(current).padStart(2, "0");
    counterTotal.textContent = String(total).padStart(2, "0");
  }

  return heroSwiper;
}
