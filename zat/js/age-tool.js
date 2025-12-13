/* =========================================================
  FILE: /zat/js/age-tool.js
  PURPOSE:
  - Run age estimation in-browser using face-api.js
  - No API / no upload / no server
========================================================= */

const input  = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const result  = document.getElementById("result");
const hint    = document.getElementById("hint");

/* =========================================================
  MODEL PATH
  Models live under /zat/models
========================================================= */
const MODEL_URL = "/zat/models";

/* =========================================================
  LOAD MODELS (ONCE)
========================================================= */
async function loadModels() {
  result.textContent = "Loading AI models...";
  hint.textContent = "";

  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);

  result.textContent = "Ready. Select a photo.";
}

/* =========================================================
  ERROR HELPER
========================================================= */
function showError(message) {
  result.textContent = message;
  hint.textContent =
    "Tip: Use a front-facing, sharp, and well-lit photo.";
}

/* =========================================================
  INIT
========================================================= */
loadModels().catch((err) => {
  console.error(err);
  showError("Model loading failed. Check /zat/models path.");
});

/* =========================================================
  IMAGE INPUT HANDLER
========================================================= */
input.addEventListener("change", async () => {
  const file = input.files && input.files[0];
  if (!file) return;

  try {
    result.textContent = "Preparing photo...";
    hint.textContent = "";

    const img = await faceapi.bufferToImage(file);

    preview.src = img.src;
    preview.style.display = "block";

    result.textContent = "Analyzing...";

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
      showError("No face detected.");
      return;
    }

    const age = Math.round(detection.age);
    const gender = detection.gender;
    const genderProb = Math.round(detection.genderProbability * 100);

    result.textContent = `Estimated age: ${age}`;
    hint.textContent =
      `Extra (approx.): Gender: ${gender} (${genderProb}%)`;

  } catch (err) {
    console.error(err);
    showError("Something went wrong. Try another photo.");
  }
});

/* =========================================================
  END OF FILE: /zat/js/age-tool.js
========================================================= */
