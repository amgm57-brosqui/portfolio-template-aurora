/* =========================
   0) GSAP SETUP
========================= */
gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* =========================
   1) TIME (LOCAL)
========================= */
const timeEl = document.getElementById("localTime");

function updateLocalTime() {
  if (!timeEl) return;
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  timeEl.textContent = `LOCAL / ${hh}:${mm}`;
}

updateLocalTime();
setInterval(updateLocalTime, 15000);

/* =========================
   2) SCROLL PROGRESS
========================= */
const progressEl = document.getElementById("scrollProgress");

function updateScrollProgress() {
  if (!progressEl) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressEl.style.width = `${p}%`;
}

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });

/* =========================
   3) MOBILE MENU (ROBUSTO)
   - Funciona SIEMPRE con CSS (.is-open)
   - GSAP solo anima
========================= */
(() => {
  const overlay = document.getElementById("menuOverlay"); // overlay
  const openBtn = document.querySelector("[aria-controls='menuOverlay']"); // botón 4 dots (mobile)
  const closeBtn = document.querySelector(".menu-toggle--close"); // botón cerrar dentro overlay
  const panel = overlay?.querySelector(".menu-panel") || null;
  const links = overlay ? overlay.querySelectorAll(".menu-list a") : [];

  if (!overlay || !openBtn) return;

  let menuOpen = false;

  // Estado inicial correcto
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  openBtn.setAttribute("aria-expanded", "false");
  closeBtn?.setAttribute("aria-expanded", "false");

  // Timeline GSAP (solo si no reduce motion)
  const menuTL = gsap.timeline({
    paused: true,
    defaults: { ease: "power4.out" },
  });

  if (!prefersReduced) {
    menuTL
      .fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, clearProps: "opacity" }
      )
      .from(
        links,
        { y: 120, skewY: 6, opacity: 0, duration: 0.75, stagger: 0.1 },
        "-=0.15"
      );
  }

  function openMenu() {
    menuOpen = true;

    overlay.classList.add("is-open"); // CSS manda
    overlay.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");

    openBtn.classList.add("active");
    closeBtn?.classList.add("active");
    closeBtn?.setAttribute("aria-expanded", "true");

    document.body.classList.add("no-scroll");

    // ✅ FIX: asegura que los links nunca se queden invisibles por GSAP
    if (links && links.length) {
      gsap.set(links, { clearProps: "opacity,transform,filter" });
      links.forEach((a) => {
        a.style.opacity = "1";
        a.style.transform = "none";
      });
    }

    if (!prefersReduced) menuTL.play(0);
  }

  function closeMenu() {
    menuOpen = false;

    openBtn.classList.remove("active");
    closeBtn?.classList.remove("active");

    overlay.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    closeBtn?.setAttribute("aria-expanded", "false");

    document.body.classList.remove("no-scroll");

    if (!prefersReduced) {
      menuTL.reverse();
      menuTL.eventCallback("onReverseComplete", () => {
        overlay.classList.remove("is-open");
        menuTL.eventCallback("onReverseComplete", null);
      });
    } else {
      overlay.classList.remove("is-open");
    }
  }

  // Toggle abrir/cerrar con el botón de 4 dots
  openBtn.addEventListener("click", () => {
    menuOpen ? closeMenu() : openMenu();
  });

  // Botón de cerrar
  closeBtn?.addEventListener("click", closeMenu);

  // Cerrar al clicar link
  links.forEach((a) => a.addEventListener("click", closeMenu));

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) closeMenu();
  });

  // Cerrar al clicar fuera del panel
  if (panel) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeMenu();
    });
  }
})();

/* =========================
   4) LANG TOGGLE (ES/EN)
========================= */
const langBtns = document.querySelectorAll(".lang-btn");

function setLang(lang) {
  // Botones active
  langBtns.forEach((b) => {
    const active = b.dataset.lang === lang;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", active ? "true" : "false");
  });

  // CTA principal + botón del form
  // CTA principal + botón del form (FIX DEFINITIVO)
  document.querySelectorAll(".btn-pill[data-cta]").forEach((el) => {
    const type = el.dataset.cta;

    if (type === "send") {
      el.textContent = lang === "en" ? "Send" : "Enviar";
    }

    if (type === "idea") {
      el.textContent = lang === "en" ? "Tell me your idea" : "Cuéntame tu idea";
    }
  });

  document.documentElement.lang = lang;
}

// default ES
setLang("es");

langBtns.forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

/* =========================
   5) BOOTSTRAP CAROUSEL INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("#heroCarousel");
  if (!carousel || !window.bootstrap) return;

  new bootstrap.Carousel(carousel, {
    interval: 2600,
    pause: false,
    ride: "carousel",
    touch: true,
    wrap: true,
  });
});

/* =========================
   6) HERO: Animaciones iniciales
========================= */
if (!prefersReduced) {
  gsap.from(".hero-title", {
    y: 18,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
  });

  gsap.from(".badge-item", {
    y: 10,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.15,
  });

  gsap.from(".tile", {
    y: 18,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: "power3.out",
    delay: 0.15,
  });

  gsap.from(".lead", {
    y: 10,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.25,
  });

  gsap.to(".scroll-line", {
    scaleX: 0.3,
    duration: 0.8,
    yoyo: true,
    repeat: -1,
    ease: "power2.inOut",
  });
}

/* =========================
   7) REVEALS: scroll
========================= */
document.querySelectorAll(".reveal").forEach((el) => {
  if (prefersReduced) return;

  gsap.fromTo(
    el,
    { y: 18, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    }
  );
});

/* =========================
   8) Parallax suave en collage
========================= */
if (!prefersReduced) {
  gsap.utils.toArray(".tile").forEach((tile, i) => {
    gsap.to(tile, {
      y: i % 2 === 0 ? -18 : 14,
      scrollTrigger: {
        trigger: ".collage",
        start: "top 85%",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/* =========================
   9) Tilt micro (sin librería)
========================= */
const tiltEls = document.querySelectorAll("[data-tilt]");

tiltEls.forEach((card) => {
  let rect;

  function onMove(e) {
    if (prefersReduced) return;
    rect = rect || card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 6,
      rotateX: -y * 6,
      transformPerspective: 900,
      transformOrigin: "center",
      duration: 0.35,
      ease: "power3.out",
    });
  }

  function onLeave() {
    rect = null;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", onLeave);
});

/* =========================
   10) Magnetic buttons
========================= */
const magnetics = document.querySelectorAll(".magnetic");

magnetics.forEach((btn) => {
  let r;

  btn.addEventListener("mousemove", (e) => {
    if (prefersReduced) return;
    r = r || btn.getBoundingClientRect();

    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);

    gsap.to(btn, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.25,
      ease: "power3.out",
    });
  });

  btn.addEventListener("mouseleave", () => {
    r = null;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.35,
      ease: "power3.out",
    });
  });
});

/* =========================
   11) Cursor PRO: dot + blob (smooth + squash)
   ✅ FIX: lo dejamos UNA sola vez (sin duplicados)
========================= */
(() => {
  const dot = document.querySelector(".cursor-dot");
  const blob = document.querySelector(".cursor-blob");

  // En táctil/coarse no hacemos nada (tu CSS lo suele ocultar)
  const isCoarse = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;

  if (prefersReduced || isCoarse || (!dot && !blob)) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;

  // dot (rápido)
  let dx = mx,
    dy = my;

  // blob (lento)
  let bx = mx,
    by = my;

  // squash/stretch por velocidad
  let lastBx = bx,
    lastBy = by;

  const show = () => {
    if (dot) dot.style.opacity = "1";
    if (blob) blob.style.opacity = "1";
  };

  window.addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      show();
    },
    { passive: true }
  );

  // targets hover
  const hoverSelectors =
    "a, button, .btn-pill, .btn-ghost, .magnetic, [role='button'], input, textarea, select, label";

  document.querySelectorAll(hoverSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.documentElement.classList.add("cursor-hover")
    );
    el.addEventListener("mouseleave", () =>
      document.documentElement.classList.remove("cursor-hover")
    );
  });

  function animate() {
    // DOT: rápido
    dx += (mx - dx) * 0.35;
    dy += (my - dy) * 0.35;

    if (dot) {
      dot.style.left = `${dx}px`;
      dot.style.top = `${dy}px`;
    }

    // BLOB: suave
    bx += (mx - bx) * 0.1;
    by += (my - by) * 0.1;

    if (blob) {
      blob.style.left = `${bx}px`;
      blob.style.top = `${by}px`;

      const vx = bx - lastBx;
      const vy = by - lastBy;
      lastBx = bx;
      lastBy = by;

      const speed = Math.min(Math.hypot(vx, vy), 24);
      const stretch = 1 + speed / 22;
      const squash = 1 - speed / 80;
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      blob.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${stretch}, ${squash})`;
    }

    requestAnimationFrame(animate);
  }

  animate();
})();

/* =========================
   12) Form demo (no envía)
========================= */
const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    if (!btn) return;

    const prev = btn.textContent;
    btn.textContent = "ENVIADO ✓";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = prev;
      btn.disabled = false;
      form.reset();
    }, 1400);
  });
}

/* =========================
   13) Video safety: pausa si está oculto
========================= */
const heroVideo = document.querySelector(".hero-video-el");

if (heroVideo) {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) heroVideo.play().catch(() => {});
      else heroVideo.pause();
    },
    { threshold: 0.15 }
  );
  io.observe(heroVideo);
}

/* =========================
   14) Footer: back to top
========================= */
const toTop = document.getElementById("toTop");

if (toTop) {
  toTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  });
}

/* ==========================================================
   404 PAGE — JS (integrado en main.js)
   - Hora local en 404
   - Cursor pro mini en 404 (sin depender del resto)
   ✅ FIX: sin redeclarar variables globales (no rompe el archivo)
   - NO afecta a otras páginas (solo si existe .e404)
========================================================== */
(() => {
  const is404 = document.querySelector(".e404");
  if (!is404) return;

  const prefersReduced404 = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =========================
     404: LOCAL TIME
     (reutiliza el mismo #localTime, pero sin redeclarar timeEl global)
  ========================= */
  const timeEl404 = document.getElementById("localTime");
  function updateLocalTime404() {
    if (!timeEl404) return;
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    timeEl404.textContent = `LOCAL / ${hh}:${mm}`;
  }
  updateLocalTime404();
  setInterval(updateLocalTime404, 15000);

  /* =========================
     404: CURSOR PRO (dot + blob)
     (solo en desktop / sin reduced motion)
  ========================= */
  const dot404 = document.querySelector(".cursor-dot");
  const blob404 = document.querySelector(".cursor-blob");

  const isCoarse = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;

  if (prefersReduced404 || isCoarse || (!dot404 && !blob404)) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;

  // dot rápido
  let dx = mx,
    dy = my;

  // blob suave
  let bx = mx,
    by = my;

  let lastBx = bx,
    lastBy = by;

  const show = () => {
    if (dot404) dot404.style.opacity = "1";
    if (blob404) blob404.style.opacity = "1";
  };

  window.addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      show();
    },
    { passive: true }
  );

  // hover targets 404
  document
    .querySelectorAll("a, button, .magnetic, .btn-pill, .btn-ghost")
    .forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.documentElement.classList.add("cursor-hover")
      );
      el.addEventListener("mouseleave", () =>
        document.documentElement.classList.remove("cursor-hover")
      );
    });

  function animate404() {
    // DOT
    dx += (mx - dx) * 0.35;
    dy += (my - dy) * 0.35;

    if (dot404) {
      dot404.style.left = `${dx}px`;
      dot404.style.top = `${dy}px`;
    }

    // BLOB
    bx += (mx - bx) * 0.1;
    by += (my - by) * 0.1;

    if (blob404) {
      blob404.style.left = `${bx}px`;
      blob404.style.top = `${by}px`;

      const vx = bx - lastBx;
      const vy = by - lastBy;
      lastBx = bx;
      lastBy = by;

      const speed = Math.min(Math.hypot(vx, vy), 24);
      const stretch = 1 + speed / 22;
      const squash = 1 - speed / 80;
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      blob404.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${stretch}, ${squash})`;
    }

    requestAnimationFrame(animate404);
  }

  animate404();
})();
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("[data-exp-accordion]");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll("[data-exp-card]"));

  const closeCard = (card) => {
    const btn = card.querySelector(".exp-card__btn");
    const panel = card.querySelector(".exp-card__panel");
    card.classList.remove("is-open");
    btn?.setAttribute("aria-expanded", "false");
    if (panel) panel.style.maxHeight = "0px";
  };

  const openCard = (card) => {
    const btn = card.querySelector(".exp-card__btn");
    const panel = card.querySelector(".exp-card__panel");
    card.classList.add("is-open");
    btn?.setAttribute("aria-expanded", "true");
    if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
  };

  cards.forEach(closeCard);

  cards.forEach((card) => {
    const btn = card.querySelector(".exp-card__btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const wasOpen = card.classList.contains("is-open");
      cards.forEach(closeCard);
      if (!wasOpen) openCard(card);
    });
  });

  window.addEventListener("resize", () => {
    cards.forEach((card) => {
      if (!card.classList.contains("is-open")) return;
      const panel = card.querySelector(".exp-card__panel");
      if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const about = document.querySelector("#about");
  if (!about) return;

  const counters = Array.from(about.querySelectorAll(".count[data-count]"));
  const fills = Array.from(about.querySelectorAll(".skill__fill[data-fill]"));

  const animateCount = (el, to) => {
    const start = 0;
    const dur = 900;
    const t0 = performance.now();

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const v = Math.round(start + (to - start) * (1 - Math.pow(1 - p, 3)));
      el.textContent = String(v);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const run = () => {
    counters.forEach((c) => animateCount(c, Number(c.dataset.count || 0)));
    fills.forEach((f) => (f.style.width = `${Number(f.dataset.fill || 0)}%`));
  };

  // dispara al entrar en viewport
  let done = false;
  const io = new IntersectionObserver(
    (entries) => {
      if (done) return;
      if (entries.some((e) => e.isIntersecting)) {
        done = true;
        run();
        io.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  io.observe(about);
});

document.addEventListener("DOMContentLoaded", () => {
  // ===== Animación contadores + barras al entrar =====
  const about = document.querySelector("#about");
  if (about) {
    const counters = Array.from(about.querySelectorAll(".count[data-count]"));
    const fills = Array.from(about.querySelectorAll(".skill__fill[data-fill]"));

    const animateCount = (el, to) => {
      const dur = 900;
      const t0 = performance.now();
      const easeOut = (p) => 1 - Math.pow(1 - p, 3);

      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = String(Math.round(to * easeOut(p)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const run = () => {
      counters.forEach((c) => animateCount(c, Number(c.dataset.count || 0)));
      fills.forEach((f) => (f.style.width = `${Number(f.dataset.fill || 0)}%`));
    };

    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done) return;
        if (entries.some((e) => e.isIntersecting)) {
          done = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(about);
  }

  // ===== Botón "Leer mi historia" =====
  const moreBox = document.querySelector("[data-about-more]");
  if (moreBox) {
    const btn = moreBox.querySelector(".about-morebtn");
    const panel = moreBox.querySelector(".about-morepanel");

    const close = () => {
      moreBox.classList.remove("is-open");
      btn?.setAttribute("aria-expanded", "false");
      if (panel) panel.style.maxHeight = "0px";
    };

    const open = () => {
      moreBox.classList.add("is-open");
      btn?.setAttribute("aria-expanded", "true");
      if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
    };

    close();

    btn?.addEventListener("click", () => {
      const isOpen = moreBox.classList.contains("is-open");
      if (isOpen) close();
      else open();
    });

    window.addEventListener("resize", () => {
      if (!moreBox.classList.contains("is-open")) return;
      if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
    });
  }

  // ===== Marquee infinito: duplicar items para loop perfecto =====
  const marquee = document.querySelector("[data-marquee]");
  if (marquee) {
    const track = marquee.querySelector("[data-track]");
    const dup = track?.querySelector(".apps-dup");
    if (track && dup) {
      // Copia todos los app-item del track y los mete en .apps-dup
      const items = Array.from(track.querySelectorAll(".app-item")).map((el) =>
        el.cloneNode(true)
      );
      dup.replaceWith(...items.map((n) => n)); // mete clones al final

      // Ajuste: si por algún motivo no llega a 2 sets, vuelve a duplicar una vez
      const totalItems = track.querySelectorAll(".app-item").length;
      if (totalItems < 12) {
        const again = Array.from(track.querySelectorAll(".app-item")).map(
          (el) => el.cloneNode(true)
        );
        track.append(...again);
      }
    }
  }
});
