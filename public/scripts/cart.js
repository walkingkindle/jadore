/* eslint-disable prettier/prettier */
const incrementProductButtons = document.querySelectorAll('.increment-product');
const decrementProductButtons = document.querySelectorAll('.decrement-product');
const productQuantities = document.querySelectorAll('.product-qnt');
const productPrice = document.querySelectorAll('.product-price');

incrementProductButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // scale quantity
    const currentQuantity = parseInt(productQuantities[index].textContent, 10);
    productQuantities[index].textContent = currentQuantity + 1;
    // scale price
    const currentPrice = parseInt(productPrice[index].textContent, 10);
    productPrice[index].textContent = currentPrice + 100 + '$';
  });
});

decrementProductButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const currentQuantity = parseInt(productQuantities[index].textContent, 10);
    const currentPrice = parseInt(productPrice[index].textContent, 10);
    if (currentQuantity > 1) {
      productQuantities[index].textContent = currentQuantity - 1;
      productPrice[index].textContent = currentPrice - 100 + '$';
    }
  });
});
