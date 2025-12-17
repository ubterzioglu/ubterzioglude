/* ZELIFS v1 — colorful UI + multi-trip + always-visible summary card */

const STORAGE_KEY = "zelifs_v1_state";

const els = {
  // inputs
  dateOut: document.getElementById("dateOut"),
  dateIn: document.getElementById("dateIn"),
  outPretty: document.getElementById("outPretty"),
  inPretty: document.getElementById("inPretty"),

  // buttons
  btnTodayIn: document.getElementById("btnTodayIn"),
  btnAddTrip: document.getElementById("btnAddTrip"),
  btnClearInputs: document.getElementById("btnClearInputs"),
  btnClearAll: document.getElementById("btnClearAll"),

  // main calc
  daysValue: document.getElementById("daysValue"),
  statusBadge: document.getElementById("statusBadge"),
  errors: document.getElementById("errors"),

  // trips table
  tripCount: document.getElementById("tripCount"),
  tripsTbody: document.getElementById("tripsTbody"),
  emptyTrips: document.getElementById("emptyTrips"),

  // notes (separate)
  plusInput: document.getElementById("plusInput"),
  minusInput: document.getElementById("minusInput"),
  btnAddPlus: document.getElementById("btnAddPlus"),
  btnAddMinus: document.getElementById("btnAddMinus"),
  plusList: document.getElementById("plusList"),
  minusList: document.getElementById("minusList"),
  plusCount: document.getElementById("plusCount"),
  minusCount: document.getElementById("minusCount"),

  // summary card
  summaryBadge: document.getElementById("summaryBadge"),
  sumTotalDays: document.getElementById("sumTotalDays"),
  sumLimit: document.getElementById("sumLimit"),
  sumLimitNote: document.getElementById("sumLimitNote"),
  sumTripCount: document.getElementById("sumTripCount"),
  sumRange: document.getElementById("sumRange"),
  sumRangeNote: document.getElementById("sumRangeNote"),

  sumTripsMeta: document.getElementById("sumTripsMeta"),
  sumTripsTbody: document.getElementById("sumTripsTbody"),
  sumTripsEmpty: document.getElementById("sumTripsEmpty"),

  sumPlusMeta: document.getElementById("sumPlusMeta"),
  sumMinusMeta: document.getElementById("sumMinusMeta"),
  sumPlusList: document.getElementById("sumPlusList"),
  sumMinusList: document.getElementById("sumMinusList"),
};

const state = {
  inputOut: "", // YYYY-MM-DD
  inputIn: "",  // YYYY-MM-DD
  trips: [],    // { id, out, in }
  plus: [],     // { text, ts }
  minus: [],    // { text, ts }
};

init();

function init() {
  loadState();

  els.dateOut.value = state.inputOut || "";
  els.dateIn.value = state.inputIn || "";

  wire();
  renderAll();
}

/* ---------------- WIRING ---------------- */

function wire() {
  els.dateOut.addEventListener("change", () => {
    state.inputOut = els.dateOut.value || "";
    saveState();
    renderInputsPretty();
    recalcTotal();
    renderSummary();
  });

  els.dateIn.addEventListener("change", () => {
    state.inputIn = els.dateIn.value || "";
    saveState();
    renderInputsPretty();
    recalcTotal();
    renderSummary();
  });

  els.btnTodayIn.addEventListener("click", () => {
    const today = new Date();
    const iso = toISO(today);
    state.inputIn = iso;
    els.dateIn.value = iso;
    saveState();
    renderInputsPretty();
    recalcTotal();
    renderSummary();
  });

  els.btnAddTrip.addEventListener("click", () => {
    addTripFromInputs();
    renderSummary();
  });

  els.btnClearInputs.addEventListener("click", () => {
    state.inputOut = "";
    state.inputIn = "";
    els.dateOut.value = "";
    els.dateIn.value = "";
    saveState();
    renderInputsPretty();
    recalcTotal();
    renderSummary();
  });

  els.btnClearAll.addEventListener("click", () => {
    state.inputOut = "";
    state.inputIn = "";
    state.trips = [];
    state.plus = [];
    state.minus = [];

    els.dateOut.value = "";
    els.dateIn.value = "";
    els.plusInput.value = "";
    els.minusInput.value = "";

    saveState();
    renderAll();
  });

  els.btnAddPlus.addEventListener("click", () => {
    addNote("plus");
    renderSummary();
  });

  els.btnAddMinus.addEventListener("click", () => {
    addNote("minus");
    renderSummary();
  });

  els.plusInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addNote("plus");
      renderSummary();
    }
  });

  els.minusInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addNote("minus");
      renderSummary();
    }
  });

  // Trip delete (delegation)
  els.tripsTbody.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-del]");
    if (!btn) return;

    const id = btn.getAttribute("data-del");
    state.trips = state.trips.filter(t => t.id !== id);
    saveState();

    renderTrips();
    recalcTotal();
    renderSummary();
  });
}

/* ---------------- RENDER ALL ---------------- */

function renderAll() {
  renderInputsPretty();
  renderTrips();
  recalcTotal();
  renderNotes();
  renderSummary();
}

/* ---------------- TRIPS ---------------- */

function addTripFromInputs() {
  clearErrors();

  const out = (state.inputOut || "").trim();
  const inn = (state.inputIn || "").trim();

  if (!out || !inn) {
    addInfo("Seyahat eklemek için hem çıkış hem dönüş tarihini seç.");
    return;
  }

  const outD = parseISO(out);
  const inD = parseISO(inn);

  if (!outD.ok) addWarn("Çıkış tarihi geçersiz.");
  if (!inD.ok) addWarn("Dönüş tarihi geçersiz.");
  if (!outD.ok || !inD.ok) return;

  const diff = daysBetweenUTC(out, inn);

  if (diff < 0) {
    addWarn("Dönüş tarihi, çıkış tarihinden önce olamaz.");
    return;
  }

  const trip = { id: cryptoId(), out, in: inn };
  state.trips.push(trip);

  // clear inputs after add
  state.inputOut = "";
  state.inputIn = "";
  els.dateOut.value = "";
  els.dateIn.value = "";

  saveState();
  renderInputsPretty();
  renderTrips();
  recalcTotal();

  addOk("Seyahat eklendi.");
}

function renderTrips() {
  els.tripsTbody.innerHTML = "";

  const count = state.trips.length;
  els.tripCount.textContent = `${count} kayıt`;
  els.emptyTrips.style.display = count === 0 ? "block" : "none";

  for (const t of state.trips) {
    const days = safeDays(t.out, t.in);

    const tr = document.createElement("tr");

    const tdOut = document.createElement("td");
    tdOut.innerHTML = `
      ${prettyDateTR(t.out)}
      <span class="mutedSmall">${weekdayTR(t.out)}</span>
    `;

    const tdIn = document.createElement("td");
    tdIn.innerHTML = `
      ${prettyDateTR(t.in)}
      <span class="mutedSmall">${weekdayTR(t.in)}</span>
    `;

    const tdDays = document.createElement("td");
    tdDays.textContent = String(days);

    const tdAct = document.createElement("td");
    tdAct.style.textAlign = "right";
    tdAct.innerHTML = `<button class="iconBtn" type="button" data-del="${t.id}" title="Sil">Sil</button>`;

    tr.appendChild(tdOut);
    tr.appendChild(tdIn);
    tr.appendChild(tdDays);
    tr.appendChild(tdAct);

    els.tripsTbody.appendChild(tr);
  }
}

function recalcTotal() {
  clearErrors();

  const total = computeTotalDays(state.trips);

  els.daysValue.textContent = state.trips.length ? String(total) : "—";

  if (state.trips.length === 0) {
    setStatus("unknown", "Durum: —");
    return;
  }

  if (total <= 180) {
    setStatus("safe", "Durum: Güvende (≤ 180)");
    addOk("180 gün sınırı aşılmadı.");
  } else {
    setStatus("risk", "Durum: Riskli (> 180)");
    addWarn("180 gün sınırı aşıldı.");
  }
}

/* ---------------- INPUT PRETTY ---------------- */

function renderInputsPretty() {
  els.outPretty.textContent = state.inputOut
    ? `Seçim: ${prettyDateTR(state.inputOut)} • ${weekdayTR(state.inputOut)}`
    : "Seçim: —";

  els.inPretty.textContent = state.inputIn
    ? `Seçim: ${prettyDateTR(state.inputIn)} • ${weekdayTR(state.inputIn)}`
    : "Seçim: —";
}

/* ---------------- NOTES ---------------- */

function addNote(kind) {
  const input = kind === "plus" ? els.plusInput : els.minusInput;
  const text = (input.value || "").trim();
  if (!text) return;

  const entry = { text, ts: Date.now() };
  if (kind === "plus") state.plus.push(entry);
  else state.minus.push(entry);

  input.value = "";
  saveState();
  renderNotes();
}

function renderNotes() {
  renderNoteList("plus", state.plus, els.plusList, els.plusCount);
  renderNoteList("minus", state.minus, els.minusList, els.minusCount);
}

function renderNoteList(kind, arr, ul, countEl) {
  ul.innerHTML = "";
  countEl.textContent = `${arr.length} kayıt`;

  if (arr.length === 0) {
    const li = document.createElement("li");
    li.className = "noteItem";
    li.innerHTML = `
      <span class="noteTag ${kind}">${kind === "plus" ? "+ Artı" : "− Eksi"}</span>
      <div class="noteText" style="color:rgba(11,18,32,.62)">Henüz not yok.</div>
      <div class="noteMeta">—</div>
    `;
    ul.appendChild(li);
    return;
  }

  for (const n of arr) {
    const li = document.createElement("li");
    li.className = "noteItem";

    const tag = document.createElement("span");
    tag.className = `noteTag ${kind}`;
    tag.textContent = kind === "plus" ? "+ Artı" : "− Eksi";

    const text = document.createElement("div");
    text.className = "noteText";
    text.textContent = n.text;

    const meta = document.createElement("div");
    meta.className = "noteMeta";
    meta.textContent = formatTS(n.ts);

    li.appendChild(tag);
    li.appendChild(text);
    li.appendChild(meta);
    ul.appendChild(li);
  }
}

/* ---------------- SUMMARY (ALWAYS VISIBLE) ---------------- */

function renderSummary() {
  const trips = state.trips.slice(); // copy
  const total = computeTotalDays(trips);

  // total days
  els.sumTotalDays.textContent = trips.length ? String(total) : "—";

  // limit info
  if (!trips.length) {
    els.sumLimit.textContent = "—";
    els.sumLimitNote.textContent = "Henüz seyahat yok.";
  } else if (total <= 180) {
    els.sumLimit.textContent = "Güvende";
    els.sumLimitNote.textContent = `Kalan: ${180 - total} gün`;
  } else {
    els.sumLimit.textContent = "Riskli";
    els.sumLimitNote.textContent = `Aşılan: ${total - 180} gün`;
  }

  // trip count
  els.sumTripCount.textContent = String(trips.length);

  // range
  const range = computeRange(trips);
  els.sumRange.textContent = range.label;
  els.sumRangeNote.textContent = range.note;

  // badge
  els.summaryBadge.textContent = trips.length ? "Güncel" : "Boş";

  // trips table in summary
  renderSummaryTrips(trips);

  // plus/minus inside summary
  renderSummaryNotes();
}

function renderSummaryTrips(trips) {
  els.sumTripsTbody.innerHTML = "";

  if (trips.length === 0) {
    els.sumTripsEmpty.style.display = "block";
    els.sumTripsMeta.textContent = "0 seyahat";
    return;
  }

  els.sumTripsEmpty.style.display = "none";

  // sort by out date (ascending)
  const sorted = trips.slice().sort((a, b) => a.out.localeCompare(b.out));
  els.sumTripsMeta.textContent = `${sorted.length} seyahat • Toplam ${computeTotalDays(sorted)} gün`;

  let idx = 1;
  for (const t of sorted) {
    const tr = document.createElement("tr");

    const tdIdx = document.createElement("td");
    tdIdx.textContent = String(idx++);

    const tdOut = document.createElement("td");
    tdOut.innerHTML = `${prettyDateTR(t.out)} <span class="mutedSmall">${weekdayTR(t.out)}</span>`;

    const tdIn = document.createElement("td");
    tdIn.innerHTML = `${prettyDateTR(t.in)} <span class="mutedSmall">${weekdayTR(t.in)}</span>`;

    const tdDays = document.createElement("td");
    tdDays.textContent = String(safeDays(t.out, t.in));

    tr.appendChild(tdIdx);
    tr.appendChild(tdOut);
    tr.appendChild(tdIn);
    tr.appendChild(tdDays);
    els.sumTripsTbody.appendChild(tr);
  }
}

function renderSummaryNotes() {
  // meta
  els.sumPlusMeta.textContent = `${state.plus.length} kayıt`;
  els.sumMinusMeta.textContent = `${state.minus.length} kayıt`;

  // lists
  renderSummaryNoteList(state.plus, els.sumPlusList, "plus");
  renderSummaryNoteList(state.minus, els.sumMinusList, "minus");
}

function renderSummaryNoteList(arr, ul, kind) {
  ul.innerHTML = "";

  if (!arr.length) {
    const li = document.createElement("li");
    li.className = "noteItem";
    li.innerHTML = `
      <span class="noteTag ${kind}">${kind === "plus" ? "+ Artı" : "− Eksi"}</span>
      <div class="noteText" style="color:rgba(11,18,32,.62)">Henüz not yok.</div>
      <div class="noteMeta">—</div>
    `;
    ul.appendChild(li);
    return;
  }

  // show newest first for summary (more useful for screenshot)
  const sorted = arr.slice().sort((a, b) => b.ts - a.ts);

  // keep it compact: show max 6 items in summary
  const max = 6;
  const slice = sorted.slice(0, max);

  for (const n of slice) {
    const li = document.createElement("li");
    li.className = "noteItem";

    const tag = document.createElement("span");
    tag.className = `noteTag ${kind}`;
    tag.textContent = kind === "plus" ? "+ Artı" : "− Eksi";

    const text = document.createElement("div");
    text.className = "noteText";
    text.textContent = n.text;

    const meta = document.createElement("div");
    meta.className = "noteMeta";
    meta.textContent = formatTS(n.ts);

    li.appendChild(tag);
    li.appendChild(text);
    li.appendChild(meta);
    ul.appendChild(li);
  }

  if (arr.length > max) {
    const li = document.createElement("li");
    li.className = "noteItem";
    li.innerHTML = `
      <span class="noteTag ${kind}">…</span>
      <div class="noteText" style="color:rgba(11,18,32,.70)">
        +${arr.length - max} kayıt daha var (özet kartı sadece ilk ${max} tanesini gösterir).
      </div>
      <div class="noteMeta">—</div>
    `;
    ul.appendChild(li);
  }
}

/* ---------------- STATUS ---------------- */

function setStatus(kind, text) {
  els.statusBadge.classList.remove("status-unknown", "status-safe", "status-risk");
  if (kind === "safe") els.statusBadge.classList.add("status-safe");
  else if (kind === "risk") els.statusBadge.classList.add("status-risk");
  else els.statusBadge.classList.add("status-unknown");
  els.statusBadge.textContent = text;
}

/* ---------------- COMPUTATIONS ---------------- */

function computeTotalDays(trips) {
  return trips.reduce((sum, t) => sum + Math.max(0, safeDays(t.out, t.in)), 0);
}

function computeRange(trips) {
  if (!trips.length) {
    return { label: "—", note: "Seyahat aralığı yok." };
    }

  const sorted = trips.slice().sort((a, b) => a.out.localeCompare(b.out));
  const firstOut = sorted[0].out;
  const lastIn = sorted.slice().sort((a, b) => a.in.localeCompare(b.in))[sorted.length - 1].in;

  const label = `${prettyDateTR(firstOut)} → ${prettyDateTR(lastIn)}`;
  const note = `${weekdayTR(firstOut)} → ${weekdayTR(lastIn)}`;

  return { label, note };
}

function safeDays(outISO, inISO) {
  const a = parseISO(outISO);
  const b = parseISO(inISO);
  if (!a.ok || !b.ok) return 0;
  return Math.floor((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86400000);
}

/* ---------------- DATE HELPERS ---------------- */

function parseISO(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return { ok:false };
  const [y, m, d] = iso.split("-").map(Number);
  if (y < 1900 || y > 2100) return { ok:false };
  if (m < 1 || m > 12) return { ok:false };
  const maxD = new Date(y, m, 0).getDate();
  if (d < 1 || d > maxD) return { ok:false };
  return { ok:true, y, m, d };
}

function prettyDateTR(iso) {
  const p = parseISO(iso);
  if (!p.ok) return "—";
  const dd = String(p.d).padStart(2, "0");
  const mm = String(p.m).padStart(2, "0");
  return `${dd}-${mm}-${p.y}`;
}

function weekdayTR(iso) {
  const p = parseISO(iso);
  if (!p.ok) return "—";
  const d = new Date(Date.UTC(p.y, p.m - 1, p.d));
  const day = d.getUTCDay(); // 0 Sun .. 6 Sat
  const names = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
  return names[day] || "—";
}

function toISO(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function cryptoId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

/* ---------------- TIME ---------------- */

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

/* ---------------- STORAGE ---------------- */

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const p = JSON.parse(raw);

    state.inputOut = typeof p.inputOut === "string" ? p.inputOut : "";
    state.inputIn = typeof p.inputIn === "string" ? p.inputIn : "";

    state.trips = Array.isArray(p.trips) ? p.trips.filter(isValidTrip) : [];
    state.plus = Array.isArray(p.plus) ? p.plus.filter(isValidNote) : [];
    state.minus = Array.isArray(p.minus) ? p.minus.filter(isValidNote) : [];
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

function isValidTrip(t) {
  return t && typeof t.id === "string" && typeof t.out === "string" && typeof t.in === "string";
}

function isValidNote(n) {
  return n && typeof n.text === "string" && typeof n.ts === "number";
}

/* ---------------- ERRORS UI ---------------- */

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
  div.className = "err info";
  div.textContent = msg;
  els.errors.appendChild(div);
}
