/* ZELIFS v1 — tek sayfa, local state, tek hesap */

const STORAGE_KEY = "zelifs_v1_state";

const els = {
  dateOut: document.getElementById("dateOut"),
  dateIn: document.getElementById("dateIn"),
  daysValue: document.getElementById("daysValue"),
  statusBadge: document.getElementById("statusBadge"),
  errors: document.getElementById("errors"),
  calcNote: document.getElementById("calcNote"),

  btnTodayIn: document.getElementById("btnTodayIn"),
  btnClearDates: document.getElementById("btnClearDates"),

  plusInput: document.getElementById("plusInput"),
  minusInput: document.getElementById("minusInput"),
  btnAddPlus: document.getElementById("btnAddPlus"),
  btnAddMinus: document.getElementById("btnAddMinus"),
  btnClearNotes: document.getElementById("btnClearNotes"),

  notesList: document.getElementById("notesList"),
  notesCount: document.getElementById("notesCount"),
};

const state = {
  dateOut: "",
  dateIn: "",
  notes: [], // {type:'plus'|'minus', text:'', ts:number}
};

init();

function init() {
  loadState();
  els.dateOut.value = state.dateOut || "";
  els.dateIn.value = state.dateIn || "";

  wireInputs();
  renderNotes();
  recalc();
}

function wireInputs() {
  // Auto-format DD-MM-YYYY while typing
  els.dateOut.addEventListener("input", () => onDateInput("dateOut"));
  els.dateIn.addEventListener("input", () => onDateInput("dateIn"));

  // Enter key convenience
  els.plusInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addNote("plus");
  });
  els.minusInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addNote("minus");
  });

  els.btnAddPlus.addEventListener("click", () => addNote("plus"));
  els.btnAddMinus.addEventListener("click", () => addNote("minus"));
  els.btnClearNotes.addEventListener("click", clearNotes);

  els.btnClearDates.addEventListener("click", () => {
    state.dateOut = "";
    state.dateIn = "";
    els.dateOut.value = "";
    els.dateIn.value = "";
    saveState();
    recalc();
  });

  els.btnTodayIn.addEventListener("click", () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = String(today.getFullYear());
    const v = `${dd}-${mm}-${yyyy}`;
    state.dateIn = v;
    els.dateIn.value = v;
    saveState();
    recalc();
  });
}

function onDateInput(which) {
  const el = which === "dateOut" ? els.dateOut : els.dateIn;

  const raw = el.value;
  const digits = raw.replace(/\D/g, "").slice(0, 8); // DDMMYYYY
  const parts = [];
  if (digits.length >= 2) parts.push(digits.slice(0, 2));
  else parts.push(digits);

  if (digits.length >= 4) parts.push(digits.slice(2, 4));
  else if (digits.length > 2) parts.push(digits.slice(2));

  if (digits.length > 4) parts.push(digits.slice(4));

  const formatted = parts.filter(Boolean).join("-").slice(0, 10);
  el.value = formatted;

  state[which] = formatted;
  saveState();
  recalc();
}

function recalc() {
  clearErrors();

  const outStr = (state.dateOut || "").trim();
  const inStr = (state.dateIn || "").trim();

  // Need both to compute
  if (!outStr || !inStr) {
    els.daysValue.textContent = "—";
    setStatus("unknown", "Durum: —");
    if (outStr || inStr) {
      addInfo("İki tarihi de girince gün hesabı otomatik yapılır.");
    }
    return;
  }

  const outDate = parseDDMMYYYY(outStr);
  const inDate = parseDDMMYYYY(inStr);

  if (!outDate.ok) addWarn(`Çıkış tarihi hatalı: ${outDate.msg}`);
  if (!inDate.ok) addWarn(`Dönüş tarihi hatalı: ${inDate.msg}`);

  if (!outDate.ok || !inDate.ok) {
    els.daysValue.textContent = "—";
    setStatus("unknown", "Durum: —");
    return;
  }

  // Normalize to UTC midnight to avoid DST surprises
  const a = Date.UTC(outDate.y, outDate.m - 1, outDate.d);
  const b = Date.UTC(inDate.y, inDate.m - 1, inDate.d);

  const diffMs = b - a;
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (!Number.isFinite(days)) {
    els.daysValue.textContent = "—";
    setStatus("unknown", "Durum: —");
    addWarn("Gün hesabında beklenmeyen bir problem oluştu.");
    return;
  }

  els.daysValue.textContent = String(days);

  if (days < 0) {
    setStatus("risk", "Durum: Tarihler ters görünüyor");
    addWarn("Dönüş tarihi, çıkış tarihinden önce olamaz.");
    return;
  }

  if (days <= 180) {
    setStatus("safe", `Durum: Güvende (≤ 180)`);
    addOk("180 gün sınırı aşılmadı.");
  } else {
    setStatus("risk", `Durum: Riskli (> 180)`);
    addWarn("180 gün sınırı aşıldı.");
  }
}

function setStatus(kind, text) {
  els.statusBadge.classList.remove("status-unknown", "status-safe", "status-risk");
  if (kind === "safe") els.statusBadge.classList.add("status-safe");
  else if (kind === "risk") els.statusBadge.classList.add("status-risk");
  else els.statusBadge.classList.add("status-unknown");
  els.statusBadge.textContent = text;
}

function parseDDMMYYYY(s) {
  // Strict: DD-MM-YYYY
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(s);
  if (!m) return { ok: false, msg: "Format DD-MM-YYYY olmalı (örn: 01-05-2025)." };

  const d = Number(m[1]);
  const mo = Number(m[2]);
  const y = Number(m[3]);

  if (y < 1900 || y > 2100) return { ok: false, msg: "Yıl aralığı mantıksız." };
  if (mo < 1 || mo > 12) return { ok: false, msg: "Ay 01–12 olmalı." };

  const maxD = daysInMonth(y, mo);
  if (d < 1 || d > maxD) return { ok: false, msg: `Gün 01–${String(maxD).padStart(2, "0")} olmalı.` };

  return { ok: true, d, m: mo, y };
}

function daysInMonth(y, m) {
  // m: 1..12
  return new Date(y, m, 0).getDate();
}

/* Notes */

function addNote(type) {
  const input = type === "plus" ? els.plusInput : els.minusInput;
  const text = (input.value || "").trim();
  if (!text) return;

  state.notes.push({ type, text, ts: Date.now() });
  input.value = "";
  saveState();
  renderNotes();
}

function clearNotes() {
  state.notes = [];
  saveState();
  renderNotes();
}

function renderNotes() {
  els.notesList.innerHTML = "";

  const count = state.notes.length;
  els.notesCount.textContent = `${count} kayıt`;

  if (count === 0) {
    const li = document.createElement("li");
    li.className = "noteItem";
    li.innerHTML = `
      <span class="noteTag plus">+</span>
      <div class="noteText" style="color:rgba(255,255,255,.72)">
        Henüz not yok. Bir “Artı” veya “Eksi” ekleyebilirsin.
      </div>
      <div class="noteMeta">—</div>
    `;
    els.notesList.appendChild(li);
    return;
  }

  for (const n of state.notes) {
    const li = document.createElement("li");
    li.className = "noteItem";

    const tag = document.createElement("span");
    tag.className = `noteTag ${n.type}`;
    tag.textContent = n.type === "plus" ? "+ Artı" : "− Eksi";

    const text = document.createElement("div");
    text.className = "noteText";
    text.textContent = n.text;

    const meta = document.createElement("div");
    meta.className = "noteMeta";
    meta.textContent = formatTS(n.ts);

    li.appendChild(tag);
    li.appendChild(text);
    li.appendChild(meta);
    els.notesList.appendChild(li);
  }
}

function formatTS(ts) {
  try {
    const d = new Date(ts);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${dd}.${mm}.${yyyy} ${hh}:${mi}`;
  } catch {
    return "";
  }
}

/* Storage */

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);

    state.dateOut = typeof parsed.dateOut === "string" ? parsed.dateOut : "";
    state.dateIn = typeof parsed.dateIn === "string" ? parsed.dateIn : "";
    state.notes = Array.isArray(parsed.notes) ? parsed.notes.filter(isValidNote) : [];
  } catch {
    // ignore
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function isValidNote(n) {
  return (
    n &&
    (n.type === "plus" || n.type === "minus") &&
    typeof n.text === "string" &&
    typeof n.ts === "number"
  );
}

/* Errors UI */

function clearErrors() {
  els.errors.innerHTML = "";
}

function addOk(msg) {
  const div = document.createElement("div");
  div.className = "err ok";
  div.textContent = msg;
  els.errors.appendChild(div);
}

function addWarn(msg) {
  const div = document.createElement("div");
  div.className = "err warn";
  div.textContent = msg;
  els.errors.appendChild(div);
}

function addInfo(msg) {
  const div = document.createElement("div");
  div.className = "err";
  div.textContent = msg;
  els.errors.appendChild(div);
}
