/* TR 2026 Tatil Hesaplayıcı (Basit v1)
   - Başlangıç / bitiş seç
   - Toplam gün (inclusive)
   - Hafta sonu günleri
   - Resmî tatiller (arefe = 0.5)
   - İzinden giden = iş günleri - (resmî tatil sadece iş gününe denk gelen)
   - Tüyolar (basit)
   - Bilgi & Tatil listesi: göster/gizle toggle (tutarlı)
   - Detay patlaması fix: JSON detayda "days" yok (sadece özet + holiday hits)
*/

// --------------------
// TR 2026 holiday data (manual, app-ready)
// --------------------
const TR_2026_HOLIDAYS = [
  { date: "2026-01-01", name_tr: "Yılbaşı", weight: 1 },
  { date: "2026-03-19", name_tr: "Ramazan Bayramı Arifesi", weight: 0.5 },
  { date: "2026-03-20", name_tr: "Ramazan Bayramı (1. Gün)", weight: 1 },
  { date: "2026-03-21", name_tr: "Ramazan Bayramı (2. Gün)", weight: 1 },
  { date: "2026-03-22", name_tr: "Ramazan Bayramı (3. Gün)", weight: 1 },
  { date: "2026-04-23", name_tr: "Ulusal Egemenlik ve Çocuk Bayramı", weight: 1 },
  { date: "2026-05-01", name_tr: "Emek ve Dayanışma Günü", weight: 1 },
  { date: "2026-05-19", name_tr: "Atatürk'ü Anma, Gençlik ve Spor Bayramı", weight: 1 },
  { date: "2026-05-26", name_tr: "Kurban Bayramı Arifesi", weight: 0.5 },
  { date: "2026-05-27", name_tr: "Kurban Bayramı (1. Gün)", weight: 1 },
  { date: "2026-05-28", name_tr: "Kurban Bayramı (2. Gün)", weight: 1 },
  { date: "2026-05-29", name_tr: "Kurban Bayramı (3. Gün)", weight: 1 },
  { date: "2026-05-30", name_tr: "Kurban Bayramı (4. Gün)", weight: 1 },
  { date: "2026-07-15", name_tr: "Demokrasi ve Millî Birlik Günü", weight: 1 },
  { date: "2026-08-30", name_tr: "Zafer Bayramı", weight: 1 },
  { date: "2026-10-28", name_tr: "Cumhuriyet Bayramı Arifesi", weight: 0.5 },
  { date: "2026-10-29", name_tr: "Cumhuriyet Bayramı", weight: 1 }
];

const HOLIDAY_MAP = new Map(TR_2026_HOLIDAYS.map(h => [h.date, h]));

// --------------------
// DOM
// --------------------
const startEl = document.getElementById("startDate");
const endEl   = document.getElementById("endDate");

const pickedSummaryEl = document.getElementById("pickedSummary");
const tipsBoxEl = document.getElementById("tipsBox");

const kpiTotalEl = document.getElementById("kpiTotal");
const kpiLeaveEl = document.getElementById("kpiLeave");
const kpiHolidaysEl = document.getElementById("kpiHolidays");
const kpiWeekendsEl = document.getElementById("kpiWeekends");

const detailsJsonEl = document.getElementById("detailsJson");

const toggleInfoBtn = document.getElementById("toggleInfo");
const infoBodyEl = document.getElementById("infoBody");

const toggleHolidayListBtn = document.getElementById("toggleHolidayList");
const holidayListEl = document.getElementById("holidayList");

const calcBtn = document.getElementById("calcBtn");
const resetBtn = document.getElementById("resetBtn");

// --------------------
// Init
// --------------------
bindEvents();
ensureInitialToggleState();
renderHolidayList();

// --------------------
// Events
// --------------------
function bindEvents() {
  calcBtn.addEventListener("click", onCalculate);
  resetBtn.addEventListener("click", onReset);

  startEl.addEventListener("change", onDatesChanged);
  endEl.addEventListener("change", onDatesChanged);

  toggleInfoBtn.addEventListener("click", () => toggleSection({
    btn: toggleInfoBtn,
    body: infoBodyEl,
    showText: "Hesaplama / Bilgi göster",
    hideText: "Hesaplama / Bilgi gizle"
  }));

  toggleHolidayListBtn.addEventListener("click", () => toggleSection({
    btn: toggleHolidayListBtn,
    body: holidayListEl,
    showText: "Tatil listesini göster",
    hideText: "Tatil listesini gizle"
  }));
}

function ensureInitialToggleState() {
  setToggleUI(toggleInfoBtn, infoBodyEl, "Hesaplama / Bilgi göster", "Hesaplama / Bilgi gizle");
  setToggleUI(toggleHolidayListBtn, holidayListEl, "Tatil listesini göster", "Tatil listesini gizle");
}

// --------------------
// Toggle helpers (tutarlı)
// --------------------
function toggleSection({ btn, body, showText, hideText }) {
  const willShow = body.classList.contains("hidden");
  body.classList.toggle("hidden", !willShow);
  body.setAttribute("aria-hidden", String(!willShow));
  btn.textContent = willShow ? hideText : showText;
}

function setToggleUI(btn, body, showText, hideText) {
  const isHidden = body.classList.contains("hidden");
  body.setAttribute("aria-hidden", String(isHidden));
  btn.textContent = isHidden ? showText : hideText;
}

// --------------------
// Date UI
// --------------------
function onDatesChanged() {
  const start = parseISODate(startEl.value);
  const end = parseISODate(endEl.value);

  tipsBoxEl.classList.add("hidden");
  tipsBoxEl.innerHTML = "";

  if (!start || !end) {
    pickedSummaryEl.classList.add("hidden");
    pickedSummaryEl.textContent = "";
    return;
  }

  if (start.getTime() > end.getTime()) {
    pickedSummaryEl.classList.remove("hidden");
    pickedSummaryEl.innerHTML = `⚠️ Başlangıç tarihi, bitiş tarihinden sonra olamaz.`;
    return;
  }

  const startTxt = `${longDateTR(start)}, ${capitalize(dayNameTR(start))}`;
  const endTxt   = `${longDateTR(end)}, ${capitalize(dayNameTR(end))}`;

  pickedSummaryEl.classList.remove("hidden");
  pickedSummaryEl.innerHTML =
    `<strong>Başlangıç:</strong> ${startTxt}<br>` +
    `<strong>Bitiş:</strong> ${endTxt}`;
}

// --------------------
// Calculate / Reset
// --------------------
function onCalculate() {
  const start = parseISODate(startEl.value);
  const end = parseISODate(endEl.value);

  if (!start || !end) return showTip("⚠️ Lütfen başlangıç ve bitiş tarihlerini seç.");
  if (start.getTime() > end.getTime()) return showTip("⚠️ Başlangıç tarihi, bitiş tarihinden sonra olamaz.");

  const result = computeRange(start, end);
  renderResult(result);

  const tips = buildTips(start, end, result);
  renderTips(tips);
}

function onReset() {
  startEl.value = "";
  endEl.value = "";

  pickedSummaryEl.classList.add("hidden");
  pickedSummaryEl.textContent = "";

  tipsBoxEl.classList.add("hidden");
  tipsBoxEl.innerHTML = "";

  kpiTotalEl.textContent = "—";
  kpiLeaveEl.textContent = "—";
  kpiHolidaysEl.textContent = "—";
  kpiWeekendsEl.textContent = "—";
  detailsJsonEl.textContent = "—";
}

// --------------------
// Rendering
// --------------------
function showTip(html) {
  tipsBoxEl.classList.remove("hidden");
  tipsBoxEl.innerHTML = html;
}

function renderTips(tips) {
  if (!tips.length) {
    tipsBoxEl.classList.add("hidden");
    tipsBoxEl.innerHTML = "";
    return;
  }
  tipsBoxEl.classList.remove("hidden");
  tipsBoxEl.innerHTML = tips.map(t => `• ${t}`).join("<br>");
}

function renderResult(r) {
  kpiTotalEl.textContent = String(r.totalDays);
  kpiWeekendsEl.textContent = String(r.weekendDays);
  kpiHolidaysEl.textContent = String(round1(r.officialHolidayDays));
  kpiLeaveEl.textContent = String(round1(r.leaveDays));

  // Detay JSON: patlamasın diye sadece summary gösteriyoruz
  const detail = buildDetailsPayload(r);
  detailsJsonEl.textContent = JSON.stringify(detail, null, 2);
}

function renderHolidayList() {
  holidayListEl.innerHTML = TR_2026_HOLIDAYS
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(h => {
      const tag = h.weight === 0.5 ? " (0.5)" : "";
      return `<div class="hl-row">
        <div class="hl-date">${h.date}</div>
        <div class="hl-name">${escapeHtml(h.name_tr)}${tag}</div>
      </div>`;
    })
    .join("");
}

// Build a compact details payload (no day-by-day explosion)
function buildDetailsPayload(r) {
  return {
    scope: r.scope,
    yearHint: r.yearHint,
    start: r.start,
    end: r.end,
    totals: {
      totalDays: r.totalDays,
      weekendDays: r.weekendDays,
      workdays: r.workdays,
      officialHolidayDays: r.officialHolidayDays,
      leaveDays: r.leaveDays
    },
    holidaysInsideRange: r.holidayHits, // compact list
    meta: r.meta
  };
}

// --------------------
// Core computation (no huge details in UI)
// --------------------
function computeRange(startUTC, endUTC) {
  let totalDays = 0;
  let weekendDays = 0;
  let workdays = 0;
  let holidayOnWorkdays = 0;

  // Keep only holidays that actually occur in the range (compact)
  const holidayHits = [];

  for (let d = new Date(startUTC.getTime()); d.getTime() <= endUTC.getTime(); d = addDaysUTC(d, 1)) {
    const iso = toISODateUTC(d);
    const weekend = isWeekendUTC(d);
    const holiday = HOLIDAY_MAP.get(iso) || null;

    totalDays += 1;
    if (weekend) weekendDays += 1;
    if (!weekend) workdays += 1;

    if (holiday) {
      holidayHits.push({
        date: iso,
        name_tr: holiday.name_tr,
        weight: holiday.weight,
        countsForLeave: !weekend
      });
      if (!weekend) holidayOnWorkdays += holiday.weight;
    }
  }

  let leaveDays = workdays - holidayOnWorkdays;
  if (leaveDays < 0) leaveDays = 0;

  return {
    scope: "TR",
    yearHint: "2026",
    start: toISODateUTC(startUTC),
    end: toISODateUTC(endUTC),
    totalDays,
    weekendDays,
    workdays,
    officialHolidayDays: round1(holidayOnWorkdays),
    leaveDays: round1(leaveDays),
    holidayHits,
    meta: {
      note: "Arefe günleri 0.5; resmî tatil etkisi sadece iş günlerinde düşülür."
    }
  };
}

// --------------------
// Tips (simple)
// --------------------
function buildTips(start, end, r) {
  const tips = [];

  const in2026 = start.getUTCFullYear() === 2026 && end.getUTCFullYear() === 2026;
  if (!in2026) {
    tips.push("ℹ️ Şimdilik sadece <strong>2026</strong> resmî tatilleri var. 2026 dışındaki günlerde sadece hafta sonu mantığı çalışır.");
  }

  const hasArefe = r.holidayHits.some(h => h.weight === 0.5);
  if (hasArefe) {
    tips.push("⏰ <strong>Arefe</strong> günlerinde tatil <strong>13:00 sonrası</strong> başlar (0.5 gün).");
  }

  if (r.leaveDays > 0) {
    const efficiency = r.totalDays / r.leaveDays;
    if (efficiency >= 3) {
      tips.push(`🌟 Verimli seçim: <strong>${r.leaveDays}</strong> gün izin ile <strong>${r.totalDays}</strong> gün tatil.`);
    }
  }

  const before = addDaysUTC(start, -1);
  const after = addDaysUTC(end, 1);

  const beforeNice = isWeekendUTC(before) || HOLIDAY_MAP.has(toISODateUTC(before));
  const afterNice = isWeekendUTC(after) || HOLIDAY_MAP.has(toISODateUTC(after));

  if (beforeNice || afterNice) {
    tips.push("🧠 Köprü günü (Brückentag) ihtimali var: Tatilinizin hemen yanında hafta sonu / resmî tatil bulunuyor.");
  }

  if (toISODateUTC(start) === toISODateUTC(end)) {
    tips.push("📌 Tek gün seçtiniz. Daha uzun bir aralık seçerek sistemin fırsatlarını daha iyi yakalayabilirsiniz.");
  }

  return tips;
}

// --------------------
// Date helpers (UTC safe)
// --------------------
function parseISODate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d));
}

function toISODateUTC(dateObj) {
  const y = dateObj.getUTCFullYear();
  const m = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDaysUTC(dateObj, days) {
  const copy = new Date(dateObj.getTime());
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

function isWeekendUTC(dateObj) {
  const dow = dateObj.getUTCDay(); // 0 Sun, 6 Sat
  return dow === 0 || dow === 6;
}

function dayNameTR(dateObj) {
  return new Intl.DateTimeFormat("tr-TR", { weekday: "long" }).format(dateObj);
}

function longDateTR(dateObj) {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(dateObj);
}

function round1(x) {
  return Math.round(x * 10) / 10;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function capitalize(s) {
  s = String(s || "");
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
