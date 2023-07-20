// const navigation = document.querySelector(".navigation");
// const navContent = document.querySelector(".nav-content");
// const menu = document.querySelector("#menu");

// function widthChange() {
//   if (navigation.offsetWidth <= 1140) {
//     navContent.style.display = "none";
//     menu.style.display = "inline-block";
//   } else {
//     navContent.style.display = "block";
//     menu.style.display = "none";
//   }
// }

// window.addEventListener("load", widthChange);
// window.addEventListener("resize", widthChange);

// const menuSlide = document.querySelector(".menu-slide");
// const menuDisapper = document.querySelector(".close-menu");
// function openMenu() {
//   // menuSlide.style.display = "flex";
//   menuSlide.style.transform = "translateX(0rem)";
// }
// function closeMenu() {
//   // menuSlide.style.display = "none";
//   menuSlide.style.transform = "translateX(25rem)";
// }

const opened = document.querySelector(".open-close");

var x = new Date();
var y = x.getHours();

if (y >= 8 && y < 20) {
  opened.innerHTML = "We're currently open!";
  // opened.style.fontSize = "1.8rem";
} else {
  opened.innerHTML = "We're closed!";
}
