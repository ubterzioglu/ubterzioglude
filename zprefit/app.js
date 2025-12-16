/* app.js — ZPREFIT core
   - Static / no storage / no network
   - Template registry driven (window.ZPREFIT_TEMPLATES)
   - MVP: banner renderer (LinkedIn banner)
*/

(function () {
  "use strict";

  // ---------- Registry ----------
  const TEMPLATES = Array.isArray(window.ZPREFIT_TEMPLATES) ? window.ZPREFIT_TEMPLATES : [];
  if (!TEMPLATES.length) {
    console.warn("ZPREFIT: No templates found. Did you include templates/*.js before app.js ?");
  }

  // ---------- DOM ----------
  const el = {
    templateSelect: document.getElementById("templateSelect"),
    templateHint: document.getElementById("templateHint"),
    footNote: document.getElementById("footNote"),

    drop: document.getElementById("drop"),
    fileInput: document.getElementById("fileInput"),
    demoBtn: document.getElementById("demoBtn"),
    clearBtn: document.getElementById("clearBtn"),
    resetBtn: document.getElementById("resetBtn"),

    controlsArea: document.getElementById("controlsArea"),

    zoom: document.getElementById("zoom"),
    zoomVal: document.getElementById("zoomVal"),

    modeFill: document.getElementById("modeFill"),
    modeFit: document.getElementById("modeFit"),
    fitVal: document.getElementById("fitVal"),

    safeToggle: document.getElementById("safeToggle"),
    mobileToggle: document.getElementById("mobileToggle"),
    safeVal: document.getElementById("safeVal"),

    dotRes: document.getElementById("dotRes"),
    dotCrop: document.getElementById("dotCrop"),
    dotSafe: document.getElementById("dotSafe"),
    msgRes: document.getElementById("msgRes"),
    msgCrop: document.getElementById("msgCrop"),
    msgSafe: document.getElementById("msgSafe"),

    viewBoth: document.getElementById("viewBoth"),
    viewDesktop: document.getElementById("viewDesktop"),
    viewMobile: document.getElementById("viewMobile"),

    previewRoot: document.getElementById("previewRoot")
  };

  // ---------- Utils ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function setDot(dotEl, kind /* good|warn|bad|empty */) {
    dotEl.className = "dot" + (kind ? ` ${kind}` : "");
  }

  function setSeg(activeBtn) {
    [el.viewBoth, el.viewDesktop, el.viewMobile].forEach(b => b.classList.remove("on"));
    activeBtn.classList.add("on");
  }

  function fmtWH(w, h) {
    return `${Math.round(w)}×${Math.round(h)}`;
  }

  function dpr() {
    return Math.max(1, window.devicePixelRatio || 1);
  }

  // ---------- State ----------
  const state = {
    template: null,

    // image
    img: null,
    imgW: 0,
    imgH: 0,

    // view
    viewMode: "both", // both | desktop | mobile

    // transforms
    zoom: 1.0,
    mode: "fill", // fill | fit
    offsetX: 0,   // in CSS px
    offsetY: 0,

    // overlays
    showSafe: true,
    emphasizeMobile: false,

    // runtime refs (current preview)
    preview: {
      canvases: [],      // [{kind, canvas, ctx, bannerEl, overlayEl, rectEl}]
      resizeHandler: null
    }
  };

  // ---------- Template-driven UI ----------
  function buildTemplateSelect() {
    el.templateSelect.innerHTML = "";
    TEMPLATES.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t.id;
      opt.textContent = t.label || t.id;
      el.templateSelect.appendChild(opt);
    });

    // default select first
    if (TEMPLATES.length) {
      el.templateSelect.value = TEMPLATES[0].id;
    }
  }

  function getTemplateById(id) {
    return TEMPLATES.find(t => t.id === id) || null;
  }

  function applyTemplate(t) {
    state.template = t;

    // defaults
    const def = (t && t.defaults) ? t.defaults : {};
    state.mode = def.mode || "fill";
    state.zoom = typeof def.zoom === "number" ? def.zoom : 1.0;
    state.showSafe = def.showSafe !== false;
    state.emphasizeMobile = !!def.emphasizeMobile;
    state.offsetX = 0;
    state.offsetY = 0;
    state.viewMode = "both";
    setSeg(el.viewBoth);

    // controls visibility
    const c = (t && t.controls) ? t.controls : {};
    toggleControl("zoom", !!c.zoom);
    toggleControl("fitmode", !!c.fitMode);
    toggleControl("safezone", !!c.safeZone);

    // mobile emphasis toggle lives under safezone section
    el.mobileToggle.style.display = c.mobileEmphasis ? "" : "none";

    // hint text
    if (t && t.recommended && t.aspectRatio) {
      const rec = t.recommended;
      el.templateHint.innerHTML =
        `Recommended: <b>${fmtWH(rec.w, rec.h)}</b> (${Math.round(t.aspectRatio * 100) / 100}:1). Bigger is fine; too small may look blurry.`;
    } else {
      el.templateHint.textContent = "";
    }

    el.footNote.textContent = (t && t.notes) ? t.notes : "";

    // sync control UI values
    syncControlsUI();

    // rebuild preview DOM for this template
    renderTemplatePreview();
    renderAll();
  }

  function toggleControl(name, on) {
    const node = el.controlsArea.querySelector(`[data-control="${name}"]`);
    if (node) node.style.display = on ? "" : "none";
  }

  function syncControlsUI() {
    // zoom
    el.zoom.value = String(Math.round(state.zoom * 100));
    el.zoomVal.textContent = `${Math.round(state.zoom * 100)}%`;

    // fit/fill
    setModeUI(state.mode);

    // safe zone
    setSafeUI(state.showSafe);

    // emphasize mobile
    el.mobileToggle.classList.toggle("on", state.emphasizeMobile);
  }

  function setModeUI(mode) {
    state.mode = mode;
    el.modeFill.classList.toggle("on", mode === "fill");
    el.modeFit.classList.toggle("on", mode === "fit");
    el.fitVal.textContent = mode === "fill" ? "Fill (cover)" : "Fit (contain)";
  }

  function setSafeUI(on) {
    state.showSafe = on;
    el.safeToggle.classList.toggle("on", on);
    el.safeVal.textContent = on ? "On" : "Off";

    // apply to existing overlays
    state.preview.canvases.forEach(p => {
      if (p.overlayEl) p.overlayEl.classList.toggle("on", on);
    });
  }

  // ---------- Preview rendering ----------
  function clearPreview() {
    // remove any old resize handler
    if (state.preview.resizeHandler) {
      window.removeEventListener("resize", state.preview.resizeHandler);
      state.preview.resizeHandler = null;
    }
    el.previewRoot.innerHTML = "";
    state.preview.canvases = [];
  }

  function renderTemplatePreview() {
    clearPreview();

    const t = state.template;
    if (!t) return;

    // Currently only banner type is implemented
    if (t.preview && t.preview.type === "banner") {
      renderBannerPreview(t);
    } else {
      // fallback
      const p = document.createElement("p");
      p.className = "hint";
      p.textContent = "This template preview type is not implemented yet.";
      el.previewRoot.appendChild(p);
    }
  }

  function renderBannerPreview(t) {
    const grid = document.createElement("div");
    grid.className = "previewGrid2";
    grid.id = "bannerPreviewGrid";
    el.previewRoot.appendChild(grid);

    const makeBlock = (kind, titleText) => {
      const block = document.createElement("div");

      const title = document.createElement("p");
      title.className = "miniTitle";
      title.textContent = titleText;

      const card = document.createElement("div");
      card.className = "liCard";

      const banner = document.createElement("div");
      banner.className = "bannerArea";
      banner.dataset.kind = kind;

      const canvas = document.createElement("canvas");
      canvas.className = "bannerCanvas";

      const overlay = document.createElement("div");
      overlay.className = "safeOverlay " + (state.showSafe ? "on" : "");

      const rect = document.createElement("div");
      rect.className = "rect";

      const lab = document.createElement("div");
      lab.className = "label";
      lab.textContent = kind === "desktop" ? "Safe zone (desktop)" : "Safe zone (mobile)";

      overlay.appendChild(rect);
      overlay.appendChild(lab);

      banner.appendChild(canvas);
      banner.appendChild(overlay);

      const below = document.createElement("div");
      below.className = "below";

      const avatar = document.createElement("div");
      avatar.className = "avatar";

      const meta = document.createElement("div");
      meta.className = "liMeta";
      meta.innerHTML = `<div class="name">Your Name</div><div class="headline">Headline goes here · Company · Location</div>`;

      below.appendChild(avatar);
      below.appendChild(meta);

      card.appendChild(banner);
      card.appendChild(below);

      block.appendChild(title);
      block.appendChild(card);

      return { block, banner, canvas, overlay, rect, kind };
    };

    const wantsDesktop = t.preview.showDesktop !== false;
    const wantsMobile = t.preview.showMobile !== false;

    const desktopBlock = wantsDesktop ? makeBlock("desktop", "Desktop (approx)") : null;
    const mobileBlock = wantsMobile ? makeBlock("mobile", "Mobile (approx)") : null;

    if (desktopBlock) grid.appendChild(desktopBlock.block);
    if (mobileBlock) grid.appendChild(mobileBlock.block);

    // Keep references
    const addRef = (b) => {
      if (!b) return;
      const ctx = b.canvas.getContext("2d");
      state.preview.canvases.push({
        kind: b.kind,
        canvas: b.canvas,
        ctx,
        bannerEl: b.banner,
        overlayEl: b.overlay,
        rectEl: b.rect
      });
      attachDrag(b.banner, b.kind);
    };
    addRef(desktopBlock);
    addRef(mobileBlock);

    // Set safe rect positions (percentage)
    layoutSafeRects();

    // Size canvases now and on resize
    const onResize = () => {
      resizeCanvases();
      layoutSafeRects();
      renderAll();
    };
    state.preview.resizeHandler = onResize;
    window.addEventListener("resize", onResize);

    // initial
    requestAnimationFrame(onResize);
  }

  function layoutSafeRects() {
    const t = state.template;
    if (!t || !t.safeZones) return;

    const dz = state.emphasizeMobile ? t.safeZones.mobile : t.safeZones.desktop;
    const mz = t.safeZones.mobile;

    state.preview.canvases.forEach(p => {
      const z = (p.kind === "mobile") ? mz : dz;
      if (!z || !p.rectEl) return;

      p.rectEl.style.left = (z.x * 100) + "%";
      p.rectEl.style.top = (z.y * 100) + "%";
      p.rectEl.style.width = (z.w * 100) + "%";
      p.rectEl.style.height = (z.h * 100) + "%";
      if (p.overlayEl) p.overlayEl.classList.toggle("on", state.showSafe);
    });
  }

  function resizeCanvases() {
    state.preview.canvases.forEach(p => {
      const rect = p.bannerEl.getBoundingClientRect();
      const k = dpr();
      p.canvas.width = Math.max(1, Math.round(rect.width * k));
      p.canvas.height = Math.max(1, Math.round(rect.height * k));
    });
  }

  function drawPlaceholder(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(255,255,255,.12)";
    ctx.font = `${Math.round(14 * dpr())}px ${getComputedStyle(document.body).fontFamily}`;
    ctx.fillText("Upload an image to preview", Math.round(w * 0.06), Math.round(h * 0.56));
  }

  function renderAll() {
    const t = state.template;
    if (!t) return;

    // show/hide preview blocks based on view mode
    applyViewModeVisibility();

    // render each canvas
    state.preview.canvases.forEach(p => renderCanvasForTemplate(t, p));
    updateStatus();
  }

  function applyViewModeVisibility() {
    // For banner renderer, easiest is: hide the opposite column blocks
    // We do it by toggling display on the liCard container's parent block.
    const showDesktop = (state.viewMode === "both" || state.viewMode === "desktop");
    const showMobile = (state.viewMode === "both" || state.viewMode === "mobile");

    state.preview.canvases.forEach(p => {
      const block = p.bannerEl.closest("div"); // block wrapper
      // nearest block is the block's inner div; we want the outer column wrapper (block)
      // safer: the parent of liCard is block, which contains miniTitle + liCard
      const outer = p.bannerEl.closest(".liCard")?.parentElement;
      if (!outer) return;
      if (p.kind === "desktop") outer.style.display = showDesktop ? "" : "none";
      if (p.kind === "mobile") outer.style.display = showMobile ? "" : "none";
    });
  }

  function renderCanvasForTemplate(t, p) {
    const ctx = p.ctx;
    const canvas = p.canvas;
    const w = canvas.width;
    const h = canvas.height;

    if (!state.img) {
      drawPlaceholder(ctx, w, h);
      return;
    }

    // banner renderer
    if (t.preview && t.preview.type === "banner") {
      renderBanner(ctx, w, h, p.kind);
      return;
    }

    // fallback
    drawPlaceholder(ctx, w, h);
  }

  function renderBanner(ctx, w, h, kind) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.fillRect(0, 0, w, h);

    const img = state.img;
    const imgW = state.imgW;
    const imgH = state.imgH;
    const canvasRatio = w / h;
    const imgRatio = imgW / imgH;

    // cover/contain
    let baseScale;
    if (state.mode === "fill") {
      baseScale = (imgRatio > canvasRatio) ? (h / imgH) : (w / imgW); // cover
    } else {
      baseScale = (imgRatio > canvasRatio) ? (w / imgW) : (h / imgH); // contain
    }

    const scale = baseScale * state.zoom;

    // optional mobile "tighter crop" guidance: subtle center bias
    let autoShiftX = 0;
    if (kind === "mobile") {
      autoShiftX = state.emphasizeMobile ? 0.06 : 0.03;
    } else {
      autoShiftX = state.emphasizeMobile ? 0.03 : 0.0;
    }

    const drawW = imgW * scale;
    const drawH = imgH * scale;

    // offsets in CSS pixels -> device pixels
    const ox = state.offsetX * dpr();
    const oy = state.offsetY * dpr();

    let x = (w - drawW) / 2 + ox;
    let y = (h - drawH) / 2 + oy;

    x += (-(autoShiftX) * w);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, x, y, drawW, drawH);

    // If fit mode leaves empty space, dim it slightly so user notices
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
  }

  // ---------- Drag (reposition) ----------
  function attachDrag(bannerEl, kind) {
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const getPoint = (ev) => {
      if (ev.touches && ev.touches[0]) return { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
      return { x: ev.clientX, y: ev.clientY };
    };

    const onDown = (ev) => {
      if (!state.img) return;
      dragging = true;
      const p = getPoint(ev);
      lastX = p.x;
      lastY = p.y;
      ev.preventDefault?.();
    };

    const onMove = (ev) => {
      if (!dragging || !state.img) return;
      const p = getPoint(ev);
      state.offsetX += (p.x - lastX);
      state.offsetY += (p.y - lastY);
      lastX = p.x;
      lastY = p.y;
      renderAll();
    };

    const onUp = () => {
      dragging = false;
    };

    bannerEl.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    bannerEl.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp, { passive: true });
  }

  // ---------- Upload / Demo ----------
  function loadImageFromFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        state.img = img;
        state.imgW = img.naturalWidth;
        state.imgH = img.naturalHeight;
        state.offsetX = 0;
        state.offsetY = 0;
        renderAll();
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function loadDemoImage() {
    // 4:1 demo banner
    const c = document.createElement("canvas");
    c.width = 2200;
    c.height = 550;
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
    g.beginPath();
    g.arc(c.width * 0.22, c.height * 0.35, 150, 0, Math.PI * 2);
    g.fill();

    g.fillStyle = "rgba(255,255,255,.12)";
    g.beginPath();
    g.arc(c.width * 0.72, c.height * 0.68, 220, 0, Math.PI * 2);
    g.fill();

    const img = new Image();
    img.onload = () => {
      state.img = img;
      state.imgW = img.naturalWidth;
      state.imgH = img.naturalHeight;
      state.offsetX = 0;
      state.offsetY = 0;
      renderAll();
    };
    img.src = c.toDataURL("image/png");
  }

  function clearImage() {
    state.img = null;
    state.imgW = 0;
    state.imgH = 0;
    state.offsetX = 0;
    state.offsetY = 0;
    renderAll();
  }

  // ---------- Status / Warnings ----------
  function updateStatus() {
    const t = state.template;

    if (!state.img || !t) {
      setDot(el.dotRes, "");
      setDot(el.dotCrop, "");
      setDot(el.dotSafe, "");
      el.msgRes.innerHTML = "<b>No image yet.</b> Upload an image to get feedback.";
      el.msgCrop.textContent = "Drag/zoom until the crop feels right.";
      el.msgSafe.textContent = "Keep faces/logos/text inside the safe zone.";
      return;
    }

    // Resolution check (template-driven if recommended exists)
    if (t.recommended && t.recommended.w && t.recommended.h) {
      const rw = t.recommended.w;
      const rh = t.recommended.h;
      const tooSmall = (state.imgW < rw) || (state.imgH < rh);
      const muchSmaller = (state.imgW < rw * 0.75) || (state.imgH < rh * 0.75);

      if (muchSmaller) {
        setDot(el.dotRes, "bad");
        el.msgRes.innerHTML = `<b>Low resolution:</b> ${fmtWH(state.imgW, state.imgH)}. Likely blurry. Aim for at least ${fmtWH(rw, rh)}.`;
      } else if (tooSmall) {
        setDot(el.dotRes, "warn");
        el.msgRes.innerHTML = `<b>Borderline resolution:</b> ${fmtWH(state.imgW, state.imgH)}. Might look soft. Recommended: ${fmtWH(rw, rh)} or bigger.`;
      } else {
        setDot(el.dotRes, "good");
        el.msgRes.innerHTML = `<b>Resolution looks fine:</b> ${fmtWH(state.imgW, state.imgH)}.`;
      }
    } else {
      setDot(el.dotRes, "good");
      el.msgRes.innerHTML = `<b>Image loaded:</b> ${fmtWH(state.imgW, state.imgH)}.`;
    }

    // Crop heuristic
    const heavyCrop = (state.mode === "fill" && state.zoom >= 1.35);
    if (heavyCrop) {
      setDot(el.dotCrop, "warn");
      el.msgCrop.innerHTML = "<b>Crop is aggressive.</b> Consider lowering zoom and keeping critical content centered.";
    } else {
      setDot(el.dotCrop, "good");
      el.msgCrop.innerHTML = "<b>Crop looks reasonable.</b> If important content is near edges, adjust slightly.";
    }

    // Safe zone
    if (!state.showSafe) {
      setDot(el.dotSafe, "warn");
      el.msgSafe.innerHTML = "<b>Safe zone hidden.</b> Turn it on if your banner contains faces, logos, or text.";
    } else if (state.emphasizeMobile) {
      setDot(el.dotSafe, "warn");
      el.msgSafe.innerHTML = "<b>Mobile crop emphasized.</b> Keep important content within the tighter (mobile) safe zone.";
    } else {
      setDot(el.dotSafe, "good");
      el.msgSafe.innerHTML = "<b>Safe zone shown.</b> Keep important content inside it for best results.";
    }
  }

  // ---------- Events ----------
  function bindEvents() {
    // template change
    el.templateSelect.addEventListener("change", () => {
      const t = getTemplateById(el.templateSelect.value);
      if (t) applyTemplate(t);
    });

    // drop zone
    el.drop.addEventListener("dragover", (e) => {
      e.preventDefault();
      el.drop.classList.add("dragover");
    });
    el.drop.addEventListener("dragleave", () => el.drop.classList.remove("dragover"));
    el.drop.addEventListener("drop", (e) => {
      e.preventDefault();
      el.drop.classList.remove("dragover");
      const f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) loadImageFromFile(f);
    });

    // file input
    el.fileInput.addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (f) loadImageFromFile(f);
      el.fileInput.value = "";
    });

    // demo / clear / reset
    el.demoBtn.addEventListener("click", loadDemoImage);
    el.clearBtn.addEventListener("click", clearImage);
    el.resetBtn.addEventListener("click", () => {
      const t = state.template;
      if (!t) return;
      // re-apply template defaults but keep current image
      const currentImg = state.img;
      const w = state.imgW;
      const h = state.imgH;
      applyTemplate(t);
      state.img = currentImg;
      state.imgW = w;
      state.imgH = h;
      renderAll();
    });

    // zoom
    el.zoom.addEventListener("input", () => {
      state.zoom = parseInt(el.zoom.value, 10) / 100;
      el.zoomVal.textContent = `${Math.round(state.zoom * 100)}%`;
      renderAll();
    });

    // mode
    el.modeFill.addEventListener("click", () => {
      setModeUI("fill");
      renderAll();
    });
    el.modeFit.addEventListener("click", () => {
      setModeUI("fit");
      renderAll();
    });

    // safe overlay
    el.safeToggle.addEventListener("click", () => {
      setSafeUI(!state.showSafe);
      renderAll();
    });

    // mobile emphasis
    el.mobileToggle.addEventListener("click", () => {
      state.emphasizeMobile = !state.emphasizeMobile;
      el.mobileToggle.classList.toggle("on", state.emphasizeMobile);
      layoutSafeRects();
      renderAll();
    });

    // view modes
    el.viewBoth.addEventListener("click", () => {
      state.viewMode = "both";
      setSeg(el.viewBoth);
      renderAll();
    });
    el.viewDesktop.addEventListener("click", () => {
      state.viewMode = "desktop";
      setSeg(el.viewDesktop);
      renderAll();
    });
    el.viewMobile.addEventListener("click", () => {
      state.viewMode = "mobile";
      setSeg(el.viewMobile);
      renderAll();
    });
  }

  // ---------- Init ----------
  function init() {
    buildTemplateSelect();
    bindEvents();

    const first = getTemplateById(el.templateSelect.value) || TEMPLATES[0] || null;
    if (first) applyTemplate(first);
    else updateStatus();
  }

  init();
})();
