'use strict'

// Elementos
const accordion = document.querySelector('.accordion');
const accordionItems = document.querySelectorAll('.item');

const scrollBtn = document.querySelector('.scroll-btn')

const container = document.querySelector(".cursos-lista");


//////////////////////////////////////////////////////////////////////




document.addEventListener("DOMContentLoaded", () => {
  const estacaoLinksContainer = document.querySelector('.estacoes-lista');
  const estacaoLinks = document.querySelectorAll('.estacao-link')


  estacaoLinksContainer.addEventListener('click', async function(e) {
    e.preventDefault()

    const clicked = e.target.closest('.estacao-link')

    const estacaoId = clicked.dataset.id
    let url = "http://127.0.0.1:8000/cursos";

    if (estacaoId) {
      url+=`/${estacaoId}`
    }

    try {

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
    
      if (!res.ok) console.error({message: 'Não foi possível acessar o conteúdo', status: res.status})

        // A resposta é o próprio template ao invés de um objeto JSON
        const markup = await res.text()
        document.querySelector(".courses").innerHTML = markup;


        window.scrollTo({ top: 0, behavior: "smooth" });

        // Garantir que os controles de carrossel estejam ativados
        await controlCarousels()



    } catch(error) {
      console.error("Erro ao carregar os cursos:", error);
    }


    estacaoLinks.forEach((link) => link.classList.remove('estacao-link-active'))

    clicked.classList.add('estacao-link-active')

  })
});


// Habilitar controle de carrosséis por setas

const controlCarousels = function () {
  // Get all carousels
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {

    const containerEl = carousel.querySelector(".cursos-lista");
    const itemEl = containerEl.querySelector(".card");
    const scrollLeftButton = carousel.querySelector(".scroll-left-btn");
    const scrollRightButton = carousel.querySelector(".scroll-right-btn");
  
    if (!itemEl) return;

    let scrollAmount = 0;

    function updateScrollAmount() {
      // Largura de um único elemento
      const itemWidth = itemEl.offsetWidth;

      const itemsToScroll = Math.floor(containerEl.clientWidth / itemWidth);

      scrollAmount = itemsToScroll * itemWidth;
    }

    // Inicializa a quantidade necessária de deslize inicial
    updateScrollAmount();

    
    window.addEventListener("resize", updateScrollAmount);

    // Event for the left button
    scrollLeftButton.addEventListener("click", function () {
      containerEl.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });


    scrollRightButton.addEventListener("click", function () {
      containerEl.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  });
};


controlCarousels()

