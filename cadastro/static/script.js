'use strict'



const body = document.querySelector('body');
const header = document.querySelector('.header');
const menuList = document.querySelector('.nav-items--list')
const menuOpen = document.querySelector('.menu-btn--open')
const menuClose = document.querySelector('.menu-btn--close')
const dropdown = document.querySelector('.dropdown')
const box = document.querySelector('.box')
const navItems = document.querySelectorAll('.nav-link-box')
const subMenus = document.querySelectorAll('.nav-submenu-list')

const arrowsOpen = document.querySelectorAll('.arrow--open');
const arrowsClose = document.querySelectorAll('.arrow--close');

// Open Mobile Nav
const controlMenu = function() {

    if (dropdown.classList.contains('hidden'))  body.style.overflow = 'hidden';
    else  body.style.overflow = 'visible';

    box.classList.toggle('active')
    dropdown.classList.toggle('hidden');
    
}


menuOpen.addEventListener('click', controlMenu);
menuClose.addEventListener('click', controlMenu);


// Open Mobile Nav Sub-Menu
subMenus.forEach((menu) => menu.classList.remove('nav-submenu-list--active'))
menuList.addEventListener('click', function(e) {
    const clicked = e.target.closest('.nav-link-box')
    
    if (!clicked) return
    
    let curMenu = document.querySelector(`.nav-submenu-list--${clicked.dataset.id}`)
    const isActive = curMenu.classList.contains('nav-submenu-list--active')
    console.log(curMenu)
    
    
    // Manage hidden classes
    subMenus.forEach((menu) => menu.classList.remove('nav-submenu-list--active'))
    arrowsClose.forEach((arrow) => arrow.classList.add(`arrow--hidden`))
    arrowsOpen.forEach((arrow) => arrow.classList.remove(`arrow--hidden`))
    
    // Already active link
    if (isActive && curMenu.dataset.id !== clicked.dataset.id) {
        if (curMenu.dataset.id)  {
           document.querySelector(`.arrow--open--${curMenu.dataset.id}`).classList.remove('arrow--hidden');
           document.querySelector(`.arrow--close--${curMenu.dataset.id}`).classList.add('arrow--hidden');
        }
        
    }  else {
        
        // Activate content area
        curMenu.classList.add('nav-submenu-list--active');

        // Activate / Deactivate arrows
        document.querySelector(`.arrow--open--${clicked.dataset.id}`).classList.add('arrow--hidden');
        document.querySelector(`.arrow--close--${clicked.dataset.id}`).classList.remove('arrow--hidden');  
    }
})

