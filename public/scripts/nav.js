/* eslint-disable prettier/prettier */
var navigation = document.querySelector(".bottom-nav");
var openMenu = document.querySelector(".open-menu");
var slider = document.querySelector(".slider-menu");
function widthChange() {
  if (document.body.offsetWidth <= 900) {
    navigation.style.display = "none";
    openMenu.style.display = "inline-block"; // Fix: set display property correctly
  } else {
    slider.style.transform = "translateX(-27rem)";
    navigation.style.display = "grid";
    openMenu.style.display = "none";
  }
}
window.addEventListener("load", widthChange);
window.addEventListener("resize", widthChange);
function oMenu() {
  slider.style.transform = "translateX(0rem)";
}
function cMenu() {
  slider.style.transform = "translateX(-27rem)";
}

