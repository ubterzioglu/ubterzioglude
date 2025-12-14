/* =========================================================
  FILE: /zats/js/zats-tool.js
  PURPOSE:
  - ZATS – ATS Readability Score (ZAT-like UI)
  - Button flow (B): user clicks Extract / Calculate / Clear
  - PDF.js text extraction (text-based PDFs) - LOCAL vendor
  - ATS Readability scoring (0–100) with EN/TR/DE support
  - Updates: #result, #hint, #previewText
  PRIVACY:
  - 100% client-side, no upload
========================================================= */

(function () {
  "use strict";

  /* =========================================================
     PDF.js (LOCAL)
     - zats.html MUST load: ./vendor/pdfjs/pdf.min.js
     - This file sets worker: ./vendor/pdfjs/pdf.worker.min.js
  ========================================================= */
  const PDF_WORKER_SRC = "./vendor/pdfjs/pdf.worker.min.js?v=1";

  /* =========================================================
     SECTION DETECTION (EN / DE / TR)
  ========================================================= */
  const SECTION_HINTS = [
    { name: "Experience",      rx: /(experience|work experience|employment|professional experience|berufserfahrung|erfahrung|iş deneyimi|deneyim)/i },
    { name: "Skills",          rx: /(skills|skill set|tech stack|technologies|tools|kenntnisse|fähigkeiten|kompetenzen|yetenek|beceri)/i },
    { name: "Education",       rx: /(education|educational background|studium|ausbildung|bildung|eğitim|üniversite|school)/i },
    { name: "Certifications",  rx: /(certification|certifications|certified|zertifikat|zertifikate|zertifizierung|sertifika)/i },
    { name: "Summary/Profile", rx: /(summary|profile|about me|kurzprofil|profil|über mich|özet|hakkımda)/i }
  ];

  /* =========================================================
     FALLBACK KEYWORDS (language-agnostic tech)
  ========================================================= */
  const FALLBACK_KEYWORDS = [
    "test","testing","qa","quality","automation","selenium","playwright","cypress","ranorex",
    "jira","xray","testrail","postman","api","rest","ci","cd","cicd","jenkins","github",
    "docker","kubernetes","sql","python","java","c#",".net","istqb","agile","scrum","kanban"
  ];

  /* =========================================================
     STOPWORDS (EN + DE + TR)
  ========================================================= */
  const STOPWORDS = new Set([
    // EN
    "and","or","the","a","an","to","of","in","for","with","on","at","by","as","is","are","be",
    "we","you","your","our","they","will","must","should","can","this","that",
    // TR
    "ve","veya","ile","için","olarak","olan","bir","bu","şu","da","de","mi","mı","mu","mü",
    "gibi","üzere","en","çok","az","daha","ise","ama","fakat","hem","her","kendi",
    // DE
    "und","oder","der","die","das","ein","eine","einer","einem","eines",
    "mit","für","von","auf","bei","als","ist","sind","war","waren",
    "werden","wird","kann","muss","soll","wir","sie","ich","du","nicht"
  ]);

  /* =========================================================
     OWNERSHIP / IMPACT VERBS (EN + DE + TR)
  ========================================================= */
  const OWNERSHIP_RX =
    /(led|owned|designed|implemented|built|created|improved|reduced|optimized|established|umgesetzt|implementiert|entwickelt|verbessert|optimiert|reduziert|aufgebaut|geleitet|verantwortlich|kurdu|tasarlad|geliştird|iyileştird|azaltt|optimize)/i;

  const GENERIC_RX =
    /(responsible for|worked on|involved in|verantwortlich für|beteiligt|mitgewirkt|sorumlu|görev aldım|destek oldum)/i;

  /* =========================================================
     DOM
  ========================================================= */
  const els = {};

  document.addEventListener("DOMContentLoaded", () => {
    els.pdf = q("#pdfUpload");
    els.cv = q("#cvText");
    els.jd = q("#jdText");
    els.btnExtract = q("#btnExtract");
    els.btnScore = q("#btnScore");
    els.btnClear = q("#btnClear");

    els.result = q("#result");
    els.hint = q("#hint");
    els.preview = q("#previewText");

    // Guard
    if (!els.pdf || !els.cv || !els.jd || !els.btnExtract || !els.btnScore || !els.btnClear || !els.result || !els.hint || !els.preview) {
      return;
    }

    els.btnExtract.addEventListener("click", onExtract);
    els.btnScore.addEventListener("click", onScore);
    els.btnClear.addEventListener("click", onClear);

    setState("Ready. Upload a CV PDF.", "Tip: Text-based PDFs work best. If your PDF is scanned (image-only), paste CV text instead.");
    els.preview.textContent = "Nothing extracted yet.";
  });

  /* =========================================================
     ACTIONS
  ========================================================= */
  async function onExtract() {
    const file = els.pdf.files?.[0];
    if (!file) {
      setState("Error: no PDF selected.", "Choose a PDF first.");
      return;
    }

    try {
      setBusy(true);
      setState("Extracting…", "Reading PDF text layer (client-side).");

      const text = await extractTextFromPdf(file);
      const clean = normalize(text);

      setState(`Extracted (${clean.length} chars).`, "Now click 'Calculate score'.");

      if (!clean || clean.length < 80) {
        setState("Extract failed.", "This PDF seems scanned (image-only). Paste CV text instead or upload a text-based PDF.");
        els.preview.textContent = "No readable text layer detected.";
        return;
      }

      els.cv.value = clean;
      els.preview.textContent = clean.slice(0, 2600);
    } catch (e) {
      setState("Error: extract failed.", String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  function onScore() {
    const cv = normalize(els.cv.value || "");
    const jd = normalize(els.jd.value || "");

    if (cv.length < 120) {
      setState("Error: CV text too short.", "Paste more CV text or extract from a text-based PDF.");
      return;
    }

    setState("Scoring…", "Estimating ATS-readiness (parseability + structure + keywords + evidence).");

    const res = scoreAts(cv, jd);

    setState(`${res.total}/100`, res.badge);
    els.preview.textContent = buildReport(res);
  }

  function onClear() {
    els.pdf.value = "";
    els.cv.value = "";
    els.jd.value = "";
    els.preview.textContent = "Nothing extracted yet.";
    setState("Ready. Upload a CV PDF.", "Tip: Text-based PDFs work best. If your PDF is scanned (image-only), paste CV text instead.");
  }

  /* =========================================================
     PDF.js extraction (LOCAL)
  ========================================================= */
  async function ensurePdfJsReady() {
    if (!window.pdfjsLib) {
      throw new Error("PDF.js not loaded. Check zats.html loads ./vendor/pdfjs/pdf.min.js");
    }
    if (window.pdfjsLib?.GlobalWorkerOptions) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;
    }
  }

  async function extractTextFromPdf(file) {
    await ensurePdfJsReady();

    const buffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;

    let out = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      out += "\n" + content.items.map(it => (it?.str ? it.str : "")).join(" ");
    }
    return out;
  }

  /* =========================================================
     SCORING
  ========================================================= */
  function scoreAts(cv, jd) {
    resetFindings();

    const parse = scoreParseability(cv);   // 0..30
    const struct = scoreStructure(cv);     // 0..20
    const kw = scoreKeywords(cv, jd);      // 0..30
    const ev = scoreEvidence(cv);          // 0..20

    const total = clamp(Math.round(parse + struct + kw + ev), 0, 100);

    return {
      total,
      sub: {
        parse: Math.round(parse),
        structure: Math.round(struct),
        keywords: Math.round(kw),
        evidence: Math.round(ev)
      },
      badge: badgeText(total),
      issues: uniq(issues).slice(0, 10),
      fixes: uniq(fixes).slice(0, 10),
      meta: { jdUsed: (jd || "").trim().length >= 80 }
    };
  }

  let issues = [];
  let fixes = [];

  function resetFindings() { issues = []; fixes = []; }

  function scoreParseability(text) {
    let s = 30;

    const hasEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text);
    const hasPhone = /(\+?\d[\d\s().-]{7,}\d)/.test(text);

    const hasDates =
      /\b(19|20)\d{2}\b/.test(text) ||
      /\b(0?[1-9]|1[0-2])[\/.-](19|20)\d{2}\b/.test(text) ||
      /\b(0?[1-9]|[12]\d|3[01])[\/.-](0?[1-9]|1[0-2])[\/.-](19|20)\d{2}\b/.test(text);

    if (!hasEmail) { s -= 6; issues.push("Email not detected."); fixes.push("Add your email as plain text near the top."); }
    if (!hasPhone) { s -= 4; issues.push("Phone number not detected."); fixes.push("Add phone number with country code (e.g., +49…)."); }
    if (!hasDates) { s -= 6; issues.push("Dates not clearly detected (timeline may be unclear)."); fixes.push("Use consistent dates like MM/YYYY – MM/YYYY."); }

    const specialBullets = (text.match(/[•·▪►➤★✓✔✦✧]/g) || []).length;
    if (specialBullets > 20) {
      s -= 4;
      issues.push("Heavy use of special bullets/icons (can break parsing).");
      fixes.push("Use simple '-' bullets for maximum ATS compatibility.");
    }

    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const longLines = lines.filter(l => l.length > 180).length;
    if (longLines >= 6) {
      s -= 6;
      issues.push("Text looks like multi-column extraction (messy parsing).");
      fixes.push("Export a single-column PDF (ATS parsing improves a lot).");
    }

    return clamp(s, 0, 30);
  }

  function scoreStructure(text) {
    let s = 0;
    const found = new Set();

    for (const sec of SECTION_HINTS) {
      if (sec.rx.test(text)) found.add(sec.name);
    }

    if (found.has("Experience")) s += 8;
    else { issues.push("Missing a clear Experience / Berufserfahrung section."); fixes.push("Add an 'Experience' heading and keep company/role/date format consistent."); }

    if (found.has("Skills")) s += 6;
    else { issues.push("Missing a dedicated Skills / Kenntnisse section."); fixes.push("Add a Skills section to boost keyword hits."); }

    if (found.has("Education")) s += 4;
    else { issues.push("Missing an Education / Ausbildung section."); fixes.push("Add Education (school/program/year)."); }

    if (found.has("Certifications")) s += 2;

    return clamp(s, 0, 20);
  }

  function scoreKeywords(cv, jd) {
    const cvSet = buildTokenSet(cv);

    const jdGood = (jd || "").trim().length >= 80;
    const kws = jdGood ? extractKeywordsFromJd(jd) : FALLBACK_KEYWORDS;

    let matched = 0;
    for (const k of kws) {
      if (cvSet.has(k)) matched++;
    }

    const ratio = matched / Math.max(kws.length, 1);
    const s = Math.round(ratio * 30);

    if (!jdGood) {
      issues.push("No job description provided (generic keyword list used).");
      fixes.push("Paste the job description for accurate keyword matching.");
    } else if (ratio < 0.35) {
      issues.push("Low keyword match vs job description.");
      fixes.push("Add missing keywords naturally into Skills/Experience (avoid stuffing).");
    }

    return clamp(s, 0, 30);
  }

  function scoreEvidence(text) {
    let s = 20;

    const hasNumbers = /\b\d{1,3}(?:[.,]\d+)?\b/.test(text);
    const hasPercent = /%/.test(text);

    if (!hasNumbers && !hasPercent) {
      s -= 8;
      issues.push("Few measurable outcomes (numbers/metrics).");
      fixes.push("Add metrics: % coverage, # test cases, time saved, defect reduction.");
    }

    if (!OWNERSHIP_RX.test(text)) {
      s -= 4;
      issues.push("Weak ownership/impact verbs.");
      fixes.push("Use verbs like implemented / improved / optimized / umgesetzt / verbessert.");
    }

    if (GENERIC_RX.test(text)) {
      s -= 4;
      issues.push("Generic responsibility phrases detected.");
      fixes.push("Rewrite into impact: “Implemented X resulting in Y”.");
    }

    return clamp(s, 0, 20);
  }

  function badgeText(score) {
    if (score >= 85) return "Excellent ATS-readiness. Small refinements can make it even stronger.";
    if (score >= 70) return "Good ATS-readiness. Fix a few gaps to improve ranking.";
    if (score >= 55) return "Medium ATS-readiness. Structure/keywords/metrics can boost results a lot.";
    return "Risky ATS-readiness. Simplify layout, add clear sections, and strengthen keywords + metrics.";
  }

  function buildReport(res) {
    const lines = [];

    lines.push(`ATS Readability Score: ${res.total}/100`);
    lines.push("");
    lines.push("Subscores:");
    lines.push(`- Parseability: ${res.sub.parse}/30`);
    lines.push(`- Structure: ${res.sub.structure}/20`);
    lines.push(`- Keywords: ${res.sub.keywords}/30${res.meta.jdUsed ? "" : " (generic list)"}`);
    lines.push(`- Evidence: ${res.sub.evidence}/20`);
    lines.push("");

    lines.push("Top Issues:");
    if (res.issues.length) res.issues.forEach(i => lines.push(`- ${i}`));
    else lines.push("- None detected");

    lines.push("");
    lines.push("Top Fixes:");
    if (res.fixes.length) res.fixes.forEach(f => lines.push(`- ${f}`));
    else lines.push("- No suggestions");

    return lines.join("\n");
  }

  /* =========================================================
     KEYWORD HELPERS
  ========================================================= */
  function extractKeywordsFromJd(jd) {
    const toks = jd
      .toLowerCase()
      .replace(/[^\p{L}\p{N}#+.\s-]/gu, " ")
      .split(/\s+/)
      .map(t => t.trim())
      .filter(t => t.length >= 3)
      .filter(t => !STOPWORDS.has(t));

    const out = [];
    const seen = new Set();

    for (const t of toks) {
      const k = t.replace(/^-+|-+$/g, "");
      if (!k) continue;
      if (!seen.has(k)) { seen.add(k); out.push(k); }
      if (out.length >= 80) break;
    }

    return out.length ? out : FALLBACK_KEYWORDS;
  }

  function buildTokenSet(text) {
    const clean = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}#+.\s-]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();

    const w = clean.split(" ").filter(Boolean);
    const set = new Set();

    for (let i = 0; i < w.length; i++) {
      const a = w[i];
      if (a.length >= 2) set.add(a);
      if (i < w.length - 1) {
        const bg = (a + " " + w[i + 1]).trim();
        if (bg.length >= 4) set.add(bg);
      }
    }
    return set;
  }

  /* =========================================================
     UI HELPERS
  ========================================================= */
  function setState(statusText, hintText) {
    els.result.textContent = statusText;
    if (typeof hintText === "string") els.hint.textContent = hintText;
  }

  function setBusy(b) {
    els.btnExtract.disabled = b;
    els.btnScore.disabled = b;
    els.btnClear.disabled = b;
  }

  function normalize(s) {
    return (s || "")
      .replace(/\r/g, "\n")
      .replace(/\t/g, " ")
      .replace(/[ \u00A0]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function uniq(arr) {
    const out = [];
    const seen = new Set();
    for (const x of (arr || [])) {
      const k = String(x);
      if (!seen.has(k)) { seen.add(k); out.push(x); }
    }
    return out;
  }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function q(sel) { return document.querySelector(sel); }

})();
