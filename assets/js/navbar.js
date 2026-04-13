/* ============================================================
   SUR CAMPERS — NAVBAR.JS
   Scroll effect (is-scrolled) + burger móvil
   ============================================================ */

export function initNavbar() {
  const navbar = document.getElementById("navbar");
  const burger = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll("[data-mobile-link]");

  if (!navbar) return;

  // ── SCROLL EFFECT ───────────────────────────────────
  const SCROLL_THRESHOLD = 60;

  const onScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // estado inicial

  // ── BURGER ──────────────────────────────────────────
  if (!burger || !mobileMenu) return;

  const openMenu = () => {
    burger.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    burger.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  burger.addEventListener("click", () => {
    const isOpen = burger.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar al hacer click en un link del menú
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burger.classList.contains("is-open")) {
      closeMenu();
    }
  });
}
