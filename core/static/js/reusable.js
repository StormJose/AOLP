"use strict";

// Seleção de elementos constituintes do dropdown
const body = document.querySelector("body");
const sections = document.querySelectorAll("section");

const btnsDropdown = document.querySelectorAll(".btn-dropdown");
const dropdownWindows = document.querySelectorAll(".dropdown-windows");

// Navigation Dropdown
const menuList = document.querySelectorAll(".nav-items--list");
const menuOpen = document.querySelector(".menu-btn--open");
const menuClose = document.querySelector(".menu-btn--close");
// const dropdown = document.querySelector(".dropdown");
const box = document.querySelector(".box");
const navItems = document.querySelectorAll(".nav-link-box");
const subMenus = document.querySelectorAll(".nav-submenu-list");

const arrowsOpen = document.querySelectorAll(".arrow--open");
const arrowsClose = document.querySelectorAll(".arrow--close");

// Grid View Options
const gridViewOptions = document.querySelector(".caixa-de-opcoes");
const gridViewBtns = document.querySelectorAll(".opcao-de-visualizacao");

// Paineis do Dashboard
const dashPanelContentBox = document.querySelector(".dashboard--painel");
const achievementTitle = document.querySelector(".conquista-título");

// Conquistas e Badges

// Copyright
const copyright = document.querySelector(".copyright__year");

// Janela Modal e Overlay
const overlay = document.querySelector(".overlay");
const modalWindows = document.querySelectorAll(".modal-window");
const btnOpenModal = document.querySelectorAll(".btn--open-modal");
const btnCloseModal = document.querySelectorAll(".btn--close-modal");

// Variável de estado de controle de menu
let isOpen = false;
// Menu de navegação para desktop
const toggleMenu = function (isOpen) {
  if (isOpen) {
    menuList.forEach((menu) => menu.classList.remove("hidden"));
    menuOpen.classList.add("hidden");
    menuClose.classList.remove("hidden");
  } else {
    menuList.forEach((menu) => menu.classList.add("hidden"));
    menuOpen.classList.remove("hidden");
    menuClose.classList.add("hidden");
  }
};

// // Define a query alvo a ser utilizada nas funções subsequentes
const mediaQuery = window.matchMedia("(min-width: 1024px)");

// Gerencia o estado atual da navegação em mudanças de tela.
const handleMediaQueryChange = function (media) {
  // Em desktop, navegação sempre ativa.
  if (media.matches)
    menuList.forEach((menu) => menu.classList.remove("hidden"));
  else toggleMenu(isOpen);
};

// Checagem inicial de tamanho de viewport
handleMediaQueryChange(mediaQuery);

// Gerencia o menu mobile de navegação
const controlMobileMenu = function () {
  isOpen = !isOpen;

  dropdownWindows.forEach((window) =>
    window.classList.remove("modal-window--active")
  );
  if (mediaQuery.matches) {
    // Em desktop, a navegação fica sempre visível
    return;
  }

  toggleMenu(isOpen);

  body.style.overflow = isOpen ? "hidden" : "visible";
};

// Listeners de controle da navegação como um todo
mediaQuery.addEventListener("change", handleMediaQueryChange);
[menuOpen, menuClose].forEach((btn) =>
  btn.addEventListener("click", controlMobileMenu)
);

// Menus de dropdown (Notificações e Perfil)
// Para fins de boas práticas, é importante especificar se o elemento está expandido ou não.
const setAriaExpandedFalse = function () {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
};

// Responsável por fechar os menus
const closeDropdownMenu = function () {
  dropdownWindows.forEach((drop) => {
    drop.classList.remove("modal-window--active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
  btnsDropdown.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
};

btnsDropdown.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = btn.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    // Fechar todos os dropdowns
    dropdownWindows.forEach((window) => {
      if (window !== dropdownElement) {
        window.classList.remove("modal-window--active");
        const button = document.querySelector(`[data-dropdown="${window.id}"]`);
        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Alternar o dropdown clicado
    const isActive = dropdownElement.classList.toggle("modal-window--active");
    btn.setAttribute("aria-expanded", isActive ? "true" : "false");

    e.stopPropagation();
  });
});

// Fechar dropdowns ao clicar fora
document.addEventListener("click", () => {
  closeDropdownMenu();
  dropdownWindows.forEach((window) => {
    const btn = document.querySelector(`[data-dropdown="${window.id}"]`);
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
});

// Gerenciamento de submenus de navegação

// Garante que todos os submenus existentes estarão desativados por padrão
subMenus.forEach((menu) => menu.classList.remove("nav-submenu-list--active"));

// Funcionalidade de submenus de navegação
// const manageSubMenu = function (e) {
//   // Seleciona o link atual
//   const clicked = e.target.closest(".nav-link-box");

//   console.log(clicked);

//   if (!clicked) return;

//   // Permite apenas um sub-menu aberto por vez.
//   let curMenu = document.querySelector(
//     `.nav-submenu-list--${clicked.dataset.id}`
//   );

//   if (!curMenu) return curMenu.classList.add("hidden");

//   const isActive = curMenu.classList.contains("nav-submenu-list--active");

//   subMenus.forEach((menu) => menu.classList.remove("nav-submenu-list--active"));
//   arrowsClose.forEach((arrow) => arrow.classList.add(`arrow--hidden`));
//   arrowsOpen.forEach((arrow) => arrow.classList.remove(`arrow--hidden`));

//   if (isActive && curMenu.dataset.id !== clicked.dataset.id) {
//     if (curMenu.dataset.id) {
//       document
//         .querySelector(`.arrow--open--${curMenu.dataset.id}`)
//         .classList.remove("arrow--hidden");
//       document
//         .querySelector(`.arrow--close--${curMenu.dataset.id}`)
//         .classList.add("arrow--hidden");
//     }
//   } else {
//     // Ativar
//     curMenu.classList.add("nav-submenu-list--active");

//     // Ativar / Desativar setas indicativas
//     document
//       .querySelector(`.arrow--open--${clicked.dataset.id}`)
//       .classList.add("arrow--hidden");
//     document
//       .querySelector(`.arrow--close--${clicked.dataset.id}`)
//       .classList.remove("arrow--hidden");
//   }
// };

// Eventos de clique
// Abrir submenus de navegação
// menuList.forEach((menu) =>
//   menu.addEventListener("click", (e) => manageSubMenu(e))
// );

// Listeners para controle de Pop-ups
btnOpenModal.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    closeDropdownMenu();

    const clicked = e.currentTarget;
    console.log(clicked.dataset.modal);
    document
      .getElementById(`${clicked.dataset.modal}`)
      .classList.add("modal-window--active");
  });
});

btnCloseModal.forEach(function (btn) {
  btn.addEventListener("click", () => {
    modalWindows.forEach((modal) =>
      modal.classList.remove("modal-window--active")
    );
  });
});

// Redirecionar links
document.addEventListener("click", function (e) {
  const clickedLink = e.target.closest("[data-url]");
  const clickedEl = e.target?.closest("[data-modal]");

  if (clickedLink && !clickedEl) {
    window.location.replace(clickedLink.dataset.url);
  }
});

// Recursos de animação

// const btnShowModal = document.querySelector(".-modal");
// const btnHideModal = document.querySelector(".test__hide-modal");
// const modalBadgeProgress = document.querySelector(".modal-badge-progress");

// btnShowModal.addEventListener("click", function () {
//   modalBadgeProgress.classList.add(".show-modal");
// });

// btnHideModal.addEventListener("click", function () {
//   modalBadgeProgress.classList.remove(".show-modal");
// });
