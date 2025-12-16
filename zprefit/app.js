/* app.js — ZPREFIT core
   - Template registry driven (options grow as you add templates)
   - No storage, no network
   - Starts with LinkedIn Banner (from templates/linkedin.js)
*/

(() => {
  // ---------- Helpers ----------
  const $ = (id) => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // ---------- DOM ----------
  const templateSelect = $("templateSelect");
  const drop = $("drop");
  const fileInput = $("fileInput");
  const demoBtn = $("demoBtn");
  const clearBtn = $("clearBtn");
  const resetBtn = $("resetBtn");

  const templateHint = $("templateHint");
  const controlsArea = $("controlsArea");

  const zoomEl = $("zoom");
  const zoomVal = $("zoomVal");

  const modeFillBtn = $("modeFill");
  const modeFitBtn = $("modeFit");
  const fitVal = $("fitVal");

  const safeToggleBtn = $("safeToggle");
  const mobileToggleBtn = $("mobileToggle");
  const safeVal = $("safeVal");

  const previewRoot = $("previewRoot");
  const footNote = $("footNote");

  const viewBothBtn = $("viewBoth");
  const viewDesktopBtn = $("viewDesktop");
  const viewMobileBtn = $("viewMobile");

  const dotRes = $("dotRes");
  const dotCrop = $("dotCrop");
  const dotSafe = $("dotSafe");
  const msgRes = $("msgRes");
  const msgCrop = $("msgCrop");
  const msgSafe = $("msgSafe");

  // ---------- Templates ----------
  // templates/linkedin.js should set: window.ZPREFIT_TEMPLATES = [...]
  const templates = Array.isArray(window.ZPREFIT_TEMPLATES) ? window.ZPREFIT_TEMPLATES : [];

  if (!templates.length) {
    templateHint.textContent = "No templates loaded. Did you include ./templates/linkedin.js before app.js?";
  }

  // Choose first template as default
  let activeTemplate = templates[0] || null;

  // ---------- State ----------
  let img = null;
  let imgMeta = { w: 0, h: 0 };

  const state = {
    zoom: 1.0,
    mode: "fill",           // "fill" (cover) or "fit" (contain)
    offsetX: 0,             // CSS pixels (drag)
    offsetY: 0,
    showSafe: true,
    emphasizeMobile: false, // makes mobile crop guide tighter + safe zone tighter
    view: "both"            // "both" | "desktop" | "mobile"
  };

  // Preview node refs (rebuilt per template)
  let previewNodes = {
    desktop: null, // { area, canvas, ctx, overlay, rect }
    mobile: null
  };

  // ---------- Init: template select ----------
  function buildTemplateSelect() {
    templateSelect.innerHTML = "";
    templates.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t.id;
      opt.textContent = t.label || t.id;
      templateSelect.appendChild(opt);
    });

    if (activeTemplate) templateSelect.value = activeTemplate.id;
  }

  function setActiveTemplate(id) {
    const t = templates.find(x => x.id === id);
    if (!t) return;

    activeTemplate = t;
    resetViewToTemplateDefaults();
    rebuildPreview();
    syncUIFromState();
    renderAll();
  }

  // ---------- Template-driven UI ----------
  function resetViewToTemplateDefaults() {
    if (!activeTemplate) return;

    state.zoom = activeTemplate.defaults?.zoom ?? 1.0;
    state.mode = activeTemplate.defaults?.mode ?? "fill";
    state.offsetX = 0;
    state.offsetY = 0;

    state.showSafe = true;
    state.emphasizeMobile = false;
    state.view = "both";

    zoomEl.value = Math.round(state.zoom * 100);
    zoomVal.textContent = `${Math.round(state.zoom * 100)}%`;
  }

  function applyTemplateCopy() {
    if (!activeTemplate) return;

    const rec = activeTemplate.recommended;
    const ratioTxt = activeTemplate.aspectRatio ? `${(activeTemplate.aspectRatio).toFixed(2)}:1` : "";
    const recTxt = rec ? `${rec.w}×${rec.h}` : "—";

    templateHint.innerHTML =
      `Recommended: <b>${recTxt}</b>` +
      (activeTemplate.aspectRatio ? ` · Ratio: <b>${activeTemplate.aspectRatio === 4 ? "4:1" : ratioTxt}</b>` : "") +
      (activeTemplate.hint ? `<br/>${activeTemplate.hint}` : "");

    footNote.textContent = activeTemplate.footnote || "This is a practical preview, not a pixel-perfect clone. Platforms may change UI and crop rules.";
  }

  function showHideControls() {
    if (!activeTemplate) return;

    const c = activeTemplate.controls || {};
    const set = (key, on) => {
      const el = controlsArea.querySelector(`[data-control="${key}"]`);
      if (el) el.style.display = on ? "" : "none";
    };

    set("zoom", !!c.zoom);
    set("fitmode", !!c.fitmode);
    set("safezone", !!c.safezone);

    // Mobile toggle is only meaningful if template has mobile safe zone
    const hasMobile = !!activeTemplate.safeZones?.mobile;
    mobileToggleBtn.style.display = (c.safezone && hasMobile) ? "" : "none";
  }

  // ---------- Preview builders ----------
  function createLiCard(kindLabel) {
    const wrap = document.createElement("div");

    const title = document.createElement("p");
    title.className = "miniTitle";
    title.textContent = kindLabel;
    wrap.appendChild(title);

    const card = document.createElement("div");
    card.className = "liCard";

    const area = document.createElement("div");
    area.className = "bannerArea";
    area.dataset.kind = kindLabel.toLowerCase().includes("mobile") ? "mobile" : "desktop";

    const canvas = document.createElement("canvas");
    canvas.className = "bannerCanvas";

    const overlay = document.createElement("div");
    overlay.className = "safeOverlay on";

    const rect = document.createElement("div");
    rect.className = "rect";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = kindLabel.toLowerCase().includes("mobile") ? "Safe zone (mobile)" : "Safe zone (desktop)";

    overlay.appendChild(rect);
    overlay.appendChild(label);

    area.appendChild(canvas);
    area.appendChild(overlay);

    const below = document.createElement("div");
    below.className = "below";

    const avatar = document.createElement("div");
    avatar.className = "avatar";

    const meta = document.createElement("div");
    meta.className = "liMeta";
    meta.innerHTML = `<div class="name">Your Name</div><div class="headline">Headline goes here · Company · Location</div>`;

    below.appendChild(avatar);
    below.appendChild(meta);

    card.appendChild(area);
    card.appendChild(below);

    wrap.appendChild(card);

    return { wrap, area, canvas, ctx: canvas.getContext("2d"), overlay, rect };
  }

  function rebuildPreview() {
    previewRoot.innerHTML = "";
    previewNodes.desktop = null;
    previewNodes.mobile = null;

    applyTemplateCopy();
    showHideControls();

    if (!activeTemplate) return;

    // For now: only LinkedIn Banner type supported
    if (activeTemplate.type !== "linkedin.banner") {
      const p = document.createElement("p");
      p.className = "hint";
      p.textContent = "Template type not supported by the current renderer.";
      previewRoot.appendChild(p);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "previewGrid2";

    const desk = createLiCard("Desktop (approx)");
    const mob = createLiCard("Mobile (approx)");

    grid.appendChild(desk.wrap);
    grid.appendChild(mob.wrap);

    previewRoot.appendChild(grid);

    previewNodes.desktop = desk;
    previewNodes.mobile = mob;

    attachDrag(desk.area);
    attachDrag(mob.area);

    // Ensure canvases are correctly sized
    resizeCanvases();
    syncViewMode();
  }

  // ---------- Resize / safe rects ----------
  function resizeCanvasToDisplay(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
  }

  function applySafeRect(node, kind) {
    if (!node || !activeTemplate) return;

    const zones = activeTemplate.safeZones || {};
    const z = (kind === "mobile")
      ? (zones.mobile || zones.desktop)
      : (state.emphasizeMobile ? (zones.mobile || zones.desktop) : (zones.desktop || zones.mobile));

    if (!z) return;

    node.rect.style.left = (z.x * 100) + "%";
    node.rect.style.top = (z.y * 100) + "%";
    node.rect.style.width = (z.w * 100) + "%";
    node.rect.style.height = (z.h * 100) + "%";

    node.overlay.classList.toggle("on", state.showSafe);
  }

  function resizeCanvases() {
    if (!previewNodes.desktop || !previewNodes.mobile) return;

    resizeCanvasToDisplay(previewNodes.desktop.canvas);
    resizeCanvasToDisplay(previewNodes.mobile.canvas);

    applySafeRect(previewNodes.desktop, "desktop");
    applySafeRect(previewNodes.mobile, "mobile");

    renderAll();
  }

  window.addEventListener("resize", resizeCanvases);

  // ---------- Rendering ----------
  function renderBanner(node, kind) {
    if (!node) return;
    const ctx = node.ctx;
    const c = node.canvas;
    const w = c.width;
    const h = c.height;

    // Background
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.fillRect(0, 0, w, h);

    if (!img) {
      ctx.fillStyle = "rgba(255,255,255,.12)";
      ctx.font = `${Math.round(14 * (window.devicePixelRatio || 1))}px ${getComputedStyle(document.body).fontFamily}`;
      ctx.fillText("Upload an image to preview your banner", Math.round(w * 0.06), Math.round(h * 0.55));
      return;
    }

    const imgW = imgMeta.w, imgH = imgMeta.h;
    const canvasRatio = w / h;
    const imgRatio = imgW / imgH;

    // Base scale: cover vs contain
    let scale;
    if (state.mode === "fill") {
      scale = (imgRatio > canvasRatio) ? (h / imgH) : (w / imgW); // cover
    } else {
      scale = (imgRatio > canvasRatio) ? (w / imgW) : (h / imgH); // contain
    }
    scale *= state.zoom;

    const drawW = imgW * scale;
    const drawH = imgH * scale;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const ox = state.offsetX * dpr;
    const oy = state.offsetY * dpr;

    let x = (w - drawW) / 2 + ox;
    let y = (h - drawH) / 2 + oy;

    // Subtle “mobile crop feels tighter” guidance (not a hard rule)
    const mobileAutoCrop = activeTemplate.cropGuidance?.mobileTighter;
    if (kind === "mobile" && mobileAutoCrop) {
      const shift = state.emphasizeMobile ? 0.06 : 0.03;
      x += (-shift * w);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, x, y, drawW, drawH);

    // If "fit" produces empty space, tint it slightly to make it obvious
    if (state.mode === "fit") {
      const fitsW = drawW < w - 1;
      const fitsH = drawH < h - 1;
      if (fitsW || fitsH) {
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,.25)";
        if (drawW < w) {
          const left = x;
          const right = x + drawW;
          ctx.fillRect(0, 0, Math.max(0, left), h);
          ctx.fillRect(Math.min(w, right), 0, Math.max(0, w - right), h);
        }
        if (drawH < h) {
          const top = y;
          const bottom = y + drawH;
          ctx.fillRect(0, 0, w, Math.max(0, top));
          ctx.fillRect(0, Math.min(h, bottom), w, Math.max(0, h - bottom));
        }
        ctx.restore();
      }
    }

    // Overlay visibility
    node.overlay.classList.toggle("on", state.showSafe);
  }

  function renderAll() {
    if (!activeTemplate) return;
    if (activeTemplate.type !== "linkedin.banner") return;

    if (previewNodes.desktop) renderBanner(previewNodes.desktop, "desktop");
    if (previewNodes.mobile) renderBanner(previewNodes.mobile, "mobile");

    updateStatus();
  }

  // ---------- Status / warnings ----------
  function setDot(el, cls) {
    el.className = "dot" + (cls ? ` ${cls}` : "");
  }

  function updateStatus() {
    if (!activeTemplate) return;

    if (!img) {
      setDot(dotRes, "");
      setDot(dotCrop, "");
      setDot(dotSafe, "");
      msgRes.innerHTML = "<b>No image yet.</b> Upload an image to get feedback.";
      msgCrop.textContent = "Drag/zoom until the crop feels right.";
      msgSafe.textContent = "Keep faces/logos/text inside the safe zone.";
      return;
    }

    // Resolution
    const rec = activeTemplate.recommended || { w: 0, h: 0 };
    const tooSmall = rec.w && rec.h && (imgMeta.w < rec.w || imgMeta.h < rec.h);
    const muchSmaller = rec.w && rec.h && (imgMeta.w < rec.w * 0.75 || imgMeta.h < rec.h * 0.75);

    if (muchSmaller) {
      setDot(dotRes, "bad");
      msgRes.innerHTML = `<b>Low resolution:</b> ${imgMeta.w}×${imgMeta.h}. Likely blurry. Aim for at least ${rec.w}×${rec.h}.`;
    } else if (tooSmall) {
      setDot(dotRes, "warn");
      msgRes.innerHTML = `<b>Borderline resolution:</b> ${imgMeta.w}×${imgMeta.h}. Might look soft. Recommended: ${rec.w}×${rec.h} or bigger.`;
    } else {
      setDot(dotRes, "good");
      msgRes.innerHTML = `<b>Resolution looks fine:</b> ${imgMeta.w}×${imgMeta.h}.`;
    }

    // Crop aggressiveness heuristic
    const heavyCrop = (state.mode === "fill" && state.zoom >= 1.35);
    if (heavyCrop) {
      setDot(dotCrop, "warn");
      msgCrop.innerHTML = `<b>Crop is aggressive.</b> Consider lowering zoom or keep important content centered.`;
    } else {
      setDot(dotCrop, "good");
      msgCrop.innerHTML = `<b>Crop looks reasonable.</b> If anything important is near edges, adjust slightly.`;
    }

    // Safe zone
    if (!state.showSafe) {
      setDot(dotSafe, "warn");
      msgSafe.innerHTML = `<b>Safe zone hidden.</b> Turn it on if your banner contains faces, logos, or text.`;
    } else if (state.emphasizeMobile) {
      setDot(dotSafe, "warn");
      msgSafe.innerHTML = `<b>Mobile crop emphasized.</b> Keep important content inside the tighter (mobile) safe zone.`;
    } else {
      setDot(dotSafe, "good");
      msgSafe.innerHTML = `<b>Safe zone shown.</b> Keep important content inside it for best results.`;
    }
  }

  // ---------- Drag handling ----------
  let dragging = false;
  let last = { x: 0, y: 0 };

  function getPoint(ev) {
    if (ev.touches && ev.touches[0]) return { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
    return { x: ev.clientX, y: ev.clientY };
  }

  function attachDrag(area) {
    area.addEventListener("mousedown", (ev) => {
      if (!img) return;
      dragging = true;
      last = getPoint(ev);
    });

    area.addEventListener("touchstart", (ev) => {
      if (!img) return;
      dragging = true;
      last = getPoint(ev);
    }, { passive: true });
  }

  window.addEventListener("mouseup", () => (dragging = false));
  window.addEventListener("touchend", () => (dragging = false), { passive: true });

  window.addEventListener("mousemove", (ev) => {
    if (!dragging || !img) return;
    const p = getPoint(ev);
    state.offsetX += (p.x - last.x);
    state.offsetY += (p.y - last.y);
    last = p;
    renderAll();
  });

  window.addEventListener("touchmove", (ev) => {
    if (!dragging || !img) return;
    const p = getPoint(ev);
    state.offsetX += (p.x - last.x);
    state.offsetY += (p.y - last.y);
    last = p;
    renderAll();
  }, { passive: true });

  // ---------- Upload / Demo ----------
  function loadImageFromFile(f) {
    const reader = new FileReader();
    reader.onload = () => {
      const i = new Image();
      i.onload = () => {
        img = i;
        imgMeta.w = i.naturalWidth;
        imgMeta.h = i.naturalHeight;
        state.offsetX = 0;
        state.offsetY = 0;
        renderAll();
      };
      i.src = reader.result;
    };
    reader.readAsDataURL(f);
  }

  function loadDemo() {
    const c = document.createElement("canvas");
    c.width = 2200;
    c.height = 550; // 4:1
    const g = c.getContext("2d");

    const grd = g.createLinearGradient(0, 0, c.width, c.height);
    grd.addColorStop(0, "#0b0f14");
    grd.addColorStop(0.45, "#1a2550");
    grd.addColorStop(1, "#0f2a1a");
    g.fillStyle = grd;
    g.fillRect(0, 0, c.width, c.height);

    g.fillStyle = "rgba(255,255,255,.10)";
    for (let k = 0; k < 26; k++) {
      const x = (k / 26) * c.width;
      g.fillRect(x, 0, 2, c.height);
    }
    g.fillStyle = "rgba(255,255,255,.18)";
    g.beginPath(); g.arc(c.width * 0.22, c.height * 0.35, 150, 0, Math.PI * 2); g.fill();
    g.fillStyle = "rgba(255,255,255,.12)";
    g.beginPath(); g.arc(c.width * 0.72, c.height * 0.68, 220, 0, Math.PI * 2); g.fill();

    const i = new Image();
    i.onload = () => {
      img = i;
      imgMeta.w = i.naturalWidth;
      imgMeta.h = i.naturalHeight;
      resetViewToTemplateDefaults();
      renderAll();
    };
    i.src = c.toDataURL("image/png");
  }

  // Drop zone
  drop.addEventListener("dragover", (e) => {
    e.preventDefault();
    drop.classList.add("dragover");
  });
  drop.addEventListener("dragleave", () => drop.classList.remove("dragover"));
  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    drop.classList.remove("dragover");
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) loadImageFromFile(f);
  });

  // File input
  fileInput.addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) loadImageFromFile(f);
    fileInput.value = "";
  });

  // Buttons
  demoBtn.addEventListener("click", loadDemo);
  clearBtn.addEventListener("click", () => {
    img = null;
    imgMeta = { w: 0, h: 0 };
    state.offsetX = 0;
    state.offsetY = 0;
    renderAll();
  });

  resetBtn.addEventListener("click", () => {
    resetViewToTemplateDefaults();
    syncUIFromState();
    renderAll();
  });

  // ---------- Controls bindings ----------
  zoomEl.addEventListener("input", () => {
    state.zoom = parseInt(zoomEl.value, 10) / 100;
    zoomVal.textContent = `${Math.round(state.zoom * 100)}%`;
    renderAll();
  });

  function setMode(next) {
    state.mode = next;
    modeFillBtn.classList.toggle("on", state.mode === "fill");
    modeFitBtn.classList.toggle("on", state.mode === "fit");
    fitVal.textContent = state.mode === "fill" ? "Fill (cover)" : "Fit (contain)";
    renderAll();
  }

  modeFillBtn.addEventListener("click", () => setMode("fill"));
  modeFitBtn.addEventListener("click", () => setMode("fit"));

  function setSafe(on) {
    state.showSafe = on;
    safeToggleBtn.classList.toggle("on", state.showSafe);
    safeVal.textContent = state.showSafe ? "On" : "Off";
    if (previewNodes.desktop) previewNodes.desktop.overlay.classList.toggle("on", state.showSafe);
    if (previewNodes.mobile) previewNodes.mobile.overlay.classList.toggle("on", state.showSafe);
    renderAll();
  }

  function setMobileEmphasis(on) {
    state.emphasizeMobile = on;
    mobileToggleBtn.classList.toggle("on", state.emphasizeMobile);
    // Re-apply safe rect sizes because desktop safe zone changes when emphasizing mobile
    applySafeRect(previewNodes.desktop, "desktop");
    applySafeRect(previewNodes.mobile, "mobile");
    renderAll();
  }

  safeToggleBtn.addEventListener("click", () => setSafe(!state.showSafe));
  mobileToggleBtn.addEventListener("click", () => setMobileEmphasis(!state.emphasizeMobile));

  // ---------- View mode ----------
  function setSeg(onBtn) {
    [viewBothBtn, viewDesktopBtn, viewMobileBtn].forEach(b => b.classList.remove("on"));
    onBtn.classList.add("on");
  }

  function syncViewMode() {
    const grid = previewRoot.querySelector(".previewGrid2");
    if (!grid) return;

    const blocks = Array.from(grid.children); // 2 blocks
    const showDesk = state.view === "both" || state.view === "desktop";
    const showMob = state.view === "both" || state.view === "mobile";

    if (blocks[0]) blocks[0].style.display = showDesk ? "" : "none";
    if (blocks[1]) blocks[1].style.display = showMob ? "" : "none";
  }

  viewBothBtn.addEventListener("click", () => {
    state.view = "both";
    setSeg(viewBothBtn);
    syncViewMode();
  });

  viewDesktopBtn.addEventListener("click", () => {
    state.view = "desktop";
    setSeg(viewDesktopBtn);
    syncViewMode();
  });

  viewMobileBtn.addEventListener("click", () => {
    state.view = "mobile";
    setSeg(viewMobileBtn);
    syncViewMode();
  });

  // ---------- Sync UI ----------
  function syncUIFromState() {
    zoomEl.value = Math.round(state.zoom * 100);
    zoomVal.textContent = `${Math.round(state.zoom * 100)}%`;

    modeFillBtn.classList.toggle("on", state.mode === "fill");
    modeFitBtn.classList.toggle("on", state.mode === "fit");
    fitVal.textContent = state.mode === "fill" ? "Fill (cover)" : "Fit (contain)";

    safeToggleBtn.classList.toggle("on", state.showSafe);
    safeVal.textContent = state.showSafe ? "On" : "Off";

    mobileToggleBtn.classList.toggle("on", state.emphasizeMobile);

    if (state.view === "both") setSeg(viewBothBtn);
    if (state.view === "desktop") setSeg(viewDesktopBtn);
    if (state.view === "mobile") setSeg(viewMobileBtn);

    syncViewMode();
  }

  // ---------- Events ----------
  templateSelect.addEventListener("change", () => setActiveTemplate(templateSelect.value));

  // ---------- Boot ----------
  buildTemplateSelect();

  if (activeTemplate) {
    applyTemplateCopy();
    resetViewToTemplateDefaults();
    rebuildPreview();
    syncUIFromState();

    // Initial paint after layout
    requestAnimationFrame(() => {
      resizeCanvases();
      renderAll();
    });
  }
})();
