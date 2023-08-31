/* eslint-disable prettier/prettier */
var navigation = document.querySelector('.bottom-nav');
var openMenu = document.querySelector('.open-menu');
var slider = document.querySelector('.slider-menu');
function widthChange() {
  if (document.body.offsetWidth <= 900) {
    navigation.style.display = 'none';
    openMenu.style.display = 'inline-block'; // Fix: set display property correctly
  } else {
    slider.style.transform = 'translateX(-27rem)';
    navigation.style.display = 'grid';
    openMenu.style.display = 'none';
  }
}
window.addEventListener('load', widthChange);
window.addEventListener('resize', widthChange);
function oMenu() {
  slider.style.transform = 'translateX(0rem)';
}
function cMenu() {
  slider.style.transform = 'translateX(-27rem)';
}

// priview-product
const searchBar = document.querySelector('.search-bar');
const previewContainer = document.querySelector('.preview-container');

searchBar.addEventListener('input', findProduct);

async function findProduct() {
  const searchText = searchBar.value.toLowerCase();

  if (searchText.length === 0) {
    previewContainer.style.display = 'none';
    return;
  }

  try {
    const matchingItems = await getMatchingItemsFromDatabase(searchText);

    if (matchingItems.length === 0) {
      previewContainer.style.display = 'none';
      return;
    } else {
      previewContainer.style.display = 'block';
    }

    previewContainer.innerHTML = '';
    let productCount = 0;

    matchingItems.forEach((item) => {
      // Check if the item's name contains the search text
      if (
        item.attributes.Name.toLowerCase().includes(searchText) &&
        productCount < 5
      ) {
        // Create the anchor element
        const anchor = document.createElement('a');
        anchor.href = `/store/product/${item.id}`; // Replace with your actual link structure
        anchor.classList.add('preview-anchor');
        // Create and append the image element to the anchor
        const previewImage = document.createElement('img');
        previewImage.classList.add('preview-image');
        previewImage.src = item.attributes.Image;
        anchor.appendChild(previewImage);

        // Create and append the name element to the anchor
        const previewName = document.createElement('p');
        previewName.classList.add('preview-name');
        previewName.textContent = item.attributes.Name;
        anchor.appendChild(previewName);

        // Append the anchor to the preview container
        previewContainer.appendChild(anchor);

        productCount++; // Increment the counter
      }
    });
    // productCount = 0;
    console.log(productCount);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const apiUrl = 'http://127.0.0.1:1337/api/perfumes'; // Replace with your Strapi API URL

async function getMatchingItemsFromDatabase(searchText) {
  try {
    const response = await fetch(`${apiUrl}?_q=${searchText}`);
    const data = await response.json();
    console.log(data);
    return data.data; // Strapi typically returns the matched items directly in the response
  } catch (error) {
    throw error;
  }
}
