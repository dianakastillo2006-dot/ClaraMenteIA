function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

let timer; let timeLeft = 25 * 60;
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

if (startButton) startButton.addEventListener("click", () => {
  if (!timer) timer = setInterval(updateTimer, 1000);
});

if (resetButton) resetButton.addEventListener("click", () => {
  clearInterval(timer); timer = null; timeLeft = 25 * 60; updateDisplay();
});

function updateTimer() {
  timeLeft--; if (timeLeft <= 0) { clearInterval(timer); alert("¡Pomodoro completado!"); unlockAchievement("logro1"); }
  updateDisplay();
}
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60); const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function analizarEstado() {
  const energia = document.getElementById("energia").value;
  const concentracion = document.getElementById("concentracion").value;
  const estres = document.getElementById("estres").value;
  let mensaje = "";
  if (estres > 7) mensaje = "Estás con mucho estrés. Prueba una respiración guiada o música relajante 🎧";
  else if (energia < 4) mensaje = "Tu energía está baja. Toma una pausa corta o bebe agua 💧";
  else if (concentracion > 7) mensaje = "Excelente enfoque, sigue así 💪";
  else mensaje = "Estás en un punto medio. Un Pomodoro puede ayudarte a mejorar tu flujo 🍅";
  document.getElementById("resultado").innerHTML = `<p>${mensaje}</p>`;
}

let breathingInterval;
const breathingDisplay = document.getElementById("breathingDisplay");
const startBreathing = document.getElementById("startBreathing");
const stopBreathing = document.getElementById("stopBreathing");

if (startBreathing) {
  startBreathing.addEventListener("click", startMindfulness);
  stopBreathing.addEventListener("click", stopMindfulness);
}

function startMindfulness() {
  let cycle = 0;
  breathingDisplay.textContent = "Inhala... 4s";
  breathingInterval = setInterval(() => {
    cycle++;
    if (cycle % 2 === 0) breathingDisplay.textContent = "Inhala... 4s";
    else breathingDisplay.textContent = "Exhala... 4s";
  }, 4000);
}
function stopMindfulness() {
  clearInterval(breathingInterval);
  breathingDisplay.textContent = "Ejercicio finalizado 🌿";
}

function unlockAchievement(id) {
  const el = document.getElementById(id);
  el.classList.add("unlocked");
  el.textContent = "✅ " + el.textContent.replace("🔒", "");
}

if (typeof Chart !== "undefined") {
  const ctx1 = document.getElementById("graficoConcentracion").getContext("2d");
  const ctx2 = document.getElementById("graficoProductividad").getContext("2d");

  new Chart(ctx1, {
    type: "line",
    data: {
      labels: ["6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      datasets: [{ label: "Nivel de concentración", data: [4, 6, 8, 5, 7, 3] }]
    }
  });

  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      datasets: [{ label: "Productividad semanal", data: [60, 70, 80, 75, 85] }]
    }
  });
}
