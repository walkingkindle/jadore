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

// best seller

const multipleItemCarousel = document.querySelector("#carouselExampleControls");

if (window.matchMedia("(min-width:576px)").matches) {
  var carouselWidth = $(".best-seller--inner")[0].scrollWidth;
  var cardWidth = $(".best-seller--item").width();

  var scrollPosition = 0;

  $(".carousel-control-next").on("click", function () {
    if (scrollPosition < carouselWidth - cardWidth * 4) {
      //check if you can go any further
      scrollPosition += cardWidth; //update scroll position
      $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 800); //scroll left
    }
  });

  $(".carousel-control-prev").on("click", function () {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 800);
    }
  });
} else {
  $(multipleItemCarousel).addClass("slide");
}
