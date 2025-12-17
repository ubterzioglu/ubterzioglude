/* TR 2026 Tatil Hesaplayıcı (UBT)
   - TR 2026 resmî tatiller + arefe (0.5)
   - KPI'lar human-readable (38.5 => "38 gün + 1 yarım gün")
   - Tatil tipi rozeti
   - İzin verimliliği barı
   - Haftalık ritim (pill)
   - Hafta hafta okunur plan (kartlar)
   - JSON/teknik detay yok
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
const kpiLeaveHumanEl = document.getElementById("kpiLeaveHuman");
const kpiHolidaysHumanEl = document.getElementById("kpiHolidaysHuman");
const kpiWeekendsEl = document.getElementById("kpiWeekends");

const tripBadgeEl = document.getElementById("tripBadge");
const effFillEl = document.getElementById("effFill");
const effTextEl = document.getElementById("effText");

const rhythmRowEl = document.getElementById("rhythmRow");
const weeklyPlanEl = document.getElementById("weeklyPlan");

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
resetOutputText();

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
// Toggle helpers
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
// Date UI (min-date + summary)
// --------------------
function onDatesChanged() {
  const start = parseISODate(startEl.value);
  const end = parseISODate(endEl.value);

  // user-friendly: end >= start
  if (startEl.value) endEl.min = startEl.value;
  else endEl.min = "";

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

  renderKPIs(result);
  renderEfficiency(result);
  renderTripBadge(result);
  renderRhythm(result);
  renderWeeklyPlan(result);

  const tips = buildTips(start, end, result);
  renderTips(tips);
}

function onReset() {
  startEl.value = "";
  endEl.value = "";
  endEl.min = "";

  pickedSummaryEl.classList.add("hidden");
  pickedSummaryEl.textContent = "";

  tipsBoxEl.classList.add("hidden");
  tipsBoxEl.innerHTML = "";

  resetOutputText();
}

function resetOutputText() {
  kpiTotalEl.textContent = "—";
  kpiLeaveHumanEl.textContent = "—";
  kpiHolidaysHumanEl.textContent = "—";
  kpiWeekendsEl.textContent = "—";

  tripBadgeEl.classList.add("hidden");
  tripBadgeEl.textContent = "";

  effFillEl.style.width = "0%";
  effTextEl.textContent = "—";

  rhythmRowEl.textContent = "—";
  weeklyPlanEl.textContent = "Tarih seçip hesaplayınca burada haftalık özet çıkacak.";
  weeklyPlanEl.className = "weeklyPlan muted";
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

function renderKPIs(r) {
  kpiTotalEl.textContent = String(r.totalDays);
  kpiWeekendsEl.textContent = String(r.weekendDays);

  // only holidays on workdays matter for leave subtraction
  kpiHolidaysHumanEl.textContent = humanizeDays(r.officialHolidayDays);
  kpiLeaveHumanEl.textContent = humanizeDays(r.leaveDays);
}

function renderEfficiency(r) {
  const leave = r.leaveDays;
  const total = r.totalDays;

  if (leave <= 0) {
    effFillEl.style.width = "100%";
    effTextEl.textContent = "0 gün izinle: tamamen tatil/hafta sonu.";
    return;
  }

  const ratio = total / leave; // e.g. 2.8
  // Map ratio 1..4 => 0..100 (cap)
  const pct = clamp(Math.round(((ratio - 1) / 3) * 100), 0, 100);
  effFillEl.style.width = `${pct}%`;
  effTextEl.textContent = `1 gün izin ≈ ${round1(ratio)} gün tatil`;
}

function renderTripBadge(r) {
  const leave = r.leaveDays;
  const total = r.totalDays;

  const hasBayram = r.holidayHits.some(h =>
    /Ramazan Bayramı|Kurban Bayramı|Cumhuriyet Bayramı|Yılbaşı/i.test(h.name_tr)
  );

  let label = "";
  if (leave <= 0 && total > 0) label = "🌿 Tam “resmî tatil + hafta sonu” modu";
  else {
    const ratio = total / leave;
    if (ratio >= 3.2) label = "🚀 Çok verimli kaçamak";
    else if (ratio >= 2.4) label = "☀️ Verimli tatil";
    else label = "🧳 Klasik izin planı";
  }
  if (hasBayram) label += " • 🎉 Bayram dokunuşu";

  tripBadgeEl.textContent = label;
  tripBadgeEl.classList.remove("hidden");
}

function renderRhythm(r) {
  // Create one pill per week: Work / Off / Holiday
  const weeks = groupDaysByWeek(r.days);

  rhythmRowEl.innerHTML = weeks.map(w => {
    const off = w.weekendDays + w.holidayDaysAll; // includes half
    const work = w.totalDays - w.weekendDays - w.holidayDaysAll; // pure work days
    const half = w.halfHolidayDays;

    return `
      <span class="rhythmPill">
        <span class="dot dot--work"></span>${work} iş
        <span class="dot dot--off"></span>${round1(off)} tatil
        ${half > 0 ? `<span class="dot dot--half"></span>${half} yarım` : ``}
      </span>
    `;
  }).join("");
}

function renderWeeklyPlan(r) {
  const weeks = groupDaysByWeek(r.days);

  weeklyPlanEl.className = "weeklyPlan";
  weeklyPlanEl.innerHTML = weeks.map((w, idx) => {
    const title = `📅 Hafta ${idx + 1}`;
    const rangeTxt = `${shortDateTR(w.start)} – ${shortDateTR(w.end)}`;

    // compact human summary
    const leaveHuman = humanizeDays(w.leaveDays);
    const totalHuman = `${w.totalDays} gün`;
    const holidayHuman = w.holidayDaysWork > 0 ? humanizeDays(w.holidayDaysWork) : "0";

    const lines = [];

    // Holiday mentions
    if (w.holidays.length) {
      const list = w.holidays
        .slice(0, 4)
        .map(h => `${shortDateTR(parseISODate(h.date))}: ${escapeHtml(h.name_tr)}${h.weight === 0.5 ? " (yarım)" : ""}`)
        .join("<br>");
      lines.push(`<li><strong>Resmî tatiller:</strong><br>${list}${w.holidays.length > 4 ? "<br>…" : ""}</li>`);
    } else {
      lines.push(`<li><strong>Resmî tatil:</strong> yok</li>`);
    }

    // Week math
    lines.push(`<li><strong>Bu hafta:</strong> ${totalHuman} toplam • ${w.weekendDays} hafta sonu • ${holidayHuman} resmî tatil (iş gününe denk) • <strong>${leaveHuman}</strong> izin</li>`);

    // Small bridge hint
    if (w.bridgeHint) lines.push(`<li>🧠 <strong>Köprü</strong> ihtimali: hafta içinde tatil + yanına 1 gün eklenince uzuyor.</li>`);

    return `
      <div class="weekCard">
        <div class="weekHead">
          <div class="weekTitle">${title} • <span class="weekMeta">${rangeTxt}</span></div>
          <div class="weekMeta">Net izin: <strong>${leaveHuman}</strong></div>
        </div>
        <ul class="weekList">
          ${lines.join("")}
        </ul>
      </div>
    `;
  }).join("");
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

// --------------------
// Core computation (keeps day list for weekly UI, not for JSON)
// --------------------
function computeRange(startUTC, endUTC) {
  const days = [];
  let totalDays = 0;
  let weekendDays = 0;
  let workdays = 0;
  let holidayOnWorkdays = 0;

  const holidayHits = [];

  for (let d = new Date(startUTC.getTime()); d.getTime() <= endUTC.getTime(); d = addDaysUTC(d, 1)) {
    const iso = toISODateUTC(d);
    const weekend = isWeekendUTC(d);
    const holiday = HOLIDAY_MAP.get(iso) || null;

    totalDays += 1;
    if (weekend) weekendDays += 1;
    if (!weekend) workdays += 1;

    if (holiday) {
      holidayHits.push({ date: iso, name_tr: holiday.name_tr, weight: holiday.weight, weekend });
      if (!weekend) holidayOnWorkdays += holiday.weight;
    }

    days.push({
      date: iso,
      dow: d.getUTCDay(),
      weekend,
      holiday: holiday ? { name_tr: holiday.name_tr, weight: holiday.weight } : null
    });
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
    days
  };
}

// --------------------
// Weekly grouping + narratives
// --------------------
function groupDaysByWeek(days) {
  if (!days.length) return [];

  const out = [];
  let bucket = null;

  for (const day of days) {
    const dt = parseISODate(day.date);
    const weekKey = isoWeekKey(dt); // stable key

    if (!bucket || bucket.key !== weekKey) {
      if (bucket) finalizeBucket(bucket);
      bucket = newWeekBucket(weekKey, day.date);
      out.push(bucket);
    }

    bucket.totalDays += 1;
    if (day.weekend) bucket.weekendDays += 1;

    if (day.holiday) {
      bucket.holidayDaysAll += day.holiday.weight;
      if (!day.weekend) bucket.holidayDaysWork += day.holiday.weight;
      if (day.holiday.weight === 0.5) bucket.halfHolidayDays += 1;
      bucket.holidays.push({ date: day.date, name_tr: day.holiday.name_tr, weight: day.holiday.weight, weekend: day.weekend });
    }

    bucket.end = day.date;
  }

  if (bucket) finalizeBucket(bucket);
  return out;

  function newWeekBucket(key, startIso) {
    return {
      key,
      start: startIso,
      end: startIso,
      totalDays: 0,
      weekendDays: 0,
      holidayDaysAll: 0,
      holidayDaysWork: 0,
      halfHolidayDays: 0,
      holidays: [],
      leaveDays: 0,
      bridgeHint: false
    };
  }

  function finalizeBucket(b) {
    const workdays = b.totalDays - b.weekendDays;
    b.leaveDays = round1(Math.max(0, workdays - b.holidayDaysWork));

    // Very simple bridge hint:
    // if there's a holiday on Tue-Thu AND week has weekends (almost always) => likely bridge
    b.bridgeHint = b.holidays.some(h => {
      const d = parseISODate(h.date);
      const dow = d.getUTCDay(); // 0 Sun..6 Sat
      return (dow >= 2 && dow <= 4) && !h.weekend; // Tue/Wed/Thu
    });
  }
}

// ISO week key: YYYY-W## (UTC)
function isoWeekKey(dateUTC) {
  const d = new Date(Date.UTC(dateUTC.getUTCFullYear(), dateUTC.getUTCMonth(), dateUTC.getUTCDate()));
  // Thursday in current week decides the year
  d.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7));
  const weekYear = d.getUTCFullYear();
  // January 4 is always in week 1
  const week1 = new Date(Date.UTC(weekYear, 0, 4));
  const weekNo = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getUTCDay() + 6) % 7)) / 7);
  return `${weekYear}-W${String(weekNo).padStart(2, "0")}`;
}

// --------------------
// Tips (simple + useful)
// --------------------
function buildTips(start, end, r) {
  const tips = [];

  const in2026 = start.getUTCFullYear() === 2026 && end.getUTCFullYear() === 2026;
  if (!in2026) {
    tips.push("ℹ️ Bu sürümde sadece <strong>2026</strong> resmî tatilleri var. 2026 dışı günlerde hafta sonu mantığı çalışır.");
  }

  const hasArefe = r.holidayHits.some(h => h.weight === 0.5 && !h.weekend);
  if (hasArefe) {
    tips.push("⏰ <strong>Arefe</strong> günleri <strong>yarım gün</strong> sayılır (13:00 sonrası tatil).");
  }

  if (r.leaveDays > 0) {
    const ratio = r.totalDays / r.leaveDays;
    if (ratio >= 3.2) tips.push(`🚀 Süper verimli: <strong>${humanizeDays(r.leaveDays)}</strong> izin ile <strong>${r.totalDays}</strong> gün tatil.`);
    else if (ratio >= 2.4) tips.push(`☀️ Verimli: <strong>${humanizeDays(r.leaveDays)}</strong> izin ile <strong>${r.totalDays}</strong> gün tatil.`);
  } else if (r.totalDays > 0) {
    tips.push("🌿 İzin kullanmadan tatil yakalanmış (resmî tatil + hafta sonu).");
  }

  // Edge adjacency hint
  const before = addDaysUTC(parseISODate(r.start), -1);
  const after = addDaysUTC(parseISODate(r.end), 1);
  const beforeIso = toISODateUTC(before);
  const afterIso = toISODateUTC(after);

  const beforeNice = isWeekendUTC(before) || HOLIDAY_MAP.has(beforeIso);
  const afterNice = isWeekendUTC(after) || HOLIDAY_MAP.has(afterIso);
  if (beforeNice || afterNice) tips.push("🧠 Köprü ihtimali: Seçiminizin hemen yanında hafta sonu / resmî tatil var.");

  return tips;
}

// --------------------
// Humanize helpers (no 38.5 on screen)
// --------------------
function humanizeDays(x) {
  // x may be 38.5 or 1.5 etc.
  const full = Math.floor(x);
  const half = Math.abs(x - full) >= 0.5 ? 1 : 0;

  if (full === 0 && half === 0) return "0";
  if (full > 0 && half === 0) return `${full}`;
  if (full === 0 && half === 1) return `1 yarım gün`;
  return `${full} gün + 1 yarım gün`;
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
  const dow = dateObj.getUTCDay();
  return dow === 0 || dow === 6;
}

function dayNameTR(dateObj) {
  return new Intl.DateTimeFormat("tr-TR", { weekday: "long" }).format(dateObj);
}

function longDateTR(dateObj) {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(dateObj);
}

function shortDateTR(dateObj) {
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short" }).format(dateObj);
}

function round1(x) {
  return Math.round(x * 10) / 10;
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
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
