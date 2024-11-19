"use strict";

const modalForm = document.querySelector(".modal--form");
const form = document.getElementById("form--new-course");
const btnCreateCourse = document.querySelector(".btn--create-course");
const btnCloseForm = document.querySelector(".modal--form span");

const overlay = document.querySelector(".overlay");

let isFormOpen = false;

const toggleForm = function (e) {
  e.preventDefault();

  if (isFormOpen) {
    document.querySelector(".overlay").classList.add("hidden");
    modalForm.classList.remove("modal--form--active");
  } else {
    document.querySelector(".overlay").classList.remove("hidden");
    modalForm.classList.add("modal--form--active");
    console.log("toggle");
  }

  isFormOpen = !isFormOpen;
};

overlay.addEventListener("click", toggleForm);
btnCreateCourse.addEventListener("click", toggleForm);
btnCloseForm.addEventListener("click", toggleForm);
