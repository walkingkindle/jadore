/* eslint-disable prettier/prettier */
const sliderRange = document.querySelector('.range-slider') as HTMLInputElement;
const sliderValue = document.querySelector('.range-value') as HTMLSpanElement;

sliderRange.addEventListener('input', function () {
  sliderValue.textContent = sliderRange.value;
});

const testBox = document.querySelector('.test-box') as HTMLInputElement;

const testProducts = document.querySelectorAll(
  '.test-products',
) as NodeListOf<HTMLDivElement>;

testBox.addEventListener('change', () => {
  testProducts.forEach((el) => {
    if (el.style.display == 'none') {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
});

// categories
const brends = document.querySelector('.brends') as HTMLDivElement;
const aroma = document.querySelector('.aroma') as HTMLDivElement;
const quantity = document.querySelector('.quantity') as HTMLDivElement;
const priceRange = document.querySelector('.price-range') as HTMLDivElement;

const brendCategories = document.querySelector(
  '.brend-categories',
) as HTMLFormElement;
const aromaCategories = document.querySelector(
  '.aroma-categories',
) as HTMLFormElement;
const quantityCategories = document.querySelector(
  '.quantity-categories',
) as HTMLFormElement;
const priceCategories = document.querySelector(
  '.price-categories',
) as HTMLFormElement;

brends.addEventListener('click', categoryChange(brendCategories));
aroma.addEventListener('click', categoryChange(aromaCategories));
quantity.addEventListener('click', categoryChange(quantityCategories));
priceRange.addEventListener('click', categoryChange(priceCategories));

function categoryChange(formOff: HTMLElement) {
  const computedStyle = window.getComputedStyle(formOff);
  const originalDisplay = computedStyle.getPropertyValue('display');
  let isHidden = false;

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
