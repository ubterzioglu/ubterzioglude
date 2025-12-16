/* app.js — ZPREFIT core
   - Template registry driven
   - Rectangular banner renderer (generic)
*/

(() => {
  // ---------- Helpers ----------
  const $ = (id) => document.getElementById(id);

  const getRec = (t) => {
    const r = t?.recommended || {};
    return { w: r.width ?? r.w ?? 0, h: r.height ?? r.h ?? 0 };
  };

  const getDefaults = (t) => {
    const d = t?.defaults || {};
    let zoom = d.zoom ?? 1.0;
    if (zoom > 10) zoom = zoom / 100;

    let mode = d.fitMode ?? d.mode ?? "fill";
    if (mode === "cover") mode = "fill";
    if (mode === "contain") mode = "fit";
    if (!["fill", "fit"].includes(mode)) mode = "fill";

    return { zoom, mode };
  };

  const getZones = (t) => {
    const z = t?.safeZones;
    if (!z) return { desktop: null, mobile: null };
    if (Array.isArray(z)) {
      const desktop = z[0] || null;
      const mobile =
        z.find((x) => x?.emphasis === "mobile") || z[1] || desktop;
      return { desktop, mobile };
    }
    return { desktop: z.desktop || null, mobile: z.mobile || null };
  };

  const isRectTemplate = (t) =>
    !!t && typeof t.aspectRatio === "number" && t.aspectRatio > 0;

  // ---------- DOM ----------
  const templateSelect = $("templateSelect");
  const drop = $("drop");
  const fileInput = $("fileInput");
  const btnUpload = $("btnUpload");
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
  const templates = window.ZPREFIT_TEMPLATES || [];
  let activeTemplate = templates[0] || null;

  // ---------- State ----------
  let img = null;
  let imgMeta = { w: 0, h: 0 };

  const state = {
    zoom: 1,
    mode: "fill",
    offsetX: 0,
    offsetY: 0,
    showSafe: true,
    emphasizeMobile: false,
    view: "both",
  };

  let previewNodes = { desktop: null, mobile: null };

  // ---------- Template select ----------
  function buildTemplateSelect() {
    templateSelect.innerHTML = "";
    templates.forEach((t) => {
      const o = document.createElement("option");
      o.value = t.id;
      o.textContent = t.label || t.id;
      templateSelect.appendChild(o);
    });
    if (activeTemplate) templateSelect.value = activeTemplate.id;
  }

  function setActiveTemplate(id) {
    activeTemplate = templates.find((t) => t.id === id);
    resetViewToTemplateDefaults();
    rebuildPreview();
    syncUIFromState();
    renderAll();
  }

  // ---------- UI ----------
  function resetViewToTemplateDefaults() {
    if (!activeTemplate) return;
    const d = getDefaults(activeTemplate);
    state.zoom = d.zoom;
    state.mode = d.mode;
    state.offsetX = 0;
    state.offsetY = 0;
    state.showSafe = true;
    state.emphasizeMobile = false;
    state.view = "both";
  }

  function applyTemplateCopy() {
    if (!activeTemplate) return;
    const r = getRec(activeTemplate);
    templateHint.innerHTML =
      `Recommended: <b>${r.w && r.h ? `${r.w}×${r.h}` : "—"}</b>` +
      (activeTemplate.aspectRatio
        ? ` · Ratio: <b>${activeTemplate.aspectRatio.toFixed(2)}:1</b>`
        : "") +
      (activeTemplate.hint ? `<br>${activeTemplate.hint}` : "");
    footNote.textContent =
      activeTemplate.footnote ||
      "This is a practical preview, not a pixel-perfect clone.";
  }

  function showHideControls() {
    const c = activeTemplate?.controls || {};
    ["zoom", "fitmode", "safezone"].forEach((k) => {
      const el = controlsArea.querySelector(`[data-control="${k}"]`);
      if (el) el.style.display = c[k] ? "" : "none";
    });
  }

  // ---------- Preview ----------
  function createCard(label) {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <p class="miniTitle">${label}</p>
      <div class="liCard">
        <div class="bannerArea">
          <canvas class="bannerCanvas"></canvas>
          <div class="safeOverlay on"><div class="rect"></div></div>
        </div>
      </div>`;
    const area = wrap.querySelector(".bannerArea");
    const canvas = wrap.querySelector("canvas");
    return { wrap, area, canvas, ctx: canvas.getContext("2d"), rect: wrap.querySelector(".rect") };
  }

  function rebuildPreview() {
    previewRoot.innerHTML = "";
    previewNodes = { desktop: null, mobile: null };

    applyTemplateCopy();
    showHideControls();

    if (!isRectTemplate(activeTemplate)) {
      previewRoot.innerHTML =
        `<p class="hint">Template type not supported by the current renderer.</p>`;
      return;
    }

    const grid = document.createElement("div");
    grid.className = "previewGrid2";

    const d = createCard("Desktop (approx)");
    const m = createCard("Mobile (approx)");

    grid.append(d.wrap, m.wrap);
    previewRoot.appendChild(grid);

    previewNodes.desktop = d;
    previewNodes.mobile = m;

    resizeCanvases();
  }

  function resizeCanvases() {
    [previewNodes.desktop, previewNodes.mobile].forEach((n) => {
      if (!n) return;
      const r = n.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      n.canvas.width = r.width * dpr;
      n.canvas.height = r.height * dpr;
    });
    renderAll();
  }

  window.addEventListener("resize", resizeCanvases);

  // ---------- Rendering ----------
  function renderBanner(node) {
    if (!node) return;
    const { ctx, canvas } = node;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!img) {
      ctx.fillStyle = "rgba(255,255,255,.15)";
      ctx.fillText("Upload an image to preview", 20, canvas.height / 2);
      return;
    }

    const scale =
      state.mode === "fill"
        ? Math.max(canvas.width / imgMeta.w, canvas.height / imgMeta.h)
        : Math.min(canvas.width / imgMeta.w, canvas.height / imgMeta.h);

    const s = scale * state.zoom;
    const w = imgMeta.w * s;
    const h = imgMeta.h * s;

    ctx.drawImage(
      img,
      (canvas.width - w) / 2 + state.offsetX,
      (canvas.height - h) / 2 + state.offsetY,
      w,
      h
    );
  }

  function renderAll() {
    if (!isRectTemplate(activeTemplate)) return;
    renderBanner(previewNodes.desktop);
    renderBanner(previewNodes.mobile);
    updateStatus();
  }

  // ---------- Status ----------
  function updateStatus() {
    if (!img) {
      msgRes.innerHTML = "<b>No image yet.</b> Upload an image to get feedback.";
      return;
    }
    const r = getRec(activeTemplate);
    msgRes.innerHTML =
      r.w && r.h
        ? `<b>Resolution:</b> ${imgMeta.w}×${imgMeta.h}`
        : "";
  }

  // ---------- Upload ----------
  btnUpload.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const i = new Image();
      i.onload = () => {
        img = i;
        imgMeta = { w: i.naturalWidth, h: i.naturalHeight };
        renderAll();
      };
      i.src = r.result;
    };
    r.readAsDataURL(f);
  });

  demoBtn.addEventListener("click", () => {
    const c = document.createElement("canvas");
    c.width = 2000;
    c.height = 500;
    const g = c.getContext("2d");
    g.fillStyle = "#1a2550";
    g.fillRect(0, 0, c.width, c.height);
    const i = new Image();
    i.onload = () => {
      img = i;
      imgMeta = { w: i.naturalWidth, h: i.naturalHeight };
      renderAll();
    };
    i.src = c.toDataURL();
  });

  clearBtn.addEventListener("click", () => {
    img = null;
    renderAll();
  });

  resetBtn.addEventListener("click", () => {
    resetViewToTemplateDefaults();
    renderAll();
  });

  // ---------- Controls ----------
  zoomEl.addEventListener("input", () => {
    state.zoom = zoomEl.value / 100;
    zoomVal.textContent = `${zoomEl.value}%`;
    renderAll();
  });

  modeFillBtn.onclick = () => (state.mode = "fill", renderAll());
  modeFitBtn.onclick = () => (state.mode = "fit", renderAll());

  // ---------- Boot ----------
  buildTemplateSelect();
  if (activeTemplate) {
    resetViewToTemplateDefaults();
    rebuildPreview();
    renderAll();
  }

  templateSelect.addEventListener("change", () =>
    setActiveTemplate(templateSelect.value)
  );
})();
