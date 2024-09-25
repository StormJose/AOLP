'use strict'

// Barras de progresso


const monthlyMissions = [
    {
      name: "Título da missão",
      goal: 230,
      
    },
    {
      name: "Título da missão",
      goal: 1320,
  
    },
    {
      name: "Título da missão",
      goal: 500,
  
    },
    {
      name: "Título da missão",
      goal: 2000,
  
    }
  ]
  
  
  const experiecePoints = document.querySelectorAll(".badge-per");
  const experieceGoals = document.querySelectorAll(".xp-goal")
  
  experiecePoints.forEach(function(skillPer, i) {
    const xp = parseFloat(skillPer.getAttribute("xp"));
    
    const percentage = Math.floor((xp / monthlyMissions[i].goal) * 100)
  
    // Ajusta a largura da barra de acordo com o progresso
    skillPer.style.width = percentage + "%" ;
  
    
    const labelGoal = skillPer.previousElementSibling
  
    if (xp === monthlyMissions[i].goal) skillPer.style.content = ''
    
    labelGoal.textContent = `${monthlyMissions[i].goal}xp`

  
    
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

        if (stepPercentage === monthlyMissions[i].goal) skillPer.setAttribute("xp" , '')

      } else {
        animatedValue = xp;
        skillPer.setAttribute("xp", Math.floor(animatedValue) + "xp");
      }
    }
    
    requestAnimationFrame(animate);
  });
  
  
  