const navigation = document.querySelector(".bottom-nav");
const openMenu = document.querySelector(".open-menu");
const slider = document.querySelector(".slider-menu");

function widthChange() {
  if (document.body.offsetWidth <= 900) {
    navigation.style.display = "none";
    openMenu.style.display = "inline-block";
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

// const opened = document.querySelector(".open-close");

// var x = new Date();
// var y = x.getHours();

// if (y >= 8 && y < 20) {
//   opened.innerHTML = "We're currently open!";
// } else {
//   opened.innerHTML = "We're closed!";
// }
