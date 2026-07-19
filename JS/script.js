/* ============================================================
   PORTAFOLIO — Angel De Jesus Amaro Trinidad
   JS: preloader, cursor, aurora bg, reveals, counters, tilt,
   magnetic buttons, ripple, navbar/scrollspy, theme, WhatsApp form
   ============================================================ */

/* ------------------------------------------------------------
   CONFIG — reemplaza por tu correo real donde quieres recibir
   los mensajes del formulario de contacto.
------------------------------------------------------------ */
const RECIPIENT_EMAIL = "tucorreo@gmail.com"; // TODO: reemplazar por tu correo real

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ================= PRELOADER ================= */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hidden"), 350);
  });

  /* ================= FOOTER YEAR ================= */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ================= THEME TOGGLE (persist) ================= */
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  }
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  });

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navH = document.getElementById("navbar").offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - (navH - 10);
        window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
      }
    });
  });

  /* ================= NAVBAR: scrolled state + mobile toggle ================= */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const onScrollNav = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  /* ================= SCROLL SPY ================= */
  const sections = Array.from(document.querySelectorAll("section[id], header[id]"));
  const navAnchors = Array.from(document.querySelectorAll("[data-nav]"));

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => spyObserver.observe(s));

  /* ================= SCROLL PROGRESS BAR ================= */
  const scrollProgress = document.getElementById("scrollProgress");
  const onScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  };
  onScrollProgress();
  window.addEventListener("scroll", onScrollProgress, { passive: true });

  /* ================= BACK TO TOP ================= */
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ================= CUSTOM CURSOR ================= */
  if (!isTouch) {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    document.querySelectorAll("a, button, .project-card, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
    });
  }

  /* ================= MAGNETIC BUTTONS ================= */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${relX * 0.28}px, ${relY * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  /* ================= RIPPLE EFFECT ON BUTTONS ================= */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      this.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });

  /* ================= SCROLL REVEAL (Intersection Observer) ================= */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ================= ANIMATED COUNTERS ================= */
  const counters = document.querySelectorAll("[data-counter]");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.counter, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ================= SKILL BARS ANIMATION ================= */
  const skillBars = document.querySelectorAll(".skill-progress");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.percent + "%";
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach((b) => skillObserver.observe(b));

  /* ================= TYPEWRITER EFFECT ================= */
  const typewriterEl = document.getElementById("typewriter");
  const roles = ["Desarrollador Web", "Frontend Developer", "Backend con Django", "UI/UX Enthusiast"];
  let roleIndex = 0, charIndex = 0, deleting = false;

  const typeLoop = () => {
    const currentRole = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  };
  if (prefersReducedMotion) {
    typewriterEl.textContent = roles[0];
  } else {
    typeLoop();
  }

  /* ================= 3D TILT ON PROJECT CARDS ================= */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ================= PROJECT CARDS: open link ================= */
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const url = card.dataset.url;
      if (url) window.open(url, "_blank", "noopener");
    });
  });

  /* ================= AURORA CANVAS BACKGROUND ================= */
  const canvas = document.getElementById("aurora-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    const blobs = [
      { x: 0.25, y: 0.35, r: 0.42, color: "245,166,35", speed: 0.00028, phase: 0 },
      { x: 0.72, y: 0.28, r: 0.38, color: "124,92,255", speed: 0.00022, phase: 2 },
      { x: 0.5, y: 0.7, r: 0.4, color: "79,209,255", speed: 0.00019, phase: 4 },
    ];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    let particles = [];
    const particleCount = prefersReducedMotion ? 0 : Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vy: Math.random() * 0.25 + 0.05,
        drift: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.5 + 0.15,
      });
    }

    function drawAurora(time) {
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b) => {
        const bx = w * (b.x + Math.sin(time * b.speed + b.phase) * 0.06);
        const by = h * (b.y + Math.cos(time * b.speed * 1.3 + b.phase) * 0.05);
        const radius = Math.max(w, h) * b.r;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
        grad.addColorStop(0, `rgba(${b.color}, 0.30)`);
        grad.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      particles.forEach((p) => {
        p.y -= p.vy;
        p.x += p.drift * 0.3;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(238, 241, 247, ${p.alpha})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) requestAnimationFrame(drawAurora);
    }
    requestAnimationFrame(drawAurora);
  }

  /* ================= CONTACT FORM → GMAIL ================= */
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("status");
  const submitBtn = document.getElementById("submitBtn");

  const fields = {
    from_name: document.getElementById("field-name"),
    from_email: document.getElementById("field-email"),
    message: document.getElementById("field-message"),
  };

  function setFieldError(key, hasError) {
    fields[key].classList.toggle("error", hasError);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm(data) {
    let valid = true;
    if (!data.from_name.trim()) { setFieldError("from_name", true); valid = false; }
    else setFieldError("from_name", false);

    if (!isValidEmail(data.from_email.trim())) { setFieldError("from_email", true); valid = false; }
    else setFieldError("from_email", false);

    if (!data.message.trim()) { setFieldError("message", true); valid = false; }
    else setFieldError("message", false);

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      from_name: form.from_name.value,
      from_email: form.from_email.value,
      message: form.message.value,
    };

    statusEl.textContent = "";
    statusEl.className = "form-status";

    if (!validateForm(data)) {
      statusEl.textContent = "Revisa los campos marcados en rojo.";
      statusEl.classList.add("error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add("loading");

    // Pequeña pausa para mostrar el estado de carga antes de redirigir
    setTimeout(() => {
      const subject = `Contacto desde el portafolio — ${data.from_name}`;
      const body =
        `Hola Angel,\n\n` +
        `Mi nombre es: ${data.from_name}\n` +
        `Mi correo es: ${data.from_email}\n\n` +
        `Mensaje:\n${data.message}\n\n` +
        `Me interesa hablar contigo sobre un proyecto.`;

      // Abre Gmail (web) con el correo ya redactado, listo para enviar
      const gmailUrl =
        `https://mail.google.com/mail/?view=cm&fs=1&tf=1` +
        `&to=${encodeURIComponent(RECIPIENT_EMAIL)}` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.open(gmailUrl, "_blank", "noopener");

      statusEl.textContent = "✅ Abriendo Gmail con tu mensaje listo para enviar…";
      statusEl.classList.add("success");

      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
      form.reset();
    }, 500);
  });

  form.addEventListener("reset", () => {
    Object.keys(fields).forEach((key) => setFieldError(key, false));
    statusEl.textContent = "";
    statusEl.className = "form-status";
  });
})();