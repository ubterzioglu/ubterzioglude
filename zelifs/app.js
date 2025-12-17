const STORAGE_KEY = "zelifs_state";

const el = {
  title: document.getElementById("title"),
  totalDays: document.getElementById("totalDays"),
  tripBody: document.getElementById("tripBody"),
  tripTpl: document.getElementById("tripRowTemplate"),

  btnAddTrip: document.getElementById("btnAddTrip"),
  prosInput: document.getElementById("prosInput"),
  consInput: document.getElementById("consInput"),
  btnAddProsCons: document.getElementById("btnAddProsCons"),
  prosList: document.getElementById("prosList"),
  consList: document.getElementById("consList"),

  btnExport: document.getElementById("btnExport"),
  fileImport: document.getElementById("fileImport"),
  btnReset: document.getElementById("btnReset")
};

let state = load() || {
  title: "Öneri 1",
  trips: [],
  pros: [],
  cons: []
};

function days(a, b) {
  if (!a || !b) return null;
  return Math.floor((new Date(b) - new Date(a)) / 86400000);
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function render() {
  el.title.value = state.title;
  el.tripBody.innerHTML = "";
  el.prosList.innerHTML = "";
  el.consList.innerHTML = "";

  let total = 0;

  state.trips.forEach((t, i) => {
    const row = el.tripTpl.content.firstElementChild.cloneNode(true);
    const [dTr, dKas, dRet] = row.querySelectorAll("input");
    const [cTot, cKas, cIn] = row.querySelectorAll(".calc");

    dTr.value = t.tr || "";
    dKas.value = t.kas || "";
    dRet.value = t.ret || "";

    const recalc = () => {
      const trTot = days(dTr.value, dRet.value);
      const toKas = days(dTr.value, dKas.value);
      const inKas = days(dKas.value, dRet.value);

      cTot.textContent = trTot ?? "—";
      cKas.textContent = toKas ?? "—";
      cIn.textContent = inKas ?? "—";

      updateTotal();
    };

    [dTr, dKas, dRet].forEach((inp, idx) =>
      inp.addEventListener("input", () => {
        t[["tr","kas","ret"][idx]] = inp.value;
        save(); recalc();
      })
    );

    row.querySelector(".btnDeleteTrip").onclick = () => {
      state.trips.splice(i,1);
      save(); render();
    };

    recalc();
    el.tripBody.appendChild(row);
  });

  state.pros.forEach(p => el.prosList.innerHTML += `<li>${p}</li>`);
  state.cons.forEach(c => el.consList.innerHTML += `<li>${c}</li>`);

  updateTotal();
}

function updateTotal() {
  const sum = state.trips
    .map(t => days(t.tr, t.ret))
    .filter(n => n >= 0)
    .reduce((a,b) => a+b, 0);

  el.totalDays.textContent = sum;
}

el.btnAddTrip.onclick = () => {
  state.trips.push({ tr:"", kas:"", ret:"" });
  save(); render();
};

el.btnAddProsCons.onclick = () => {
  if (el.prosInput.value) state.pros.push(el.prosInput.value);
  if (el.consInput.value) state.cons.push(el.consInput.value);
  el.prosInput.value = "";
  el.consInput.value = "";
  save(); render();
};

el.title.oninput = () => { state.title = el.title.value; save(); };

el.btnExport.onclick = () => {
  const blob = new Blob([JSON.stringify(state,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "zelifs.json";
  a.click();
};

el.fileImport.onchange = async e => {
  const txt = await e.target.files[0].text();
  state = JSON.parse(txt);
  save(); render();
};

el.btnReset.onclick = () => {
  if (confirm("Her şey silinsin mi?")) {
    localStorage.removeItem(STORAGE_KEY);
    state = { title:"Öneri 1", trips:[], pros:[], cons:[] };
    render();
  }
};

render();
