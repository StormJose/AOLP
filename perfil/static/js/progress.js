"use strict";

// Barras de progresso

const monthlyMissions = [
  {
    name: "Título da missão",
  },
  {
    name: "Título da missão",
  },
  {
    name: "Título da missão",
  },
  {
    name: "Título da missão",
  },
];

/////// Progresso do Usuário

// Estacao
const progressValue = document.getElementById("estacao-progresso--valor");
const circle = document.querySelector("circle");
const radius = 45; // O mesmo do SVG
const circumference = 2 * Math.PI * radius;
const maxProgress = (circle.style.strokeDasharray = circumference);
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  progressValue.innerHTML = percent + "%";
}

// Atualização do progresso
let counter = 0;
const target = 75;
const interval = setInterval(() => {
  if (counter >= target) {
    clearInterval(interval);
  } else {
    counter++;
    setProgress(counter);
  }
}, 10);

// Academy Geral

const progressBars = document.querySelectorAll(".badge-per");
const experieceGoals = document.querySelectorAll(".xp-goal");

progressBars.forEach((bar, i) => {
  const goal = Number(bar.getAttribute("max"));

  monthlyMissions[i].goal = goal;
});

console.log(monthlyMissions);


progressBars.forEach(function (skillPer, i) {
  const xp = parseFloat(skillPer.getAttribute("xp"));

  const percentage = Math.floor((xp / monthlyMissions[i].goal) * 100);

  // Ajusta a largura da barra de acordo com o progresso
  skillPer.style.width = percentage + "%";

  const labelGoal = skillPer.previousElementSibling;

  if (xp === monthlyMissions[i].goal) skillPer.style.content = "";

  labelGoal.textContent = `${monthlyMissions[i].goal}xp`;

  let animatedValue = 0;
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const stepPercentage = progress / 1000; //  (1000ms = 1s)

    if (stepPercentage < 1) {
      animatedValue = xp * stepPercentage;
      skillPer.setAttribute("xp", Math.floor(animatedValue) + "xp");
      requestAnimationFrame(animate);

      if (stepPercentage === monthlyMissions[i].goal)
        skillPer.setAttribute("xp", "");
    } else {
      animatedValue = xp;
      skillPer.setAttribute("xp", Math.floor(animatedValue) + "xp");
    }
  }

  requestAnimationFrame(animate);
});
