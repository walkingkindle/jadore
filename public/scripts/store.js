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
var brends = document.querySelector('.brends');
var aroma = document.querySelector('.aroma');
var quantity = document.querySelector('.quantity');
var priceRange = document.querySelector('.price-range--button');
var brendCategories = document.querySelector('.brend-categories');
var aromaCategories = document.querySelector('.aroma-categories');
var quantityCategories = document.querySelector('.quantity-categories');
var priceCategories = document.querySelector('.price-categories');
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

// category checkboxes
const gucciCheckbox = document.querySelector('#gucci-checkbox');
const gucciLink = document.querySelector('#gucci-link');

const diorCheckbox = document.querySelector('#dior-checkbox');
const diorLink = document.querySelector('#dior-link');

const channelCheckbox = document.querySelector('#channel-checkbox');
const channelLink = document.querySelector('#channel-link');

const lanvinCheckbox = document.querySelector('#lanvin-checkbox');
const lanvinLink = document.querySelector('#lanvin-link');

const calvinCheckbox = document.querySelector('#calvin-checkbox');
const calvinLink = document.querySelector('#calvin-link');

const armaniCheckbox = document.querySelector('#armani-checkbox');
const armaniLink = document.querySelector('#armani-link');

gucciCheckbox.addEventListener('change', () => {
  if (gucciCheckbox.checked) {
    gucciLink.click();
  }
});

diorCheckbox.addEventListener('change', () => {
  if (diorCheckbox.checked) {
    diorLink.click();
  }
});

channelCheckbox.addEventListener('change', () => {
  if (channelCheckbox.checked) {
    channelLink.click();
  }
});

lanvinCheckbox.addEventListener('change', () => {
  if (lanvinCheckbox.checked) {
    lanvinLink.click();
  }
});

calvinCheckbox.addEventListener('change', () => {
  if (calvinCheckbox.checked) {
    calvinLink.click();
  }
});

armaniCheckbox.addEventListener('change', () => {
  if (armaniCheckbox.checked) {
    armaniLink.click();
  }
});
