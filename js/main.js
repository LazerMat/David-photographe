/* =========================================================
   Dans l'œil de David — interactions
   ========================================================= */
(function () {
  "use strict";

  const GALLERY_PATH = "assets/gallery/";
  const catLabel = (key) => (CATEGORIES.find((c) => c.key === key) || {}).label || key;

  /* ---------- Année du footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header sticky ---------- */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navClose = document.getElementById("navClose");
  const navOverlay = document.getElementById("navOverlay");

  const openMenu = () => {
    navLinks.classList.add("open");
    navToggle.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    if (navOverlay) { navOverlay.hidden = false; requestAnimationFrame(() => navOverlay.classList.add("show")); }
  };
  const closeMenu = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    if (navOverlay) { navOverlay.classList.remove("show"); setTimeout(() => { navOverlay.hidden = true; }, 400); }
  };

  navToggle.addEventListener("click", () => {
    navLinks.classList.contains("open") ? closeMenu() : openMenu();
  });
  if (navClose) navClose.addEventListener("click", closeMenu);
  if (navOverlay) navOverlay.addEventListener("click", closeMenu);
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  // Échap ferme aussi le menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) closeMenu();
  });

  /* ---------- Galerie : filtres + rendu ---------- */
  const filtersEl = document.getElementById("filters");
  const galleryEl = document.getElementById("gallery");
  const viewportEl = document.getElementById("galleryViewport");
  const hintEl = document.getElementById("galleryHint");
  let currentFilter = "all";

  // Boutons de filtre (uniquement les catégories réellement présentes)
  const presentCats = new Set(PHOTOS.map((p) => p.cat));
  const usableCats = CATEGORIES.filter((c) => c.key === "all" || presentCats.has(c.key));
  usableCats.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (i === 0 ? " active" : "");
    btn.textContent = c.label;
    btn.dataset.cat = c.key;
    btn.setAttribute("role", "tab");
    btn.addEventListener("click", () => setFilter(c.key, btn));
    filtersEl.appendChild(btn);
  });

  function setFilter(cat, btn) {
    currentFilter = cat;
    filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery();
    if (viewportEl) viewportEl.scrollTop = 0;
  }

  // Masque l'indication "faire défiler" quand on arrive en bas, ou si tout tient à l'écran.
  function updateHint() {
    if (!viewportEl || !hintEl) return;
    const scrollable = viewportEl.scrollHeight - viewportEl.clientHeight > 8;
    const atBottom = viewportEl.scrollTop + viewportEl.clientHeight >= viewportEl.scrollHeight - 12;
    hintEl.style.opacity = scrollable && !atBottom ? "1" : "0";
  }

  function visiblePhotos() {
    return currentFilter === "all" ? PHOTOS : PHOTOS.filter((p) => p.cat === currentFilter);
  }

  function renderGallery() {
    galleryEl.innerHTML = "";
    const list = visiblePhotos();
    list.forEach((p, idx) => {
      const item = document.createElement("figure");
      item.className = "gal-item";
      item.dataset.index = idx;

      const img = document.createElement("img");
      img.src = GALLERY_PATH + p.file;
      img.alt = p.alt;
      img.width = p.w;
      img.height = p.h;
      // Les premières images se chargent tout de suite (meilleur LCP),
      // le reste en lazy pour la performance.
      img.loading = idx < 6 ? "eager" : "lazy";
      img.decoding = "async";

      const overlay = document.createElement("figcaption");
      overlay.className = "gal-overlay";
      overlay.innerHTML = `<span class="gal-cat">${catLabel(p.cat)}</span>`;

      const lens = document.createElement("span");
      lens.className = "lens";
      lens.setAttribute("aria-hidden", "true");
      lens.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>';

      item.append(img, overlay, lens);
      item.addEventListener("click", () => openLightbox(idx));
      galleryEl.appendChild(item);

      // apparition échelonnée
      requestAnimationFrame(() => {
        setTimeout(() => item.classList.add("in"), Math.min(idx * 45, 500));
      });
    });
    // recalcule l'indice de scroll une fois les images en place
    setTimeout(updateHint, 120);
  }

  renderGallery();

  if (viewportEl) {
    viewportEl.addEventListener("scroll", updateHint, { passive: true });
    window.addEventListener("resize", updateHint);
    window.addEventListener("load", updateHint);
  }

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCaption = document.getElementById("lbCaption");
  let lbIndex = 0;

  function openLightbox(i) {
    lbIndex = i;
    updateLightbox();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function updateLightbox() {
    const list = visiblePhotos();
    const p = list[lbIndex];
    if (!p) return;
    lbImg.src = GALLERY_PATH + p.file;
    lbImg.alt = p.alt;
    lbCaption.textContent = p.alt;
  }
  function navLightbox(dir) {
    const list = visiblePhotos();
    lbIndex = (lbIndex + dir + list.length) % list.length;
    updateLightbox();
  }

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", () => navLightbox(-1));
  document.getElementById("lbNext").addEventListener("click", () => navLightbox(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") navLightbox(1);
    else if (e.key === "ArrowLeft") navLightbox(-1);
  });

  // Glisser (mobile)
  let touchX = null;
  lb.addEventListener("touchstart", (e) => (touchX = e.changedTouches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) navLightbox(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  /* ---------- Reveal au scroll ---------- */
  const revealEls = [
    ".section-head", ".service-card", ".about-media", ".about-text",
    ".review-card", ".contact-text", ".contact-form", ".services-cta"
  ].flatMap((sel) => Array.from(document.querySelectorAll(sel)));
  revealEls.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Formulaire de contact ----------
     On compose un email pré-rempli. On tente d'abord le client mail du
     visiteur (mailto:). Si aucun n'est configuré, on propose un lien direct
     vers Gmail (web) pour que ça fonctionne quand même. */
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const DEST_EMAIL = "dansloeildedavid@gmail.com";

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const subject = form.subject.value;
      const message = form.message.value.trim();

      // Validation simple
      if (!name || !email || !message) {
        showStatus("Merci de remplir votre nom, votre email et votre message.", "error");
        return;
      }

      const mailSubject = `Demande ${subject} — ${name}`;
      const mailBody =
        `Nom : ${name}\n` +
        `Email : ${email}\n` +
        (phone ? `Téléphone : ${phone}\n` : "") +
        `Prestation souhaitée : ${subject}\n\n` +
        `${message}`;

      // Lien Gmail web : s'ouvre dans le navigateur, message pré-rempli,
      // sans dépendre d'un logiciel mail installé sur l'appareil.
      const gmail =
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(DEST_EMAIL)}` +
        `&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

      // Lien mailto : pour ceux qui ont un client mail par défaut (Outlook, Mail…).
      const mailto =
        `mailto:${DEST_EMAIL}?subject=${encodeURIComponent(mailSubject)}` +
        `&body=${encodeURIComponent(mailBody)}`;

      // Le bouton principal ouvre directement Gmail dans un nouvel onglet.
      window.open(gmail, "_blank", "noopener");

      // Filet de sécurité : si le navigateur bloque la nouvelle fenêtre,
      // on laisse des liens cliquables (Gmail + client mail) sous le bouton.
      showStatus(
        `Votre email s'ouvre dans un nouvel onglet. ` +
        `Rien ne s'est passé&nbsp;? ` +
        `<a href="${gmail}" target="_blank" rel="noopener">Ouvrir Gmail</a> · ` +
        `<a href="${mailto}">utiliser ma messagerie</a> · ` +
        `ou écrire à ${DEST_EMAIL}`,
        "ok"
      );
    });

    function showStatus(html, type) {
      if (!formStatus) return;
      formStatus.innerHTML = html;
      formStatus.className = "form-status show " + (type === "error" ? "is-error" : "is-ok");
    }
  }
})();
