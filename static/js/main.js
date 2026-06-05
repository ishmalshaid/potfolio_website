/**
 * Premium Portfolio — Main JavaScript
 */

(function () {
  "use strict";

  const TYPING_NAME = "Ishmal Shahid";
  const TYPING_ROLES = [
    "Python Developer | Data Analyst | AI Engineer",
  ];

  /* Page Loader */
  window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");
    if (loader) {
      setTimeout(() => loader.classList.add("hidden"), 600);
    }
  });

  /* AOS */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }

  /* Theme Toggle */
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    if (themeIcon) {
      themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
    localStorage.setItem("portfolio-theme", theme);
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* Typing Effect */
  function typeText(element, texts, typeSpeed = 80, deleteSpeed = 40, pause = 2000) {
    if (!element) return;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const current = texts[textIndex];
      if (isDeleting) {
        element.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === current.length) {
        delay = pause;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 400;
      }

      setTimeout(tick, delay);
    }

    tick();
  }

  const typingName = document.getElementById("typingName");
  const typingRole = document.getElementById("typingRole");

  if (typingName) {
    typeText(typingName, [TYPING_NAME], 100, 50, 3000);
  }
  if (typingRole) {
    setTimeout(() => typeText(typingRole, TYPING_ROLES, 60, 35, 2500), 1200);
  }

  /* Custom Cursor */
  const dot = document.getElementById("cursorDot");
  const outline = document.getElementById("cursorOutline");

  if (dot && outline && window.matchMedia("(min-width: 769px)").matches) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      outline.style.left = outlineX + "px";
      outline.style.top = outlineY + "px";
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const hoverTargets = "a, button, .cert-card, .skill-card, .project-card, input, textarea";
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener("mouseenter", () => outline.classList.add("hover"));
      el.addEventListener("mouseleave", () => outline.classList.remove("hover"));
    });
  }

  /* Sticky Nav + Active Links */
  const nav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  const sections = document.querySelectorAll("section[id]");

  function onScroll() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    }

    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Close mobile nav on link click */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const collapse = document.getElementById("navMenu");
      if (collapse && collapse.classList.contains("show")) {
        const toggler = document.querySelector(".navbar-toggler");
        if (toggler) toggler.click();
      }
    });
  });

  /* Certificate Modal */
  const certModal = document.getElementById("certModal");
  if (certModal) {
    certModal.addEventListener("show.bs.modal", (event) => {
      const trigger = event.relatedTarget;
      if (!trigger) return;
      const title = trigger.getAttribute("data-cert-title");
      const img = trigger.getAttribute("data-cert-img");
      const issuer = trigger.getAttribute("data-cert-issuer");
      document.getElementById("certModalLabel").textContent = title || "Certificate";
      document.getElementById("certModalImg").src = img || "";
      document.getElementById("certModalImg").alt = title || "";
      document.getElementById("certModalIssuer").textContent = issuer || "";
    });
  }

  /* Auto-dismiss toasts */
  document.querySelectorAll(".toast").forEach((toast) => {
    setTimeout(() => {
      const bsToast = bootstrap.Toast.getOrCreateInstance(toast);
      bsToast.hide();
    }, 5000);
  });

  /* Scroll to contact after form submit with messages */
  if (window.location.hash === "" && document.querySelector(".toast.show")) {
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
  }
})();
