document.addEventListener("DOMContentLoaded", function () {
  const subNavContainer = document.querySelector(".subnavigation-container");
  const tabButtons = document.querySelectorAll(".tab-btn");

  subNavContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".tab-btn");

    if (!clicked) return;

    console.log(clicked);

    tabButtons.forEach((btn) => btn.classList.remove("tab-btn-active"));

    clicked.classList.add("tab-btn-active");
  });
});
