/* TR 2026 Tatil Hesaplayıcı (Basit v1)
   - Kullanıcı başlangıç / bitiş tarihini seçer
   - Toplam tatil (gün) hesaplanır (inclusive)
   - Hafta sonu günleri sayılır
   - Resmî tatiller sayılır (arefe = 0.5)
   - İzinden giden = toplam iş günü - resmî tatil (0.5 dahil)
   - Basit “tüyolar” gösterilir (köprü günü / verimli seçim / arefe hatırlatma)
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

const toggleHolidayListBtn = document.getElementById("toggleHolidayList");
const holidayListEl = document.getElementById("holidayList");

document.getElementById("calcBtn").addEventListener("click", onCalculate);
document.getElementById("resetBtn").addEventListener("click", onReset);

startEl.addEventListener("change", onDatesChanged);
endEl.addEventListener("change", onDatesChanged);

toggleHolidayListBtn.addEventListener("click", () => {
  const isHidden = holidayListEl.classList.contains("hidden");
  holidayListEl.classList.toggle("hidden", !isHidden);
  holidayListEl.setAttribute("aria-hidden", String(!isHidden));
  toggleHolidayListBtn.textContent = isHidden ? "Tatil listesini gizle" : "Tatil listesini göster";
});

// initial render
renderHolidayList();

// --------------------
// Helpers
// --------------------
function parseISODate(iso) {
  // iso: YYYY-MM-DD
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  // Use UTC to avoid DST/local timezone day shifts
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

function dayNameTR(dateObj) {
  // format with user's locale but TR day names
  return new Intl.DateTimeFormat("tr-TR", { weekday: "long" }).format(dateObj);
}

function longDateTR(dateObj) {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(dateObj);
}

function isWeekendUTC(dateObj) {
  const dow = dateObj.getUTCDay(); // 0 Sun, 6 Sat
  return dow === 0 || dow === 6;
}

function clampTo2026(dateObj) {
  // v1: TR 2026 only. If user picks outside 2026, we still compute weekends/working days,
  // but official holiday map only applies to 2026. We will show a tip.
  return dateObj;
}

function round1(x) {
  return Math.round(x * 10) / 10;
}

// --------------------
// UI functions
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

  // ensure start <= end
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

function onCalculate() {
  const start = parseISODate(startEl.value);
  const end = parseISODate(endEl.value);

  if (!start || !end) {
    showTip("⚠️ Lütfen başlangıç ve bitiş tarihlerini seç.");
    return;
  }
  if (start.getTime() > end.getTime()) {
    showTip("⚠️ Başlangıç tarihi, bitiş tarihinden sonra olamaz.");
    return;
  }

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

  detailsJsonEl.textContent = JSON.stringify(r, null, 2);
}

function renderHolidayList() {
  holidayListEl.innerHTML = TR_2026_HOLIDAYS
    .slice()
    .sort((a,b) => a.date.localeCompare(b.date))
    .map(h => {
      const tag = h.weight === 0.5 ? " (0.5)" : "";
      return `<div class="hl-row">
        <div class="hl-date">${h.date}</div>
        <div class="hl-name">${escapeHtml(h.name_tr)}${tag}</div>
      </div>`;
    })
    .join("");
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function capitalize(s){
  s = String(s || "");
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// --------------------
// Core computation
// --------------------
function computeRange(startUTC, endUTC) {
  const start = clampTo2026(startUTC);
  const end = clampTo2026(endUTC);

  const days = [];
  let totalDays = 0;
  let weekendDays = 0;
  let officialHolidayDays = 0; // can include 0.5
  let officialHolidayCount = 0; // number of holiday occurrences (not weighted)
  let workdays = 0;

  for (let d = new Date(start.getTime()); d.getTime() <= end.getTime(); d = addDaysUTC(d, 1)) {
    const iso = toISODateUTC(d);
    const weekend = isWeekendUTC(d);

    totalDays += 1;
    if (weekend) weekendDays += 1;

    const holiday = HOLIDAY_MAP.get(iso);
    const holidayWeight = holiday ? holiday.weight : 0;

    if (holiday) officialHolidayCount += 1;
    officialHolidayDays += holidayWeight;

    // Workday logic:
    // v1: workday = not weekend
    // Leave day = workday that is NOT a full holiday. For half-day holiday, it reduces leave by 0.5.
    if (!weekend) {
      workdays += 1;
    }

    days.push({
      date: iso,
      weekend,
      holiday: holiday ? { name_tr: holiday.name_tr, weight: holiday.weight } : null
    });
  }

  // leaveDays = workdays - officialHolidayDays (but only count holidays that land on workdays)
  // IMPORTANT: If holiday is on weekend, it should not reduce leave. We'll compute holidayOnWorkdays.
  let holidayOnWorkdays = 0;
  for (const day of days) {
    if (!day.weekend && day.holiday) holidayOnWorkdays += day.holiday.weight;
  }

  let leaveDays = workdays - holidayOnWorkdays;
  if (leaveDays < 0) leaveDays = 0;

  return {
    scope: "TR",
    yearHint: "2026",
    start: toISODateUTC(start),
    end: toISODateUTC(end),
    totalDays,
    weekendDays,
    workdays,
    officialHolidayDays: round1(holidayOnWorkdays),
    leaveDays: round1(leaveDays),
    meta: {
      note: "Arefe günleri 0.5; resmî tatil etkisi sadece iş günlerinde düşülür."
    },
    days
  };
}

// --------------------
// Tips (simple)
// --------------------
function buildTips(start, end, r) {
  const tips = [];

  const sIso = toISODateUTC(start);
  const eIso = toISODateUTC(end);

  // If range is outside 2026, warn (v1 dataset only)
  const in2026 = start.getUTCFullYear() === 2026 && end.getUTCFullYear() === 2026;
  if (!in2026) {
    tips.push("ℹ️ Şimdilik sadece <strong>2026</strong> resmî tatilleri var. 2026 dışındaki günlerde sadece hafta sonu mantığı çalışır.");
  }

  // Arefe reminder if includes any 0.5 holiday
  const hasArefe = r.days.some(d => d.holiday && d.holiday.weight === 0.5);
  if (hasArefe) {
    tips.push("⏰ <strong>Arefe</strong> günlerinde tatil <strong>13:00 sonrası</strong> başlar (0.5 gün).");
  }

  // Bridge day tip:
  // If there is a holiday on Friday or Monday within range OR just outside the range, suggest.
  // Simple heuristic: If taking 1 day leave yields >= 4 consecutive days, highlight "köprü günü".
  const efficiency = r.leaveDays > 0 ? (r.totalDays / r.leaveDays) : Infinity;
  if (r.leaveDays > 0 && efficiency >= 3) {
    tips.push(`🌟 Verimli seçim: <strong>${r.leaveDays}</strong> gün izin ile <strong>${r.totalDays}</strong> gün tatil.`);
  }

  // Quick bridge suggestion: if start is Tue and previous day is holiday/weekend, or end is Thu and next day is holiday/weekend etc.
  const before = addDaysUTC(start, -1);
  const after = addDaysUTC(end, 1);

  const beforeNice = isWeekendUTC(before) || HOLIDAY_MAP.has(toISODateUTC(before));
  const afterNice = isWeekendUTC(after) || HOLIDAY_MAP.has(toISODateUTC(after));

  if (beforeNice || afterNice) {
    tips.push("🧠 Köprü günü (Brückentag) ihtimali var: Tatilinizin hemen yanında hafta sonu / resmî tatil bulunuyor.");
  }

  // If user picked a single day only
  if (sIso === eIso) {
    tips.push("📌 Tek gün seçtiniz. Daha uzun bir aralık seçerek sistemin “köprü günü” fırsatlarını daha iyi yakalayabilirsiniz.");
  }

  return tips;
}

// --------------------
// Ensure list hidden by default
// --------------------
function renderHolidayListOnce() {
  if (!holidayListEl.innerHTML) renderHolidayList();
}
renderHolidayListOnce();
