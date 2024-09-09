const tabContentsContainer = document.querySelector(".estacoes-contents");
const subnavbarContainer = document.querySelector(".estacoes-tabs-container");
const subnavbarList = document.querySelector(".estacoes-tabs--list");
const navbarTabBtn = document.querySelector(".tab-btn");
const navbarTabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");



subnavbarList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".tab-btn");
  
  console.log(clicked);

  if (!clicked) return;

  navbarTabBtns.forEach((btn) =>
    btn.classList.remove("tab-btn--active")
  );

  clicked.classList.add("tab-btn--active");

  tabContents.forEach((tab) => tab.classList.add("hidden"));

  document
    .querySelector(`.tab-content--${clicked.dataset.tab}`)
    ?.classList.remove("hidden");

});

const scrollLeftButton = document.getElementById("scroll-left-button");
const scrollRightButton = document.getElementById("scroll-right-button");

const controlCarousel = function (containerEl, itemEl) {
  let scrollAmount = 0; // Inicializa o quanto o scroll deve percorrer em pixels

  const itemWidth = itemEl.offsetWidth;
  const itemsToScroll = Math.floor(containerEl.clientWidth / itemWidth);

  function updateScrollAmount() {
    // Largura de um único elemento

    scrollAmount = itemsToScroll * itemWidth;
   console.log(scrollAmount)
    
}

// Atualiza a largura necessária para deslizar
updateScrollAmount();

// Atualiza a largura necessário para deslizar sempre
// que há uma mudança na largura da largura da janela
window.addEventListener("resize", updateScrollAmount);

// Evento para o botão esquerdo
scrollLeftButton.addEventListener("click", function () {
    console.log("click");
    containerEl.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
    });
    
    if (containerEl.scrollLeft == 0) {
    
        scrollRightButton.style.display = "block";
    } else this.style.display = "block";
  
});

// Evento para o botão direito
scrollRightButton.addEventListener("click", function () {
    
    console.log("click");
    containerEl.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
    });

    if (containerEl.scrollLeft === scrollAmount) {
       this.style.display = "none";
       scrollLeftButton.style.display = "block";
     } else this.style.display = "block";
    
})

};

controlCarousel(subnavbarList, navbarTabBtn);

