"use strict";

const sectionLayout = document.querySelector(".section--layout");
const tabContentsContainer = document.querySelector(".tab-contents--box");
const profileHeader = document.querySelector(".perfil-header");
const navbarTabsContainer = document.querySelector(".subnavbar--list");
const navbarTabBtns = document.querySelectorAll(".subnavbar--tab");
const tabContents = document.querySelectorAll(".tab-content");

navbarTabsContainer.addEventListener("click", function (e) {
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

  // let curActiveTabHeight = 0;
  // const baseHeight =
  //   profileHeader.offsetHeight + navbarTabsContainer.offsetHeight + 100;

  // tabContentsContainer.style.height = 0;

  // tabContents.forEach((tabContent) => {
  //   if (!tabContent.classList.contains("hidden")) {
  //     curActiveTabHeight = tabContent.offsetHeight;

  //     tabContentsContainer.style.height =
  //       baseHeight + curActiveTabHeight + "px";
  //   }
  // });

  // const profileHeaderRect = profileHeader.getBoundingClientRect();

  // if (
  //   profileHeaderRect.top >= 0 &&
  //   profileHeaderRect.bottom <= window.innerHeight
  // )
  //   return;

  window.scrollTo({ top: profileHeader.offsetHeight, behavior: "smooth" });
});

// tabContentsContainer.style.height = "1000px";
