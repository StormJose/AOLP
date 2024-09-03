'use strict'


// Seleção de elementos constituintes do dropdown
const body = document.querySelector('body');
const sections = document.querySelectorAll("section");
const header = document.querySelector(".header");

// Navigation Dropdown
const menuList = document.querySelector(".nav-items--list");
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
const achievementDescription = document.querySelector('.conquista-descricao')

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
  
// Variáveis de controle de estado dos menus 
let isOpen = false; 
let isUserDropdownOpen = false;
const desktopScreenWidth = window.screenWidth >= 1024

// Ativar a navegação para desktops

const handleMediaQueryChange = function(media) {
  if (media.matches) dropdown.classList.remove('hidden')
  else dropdown.classList.add('hidden')
}

const mediaQuery = window.matchMedia(`(min-width: 1024px)`)

handleMediaQueryChange(mediaQuery)

window.addEventListener("resize", () => handleMediaQueryChange(mediaQuery));



const controlMenu = function () {
  isOpen = !isOpen; 
  
  
  // Fechar todos os menus
  [userDropdown, dropdown, overlay].forEach((item) => item.classList.add('hidden'));


  if (isOpen) {
    
    menuOpen.classList.toggle('hidden')
    menuClose.classList.toggle('hidden')
    dropdown.classList.remove('hidden');
    
  } else {
    
    menuClose.classList.toggle('hidden')
    menuOpen.classList.toggle('hidden')
    dropdown.classList.add('hidden');
  }
  
  body.style.overflow = isOpen ? "hidden" : "visible";
};

// Elementos que, ao serem clicados, ativam / desativam o menu de navegação
[menuOpen, menuClose, overlay].forEach(btn => btn.addEventListener("click", controlMenu));




const controlUserDropdown = function () {
  isUserDropdownOpen = !isUserDropdownOpen; // Toggle isUserDropdownOpen state
  
  if (!desktopScreenWidth) overlay.classList.add('hidden');
  
  if (isUserDropdownOpen) userDropdown.classList.remove('hidden') 
  else userDropdown.classList.add('hidden');
  
};


// Event Listeners para ativação / desativação do menu rápido do usuário (qunado logado).



btnUserDropdownOpen.forEach((btn) => btn.addEventListener('click', controlUserDropdown))

btnUserDropdownOpen.forEach((btn) => btn.addEventListener('mouseover', () => {
    isUserDropdownOpen = false
    controlUserDropdown()
  }
))


userDropdown.addEventListener('mouseleave' , controlUserDropdown)



// Gerenciamento de submenus de navegação
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

  // Controlar os submenus de navegação
subMenus.forEach((menu) => menu.classList.remove("nav-submenu-list--active"));

// Eventos de clique
menuList.addEventListener("click",  (e) => manageSubMenu(e));

// Eventos de hover (desktops)
// menuList.addEventListener("mouseover",  (e) => manageSubMenu(e));

subMenus.forEach((menu) => menu.addEventListener("mouseout",  (e) => manageSubMenu(e)));



// Janela Modal

/* btnOpenModal.addEventListener("click", function() {
  [modalWindow, overlay].forEach((item) => item.classList.remove("hidden"))
});
 */

[btnCloseModal, overlay].forEach(function(item) {
  item.addEventListener('click', () => {

    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  })
})



// Copyright

copyright.textContent = `Academy One ${new Date().getFullYear()} `


// Limitar caractéres de texto



const achievement = {
  name: 'Título',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, earum hic. Necessitatibus aut eveniet itaque, vero vitae accusantium repellendus commodi fugit modi exercitationem tenetur similique fugiat, aliquam natus ducimus saepe!',
  dateUnlocked: 'not unlocked yet',

}

console.log(achievementDescription.textContent.length)

const limitCharLength = function(text, maxChars) {

  const numChars = text.textContent.length

  if (numChars > maxChars) {
    const newText = text.textContent.slice(0, maxChars) + '...'

    text.textContent = newText
  }

}

limitCharLength(achievementDescription, 45)


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

  skillPer.style.width = percentage + "%";

  
  const labelGoal = skillPer.previousElementSibling


  labelGoal.textContent = `${monthlyMissions[i].goal}xp`
  
  // if  skillPer.style.opacity = 0;
  
  let animatedValue = 0; 
  let startTime = null;
  
  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const stepPercentage = progress / 1000; // Dividing by duration in milliseconds (1000ms = 1s)
    
    if (stepPercentage < 1) {
      animatedValue = xp * stepPercentage;
      skillPer.setAttribute("xp", Math.floor(animatedValue) + "xp");
      requestAnimationFrame(animate);
    } else {
      animatedValue = xp;
      skillPer.setAttribute("xp", Math.floor(animatedValue) + "xp");
    }
  }
  
  requestAnimationFrame(animate);
});


