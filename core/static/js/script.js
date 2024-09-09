'use strict'

// Funcionalidades específicas de: Home


// Elementos
const accordion = document.querySelector('.accordion');
const accordionItems = document.querySelectorAll('.item');

// Elementos do carrossel
const containerEl = document.querySelector(".cards-de-estacoes");
const itemEl = document.querySelector(".card-estacao");
const scrollLeftButton = document.getElementById("scroll-left-button");
const scrollRightButton = document.getElementById("scroll-right-button");
        
  

// Habilitando o carrossel de Estações
document.addEventListener('DOMContentLoaded', function () {

const controlCarousel = function(containerEl, itemEl) {

  let scrollAmount = 0; // Inicializa o quanto o scroll deve percorrer em pixels
  
  function updateScrollAmount() {
    // Largura de um único elemento
    const itemWidth = itemEl.offsetWidth;
    
    const itemsToScroll = Math.floor(containerEl.clientWidth / itemWidth);
    
    scrollAmount = itemsToScroll * itemWidth;
  }
  
  // Atualiza a largura necessária para deslizar
  updateScrollAmount();
  
  // Atualiza a largura necessário para deslizar sempre
  // que há uma mudança na largura da largura da janela
  window.addEventListener("resize", updateScrollAmount);
  
  // Evento para o botão esquerdo
  scrollLeftButton.addEventListener("click", function () {
    containerEl.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
      });
    });
  
  // Evento para o botão direito
  scrollRightButton.addEventListener("click", function () {
    containerEl.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
      });
    });
  }

  controlCarousel(containerEl, itemEl)
});




// Accordion: Perguntas Frequentes
accordionItems.forEach((item) => item.classList.remove('open--accordion'))
accordion.addEventListener("click", function (e) {
  const clicked = e.target.closest(".item");

 
  if (clicked.classList.contains("open--accordion")) {
    clicked.classList.remove("open--accordion");
  } else {
   
    accordionItems.forEach((item) => item.classList.remove("open--accordion"));
    clicked.classList.add("open--accordion");
  }
});