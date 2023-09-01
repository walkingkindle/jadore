/* eslint-disable prettier/prettier */
// const apiUrl = 'http://127.0.0.1:1337/api/perfumes';

document.addEventListener('DOMContentLoaded', async () => {
  const mainResult = document.querySelector('.result-main');

  const matchingItems = await getMatchingItemsFromDatabase(inputValue);

  matchingItems.forEach((item) => {
    // Create the product container
    const productContainer = document.createElement('div');
    productContainer.classList.add('store-product');

    // Create the anchor element for the product link
    const anchor = document.createElement('a');
    anchor.href = `/store/product/${item.id}`;
    productContainer.appendChild(anchor);

    // Create the product image element
    const productImage = document.createElement('img');
    productImage.src = item.attributes.Image;
    productImage.alt = item.attributes.Name;
    anchor.appendChild(productImage);

    // Create a div for product details
    const productDetails = document.createElement('div');
    productContainer.appendChild(productDetails);

    // Create the anchor element for the product name
    const productNameAnchor = document.createElement('a');
    productNameAnchor.href = `/store/product/${item.id}`;
    productDetails.appendChild(productNameAnchor);

    // Create the product name element
    const productName = document.createElement('p');
    productName.textContent = item.attributes.Name;
    productNameAnchor.appendChild(productName);

    // Create the quantity select element
    const quantitySelect = document.createElement('select');
    quantitySelect.name = 'quantity';
    const quantityOption = document.createElement('option');
    quantityOption.value = '1';
    quantityOption.textContent = item.attributes.Price;
    quantitySelect.appendChild(quantityOption);
    productDetails.appendChild(quantitySelect);

    // Create the order button
    const orderButton = document.createElement('a');
    orderButton.href = '#';
    orderButton.classList.add('product-order');
    orderButton.textContent = 'Order';
    productDetails.appendChild(orderButton);

    // Append the product container to your desired container (e.g., previewContainer)
    mainResult.appendChild(productContainer);
  });

  async function getMatchingItemsFromDatabase(inputValue) {
    try {
      const response = await fetch(`${apiUrl}?_q=${inputValue}`);
      const data = await response.json();
      console.log(data);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
});
