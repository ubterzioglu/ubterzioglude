/* =========================================================
  FILE: /zat/js/age-tool.js
  PURPOSE:
  - face-api.js kullanarak
  - tarayıcıda yaş tahmini yapmak
  - API / upload / server yok
========================================================= */

console.log("ZAT AGE TOOL LOADED");

/* =========================================================
  DOM REFERENCES
========================================================= */
const input  = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const result  = document.getElementById("result");
const hint    = document.getElementById("hint");

/* =========================================================
  MODEL PATH
  Models are served from /zat/models (ABSOLUTE PATH)
========================================================= */
const MODEL_URL = "/zat/models";
console.log("MODEL_URL =", MODEL_URL);

/* =========================================================
  LOAD MODELS (ONCE)
========================================================= */
async function loadModels() {
  try {
    result.textContent = "AI modelleri yükleniyor...";
    hint.textContent = "";

    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    console.log("TinyFaceDetector loaded");

    await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
    console.log("AgeGenderNet loaded");

    result.textContent = "Hazır. Bir fotoğraf seç.";
  } catch (err) {
    console.error("MODEL LOAD ERROR:", err);
    showError("Model yüklenemedi. Console'u kontrol et.");
    throw err;
  }
}

/* =========================================================
  ERROR HELPER
========================================================= */
function showError(message) {
  result.textContent = message;
  hint.textContent =
    "İpucu: Önden çekilmiş, net ve iyi ışıklı bir fotoğraf dene.";
}

/* =========================================================
  INIT
========================================================= */
loadModels().catch((err) => {
  // zaten üstte loglanıyor
});

/* =========================================================
  IMAGE INPUT HANDLER
========================================================= */
input.addEventListener("change", async () => {
  const file = input.files && input.files[0];
  if (!file) return;

  try {
    result.textContent = "Fotoğraf hazırlanıyor...";
    hint.textContent = "";

    const img = await faceapi.bufferToImage(file);

    preview.src = img.src;
    preview.style.display = "block";

    result.textContent = "Analiz ediliyor...";

    const detection = await faceapi
      .detectSingleFace(
        img,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 320,
          scoreThreshold: 0.5
        })
      )
      .withAgeAndGender();

    if (!detection) {
      showError("Yüz algılanamadı.");
      return;
    }

    const age = Math.round(detection.age);
    const gender = detection.gender;
    const genderProb = Math.round(detection.genderProbability * 100);

    result.textContent = `Tahmini yaş: ${age}`;
    hint.textContent =
      `Ek (tahmini): Cinsiyet: ${gender} (%${genderProb})`;

  } catch (err) {
    console.error(err);
    showError("Bir hata oluştu. Farklı bir fotoğraf dene.");
  }
});

/* =========================================================
  END OF FILE: /zat/js/age-tool.js
========================================================= */
