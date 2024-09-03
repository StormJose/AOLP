'use strict'

////////////////////////////////////////////////////////////////
// Estas são funcionalidades compartilhadas por várias páginas
////////////////////////////////////////////////////////////////


// Seleção de elementos constituintes do dropdown
const body = document.querySelector('body');
const sections = document.querySelectorAll("section");
const header = document.querySelector(".header");

// Navigation Dropdown
const menuList = document.querySelectorAll(".nav-items--list");
const menuOpen = document.querySelector(".menu-btn--open");
const menuClose = document.querySelector(".menu-btn--close");
const dropdown = document.querySelector(".dropdown");
const box = document.querySelector(".box");
const navItems = document.querySelectorAll(".nav-link-box");
const subMenus = document.querySelectorAll(".nav-submenu-list");

// User Dropdown
const userDropdown = document.getElementById('user-dropdown');
// const btnUserDropdownOpen = document.getElementById('use-dropdown-btn--open')
const btnUserDropdownOpen = document.querySelectorAll(
  ".use-dropdown-btn--open"
);

const btnUserMenu = document.getElementById("use-dropdown-btn--open")

const arrowsOpen = document.querySelectorAll(".arrow--open");
const arrowsClose = document.querySelectorAll(".arrow--close");



// Grid View Options
const gridViewOptions = document.querySelector('.caixa-de-opcoes')
const gridViewBtns = document.querySelectorAll('.opcao-de-visualizacao')



// Janela Modal e Overlay
const overlay = document.querySelector(`.overlay`);
const modalWindow = document.querySelector(".modal--conquistas");
const btnOpenModal = document.querySelector(".modal--btn-open");
const btnCloseModal = document.querySelector(".modal--btn-close");



// Paineis do Dashboard 
const dashPanelContentBox = document.querySelector('.dashboard--painel')
const achievementTitle = document.querySelector('.conquista-título')

// Copyright
const copyright = document.querySelector('.copyright__year')


// const gridView = document.querySelector(".modal-lista--conquistas");
// const gridItems = document.querySelectorAll(".item-conquista");

// gridList.style.gridTemplateColumns = 'repeat(3, 1fr)';

// gridViewOptions.addEventListener("click", (e) => {
//   const clicked = e.target;

//   gridViewBtns.forEach((btn) =>
//     btn.classList.remove("opcao-de-visualizacao--active")
//   );

//   // return gridView.style.gridTemplateColumns = 'auto'
//   if (clicked.classList.contains("opcao-lista")) {
//     clicked.classList.add("opcao-de-visualizacao--active");
//     gridView.style.gridTemplateColumns = "auto";
//   }

//   if (clicked.classList.contains("opcao-colunas")) {
  //     clicked.classList.add("opcao-de-visualizacao--active");
  //     gridView.style.gridTemplateColumns = "repeat(2,  1fr)";
  //   }
  // });

  


// Variável de estado de controle de menu
let isOpen = false; 
// Define a query alvo a ser utilizada nas funções subsequentes
const mediaQuery = window.matchMedia('(min-width: 1024px)');


// Controle do menu de navegação
const toggleMenu = function(isOpen) {
  if (isOpen) {
    menuList.forEach(menu => menu.classList.remove('hidden'));
    menuOpen.classList.add('hidden');
    menuClose.classList.remove('hidden');
    overlay.classList.remove('hidden')
    
  } else {
    menuList.forEach(menu => menu.classList.add('hidden'));
    menuOpen.classList.remove('hidden');
    menuClose.classList.add('hidden');
    overlay.classList.add('hidden')

  }
}


// Muda o estado atual da navegação em mudanças de tela.
const handleMediaQueryChange = function(media) {
  // Em desktop, navegação sempre ativa.
  if (media.matches) menuList.forEach(menu => menu.classList.remove('hidden'));
  else toggleMenu(isOpen)
  
};

// Checagem inicial de tamanho de viewport
handleMediaQueryChange(mediaQuery);


// Gerencia o menu mobile de navegação
const controlMobileMenu = function () {
  isOpen = !isOpen;

  if (mediaQuery.matches) {
    // Em desktop, a navegação fica sempre visível
    return;
  }

  toggleMenu(isOpen)

  body.style.overflow = isOpen ? "hidden" : "visible";
};


// Listeners de controle da navegação como um todo
mediaQuery.addEventListener("change", handleMediaQueryChange); 
[overlay, menuOpen, menuClose].forEach(btn => btn.addEventListener("click", controlMobileMenu));



// Garante que todos os submenus existentes estarão desativados por padrão
subMenus.forEach((menu) => menu.classList.remove("nav-submenu-list--active"));

const manageSubMenu = function(e) {
    // Seleciona o link atual
    const clicked = e.target.closest(".nav-link-box");

    console.log( clicked)

    if (!clicked) return;

    // Permite apenas um sub-menu aberto por vez.
    let curMenu = document.querySelector(
      `.nav-submenu-list--${clicked.dataset.id}`
    );

    if (!curMenu) return curMenu.classList.add("hidden");

    const isActive = curMenu.classList.contains("nav-submenu-list--active");
    console.log(curMenu);

    subMenus.forEach((menu) =>
      menu.classList.remove("nav-submenu-list--active")
    );
    arrowsClose.forEach((arrow) => arrow.classList.add(`arrow--hidden`));
    arrowsOpen.forEach((arrow) => arrow.classList.remove(`arrow--hidden`));

    if (isActive && curMenu.dataset.id !== clicked.dataset.id) {

      if (curMenu.dataset.id) {
        document
          .querySelector(`.arrow--open--${curMenu.dataset.id}`)
          .classList.remove("arrow--hidden");
        document
          .querySelector(`.arrow--close--${curMenu.dataset.id}`)
          .classList.add("arrow--hidden");
      
      }
    } else {
      // Ativar
      curMenu.classList.add("nav-submenu-list--active");

      // Ativar / Desativar setas indicativas
      document
        .querySelector(`.arrow--open--${clicked.dataset.id}`)
        .classList.add("arrow--hidden");
      document
        .querySelector(`.arrow--close--${clicked.dataset.id}`)
        .classList.remove("arrow--hidden");
    }

  }


// Eventos de clique

// Abrir submenus de navegação
menuList.forEach((menu) => menu.addEventListener('click' , (e) => manageSubMenu(e) ))


// Janela Modal
/* btnOpenModal.addEventListener("click", function() {
  [modalWindow, overlay].forEach((item) => item.classList.remove("hidden"))
});
 */
/* 
[btnCloseModal, overlay].forEach(function(item) {
  item.addEventListener('click', () => {

    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  })
}) */

// Copyright
// copyright.textContent = `Academy One ${new Date().getFullYear()} `




