/* =========================================================
  FILE: /zat/js/age-tool.js
  PURPOSE:
  - face-api.js kullanarak
  - tarayıcıda yaş tahmini yapmak
  - API / upload / server yok
========================================================= */

const input  = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const result  = document.getElementById("result");
const hint    = document.getElementById("hint");

/* =========================================================
  MODEL PATH
  Modeller /zat/models altında duruyor
========================================================= */
const MODEL_URL = "./models";

/* =========================================================
  LOAD MODELS (ONCE)
========================================================= */
async function loadModels() {
  result.textContent = "AI modelleri yükleniyor...";
  hint.textContent = "";

  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);

  result.textContent = "Hazır. Bir fotoğraf seç.";
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
  console.error(err);
  showError("Model yüklenemedi. /zat/models yolunu kontrol et.");
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