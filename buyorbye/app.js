window.BUYORBYE_APP = (function () {
  "use strict";

  function esc(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function makeEl(tag, attrs = {}, html = "") {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") el.className = v;
      else if (k === "hidden") el.hidden = !!v;
      else el.setAttribute(k, v);
    });
    if (html) el.innerHTML = html;
    return el;
  }

  function readNumber(val) {
    if (val === "" || val == null) return null;
    const n = Number(val);
    if (!Number.isFinite(n)) return null;
    return n;
  }

  function answerToYesNo(v) {
    if (v === true) return "yes";
    if (v === false) return "no";
    if (v === "yes" || v === "no") return v;
    return null;
  }

  function pctFromIncomePctAnswer(v) {
    // p10/p20/p30/p40/p50/unk
    if (v === "p10") return 10;
    if (v === "p20") return 20;
    if (v === "p30") return 30;
    if (v === "p40") return 40;
    if (v === "p50") return 50;
    return null; // unk or missing
  }

  function init({ lang, data, rootEl, statusPill }) {
    if (!data || !data.ui || !data.questions || !data.steps) {
      statusPill.textContent = "Data missing.";
      rootEl.textContent = "Data missing.";
      return;
    }

    // hero
    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");
    if (pageTitle) pageTitle.textContent = data.ui.appName || "BUYORBYE";
    if (pageSubtitle) pageSubtitle.textContent = data.ui.subtitle || "";

    const state = { stepIndex: 0, answers: {} };

    const TOTAL_STEPS = data.steps.length;

    function setPillReady() { statusPill.textContent = data.ui.pillReady || "Ready."; }
    function setPillStep() {
      const n = state.stepIndex + 1;
      statusPill.textContent = data.ui.pillStep ? data.ui.pillStep(n, TOTAL_STEPS + 1) : `Step ${n}`;
    }
    function setPillResult() { statusPill.textContent = data.ui.pillResult || "Result ready."; }

    function validateStep(step) {
      const errors = [];
      for (const qid of step.qids) {
        const q = data.questions[qid];
        if (!q) continue;

        const a = state.answers[qid];

        if (q.required) {
          if (q.type === "multi") {
            if (!Array.isArray(a) || a.length === 0) errors.push({ qid, msg: data.ui.required });
          } else if (a === undefined || a === null || a === "") {
            errors.push({ qid, msg: data.ui.required });
          }
        }

        if (q.type === "number" && (a !== undefined && a !== null && a !== "")) {
          const n = readNumber(a);
          if (n === null) errors.push({ qid, msg: data.ui.numberInvalid });
          else if (n < 0) {
            if (qid === "budget") errors.push({ qid, msg: data.ui.budgetMustBeGte0 });
            else if (qid === "price") errors.push({ qid, msg: data.ui.priceMustBeGte0 });
            else errors.push({ qid, msg: data.ui.numberInvalid });
          }
        }

        if (q.type === "multi" && q.max && Array.isArray(a) && a.length > q.max) {
          errors.push({ qid, msg: `Max ${q.max}` });
        }
      }
      return errors;
    }

    function hardOutcomeIfAny() {
      const price = readNumber(state.answers.price);
      const budget = readNumber(state.answers.budget);

      if (Number.isFinite(price) && Number.isFinite(budget) && price > budget) {
        return {
          outcome: data.scoring?.hard?.overBudgetOutcome || "bye",
          reasonKey: data.scoring?.hard?.overBudgetReasonKey || "overBudget"
        };
      }
      return null;
    }

    function scoreAnswers() {
      const W = data.scoring?.weights || {};
      let score = 0;
      const appliedKeys = [];

      // weights
      Object.keys(W).forEach((qid) => {
        const map = W[qid];
        const a = state.answers[qid];
        if (a === undefined || a === null || a === "") return;

        if (qid === "alt80" || qid === "returnPolicy" || qid === "regret2y" || qid === "priceDrop15" ||
            qid === "socialPressure" || qid === "impulse" || qid === "canWait72") {
          const yn = answerToYesNo(a);
          if (yn && typeof map[yn] === "number") score += map[yn];
          return;
        }

        if (typeof map[a] === "number") score += map[a];
      });

      // money brake by incomePct selection
      const pct = pctFromIncomePctAnswer(state.answers.incomePct);
      if (pct != null) {
        const bands = data.scoring?.pctBands || [];
        const hit = bands.find(b => pct <= b.maxPct) || null;
        if (hit) {
          score += Number(hit.score || 0);
          appliedKeys.push(hit.key);
        }
      }

      return { score, appliedKeys, pct };
    }

    function decideOutcome(score) {
      const t = data.scoring?.thresholds || { buyMin: 3, byeMax: -3 };
      if (score >= t.buyMin) return "buy";
      if (score <= t.byeMax) return "bye";
      return "wait";
    }

    function clipartSvg(outcome) {
      // Minimal rounded clipart via inline SVG
      // BUY: check, WAIT: hourglass, BYE: stop/hand
      if (outcome === "buy") {
        return `
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M22 33l6 6 16-18" fill="none" stroke="rgba(0,0,0,.88)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="4"/>
          </svg>`;
      }
      if (outcome === "wait") {
        return `
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M22 10h20M22 54h20" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="5" stroke-linecap="round"/>
            <path d="M24 14c0 10 16 10 16 18s-16 8-16 18" fill="none" stroke="rgba(0,0,0,.88)" stroke-width="5" stroke-linecap="round"/>
            <path d="M40 14c0 10-16 10-16 18s16 8 16 18" fill="none" stroke="rgba(0,0,0,.88)" stroke-width="5" stroke-linecap="round"/>
          </svg>`;
      }
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M18 34c0-8 6-14 14-14h0c8 0 14 6 14 14v8c0 6-5 10-10 10H28c-6 0-10-4-10-10v-8z"
                fill="none" stroke="rgba(0,0,0,.88)" stroke-width="5" stroke-linejoin="round"/>
          <path d="M24 20v-6M32 18v-8M40 20v-6" fill="none" stroke="rgba(0,0,0,.88)" stroke-width="5" stroke-linecap="round"/>
          <circle cx="32" cy="34" r="26" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="4"/>
        </svg>`;
    }

    function renderQuestion(q) {
      const qWrap = makeEl("div", { class: "q" });
      qWrap.appendChild(makeEl("div", { class: "q-label", id: `lbl_${q.id}` }, esc(q.label)));
      if (q.sub) qWrap.appendChild(makeEl("div", { class: "q-sub" }, esc(q.sub)));

      const controls = makeEl("div", { class: "q-controls" });

      if (q.type === "text") {
        const input = makeEl("input", {
          class: "input",
          type: "text",
          placeholder: q.placeholder || "",
          "aria-labelledby": `lbl_${q.id}`
        });
        input.value = state.answers[q.id] ?? "";
        input.addEventListener("input", () => { state.answers[q.id] = input.value; });
        controls.appendChild(input);
      }

      if (q.type === "number") {
        const input = makeEl("input", {
          class: "input",
          type: "number",
          inputmode: "decimal",
          placeholder: q.placeholder || "",
          "aria-labelledby": `lbl_${q.id}`
        });
        input.value = state.answers[q.id] ?? "";
        input.addEventListener("input", () => { state.answers[q.id] = input.value; });
        controls.appendChild(input);
      }

      if (q.type === "yesno") {
        const current = answerToYesNo(state.answers[q.id]);
        const choices = makeEl("div", { class: "choices" });

        const yesId = `${q.id}_yes`;
        const noId  = `${q.id}_no`;

        const yes = makeEl("label", { class: "choice", for: yesId });
        const no  = makeEl("label", { class: "choice", for: noId });

        yes.innerHTML = `<input id="${yesId}" type="radio" name="${q.id}" value="yes" ${current === "yes" ? "checked" : ""} />
                         <div><strong>${lang === "tr" ? "Evet" : "Yes"}</strong></div>`;
        no.innerHTML  = `<input id="${noId}" type="radio" name="${q.id}" value="no" ${current === "no" ? "checked" : ""} />
                         <div><strong>${lang === "tr" ? "Hayır" : "No"}</strong></div>`;

        choices.appendChild(yes);
        choices.appendChild(no);

        choices.addEventListener("change", (e) => {
          const v = e.target?.value;
          if (v === "yes" || v === "no") state.answers[q.id] = v;
        });

        controls.appendChild(choices);
      }

      if (q.type === "single") {
        const current = state.answers[q.id] ?? "";
        const choices = makeEl("div", { class: "choices" });

        q.options.forEach((opt, idx) => {
          const rid = `${q.id}_${idx}`;
          const lab = makeEl("label", { class: "choice", for: rid });
          lab.innerHTML = `<input id="${rid}" type="radio" name="${q.id}" value="${esc(opt.v)}" ${String(current) === String(opt.v) ? "checked" : ""} />
                           <div><strong>${esc(opt.t)}</strong></div>`;
          choices.appendChild(lab);
        });

        choices.addEventListener("change", (e) => {
          const v = e.target?.value;
          state.answers[q.id] = v;
        });

        controls.appendChild(choices);
      }

      if (q.type === "multi") {
        const arr = Array.isArray(state.answers[q.id]) ? state.answers[q.id] : [];
        const choices = makeEl("div", { class: "choices" });

        q.options.forEach((opt, idx) => {
          const cid = `${q.id}_${idx}`;
          const checked = arr.includes(opt.v);

          const lab = makeEl("label", { class: "choice", for: cid });
          lab.innerHTML = `<input id="${cid}" type="checkbox" value="${esc(opt.v)}" ${checked ? "checked" : ""} />
                           <div><strong>${esc(opt.t)}</strong></div>`;
          choices.appendChild(lab);
        });

        choices.addEventListener("change", (e) => {
          const target = e.target;
          if (!target || target.type !== "checkbox") return;

          const v = target.value;
          let next = Array.isArray(state.answers[q.id]) ? [...state.answers[q.id]] : [];

          if (target.checked) {
            if (!next.includes(v)) next.push(v);
            if (q.max && next.length > q.max) {
              next = next.slice(next.length - q.max);
              [...choices.querySelectorAll("input[type=checkbox]")].forEach(cb => {
                cb.checked = next.includes(cb.value);
              });
            }
          } else {
            next = next.filter(x => x !== v);
          }
          state.answers[q.id] = next;
        });

        controls.appendChild(choices);
      }

      if (!q.required) controls.appendChild(makeEl("div", { class: "hint" }, esc(data.ui.optional)));

      qWrap.appendChild(controls);
      return qWrap;
    }

    function renderStep() {
      rootEl.innerHTML = "";
      setPillStep();

      const step = data.steps[state.stepIndex];
      const title = data.ui.stepTitles?.[step.id] || "";
      const sub = data.ui.stepSubs?.[step.id] || "";

      const card = makeEl("section", { class: `card ${step.color}` });
      const head = makeEl("div", { class: "card-head" });
      head.appendChild(makeEl("h2", { class: "card-title" }, esc(title)));
      head.appendChild(makeEl("p", { class: "card-sub" }, esc(sub)));
      card.appendChild(head);

      const qgrid = makeEl("div", { class: "qgrid" });
      step.qids.forEach((qid) => {
        const q = data.questions[qid];
        if (q) qgrid.appendChild(renderQuestion(q));
      });
      card.appendChild(qgrid);

      const errBox = makeEl("div", { class: "err", hidden: true, id: "errBox" });
      card.appendChild(errBox);

      const nav = makeEl("div", { class: "input-row" });
      const backBtn = makeEl("button", { class: "btn secondary", type: "button" }, esc(data.ui.back));
      const nextBtn = makeEl("button", { class: "btn", type: "button" }, esc(data.ui.next));

      backBtn.addEventListener("click", () => {
        if (state.stepIndex === 0) return;
        state.stepIndex -= 1;
        renderStep();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      nextBtn.addEventListener("click", () => {
        const errors = validateStep(step);
        if (errors.length) {
          errBox.hidden = false;
          errBox.textContent = errors[0].msg;
          return;
        }
        errBox.hidden = true;

        if (state.stepIndex < data.steps.length - 1) {
          state.stepIndex += 1;
          renderStep();
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          renderResult();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });

      if (state.stepIndex > 0) nav.appendChild(backBtn);
      nav.appendChild(nextBtn);
      card.appendChild(nav);

      rootEl.appendChild(card);
    }

    function renderResult() {
      rootEl.innerHTML = "";
      setPillResult();

      const hard = hardOutcomeIfAny();
      const scored = scoreAnswers();
      const outcome = hard ? hard.outcome : decideOutcome(scored.score);
      const out = data.outcomes[outcome] || data.outcomes.wait;

      // Main result card must be ORANGE (always) as requested
      const container = makeEl("div", { class: "result-grid" });

      const main = makeEl("section", { class: "card card-orange" });
      const head = makeEl("div", { class: "card-head" });
      head.appendChild(makeEl("h2", { class: "card-title" }, esc(data.ui.stepTitles?.result || "Result")));
      head.appendChild(makeEl("p", { class: "card-sub" }, esc(out.headline || "")));
      main.appendChild(head);

      const outcomeWrap = makeEl("div", { class: "outcome-wrap" });

      

      const wordClass = outcome === "wait" ? "decision-word wait" : "decision-word";
      outcomeWrap.appendChild(makeEl("p", { class: wordClass }, esc(out.label || "").toUpperCase()));

      const clip = makeEl("div", { class: "clipart", "aria-hidden": "true" }, clipartSvg(outcome));
      outcomeWrap.appendChild(clip);

      outcomeWrap.appendChild(makeEl("div", { class: "outcome-tone" }, esc(out.tone || "")));
      outcomeWrap.appendChild(makeEl("div", { class: "step-help" }, esc(data.ui.result.nudge)));

      main.appendChild(outcomeWrap);

      const nav = makeEl("div", { class: "input-row" });
      const backBtn = makeEl("button", { class: "btn secondary", type: "button" }, esc(data.ui.back));
      backBtn.addEventListener("click", () => {
        state.stepIndex = data.steps.length - 1;
        renderStep();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      const resetBtn = makeEl("button", { class: "btn", type: "button" }, esc(data.ui.startOver));
      resetBtn.addEventListener("click", () => {
        state.stepIndex = 0;
        state.answers = {};
        setPillReady();
        renderStep();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      nav.appendChild(backBtn);
      nav.appendChild(resetBtn);
      main.appendChild(nav);

      // Collect reason keys
      const keys = [];
      if (hard?.reasonKey) keys.push(hard.reasonKey);
      scored.appliedKeys.forEach(k => keys.push(k));
      const uniqKeys = [...new Set(keys)];

      // Build merged reasons
      const R = data.reasons || {};
      const whys = [];
      const trades = [];
      const nexts = [];

      uniqKeys.forEach((k) => {
        const pack = R[k];
        if (pack?.why) whys.push(...pack.why);
        if (pack?.tradeoffs) trades.push(...pack.tradeoffs);
        if (pack?.next) nexts.push(...pack.next);
      });

      // Fallback minimal text if no packs hit
      if (whys.length === 0) {
        whys.push(lang === "tr" ? "Cevaplarının genel dengesi bu sonuca işaret ediyor." : "Your answers balance out this way.");
      }
      if (trades.length === 0) {
        trades.push(lang === "tr" ? "Emin değilsen 72 saat beklemek iyi bir sigortadır." : "If unsure, waiting 72 hours is cheap insurance.");
      }
      if (nexts.length === 0) {
        nexts.push(lang === "tr" ? "Bugün karar verme baskısı yoksa, kısa bir bekleme çoğu zaman kazandırır." : "If there’s no pressure today, a short wait often wins.");
      }

      // Separate cards for Why / Trade-offs / Suggestion
      const whyCard = makeEl("section", { class: "card card-yellow" });
      whyCard.appendChild(makeEl("h3", { class: "mini-title" }, esc(data.ui.result.why)));
      whyCard.appendChild(makeEl("ul", { class: "bullets" }, whys.slice(0, 5).map(x => `<li>${esc(x)}</li>`).join("")));

      const tradeCard = makeEl("section", { class: "card card-green" });
      tradeCard.appendChild(makeEl("h3", { class: "mini-title" }, esc(data.ui.result.tradeoffs)));
      tradeCard.appendChild(makeEl("ul", { class: "bullets" }, trades.slice(0, 3).map(x => `<li>${esc(x)}</li>`).join("")));

      const nextCard = makeEl("section", { class: "card card-blue" });
      nextCard.appendChild(makeEl("h3", { class: "mini-title" }, esc(data.ui.result.nextSteps)));
      nextCard.appendChild(makeEl("ul", { class: "bullets" }, nexts.slice(0, 3).map(x => `<li>${esc(x)}</li>`).join("")));

      container.appendChild(main);
      container.appendChild(whyCard);
      container.appendChild(tradeCard);
      container.appendChild(nextCard);

      rootEl.appendChild(container);
    }

    function decideOutcome(score) {
      const t = data.scoring?.thresholds || { buyMin: 3, byeMax: -3 };
      if (score >= t.buyMin) return "buy";
      if (score <= t.byeMax) return "bye";
      return "wait";
    }

    setPillReady();
    renderStep();
  }

  return { init };
})();
