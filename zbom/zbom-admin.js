/* =========================================================
  FILE: /zbom/zbom-admin.js
  PURPOSE:
  - Admin review for ZBOM submissions
  - View: inbox / moved / rejected
  - Generate curated object snippet (copy/paste)
  - Actions: move, reject, restore (requires admin key)
========================================================= */

(function () {
  const $ = (id) => document.getElementById(id);
  const listEl = $("list");
  const emptyEl = $("empty");
  const pill = $("pill");
  const qEl = $("q");
  const viewEl = $("view");
  const statsEl = $("stats");
  const outEl = $("out");
  const msgEl = $("msg");

  const refreshBtn = $("refreshBtn");
  const adminKeyEl = $("adminKey");
  const saveKeyBtn = $("saveKeyBtn");
  const clearKeyBtn = $("clearKeyBtn");
  const copyOutBtn = $("copyOutBtn");

  const KEY_STORE = "zbom_admin_key";
  let state = {
    inbox: [],
    moved: [],
    rejected: []
  };

  function setPill(kind, text) {
    pill.className = "pill " + kind;
    pill.textContent = text;
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function matches(item, q) {
    if (!q) return true;
    const hay = [item.title, item.url, item.note, item.category, item.id].join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function humanTime(ts) {
    if (!ts) return "";
    try {
      const d = new Date(ts);
      return d.toLocaleString();
    } catch {
      return "";
    }
  }

  function curatedObjectFrom(item) {
    // matches your explorer/bookmark-ish shape
    // You can paste this into explorer-data.js or your curated list
    const id = (item.title || "item")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || item.id || "item";

    return {
      id,
      title: item.title || "",
      img: item.img || "/img/z0bookmark0010.png",
      href: item.url || "",
      note: item.note || ""
    };
  }

  async function apiList(which) {
    const url = `/api/zbom-admin-action?fn=list&which=${encodeURIComponent(which)}&limit=300`;
    const r = await fetch(url, { cache: "no-store" });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j?.error || "list failed");
    return Array.isArray(j.items) ? j.items : [];
  }

  async function apiAction(fn, payload) {
    const adminKey = localStorage.getItem(KEY_STORE) || "";
    const r = await fetch("/api/zbom-admin-action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zbom-admin-key": adminKey
      },
      body: JSON.stringify({ fn, ...payload })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j?.error || "action failed");
    return j;
  }

  function render() {
    const q = qEl.value.trim();
    const which = viewEl.value;

    const list = (state[which] || []).filter((x) => matches(x, q));

    listEl.innerHTML = "";
    emptyEl.style.display = list.length ? "none" : "";

    statsEl.textContent =
      `Inbox: ${state.inbox.length} · Moved: ${state.moved.length} · Rejected: ${state.rejected.length} · Showing: ${list.length}`;

    for (const item of list) {
      const curated = curatedObjectFrom(item);
      const el = document.createElement("div");
      el.className = "item";
      el.innerHTML = `
        <div class="itemTop">
          <div>
            <div class="title">${escapeHtml(item.title || "Untitled")}</div>
            <div class="meta">
              ${escapeHtml(item.url || "")}<br>
              <span style="opacity:.8">cat:</span> ${escapeHtml(item.category || "-")}
              · <span style="opacity:.8">at:</span> ${escapeHtml(humanTime(item.createdAt))}
              · <span style="opacity:.8">id:</span> ${escapeHtml(item.id)}
            </div>
          </div>

          <div class="actions">
            <button class="btn secondary" data-act="makeout">Make output</button>
            <button class="btn secondary" data-act="open">Open</button>
            ${
              which === "inbox"
                ? `<button class="btn good" data-act="move">Mark moved</button>
                   <button class="btn danger" data-act="reject">Reject</button>`
                : `<button class="btn secondary" data-act="restore">Restore</button>`
            }
          </div>
        </div>

        <div class="meta">${escapeHtml(item.note || "")}</div>
      `;

      el.querySelector('[data-act="makeout"]').addEventListener("click", () => {
        outEl.textContent = JSON.stringify(curated, null, 2);
        msgEl.textContent = "Output generated. Copy/paste into explorer-data.js (bookmarks array).";
        msgEl.style.opacity = "0.85";
      });

      el.querySelector('[data-act="open"]').addEventListener("click", () => {
        if (item.url) window.open(item.url, "_blank", "noopener,noreferrer");
      });

      const moveBtn = el.querySelector('[data-act="move"]');
      if (moveBtn) {
        moveBtn.addEventListener("click", async () => {
          try {
            setPill("warn", "Working…");
            await apiAction("move", { item });
            await refresh();
            setPill("ok", "Done");
          } catch (e) {
            setPill("bad", "Error");
            msgEl.textContent = String(e.message || e);
          }
        });
      }

      const rejBtn = el.querySelector('[data-act="reject"]');
      if (rejBtn) {
        rejBtn.addEventListener("click", async () => {
          try {
            setPill("warn", "Working…");
            await apiAction("reject", { item });
            await refresh();
            setPill("ok", "Done");
          } catch (e) {
            setPill("bad", "Error");
            msgEl.textContent = String(e.message || e);
          }
        });
      }

      const restoreBtn = el.querySelector('[data-act="restore"]');
      if (restoreBtn) {
        restoreBtn.addEventListener("click", async () => {
          try {
            setPill("warn", "Working…");
            await apiAction("restore", { item, from: which });
            await refresh();
            setPill("ok", "Done");
          } catch (e) {
            setPill("bad", "Error");
            msgEl.textContent = String(e.message || e);
          }
        });
      }

      listEl.appendChild(el);
    }
  }

  async function refresh() {
    setPill("warn", "Loading…");
    msgEl.textContent = "";

    // load all three lists
    const [inbox, moved, rejected] = await Promise.all([
      apiList("inbox"),
      apiList("moved"),
      apiList("rejected")
    ]);

    state.inbox = inbox;
    state.moved = moved;
    state.rejected = rejected;

    setPill("ok", "Live");
    render();
  }

  function loadKey() {
    const k = localStorage.getItem(KEY_STORE) || "";
    adminKeyEl.value = k;
  }

  async function copyOut() {
    try {
      await navigator.clipboard.writeText(outEl.textContent || "");
      msgEl.textContent = "Copied.";
      msgEl.style.opacity = "0.85";
    } catch {
      msgEl.textContent = "Copy failed (browser blocked clipboard).";
      msgEl.style.opacity = "0.85";
    }
  }

  function init() {
    loadKey();

    saveKeyBtn.addEventListener("click", () => {
      const k = adminKeyEl.value.trim();
      localStorage.setItem(KEY_STORE, k);
      msgEl.textContent = "Admin key saved in this browser.";
      msgEl.style.opacity = "0.85";
    });

    clearKeyBtn.addEventListener("click", () => {
      localStorage.removeItem(KEY_STORE);
      adminKeyEl.value = "";
      msgEl.textContent = "Admin key cleared.";
      msgEl.style.opacity = "0.85";
    });

    refreshBtn.addEventListener("click", refresh);
    qEl.addEventListener("input", render);
    viewEl.addEventListener("change", render);
    copyOutBtn.addEventListener("click", copyOut);

    refresh();
  }

  init();
})();
