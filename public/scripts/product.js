// can't purchase without qnt selected
let volChecked;
window.addEventListener('load', function () {
  volRadio.forEach((vol) => {
    vol.checked = false;
  });
});

const volRadio = document.querySelectorAll('.volume-radio');
volRadio.forEach((vol) => {
  vol.addEventListener('change', () => {
    if (vol.checked) {
      volChecked = true;
    } else {
      volChecked = false;
    }
  });
});

document.querySelector('.p-info--four--buy').onclick = () => {
  const buyButton = document.querySelector('.p-info--four--buy');

  if (!volChecked) {
    buyButton.disabled = true;
    showNotification('Quantity not selected!');
  } else {
    showNotification('Product added to cart!');
  }
};

if (volChecked) {
  document.querySelector('.p-info--four--buy').style.diplay = 'none';
  document.querySelector('.purchase-inquiry').style.dispaly = 'block';
}

function showNotification(message) {
  const cartNotification = document.querySelector('.cart-notification');
  cartNotification.textContent = message;
  cartNotification.style.opacity = '1';

  setTimeout(() => {
    cartNotification.style.opacity = '0';
  }, 2000);
}

// x //
let dbPrice = document.querySelector('.p-info--four--price');

let oneMl = document.querySelector('#one-ml');
let threeMl = document.querySelector('#three-ml');
let fiveMl = document.querySelector('#five-ml');
let tenMl = document.querySelector('#ten-ml');
let fifteenMl = document.querySelector('#fifteen-ml');
let twentyMl = document.querySelector('#twenty-ml');
let thirtyMl = document.querySelector('#thirty-ml');

let volOne = parseInt(document.querySelector('#one-ml').value);
let volThree = parseInt(document.querySelector('#three-ml').value);
let volFive = parseInt(document.querySelector('#five-ml').value);
let volTen = parseInt(document.querySelector('#ten-ml').value);
let volFifteen = parseInt(document.querySelector('#fifteen-ml').value);
let volTwenty = parseInt(document.querySelector('#twenty-ml').value);
let volThirty = parseInt(document.querySelector('#thirty-ml').value);

oneMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volOne;
    document.querySelector('.p-info--four--buy').disabled = false;
  }
});

threeMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.textContent = defaultPrice * volThree;
    document.querySelector('.p-info--four--buy').disabled = false;
  }
});

fiveMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volFive;
    document.querySelector('.p-info--four--buy').disabled = false;
  }
});

tenMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volTen;
    document.querySelector('.p-info--four--buy').disabled = false;
  }
});

fifteenMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volFifteen;
    document.querySelector('.p-info--four--buy').disabled = false;
  }
});

twentyMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volTwenty;
    document.querySelector('.p-info--four--buy').disabled = false;
  }
});

thirtyMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volThirty;
    document.querySelector('.p-info--four--buy').disabled = false;
  }
});
