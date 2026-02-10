// FECHA DE INICIO DE LA RELACIÓN (EDITA ESTA)
const startDate = new Date("2025-10-05T00:00:00");

// Variables de estado
let seguraLevel = 0;
let esperandoRespuestaSegura = false;
let celebrationAchieved = false;
let teamoVideosIndex = 0;
const teamoVideos = [
  "teamo1.mp4",
  "teamo2.mp4",
  "teamo3.mp4",
  "teamo4.mp4",
  "teamo5.mp4"
];

// Videos
const tristeVideos = ["tristeVideos.mp4", "tristeImagen1.mp4", "tristeImagen2.mp4", "tristeImagen3.mp4"];
const felizVideos = ["feliz1.mp4", "feliz2.mp4", "feliz3.mp4"];

// Música de fondo
const backgroundMusic = new Audio('img/amor.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;
backgroundMusic.autoplay = true;

// Manejar políticas de autoplay
document.addEventListener('DOMContentLoaded', function() {
  backgroundMusic.play().catch(e => {
    console.log('Autoplay bloqueado, esperando interacción...');
    document.addEventListener('click', function startMusic() {
      backgroundMusic.play();
      document.removeEventListener('click', startMusic);
    }, { once: true });
  });
});

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
}

// Contador
function updateCounter() {
  const now = new Date();
  const diffMs = now - startDate;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const displayHours = hours % 24;
  const displayMinutes = minutes % 60;
  const displaySeconds = seconds % 60;

  document.getElementById("days").textContent = String(days);
  document.getElementById("hours").textContent = String(displayHours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(displayMinutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(displaySeconds).padStart(2, "0");
}

setInterval(updateCounter, 1000);
updateCounter();

// Modal de bienvenida
function closeModal() {
  const modal = document.getElementById("welcome-modal");
  modal.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  modal.style.opacity = "0";
  modal.style.transform = "scale(0.7) translateY(-20px)";
  setTimeout(() => {
    modal.style.display = "none";
    modal.style.transition = "";
  }, 800);
}

function showQuestion() {
  if (celebrationAchieved) return;

  const q = document.getElementById("question");
  q.classList.remove("hidden");
  q.scrollIntoView({ behavior: "smooth", block: "center" });
  resetState();
}

// Transformaciones de botón
function transformToOptionsButton() {
  const valentineBtn = document.querySelector(".valentine-btn");
  valentineBtn.textContent = "Opciones 💙";
  valentineBtn.style.background = "linear-gradient(135deg, #4fc3f7, #0288d1)";
  valentineBtn.style.boxShadow = "0 10px 20px rgba(79, 195, 247, 0.4)";
  valentineBtn.style.setProperty("--hover-shadow", "0 14px 26px rgba(79, 195, 247, 0.5)");
  valentineBtn.onclick = showOptions;
}

function transformToTeAmoButton() {
  const valentineBtn = document.querySelector(".valentine-btn");
  valentineBtn.classList.add("teamo-btn");
  valentineBtn.textContent = "Te amo 💕";
  valentineBtn.onclick = playNextTeAmoVideo;
}

function playNextTeAmoVideo() {
  const flowerVideo = document.getElementById("flower-video");
  teamoVideosIndex = (teamoVideosIndex + 1) % teamoVideos.length;
  flowerVideo.src = "img/" + teamoVideos[teamoVideosIndex];
  flowerVideo.load();
  flowerVideo.play();
}

// Estado de pregunta
function resetState() {
  seguraLevel = 0;
  esperandoRespuestaSegura = false;
  updateQuestionDisplay();
}

function updateQuestionDisplay() {
  const flowerVideo = document.getElementById("flower-video");
  const answerText = document.getElementById("answer-text");
  const yesBtn = document.querySelector(".yes");
  const noBtn = document.querySelector(".no");

  const questions = [
    "¿Quieres ser mi San Valentín este 14 de febrero? 💘",
    "¿Segura? 😢",
    "¡Segura segura? 😭",
    "¿Segura segura segura? 💔",
    "Ya pues 🥺"
  ];

  if (seguraLevel <= 4) {
    document.querySelector(".question-text").textContent = questions[seguraLevel];
    answerText.textContent = "";
    flowerVideo.src = seguraLevel === 0 ? "img/flowers2.mov" : "img/" + tristeVideos[seguraLevel - 1];
    yesBtn.textContent = "Sí";
    noBtn.textContent = "No";
    noBtn.style.display = "inline-block";
  }

  flowerVideo.load();
  flowerVideo.play();
}

function answerYes() {
  const answerText = document.getElementById("answer-text");

  if (seguraLevel === 0 || esperandoRespuestaSegura || seguraLevel === 4) {
    document.querySelector(".question-text").textContent = "¡Ahora vas a elegir mi amor :3 💙";
    answerText.textContent = "¡Yesss! ¡Mi San Valentín! 💘✨";

    document.querySelector(".yes").style.display = "none";
    document.querySelector(".no").style.display = "none";

    celebrationAchieved = true;
    setTimeout(() => {
      transformToOptionsButton();
    }, 500);
    return;
  }

  seguraLevel++;
  esperandoRespuestaSegura = false;
  updateQuestionDisplay();
}

function answerNo() {
  const answerText = document.getElementById("answer-text");
  const flowerVideo = document.getElementById("flower-video");

  if (seguraLevel === 4) {
    return;
  }

  if (esperandoRespuestaSegura) {
    resetState();
    return;
  }

  if (seguraLevel === 0) {
    seguraLevel = 1;
    esperandoRespuestaSegura = false;
  } else {
    const nivelActual = seguraLevel - 1;
    if (nivelActual < felizVideos.length) {
      flowerVideo.src = "img/" + felizVideos[nivelActual];
      flowerVideo.load();
      flowerVideo.play();
    }
    
    esperandoRespuestaSegura = true;
    answerText.textContent = "¿Entonces sí quieres? 🥺";
    return;
  }

  updateQuestionDisplay();
}

// Modal de opciones
let optionsStep = 1;
const optionsModal = document.getElementById("options-modal");
const optionsQuestionText = document.getElementById("options-question-text");
const optionsAnswerText = document.getElementById("options-answer-text");
const optionsABtn = document.getElementById("options-a-btn");
const optionsBBtn = document.getElementById("options-b-btn");
const optionsOkBtn = document.getElementById("options-ok-btn");
const optionsImages = document.querySelectorAll(".option-image");
const optionsGrid = document.querySelector(".options-grid");
const optionsContent = document.querySelector(".options-modal-content");

function showOptions() {
  optionsStep = 1;
  optionsAnswerText.textContent = "";
  optionsOkBtn.classList.add("hidden");
  optionsGrid.classList.remove("hidden");
  optionsContent.classList.remove("success-mode");

  optionsABtn.classList.remove("disabled-option");
  optionsBBtn.classList.remove("disabled-option");
  optionsABtn.disabled = false;
  optionsBBtn.disabled = false;

  optionsQuestionText.textContent = "¿Qué quieres comer?";
  optionsImages[0].src = "img/madera.png";
  optionsImages[1].src = "img/macanchis.png";
  optionsABtn.textContent = "Opción A - Madera 🪵";
  optionsBBtn.textContent = "Opción B - Macanchis 🧀";

  optionsModal.classList.remove("hidden");
  optionsModal.style.opacity = "0";
  optionsModal.style.transform = "scale(0.9)";
  optionsModal.style.transition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  requestAnimationFrame(() => {
    optionsModal.style.opacity = "1";
    optionsModal.style.transform = "scale(1)";
  });
}

optionsABtn.addEventListener("click", () => {
  if (optionsABtn.disabled) return;

  if (optionsStep === 1) {
    optionsAnswerText.textContent = "No hay amor, lo siento 😔";
    optionsABtn.disabled = true;
    optionsABtn.classList.add("disabled-option");
  } else if (optionsStep === 2) {
    optionsAnswerText.textContent = "No amor, no iremos allá 😵";
    optionsABtn.disabled = true;
    optionsABtn.classList.add("disabled-option");
  } else if (optionsStep === 3) {
    finishOptionsFlow();
  }
});

optionsBBtn.addEventListener("click", () => {
  if (optionsBBtn.disabled) return;

  if (optionsStep === 1) {
    optionsStep = 2;
    optionsAnswerText.textContent = "";
    loadStep2();
  } else if (optionsStep === 2) {
    optionsStep = 3;
    optionsAnswerText.textContent = "";
    loadStep3();
  } else if (optionsStep === 3) {
    finishOptionsFlow();
  }
});

function loadStep2() {
  optionsQuestionText.textContent = "¿A dónde quieres ir?";
  optionsImages[0].src = "img/larco.png";
  optionsImages[1].src = "img/micasa.png";
  optionsABtn.textContent = "Opción A - Larco herrera 🤪";
  optionsBBtn.textContent = "Opción B - Mi casa ❤️";

  optionsABtn.disabled = false;
  optionsBBtn.disabled = false;
  optionsABtn.classList.remove("disabled-option");
  optionsBBtn.classList.remove("disabled-option");
}

function loadStep3() {
  optionsQuestionText.textContent = "¿Qué quieres que me ponga?";
  optionsImages[0].src = "img/vestido.png";
  optionsImages[1].src = "img/falda.png";
  optionsABtn.textContent = "Opción A - Vestido 👗";
  optionsBBtn.textContent = "Opción B - Falda 👗";

  optionsABtn.disabled = false;
  optionsBBtn.disabled = false;
  optionsABtn.classList.remove("disabled-option");
  optionsBBtn.classList.remove("disabled-option");
}

function finishOptionsFlow() {
  optionsQuestionText.textContent = "Que hot siono ";
  optionsAnswerText.textContent = "";
  optionsGrid.classList.add("hidden");
  optionsContent.classList.add("success-mode");
  optionsOkBtn.classList.remove("hidden");

  setTimeout(() => {
    document.querySelector(".question-text").textContent = "Presiona el boton jejejeje, nos vemos el 14 💕";
    document.getElementById("answer-text").textContent = "";
    transformToTeAmoButton();
  }, 200);
}

optionsOkBtn.addEventListener("click", () => {
  optionsModal.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  optionsModal.style.opacity = "0";
  optionsModal.style.transform = "scale(0.8) translateY(-20px)";
  setTimeout(() => {
    optionsModal.classList.add("hidden");
    optionsModal.style.transition = "";
  }, 600);
});
