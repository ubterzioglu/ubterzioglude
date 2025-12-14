/* =========================================================
  FILE: /zbom/zbom.js
  PURPOSE:
  - Arca-like UI: sidebar categories + search + grid
  - Curated data is local (manual-first)
  - User submissions are loaded from /api/zbom-list (optional)
  - Submit modal posts to /api/zbom-submit
========================================================= */

(function () {
  const $ = (id) => document.getElementById(id);

  const navEl = $("nav");
  const gridEl = $("grid");
  const qEl = $("q");
  const viewTitleEl = $("viewTitle");
  const emptyEl = $("empty");
  const syncPill = $("syncPill");

  const modalOverlay = $("modalOverlay");
  const openSubmit = $("openSubmit");
  const closeModal = $("closeModal");
  const submitCancel = $("submitCancel");
  const submitSend = $("submitSend");

  const sTitle = $("sTitle");
  const sUrl = $("sUrl");
  const sImg = $("sImg");
  const sNote = $("sNote");
  const sCat = $("sCat");
  const submitMsg = $("submitMsg");

  // ----------------------------
  // CURATED (manual-first)
  // You will edit these.
  // ----------------------------
  const CURATED = [
    // example items (replace with yours)
    {
      id: "portable-apps",
      title: "PortableApps",
      url: "https://portableapps.com/",
      note: "Run apps without installation, directly from a USB stick or folder.",
      img: "/img/z0bookmark0010.png",
      category: "tools"
    }
  ];

  // Optional: pull from your existing explorer-data.js bookmarks if you want
  // (Only if that file is loaded on this page; by default it isn't.)
  function getExplorerBookmarksIfAny() {
    try {
      const b = window.EXPLORER_DATA?.zbom;
      if (!Array.isArray(b)) return [];
      return b.map(x => ({
        id: x.id,
        title: x.title,
        url: x.href,
        note: x.note,
        img: x.img,
        category: "bookmarks"
      }));
    } catch {
      return [];
    }
  }

  // Categories (sidebar)
  // You can change labels/order freely.
  const MENU = [
    { key: "explore", label: "Explore" },
    { key: "libraries", label: "Libraries" },
    { key: "artificial-intelligence", label: "Artificial Intelligence" },
    { key: "tools", label: "Tools" },
    { key: "design", label: "Design" },
    { key: "services", label: "Services" },
    { key: "social", label: "Social" },
    { key: "open-source", label: "Open Source" },
    { key: "user-added", label: "Added by users" }
  ];

  // Runtime store
  let activeKey = "explore";
  let userAdded = []; // loaded from API
  let allCurated = [];

  // ----------------------------
  // Helpers
  // ----------------------------
  function setPill(kind, text) {
    syncPill.className = "pill " + kind;
    syncPill.textContent = text;
  }

  function normalizeUrl(url) {
    const u = (url || "").trim();
    if (!u) return "";
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    return "https://" + u;
  }

  function hostOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }

  function matches(item, q) {
    if (!q) return true;
    const hay = [
      item.title,
      item.note,
      item.url,
      item.category,
      ...(item.tags || [])
    ].join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function cardThumb(item) {
    if (item.img) {
      return `<img src="${item.img}" alt="" loading="lazy" />`;
    }
    const h = (item.title || "").trim().slice(0, 2).toUpperCase();
    return `<div class="fallback">${h || "★"}</div>`;
  }

  function renderGrid(items) {
    gridEl.innerHTML = "";
    emptyEl.style.display = items.length ? "none" : "";

    for (const item of items) {
      const by = item.by === "user" ? "user" : "curated";
      const url = normalizeUrl(item.url);
      const host = hostOf(url);

      const tags = []
        .concat(item.category ? [item.category] : [])
        .concat(item.tags || [])
        .slice(0, 4);

      const tagHtml = tags
        .filter(Boolean)
        .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
        .join("");

      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `
        <div class="thumb">${cardThumb(item)}</div>
        <div class="body">
          <p class="name">${escapeHtml(item.title || "Untitled")}</p>
          <p class="desc">${escapeHtml(item.note || host || url)}</p>
          <div class="meta">
            ${tagHtml}
            <span class="by">${escapeHtml(by)}</span>
          </div>
        </div>
      `;
      el.addEventListener("click", () => {
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
      });
      gridEl.appendChild(el);
    }
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function computeCounts() {
    const q = qEl.value.trim();

    const baseCurated = allCurated;
    const curatedExplore = baseCurated; // explore = all curated
    const counts = {};

    for (const m of MENU) {
      let list = [];
      if (m.key === "user-added") {
        list = userAdded;
      } else if (m.key === "explore") {
        list = curatedExplore;
      } else {
        list = baseCurated.filter(x => x.category === m.key);
      }
      counts[m.key] = list.filter(x => matches(x, q)).length;
    }
    return counts;
  }

  function renderNav() {
    const counts = computeCounts();
    navEl.innerHTML = "";

    for (const m of MENU) {
      const btn = document.createElement("button");
      btn.className = m.key === activeKey ? "active" : "";
      btn.innerHTML = `
        <span>${escapeHtml(m.label)}</span>
        <span class="count">${counts[m.key] ?? 0}</span>
      `;
      btn.addEventListener("click", () => {
        activeKey = m.key;
        updateView();
      });
      navEl.appendChild(btn);
    }
  }

  function getActiveList() {
    const q = qEl.value.trim();

    if (activeKey === "user-added") {
      return userAdded.filter(x => matches(x, q));
    }

    // explore = all curated
    if (activeKey === "explore") {
      return allCurated.filter(x => matches(x, q));
    }

    return allCurated
      .filter(x => x.category === activeKey)
      .filter(x => matches(x, q));
  }

  function updateTitle() {
    const m = MENU.find(x => x.key === activeKey);
    viewTitleEl.textContent = m ? m.label : "Explore";
  }

  function updateView() {
    updateTitle();
    renderNav();
    renderGrid(getActiveList());
  }

  // ----------------------------
  // User submissions (API)
  // ----------------------------
  async function loadUserAdded() {
    try {
      setPill("warn", "Loading…");
      const res = await fetch("/api/zbom-list?limit=200", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        // API not configured is acceptable
        userAdded = [];
        setPill("warn", data?.error ? "Submissions off" : "Offline");
        return;
      }

      userAdded = Array.isArray(data.items) ? data.items : [];
      setPill("ok", "Live");
    } catch (e) {
      userAdded = [];
      setPill("warn", "Offline");
    }
  }

  // ----------------------------
  // Submit modal
  // ----------------------------
  function openModal() {
    submitMsg.textContent = "";
    submitMsg.style.opacity = "0.8";
    submitMsg.style.color = "";

    sTitle.value = "";
    sUrl.value = "";
    sImg.value = "";
    sNote.value = "";
    sCat.value = "tools";

    modalOverlay.style.display = "flex";
  }

  function closeModalNow() {
    modalOverlay.style.display = "none";
  }

  function fillCategorySelect() {
    // categories except user-added
    const cats = MENU
      .filter(x => !["user-added"].includes(x.key))
      .map(x => x.key)
      .filter(x => x !== "explore");

    sCat.innerHTML = cats
      .map(k => `<option value="${escapeHtml(k)}">${escapeHtml(k)}</option>`)
      .join("");
  }

  async function submit() {
    submitMsg.textContent = "";
    const title = sTitle.value.trim();
    const url = normalizeUrl(sUrl.value.trim());
    const note = sNote.value.trim();
    const category = (sCat.value || "tools").trim();
    const img = sImg.value.trim();

    if (!title || !url) {
      submitMsg.style.color = "#ffd";
      submitMsg.textContent = "Title and URL are required.";
      return;
    }

    submitSend.disabled = true;
    submitSend.textContent = "Submitting…";

    try {
      const res = await fetch("/api/zbom-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url, note, category, img })
      });
      const data = await res.json();

      if (!res.ok) {
        submitMsg.style.color = "#ffd";
        submitMsg.textContent = data?.error || "Submit failed.";
        return;
      }

      submitMsg.style.color = "#dfffe7";
      submitMsg.textContent = "Thanks! Your submission is now under 'Added by users'.";
      // refresh list
      await loadUserAdded();
      updateView();

      // close after a short moment
      setTimeout(closeModalNow, 700);
    } catch (e) {
      submitMsg.style.color = "#ffd";
      submitMsg.textContent = "Network error.";
    } finally {
      submitSend.disabled = false;
      submitSend.textContent = "Submit";
    }
  }

  // ----------------------------
  // Init
  // ----------------------------
  async function init() {
    fillCategorySelect();

    // curated = manual list + optional explorer bookmarks
    allCurated = []
      .concat(CURATED)
      .concat(getExplorerBookmarksIfAny())
      .map(x => ({
        ...x,
        by: "curated"
      }));

    await loadUserAdded();

    // mark user items
    userAdded = (userAdded || []).map(x => ({ ...x, by: "user" }));

    // initial render
    updateView();

    // search
    qEl.addEventListener("input", () => updateView());

    // modal hooks
    openSubmit.addEventListener("click", openModal);
    closeModal.addEventListener("click", closeModalNow);
    submitCancel.addEventListener("click", closeModalNow);
    submitSend.addEventListener("click", submit);

    // close when clicking outside
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModalNow();
    });

    // ESC
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModalNow();
    });
  }

  init();
})();
