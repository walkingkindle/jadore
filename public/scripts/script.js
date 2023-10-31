// best seller

function setAccessToken(token) {
  document.cookie = `access_token=${token}; expires=${new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toUTCString()}; secure; HttpOnly`;
  // decode user ID from JWT
  localStorage.setItem('user-token', token);
  const key = localStorage.key('user-token');
  const jwt = localStorage.getItem(key);
  // Split the JWT into its parts
  const parts = jwt.split('.');

  // Decode the payload (the second part)
  const payload = JSON.parse(atob(parts[1]));

  // Access the user ID
  const userId = payload.sub; // "sub" is the standard claim for the subject (user ID)

  console.log('User ID:', userId);
  // END OF DECODE
}

const multipleItemCarousel = document.querySelector('#carouselExampleControls');

if (window.matchMedia('(min-width:576px)').matches) {
  var carouselWidth = $('.best-seller--inner')[0].scrollWidth;
  var cardWidth = $('.best-seller--item').width();

  var scrollPosition = 0;

  $('.carousel-control-next').on('click', function () {
    if (scrollPosition < carouselWidth - cardWidth * 4) {
      //check if you can go any further
      scrollPosition += cardWidth; //update scroll position
      $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 800); //scroll left
    }
  });

  $('.carousel-control-prev').on('click', function () {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 800);
    }
  });
} else {
  $(multipleItemCarousel).addClass('slide');
}

// test
document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('main[data-token]');
  if (mainElement) {
    const token = mainElement.getAttribute('data-token');

    if (token) {
      setAccessToken(token); //ovde se cuva jwt token da bi samo korisnik koji ima jwt token u svojim kolačićima mogao da pristupi funkcijama kao sto su logut,  shopping cart itd
      const signInElement = document.querySelector('.sign-in');
      const signUpElement = document.querySelector('.sign-up');
      const signOutElement = document.querySelector('.sign-out');
      const profileElement = document.querySelector('.profile-el');
      if (signInElement) {
        signInElement.style.display = 'none';
        signUpElement.style.display = 'none';
        signOutElement.style.display = 'block';
        profileElement.style.display = 'block';
      }
    }
  }
});
