// can't purchase without qnt selected
volChecked = false;
const volRadio = document.querySelectorAll('.volume-radio');
volRadio.forEach((vol) => {
  vol.addEventListener('change', () => {
    if (vol.checked) {
      volChecked = true;
    }
  });
});
document.querySelector('.p-info--four--buy').onclick = () => {
  if (!volChecked) {
    document.querySelector('.p-info--four--buy').disabled = true;
    return false;
  }
};

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
  }
});

threeMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.textContent = defaultPrice * volThree;
  }
});

fiveMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volFive;
  }
});

tenMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volTen;
  }
});

fifteenMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volFifteen;
  }
});

twentyMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volTwenty;
  }
});

thirtyMl.addEventListener('change', function () {
  if (this.checked) {
    dbPrice.innerHTML = defaultPrice * volThirty;
  }
});
