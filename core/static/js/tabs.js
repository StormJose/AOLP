"use strict";



const sectionLayout = document.querySelector(".section--layout");
const tabContentsContainer = document.querySelector(".tab-contents--box");
const dropdown = document.querySelector(".dropdown");
const profileHeader = document.querySelector(".perfil-header");
const mainLayout = document.querySelector(".main--layout");

// subnavbar
const subnavbarContainer = document.querySelector(".subnavbar-container");
const subnavbarList = document.querySelector(".subnavbar--list");
const navbarTabBtn = document.querySelector(".subnavbar--tab");
const navbarTabBtns = document.querySelectorAll(".subnavbar--tab");
const tabContents = document.querySelectorAll(".tab-content");

subnavbarList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".subnavbar--tab");
  console.log(clicked);

  if (!clicked) return;

  navbarTabBtns.forEach((btn) =>
    btn.classList.remove("subnavbar--tab--active")
  );

  clicked.classList.add("subnavbar--tab--active");

  // Garantindo que o conteudo dentro de section--layout não ultrapasse seus limites e sobreponha seções adjascentes.
  tabContents.forEach((tab) => tab.classList.add("hidden"));
  document
    .querySelector(`.tab-content--${clicked.dataset.tab}`)
    ?.classList.remove("hidden");

  window.scrollTo({ top: profileHeader.offsetHeight, behavior: "smooth" });
});

const observerOptions = {
  // root: Quando definido um elemento específico, a visibilidade do elemento alvo é checada em relação à este elemento
  // quando definido para 'null', ele checa em relação a viewport :)
  root: null,
  threshold: 0.5,
  rootMargin: `${-dropdown.offsetHeight}px 0px 0px 0px`,
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    console.log(entry);
    if (!entry.isIntersecting) subnavbarList.classList.add("subnavbar--fixed");
    else subnavbarList.classList.remove("subnavbar--fixed");
  });
}, observerOptions);

observer.observe(subnavbarContainer);

const media = window.matchMedia("(min-width: 1024px)");

// Muda o estado atual da navegação em mudanças de tela.
const handleMediaChange = function (media) {
  // Em desktop, navegação sempre ativa.
  if (media.matches) subnavbarList.classList.remove(".subnavbar--fixed");
  else observer.observe(subnavbarContainer);
};

handleMediaChange(media);
window.addEventListener("resize", () => handleMediaChange(media));
