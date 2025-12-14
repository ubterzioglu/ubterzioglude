/* =========================================================
  FILE: /zats/js/zats-tool.js
  PURPOSE:
  - ZATS: ATS Readability / ATS-Readiness Tool
  - EN / TR / DE support
  - PDF.js text extraction (text-based PDFs)
  - ATS readability scoring (0–100)
  - Client-side only, no upload
========================================================= */

(function () {
  "use strict";

  const PDFJS_VERSION = "4.7.76";

  /* =========================================================
     SECTION DETECTION (EN / TR / DE)
  ========================================================= */
  const SECTION_HINTS = [
    {
      name: "Experience",
      rx: /(experience|work experience|employment|professional experience|berufserfahrung|erfahrung|iş deneyimi|deneyim)/i
    },
    {
      name: "Skills",
      rx: /(skills|skill set|tech stack|technologies|tools|kenntnisse|fähigkeiten|kompetenzen|yetenek|beceri)/i
    },
    {
      name: "Education",
      rx: /(education|educational background|studium|ausbildung|bildung|eğitim|üniversite|school)/i
    },
    {
      name: "Certifications",
      rx: /(certification|certifications|certified|zertifikat|zertifikate|zertifizierung|sertifika)/i
    },
    {
      name: "Summary/Profile",
      rx: /(summary|profile|about me|kurzprofil|profil|über mich|özet|hakkımda)/i
    }
  ];

  /* =========================================================
     FALLBACK KEYWORDS (language-agnostic tech)
  ========================================================= */
  const FALLBACK_KEYWORDS = [
    "test","testing","qa","quality","automation","selenium","playwright","cypress","ranorex",
    "jira","xray","testrail","postman","api","rest","ci","cd","cicd","jenkins","github",
    "docker","kubernetes","sql","python","java","c#",".net","istqb",
    "agile","scrum","kanban"
  ];

  /* =========================================================
     STOPWORDS (EN + TR + DE)
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
     OWNERSHIP / IMPACT VERBS (EN + TR + DE)
  ========================================================= */
  const OWNERSHIP_RX =
    /(led|owned|designed|implemented|built|created|improved|reduced|optimized|established|
      umgesetzt|implementiert|entwickelt|verbessert|optimiert|reduziert|aufgebaut|geleitet|verantwortlich|
      kurdu|tasarlad|geliştird|iyileştird|azaltt|optimize)/i;

  const GENERIC_RX =
    /(responsible for|worked on|involved in|
      verantwortlich für|beteiligt|mitgewirkt|
      sorumlu|görev aldım|destek oldum)/i;

  /* =========================================================
     DOM
  ========================================================= */
  const els = {};

  document.addEventListener("DOMContentLoaded", () => {
    if (window.pdfjsLib?.GlobalWorkerOptions) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
    }

    els.pdf = q("#pdfUpload");
    els.cv = q("#cvText");
    els.jd = q("#jdText");
    els.extract = q("#btnExtract");
    els.score = q("#btnScore");
    els.clear = q("#btnClear");
    els.result = q("#result");
    els.hint = q("#hint");
    els.preview = q("#previewText");

    els.extract.onclick = onExtract;
    els.score.onclick = onScore;
    els.clear.onclick = onClear;

    setState("Ready.", "Upload a text-based PDF or paste CV text.");
  });

  /* =========================================================
     ACTIONS
  ========================================================= */
  async function onExtract() {
    const file = els.pdf.files?.[0];
    if (!file) return setState("Error.", "Please select a PDF first.");

    try {
      setBusy(true);
      setState("Extracting…", "Reading PDF text layer (client-side).");

      const text = await extractTextFromPdf(file);
      const clean = normalize(text);

      if (clean.length < 80) {
        setState("Extract failed.", "PDF seems scanned (image-only). Paste text instead.");
        els.preview.textContent = "No readable text layer detected.";
        return;
      }

      els.cv.value = clean;
      els.preview.textContent = clean.slice(0, 2500);
      setState("Extracted.", "Text extracted. You can now calculate the score.");
    } catch (e) {
      setState("Error.", e.message || "PDF extract failed.");
    } finally {
      setBusy(false);
    }
  }

  function onScore() {
    const cv = normalize(els.cv.value || "");
    const jd = normalize(els.jd.value || "");

    if (cv.length < 120) {
      return setState("Error.", "CV text is too short.");
    }

    setState("Scoring…", "Estimating ATS readability.");

    const res = scoreAts(cv, jd);
    setState(`${res.total}/100`, res.badge);

    els.preview.textContent = [
      `ATS Readability Score: ${res.total}/100`,
      "",
      "Subscores:",
      `- Parseability: ${res.sub.parse}/30`,
      `- Structure: ${res.sub.structure}/20`,
      `- Keywords: ${res.sub.keywords}/30`,
      `- Evidence: ${res.sub.evidence}/20`,
      "",
      "Top Issues:",
      ...(res.issues.length ? res.issues.map(i => "- " + i) : ["- None detected"]),
      "",
      "Top Fixes:",
      ...(res.fixes.length ? res.fixes.map(f => "- " + f) : ["- No suggestions"])
    ].join("\n");
  }

  function onClear() {
    els.pdf.value = "";
    els.cv.value = "";
    els.jd.value = "";
    els.preview.textContent = "Nothing extracted yet.";
    setState("Ready.", "Upload a text-based PDF or paste CV text.");
  }

  /* =========================================================
     SCORING
  ========================================================= */
  function scoreAts(cv, jd) {
    resetFindings();

    const parse = scoreParse(cv);
    const structure = scoreStructure(cv);
    const keywords = scoreKeywords(cv, jd);
    const evidence = scoreEvidence(cv);

    const total = clamp(Math.round(parse + structure + keywords + evidence), 0, 100);

    return {
      total,
      sub: {
        parse: Math.round(parse),
        structure: Math.round(structure),
        keywords: Math.round(keywords),
        evidence: Math.round(evidence)
      },
      badge: badgeText(total),
      issues: uniq(issues).slice(0, 10),
      fixes: uniq(fixes).slice(0, 10)
    };
  }

  let issues = [];
  let fixes = [];

  function resetFindings() {
    issues = [];
    fixes = [];
  }

  function scoreParse(text) {
    let s = 30;

    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text)) {
      s -= 6; issues.push("Email not detected."); fixes.push("Add email as plain text near the top.");
    }

    if (!/(\+?\d[\d\s().-]{7,}\d)/.test(text)) {
      s -= 4; issues.push("Phone number not detected."); fixes.push("Add phone number with country code.");
    }

    if (!/\b(19|20)\d{2}\b/.test(text)) {
      s -= 6; issues.push("Dates not clearly detected."); fixes.push("Use consistent date format (MM/YYYY – MM/YYYY).");
    }

    const bullets = (text.match(/[•·▪►➤★✓✔✦✧]/g) || []).length;
    if (bullets > 20) {
      s -= 4; issues.push("Heavy use of special bullets/icons."); fixes.push("Use simple '-' bullets.");
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
    else { issues.push("Missing clear Experience section."); fixes.push("Add 'Experience / Berufserfahrung' heading."); }

    if (found.has("Skills")) s += 6;
    else { issues.push("Missing Skills section."); fixes.push("Add dedicated Skills / Kenntnisse section."); }

    if (found.has("Education")) s += 4;
    else { issues.push("Missing Education section."); fixes.push("Add Education / Ausbildung section."); }

    if (found.has("Certifications")) s += 2;

    return clamp(s, 0, 20);
  }

  function scoreKeywords(cv, jd) {
    const cvSet = buildTokenSet(cv);
    const kws = jd.length > 80 ? extractKeywordsFromJd(jd) : FALLBACK_KEYWORDS;

    let matched = 0;
    kws.forEach(k => { if (cvSet.has(k)) matched++; });

    const ratio = matched / Math.max(kws.length, 1);
    const s = Math.round(ratio * 30);

    if (jd.length < 80) {
      issues.push("No job description provided (generic keyword list used).");
      fixes.push("Paste the job description for accurate keyword matching.");
    }

    return clamp(s, 0, 30);
  }

  function scoreEvidence(text) {
    let s = 20;

    if (!/\b\d+/.test(text) && !/%/.test(text)) {
      s -= 8; issues.push("Few measurable results (numbers/metrics).");
      fixes.push("Add metrics: % coverage, # tests, time saved.");
    }

    if (!OWNERSHIP_RX.test(text)) {
      s -= 4; issues.push("Weak ownership/impact verbs.");
      fixes.push("Use verbs like implemented / umgesetzt / geliştirildi.");
    }

    if (GENERIC_RX.test(text)) {
      s -= 4; issues.push("Generic responsibility phrases detected.");
      fixes.push("Rewrite generics into impact-focused statements.");
    }

    return clamp(s, 0, 20);
  }

  function badgeText(score) {
    if (score >= 85) return "Excellent ATS-readiness.";
    if (score >= 70) return "Good ATS-readiness.";
    if (score >= 55) return "Medium ATS-readiness.";
    return "Risky ATS-readiness.";
  }

  /* =========================================================
     PDF.js
  ========================================================= */
  async function extractTextFromPdf(file) {
    const buffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;

    let out = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const c = await page.getTextContent();
      out += "\n" + c.items.map(it => it.str || "").join(" ");
    }
    return out;
  }

  /* =========================================================
     HELPERS
  ========================================================= */
  function extractKeywordsFromJd(jd) {
    return jd
      .toLowerCase()
      .replace(/[^\p{L}\p{N}#+.\s-]/gu, " ")
      .split(/\s+/)
      .filter(w => w.length >= 3 && !STOPWORDS.has(w))
      .slice(0, 80);
  }

  function buildTokenSet(text) {
    const clean = text.toLowerCase().replace(/[^\p{L}\p{N}#+.\s-]/gu, " ");
    const words = clean.split(/\s+/).filter(Boolean);
    const set = new Set();

    for (let i = 0; i < words.length; i++) {
      set.add(words[i]);
      if (i < words.length - 1) set.add(words[i] + " " + words[i + 1]);
    }
    return set;
  }

  function normalize(s) {
    return (s || "")
      .replace(/\r/g, "\n")
      .replace(/\t/g, " ")
      .replace(/[ \u00A0]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function setState(txt, hint) {
    els.result.textContent = txt;
    if (hint) els.hint.textContent = hint;
  }

  function setBusy(b) {
    els.extract.disabled = b;
    els.score.disabled = b;
    els.clear.disabled = b;
  }

  function uniq(arr) {
    return [...new Set(arr)];
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function q(s) {
    return document.querySelector(s);
  }

})();
