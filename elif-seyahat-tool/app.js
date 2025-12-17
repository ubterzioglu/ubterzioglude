const STORAGE_KEY = "elif_seyahat_plans_v1";

const els = {
  plans: document.getElementById("plans"),
  planTemplate: document.getElementById("planTemplate"),
  tripRowTemplate: document.getElementById("tripRowTemplate"),
  btnAddPlan: document.getElementById("btnAddPlan"),
  btnExport: document.getElementById("btnExport"),
  fileImport: document.getElementById("fileImport"),
  btnReset: document.getElementById("btnReset"),
};

function daysBetween(dateA, dateB) {
  // returns (B - A) in days, matching PDF example: 26/02 -> 07/04 = 40
  if (!dateA || !dateB) return null;
  const a = new Date(dateA);
  const b = new Date(dateB);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  const ms = b.getTime() - a.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const data = JSON.parse(raw);
    if (!Array.isArray(data.plans)) return defaultState();
    return data;
  } catch {
    return defaultState();
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function defaultState() {
  return {
    plans: [
      { id: uid(), title: "Öneri 1", pros: "", cons: "", trips: [] },
      { id: uid(), title: "Öneri 2", pros: "", cons: "", trips: [] },
      { id: uid(), title: "Öneri 3", pros: "", cons: "", trips: [] },
    ],
  };
}

let state = load();

function render() {
  els.plans.innerHTML = "";
  state.plans.forEach(plan => {
    els.plans.appendChild(renderPlan(plan));
  });
}

function renderPlan(plan) {
  const node = els.planTemplate.content.firstElementChild.cloneNode(true);

  const titleEl = node.querySelector(".planTitle");
  const totalDaysEl = node.querySelector(".totalDays");
  const tripBody = node.querySelector(".tripBody");
  const btnAddTrip = node.querySelector(".btnAddTrip");
  const btnDeletePlan = node.querySelector(".btnDeletePlan");
  const prosEl = node.querySelector(".pros");
  const consEl = node.querySelector(".cons");

  titleEl.value = plan.title ?? "";
  prosEl.value = plan.pros ?? "";
  consEl.value = plan.cons ?? "";

  titleEl.addEventListener("input", () => {
    plan.title = titleEl.value;
    persist();
  });

  prosEl.addEventListener("input", () => {
    plan.pros = prosEl.value;
    persist();
  });

  consEl.addEventListener("input", () => {
    plan.cons = consEl.value;
    persist();
  });

  btnAddTrip.addEventListener("click", () => {
    plan.trips.push({ id: uid(), turkey: "", kas: "", ret: "" });
    persistAndRerender();
  });

  btnDeletePlan.addEventListener("click", () => {
    state.plans = state.plans.filter(p => p.id !== plan.id);
    persistAndRerender();
  });

  // trips
  plan.trips.forEach(trip => {
    const tr = els.tripRowTemplate.content.firstElementChild.cloneNode(true);

    const dTurkey = tr.querySelector(".dTurkey");
    const dKas = tr.querySelector(".dKas");
    const dReturn = tr.querySelector(".dReturn");

    const trTotal = tr.querySelector(".trTotal");
    const toKas = tr.querySelector(".toKas");
    const inKas = tr.querySelector(".inKas");

    const btnDeleteTrip = tr.querySelector(".btnDeleteTrip");

    dTurkey.value = trip.turkey || "";
    dKas.value = trip.kas || "";
    dReturn.value = trip.ret || "";

    function recalc() {
      const turkeyTotal = daysBetween(dTurkey.value, dReturn.value);
      const untilKas = daysBetween(dTurkey.value, dKas.value);
      const inKasDays = daysBetween(dKas.value, dReturn.value);

      trTotal.textContent = turkeyTotal ?? "—";
      toKas.textContent = untilKas ?? "—";
      inKas.textContent = inKasDays ?? "—";

      updatePlanTotal(plan, totalDaysEl);
    }

    function bind(field, key) {
      field.addEventListener("input", () => {
        trip[key] = field.value;
        persist();
        recalc();
      });
    }

    bind(dTurkey, "turkey");
    bind(dKas, "kas");
    bind(dReturn, "ret");

    btnDeleteTrip.addEventListener("click", () => {
      plan.trips = plan.trips.filter(t => t.id !== trip.id);
      persistAndRerender();
    });

    recalc();
    tripBody.appendChild(tr);
  });

  updatePlanTotal(plan, totalDaysEl);
  return node;
}

function updatePlanTotal(plan, totalDaysEl) {
  const sum = (plan.trips || [])
    .map(t => daysBetween(t.turkey, t.ret))
    .filter(v => typeof v === "number" && v >= 0)
    .reduce((a, b) => a + b, 0);

  totalDaysEl.textContent = sum.toString();
}

function persist() {
  save(state);
}

function persistAndRerender() {
  persist();
  render();
}

els.btnAddPlan.addEventListener("click", () => {
  state.plans.push({ id: uid(), title: "Yeni Plan", pros: "", cons: "", trips: [] });
  persistAndRerender();
});

els.btnExport.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "elif-seyahat-plans.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

els.fileImport.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!data || !Array.isArray(data.plans)) throw new Error("Invalid format");
    state = data;
    persistAndRerender();
  } catch {
    alert("JSON içe aktarma başarısız. Dosya formatını kontrol et.");
  } finally {
    els.fileImport.value = "";
  }
});

els.btnReset.addEventListener("click", () => {
  if (!confirm("Tüm planlar sıfırlansın mı?")) return;
  state = defaultState();
  persistAndRerender();
});

render();
