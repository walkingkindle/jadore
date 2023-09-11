const sliderRange = document.querySelector('.range-slider');
const sliderValue = document.querySelector('.range-value');
sliderRange.addEventListener('input', function () {
  sliderValue.textContent = sliderRange.value;
});
var testBox = document.querySelector('.test-box');
var testProducts = document.querySelectorAll('.test-products');
testBox.addEventListener('change', function () {
  testProducts.forEach(function (el) {
    if (el.style.display == 'none') {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
});
// categories
document.addEventListener('DOMContentLoaded', function () {
  var brends = document.querySelector('.brends');
  var aroma = document.querySelector('.aroma');
  var quantity = document.querySelector('.quantity');
  var priceRange = document.querySelector('.price-range--button');
  var brendCategories = document.querySelector('.brend-categories');
  var aromaCategories = document.querySelector('.aroma-categories');
  var quantityCategories = document.querySelector('.quantity-categories');
  var priceCategories = document.querySelector('.price-categories');
  const filterCategories = document.querySelector('.filter-categories');

  brends.addEventListener('click', categoryChange(brendCategories));
  aroma.addEventListener('click', categoryChange(aromaCategories));
  quantity.addEventListener('click', categoryChange(quantityCategories));
  priceRange.addEventListener('click', categoryChange(priceCategories));

  function categoryChange(formOff) {
    var computedStyle = window.getComputedStyle(formOff);
    var originalDisplay = computedStyle.getPropertyValue('display');
    var isHidden = false;
    return function () {
      if (!isHidden) {
        formOff.style.display = 'none';
        isHidden = true;
      } else {
        formOff.style.display = originalDisplay; // Set back to the original value
        isHidden = false;
      }
    };
  }
});

const unfilterBtn = document.querySelector('.unfilter-all');
unfilterBtn.style.maxWidth = '32rem';
unfilterBtn.style.marginTop = '0';
unfilterBtn.style.marginBottom = '1rem';

unfilterBtn.addEventListener('click', () => {
  const checkBoxes = document.querySelectorAll('.uncheck');
  checkBoxes.forEach((box) => {
    if (box.checked) {
      box.checked = false;
    }
  });
});

// responsive fitler toggle button
const toggleFilterOn = document.querySelector('.filter-toggle--open');
toggleFilterOn.addEventListener('click', () => {
  document.querySelector('.store-options').style.display = 'block';
});
const toggleFilterOff = document.querySelector('.filter-toggle--close');
toggleFilterOff.addEventListener('click', () => {
  document.querySelector('.store-options').style.display = 'none';
});

// pagination logic

const getPagePerProductNum = Math.ceil(getProductLength / 10);

const paginationContainer = document.querySelector('.pagination');

for (let i = 1; i <= getPagePerProductNum; i++) {
  var a = document.createElement('a');
  a.href = '/newpage';
  var textNode = document.createTextNode(i);
  a.appendChild(textNode);
  paginationContainer.appendChild(a);
}
