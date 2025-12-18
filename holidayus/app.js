/* US 2026 Vacation Planner (UBT)
   - Federal holidays (2026) + observed option (Fri/Mon)
   - State selector (all states + DC)
   - Conservative state-holiday add-ons (expandable)
   - Same KPI + efficiency + weekly breakdown logic
*/

const $ = (id) => document.getElementById(id);

// --------------------
// DOM
// --------------------
const startEl = $("startDate");
const endEl   = $("endDate");
const stateEl = $("stateSelect");
const observedEl = $("observedSelect");

const pickedSummaryEl = $("pickedSummary");
const tipsBoxEl = $("tipsBox");
const tipsCardEl = $("tipsCard");

const kpiTotalEl = $("kpiTotal");
const kpiLeaveHumanEl = $("kpiLeaveHuman");
const kpiHolidaysHumanEl = $("kpiHolidaysHuman");
const kpiWeekendsEl = $("kpiWeekends");

const tripBadgeEl = $("tripBadge");
const effFillEl = $("effFill");
const effTextEl = $("effText");

const rhythmRowEl = $("rhythmRow");
const weeklyPlanEl = $("weeklyPlan");

const toggleInfoBtn = $("toggleInfo");
const infoBodyEl = $("infoBody");

const toggleHolidayListBtn = $("toggleHolidayList");
const holidayListEl = $("holidayList");

const toggleTipsBtn = $("toggleTips");

const calcBtn = $("calcBtn");
const resetBtn = $("resetBtn");

// --------------------
// State list
// --------------------
const STATES = [
  ["ALL","All (federal only)"],
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
  ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["DC","District of Columbia"],
  ["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],
  ["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],
  ["ME","Maine"],["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],
  ["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],
  ["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],
  ["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],
  ["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],
  ["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],["VA","Virginia"],
  ["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"]
];

// --------------------
// Federal holidays 2026 (date-based, actual holiday date)
// Observed handling is applied optionally.
// Dates align with standard 2026 federal calendar. 
// --------------------
const FEDERAL_2026 = [
  { date: "2026-01-01", name: "New Year's Day" },
  { date: "2026-01-19", name: "Martin Luther King Jr. Day" },
  { date: "2026-02-16", name: "Presidents' Day (Washington's Birthday)" },
  { date: "2026-05-25", name: "Memorial Day" },
  { date: "2026-06-19", name: "Juneteenth National Independence Day" },
  { date: "2026-07-04", name: "Independence Day" },
  { date: "2026-09-07", name: "Labor Day" },
  { date: "2026-10-12", name: "Columbus Day" },
  { date: "2026-11-11", name: "Veterans Day" },
  { date: "2026-11-26", name: "Thanksgiving Day" },
  { date: "2026-12-25", name: "Christmas Day" }
];

// --------------------
// State add-ons (2026 fixed dates)
// Conservative set: common “statewide / public sector” add-ons.
// You can expand anytime (easy).
// --------------------
const STATE_ADDONS_2026 = [
  // Patriots' Day (MA, ME): third Monday in April (2026-04-20)
  { date: "2026-04-20", name: "Patriots' Day", states: ["MA","ME"] },

  // Cesar Chavez Day (CA): 2026-03-31
  { date: "2026-03-31", name: "Cesar Chavez Day", states: ["CA"] },

  // Emancipation Day (DC): 2026-04-16
  { date: "2026-04-16", name: "Emancipation Day", states: ["DC"] },

  // Good Friday (observed as public holiday in several states; keeping a conservative subset)
  { date: "2026-04-03", name: "Good Friday", states: ["CT","DE","FL","IN","KY","LA","NJ","NC","ND","TN"] },

  // Native American Day / Indigenous Peoples’ Day variants exist; we keep SD as widely recognized
  { date: "2026-10-12", name: "Native American Day", states: ["SD"] },

  // Day After Thanksgiving (common in public sector)
  { date: "2026-11-27", name: "Day After Thanksgiving", states: ["CA","DE","FL","GA","IA","KS","KY","MD","MI","MN","NC","NH","NM","NV","OK","OR","PA","SC","TX","VA","WA","WV"] },

  // Christmas Eve (public sector in some states)
  { date: "2026-12-24", name: "Christmas Eve", states: ["AL","AR","GA","KY","NC","OK","SC","TN","TX","VA","WV"] }
];

// --------------------
// Active holiday map
// --------------------
let ACTIVE_HOLIDAYS = [];
let HOLIDAY_MAP = new Map();

// --------------------
// Init
// --------------------
initStateSelect();
bindEvents();
ensureInitialToggleState();
rebuildHolidayMap();
renderHolidayList();
resetOutputText();

// --------------------
// Init helpers
// --------------------
function initStateSelect(){
  stateEl.innerHTML = STATES.map(([code,label]) =>
    `<option value="${code}">${escapeHtml(label)}</option>`
  ).join("");

  // Default: user is in Germany but tool US — pick ALL
  stateEl.value = "ALL";
}

// --------------------
// Events
// --------------------
function bindEvents() {
  calcBtn.addEventListener("click", onCalculate);
  resetBtn.addEventListener("click", onReset);

  startEl.addEventListener("change", onDatesChanged);
  endEl.addEventListener("change", onDatesChanged);

  stateEl.addEventListener("change", () => {
    rebuildHolidayMap();
    renderHolidayList();
    tipsBoxEl.classList.add("hidden");
    tipsBoxEl.innerHTML = "";
    resetOutputText();
    onDatesChanged();
  });

  observedEl.addEventListener("change", () => {
    rebuildHolidayMap();
    renderHolidayList();
    tipsBoxEl.classList.add("hidden");
    tipsBoxEl.innerHTML = "";
    resetOutputText();
    onDatesChanged();
  });

  toggleInfoBtn.addEventListener("click", () => toggleSection({
    btn: toggleInfoBtn,
    body: infoBodyEl,
    showText: "Open info",
    hideText: "Close info"
  }));

  toggleHolidayListBtn.addEventListener("click", () => toggleSection({
    btn: toggleHolidayListBtn,
    body: holidayListEl,
    showText: "Open holidays 2026",
    hideText: "Close holidays 2026"
  }));

  toggleTipsBtn.addEventListener("click", () => toggleSection({
    btn: toggleTipsBtn,
    body: tipsCardEl,
    showText: "Open tips",
    hideText: "Close tips"
  }));
}

function ensureInitialToggleState() {
  setToggleUI(toggleInfoBtn, infoBodyEl, "Open info", "Close info");
  setToggleUI(toggleHolidayListBtn, holidayListEl, "Open holidays 2026", "Close holidays 2026");
  setToggleUI(toggleTipsBtn, tipsCardEl, "Open tips", "Close tips");
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
// Holiday building (federal + state add-ons + observed option)
// --------------------
function rebuildHolidayMap() {
  const state = stateEl.value || "ALL";
  const observedOn = (observedEl.value || "on") === "on";

  const list = [];

  // Federal (always)
  for (const h of FEDERAL_2026) {
    list.push({ date: h.date, name: h.name, kind: "Federal" });

    if (observedOn) {
      const obs = observedDate(h.date);
      if (obs && obs !== h.date) {
        list.push({ date: obs, name: `${h.name} (Observed)`, kind: "Federal Observed" });
      }
    }
  }

  // State add-ons
  if (state !== "ALL") {
    for (const h of STATE_ADDONS_2026) {
      if (!h.states.includes(state)) continue;

      list.push({ date: h.date, name: h.name, kind: "State" });

      if (observedOn) {
        const obs = observedDate(h.date);
        // Some state holidays are not “observed” uniformly; we apply the same weekend rule as an option.
        if (obs && obs !== h.date) {
          list.push({ date: obs, name: `${h.name} (Observed)`, kind: "State Observed" });
        }
      }
    }
  }

  // unique by date+name
  const uniq = new Map();
  for (const h of list) {
    const key = `${h.date}__${h.name}`;
    uniq.set(key, h);
  }

  ACTIVE_HOLIDAYS = Array.from(uniq.values()).sort((a,b)=> a.date.localeCompare(b.date));
  HOLIDAY_MAP = new Map();
  for (const h of ACTIVE_HOLIDAYS) {
    // if multiple holidays same day, keep array
    if (!HOLIDAY_MAP.has(h.date)) HOLIDAY_MAP.set(h.date, []);
    HOLIDAY_MAP.get(h.date).push(h);
  }
}

/* Observed rule (simple, commonly used):
   - If holiday falls on Saturday -> observed Friday
   - If holiday falls on Sunday   -> observed Monday
*/
function observedDate(iso) {
  const d = parseISODate(iso);
  if (!d) return null;
  const dow = d.getUTCDay(); // 0 Sun ... 6 Sat
  if (dow === 6) return toISODateUTC(addDaysUTC(d, -1)); // Fri
  if (dow === 0) return toISODateUTC(addDaysUTC(d,  1)); // Mon
  return iso;
}

// --------------------
// Date UI
// --------------------
function onDatesChanged() {
  const start = parseISODate(startEl.value);
  const end = parseISODate(endEl.value);

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
    pickedSummaryEl.innerHTML = `⚠️ Start date cannot be after end date.`;
    return;
  }

  pickedSummaryEl.classList.remove("hidden");
  pickedSummaryEl.innerHTML =
    `<strong>Start:</strong> ${fmtLong(start)} (${fmtDow(start)})<br>` +
    `<strong>End:</strong> ${fmtLong(end)} (${fmtDow(end)})`;
}

// --------------------
// Calculate / Reset
// --------------------
function onCalculate() {
  const start = parseISODate(startEl.value);
  const end = parseISODate(endEl.value);

  if (!start || !end) return showAutoTip("⚠️ Please select start and end date.");
  if (start.getTime() > end.getTime()) return showAutoTip("⚠️ Start date cannot be after end date.");

  const r = computeRange(start, end);

  renderKPIs(r);
  renderEfficiency(r);
  renderTripBadge(r);
  renderRhythm(r);
  renderWeeklyPlan(r);

  const tips = buildAutoTips(start, end, r);
  renderAutoTips(tips);
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

  weeklyPlanEl.textContent = "Pick a range and calculate — weekly breakdown will appear here.";
  weeklyPlanEl.className = "weeklyPlan muted";
}

// --------------------
// Auto tips
// --------------------
function showAutoTip(html) {
  tipsBoxEl.classList.remove("hidden");
  tipsBoxEl.innerHTML = html;
}

function renderAutoTips(tips) {
  if (!tips.length) {
    tipsBoxEl.classList.add("hidden");
    tipsBoxEl.innerHTML = "";
    return;
  }
  tipsBoxEl.classList.remove("hidden");
  tipsBoxEl.innerHTML = tips.map(t => `• ${t}`).join("<br>");
}

function buildAutoTips(start, end, r) {
  const tips = [];
  const state = stateEl.value || "ALL";
  const observedOn = (observedEl.value || "on") === "on";

  if (state === "ALL") tips.push("State is set to <strong>All</strong>: using federal holidays only.");
  if (!observedOn) tips.push("Observed holidays are <strong>OFF</strong>: weekend holidays are not shifted to Fri/Mon.");

  const in2026 = start.getUTCFullYear() === 2026 && end.getUTCFullYear() === 2026;
  if (!in2026) tips.push("This dataset is tuned for <strong>2026</strong>. Outside 2026, only weekends are guaranteed.");

  if (r.leaveDays > 0) {
    const ratio = r.totalDays / r.leaveDays;
    if (ratio >= 3.2) tips.push(`Very efficient: <strong>${r.leaveDays}</strong> PTO → <strong>${r.totalDays}</strong> days off.`);
    else if (ratio >= 2.4) tips.push(`Good efficiency: <strong>${r.leaveDays}</strong> PTO → <strong>${r.totalDays}</strong> days off.`);
  } else if (r.totalDays > 0) {
    tips.push("No PTO needed: weekends/holidays cover the range.");
  }

  // 2026-specific fun: July 4 is Saturday -> often observed Friday
  const hitsJuly3 = r.holidayHits.some(h => h.date === "2026-07-03" && /Observed/.test(h.name));
  if (hitsJuly3) tips.push("2026 highlight: Independence Day falls on Saturday → observed on <strong>Fri, Jul 3</strong> (when observed is ON).");

  return tips;
}

// --------------------
// KPI / results
// --------------------
function renderKPIs(r) {
  kpiTotalEl.textContent = String(r.totalDays);
  kpiWeekendsEl.textContent = String(r.weekendDays);
  kpiHolidaysHumanEl.textContent = String(r.officialHolidayDays);
  kpiLeaveHumanEl.textContent = String(r.leaveDays);
}

function renderEfficiency(r) {
  const leave = r.leaveDays;
  const total = r.totalDays;

  if (leave <= 0) {
    effFillEl.style.width = "100%";
    effTextEl.textContent = "0 PTO days: weekends/holidays only.";
    return;
  }

  const ratio = total / leave;
  const pct = clamp(Math.round(((ratio - 1) / 3) * 100), 0, 100);
  effFillEl.style.width = `${pct}%`;
  effTextEl.textContent = `1 PTO day ≈ ${round1(ratio)} days off`;
}

function renderTripBadge(r) {
  const leave = r.leaveDays;
  const total = r.totalDays;

  let label = "";
  if (leave <= 0 && total > 0) label = "🌿 No PTO needed";
  else {
    const ratio = total / leave;
    if (ratio >= 3.2) label = "🚀 Great planning";
    else if (ratio >= 2.4) label = "☀️ Solid planning";
    else label = "🧳 Classic vacation";
  }

  const hasThanksgiving = r.holidayHits.some(h => /Thanksgiving/.test(h.name));
  const hasXmas = r.holidayHits.some(h => /Christmas/.test(h.name));
  if (hasThanksgiving) label += " • Thanksgiving";
  if (hasXmas) label += " • Christmas";

  tripBadgeEl.textContent = label;
  tripBadgeEl.classList.remove("hidden");
}

function renderRhythm(r) {
  const weeks = groupDaysByWeek(r.days);
  rhythmRowEl.innerHTML = weeks.map(w => {
    const off = w.weekendDays + w.holidayDaysAll;
    const work = w.totalDays - w.weekendDays - w.holidayDaysAll;

    return `
      <span class="rhythmPill">
        <span class="dot dot--work"></span>${work} work
        <span class="dot dot--off"></span>${off} off
      </span>
    `;
  }).join("");
}

function renderWeeklyPlan(r) {
  const weeks = groupDaysByWeek(r.days);

  weeklyPlanEl.className = "weeklyPlan";
  weeklyPlanEl.innerHTML = weeks.map((w, idx) => {
    const title = `📅 Week ${idx + 1}`;
    const rangeTxt = `${fmtShort(parseISODate(w.start))} – ${fmtShort(parseISODate(w.end))}`;

    const lines = [];
    if (w.holidays.length) {
      const list = w.holidays
        .slice(0, 4)
        .map(h => `${formatHolidayLabelUS(h.date)}: ${escapeHtml(h.name)}`)
        .join("<br>");
      lines.push(`<li><strong>Holidays:</strong><br>${list}${w.holidays.length > 4 ? "<br>…" : ""}</li>`);
    } else {
      lines.push(`<li><strong>Holidays:</strong> none</li>`);
    }

    lines.push(`<li><strong>This week:</strong> ${w.totalDays} days • ${w.weekendDays} weekend • ${w.holidayDaysWork} holidays (weekdays) • <strong>${w.leaveDays}</strong> PTO</li>`);
    if (w.bridgeHint) lines.push(`<li>🧠 <strong>Bridge chance:</strong> a holiday lands Tue–Thu.</li>`);

    return `
      <div class="weekCard">
        <div class="weekHead">
          <div class="weekTitle">${title} • <span class="weekMeta">${rangeTxt}</span></div>
          <div class="weekMeta">PTO: <strong>${w.leaveDays}</strong></div>
        </div>
        <ul class="weekList">${lines.join("")}</ul>
      </div>
    `;
  }).join("");
}

// --------------------
// Holiday list
// --------------------
function renderHolidayList() {
  const state = stateEl.value || "ALL";
  const observedOn = (observedEl.value || "on") === "on";

  const prefix =
    `${state === "ALL" ? "Federal only" : `State: ${state}`} • Observed: ${observedOn ? "ON" : "OFF"}`;

  holidayListEl.innerHTML =
    `<div class="muted" style="font-weight:800; margin-bottom:8px;">${escapeHtml(prefix)}</div>` +
    ACTIVE_HOLIDAYS.map(h => {
      return `<div class="hl-row">
        <div class="hl-date">${formatHolidayLabelUS(h.date)}</div>
        <div class="hl-name">${escapeHtml(h.name)} <span class="muted">(${escapeHtml(h.kind)})</span></div>
      </div>`;
    }).join("");
}

function formatHolidayLabelUS(iso) {
  const d = parseISODate(iso);
  if (!d) return iso;
  const m = new Intl.DateTimeFormat("en-US",{ month:"short" }).format(d);
  const day = String(d.getUTCDate()).padStart(2,"0");
  const yy = String(d.getUTCFullYear()).slice(-2);
  return `${m} ${day}, ${yy} (${fmtDow(d)})`;
}

// --------------------
// Core computation
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
    const holidays = HOLIDAY_MAP.get(iso) || [];

    totalDays += 1;
    if (weekend) weekendDays += 1;
    if (!weekend) workdays += 1;

    if (holidays.length) {
      for (const h of holidays) {
        holidayHits.push({ date: iso, name: h.name, weekend });
      }
      if (!weekend) holidayOnWorkdays += 1; // count day once (not per holiday name)
    }

    days.push({
      date: iso,
      weekend,
      holidays: holidays.map(h => ({ name: h.name }))
    });
  }

  let leaveDays = workdays - holidayOnWorkdays;
  if (leaveDays < 0) leaveDays = 0;

  return {
    totalDays,
    weekendDays,
    workdays,
    officialHolidayDays: holidayOnWorkdays,
    leaveDays,
    holidayHits,
    days
  };
}

// --------------------
// Weekly grouping
// --------------------
function groupDaysByWeek(days) {
  if (!days.length) return [];

  const out = [];
  let bucket = null;

  for (const day of days) {
    const dt = parseISODate(day.date);
    const weekKey = isoWeekKey(dt);

    if (!bucket || bucket.key !== weekKey) {
      if (bucket) finalizeBucket(bucket);
      bucket = newWeekBucket(weekKey, day.date);
      out.push(bucket);
    }

    bucket.totalDays += 1;
    if (day.weekend) bucket.weekendDays += 1;

    if (day.holidays && day.holidays.length) {
      bucket.holidayDaysAll += 1;
      if (!day.weekend) bucket.holidayDaysWork += 1;
      for (const h of day.holidays) bucket.holidays.push({ date: day.date, name: h.name, weekend: day.weekend });
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
      holidays: [],
      leaveDays: 0,
      bridgeHint: false
    };
  }

  function finalizeBucket(b) {
    const work = b.totalDays - b.weekendDays;
    b.leaveDays = Math.max(0, work - b.holidayDaysWork);

    b.bridgeHint = b.holidays.some(h => {
      const d = parseISODate(h.date);
      const dow = d.getUTCDay(); // Sun=0 ... Sat=6
      return (dow >= 2 && dow <= 4) && !h.weekend;
    });
  }
}

function isoWeekKey(dateUTC) {
  const d = new Date(Date.UTC(dateUTC.getUTCFullYear(), dateUTC.getUTCMonth(), dateUTC.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7));
  const weekYear = d.getUTCFullYear();
  const week1 = new Date(Date.UTC(weekYear, 0, 4));
  const weekNo = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getUTCDay() + 6) % 7)) / 7);
  return `${weekYear}-W${String(weekNo).padStart(2, "0")}`;
}

// --------------------
// Date helpers
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

// --------------------
// Formatting
// --------------------
function fmtLong(d){
  return new Intl.DateTimeFormat("en-US",{ year:"numeric", month:"long", day:"numeric" }).format(d);
}
function fmtShort(d){
  return new Intl.DateTimeFormat("en-US",{ month:"short", day:"2-digit" }).format(d);
}
function fmtDow(d){
  return new Intl.DateTimeFormat("en-US",{ weekday:"short" }).format(d);
}

function round1(x) { return Math.round(x * 10) / 10; }
function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
