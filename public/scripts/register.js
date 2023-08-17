/* eslint-disable prettier/prettier */
const curtain = document.querySelector('.register-curtain');
const registerBox = document.querySelector('.sign-modal');
const signUp = document.querySelector('.sign-up');
const signIn = document.querySelector('.sign-in');
const signUpModal = document.getElementById('register');
const signInModal = document.getElementById('log-in');
const bodyElement = document.querySelector('body');
// sign-up
signUp.onclick = () => {
  curtain.style.transform = "translateX(0%)";
  signUpModal.style.display = "flex";
  signInModal.style.display = "none";
 bodyElement.style.overflow = "hidden";
}

// sing-in 
signIn.onclick = () => {
  curtain.style.transform = "translateX(0%)";
  signInModal.style.display = "flex";
  signUpModal.style.display = "none";
  bodyElement.style.overflow = "hidden";
}

// curtain behavior
curtain.addEventListener("click", (event) => {
  if (!signUpModal.contains(event.target) && !signInModal.contains(event.target) && !resetModal.contains(event.target)) {
    curtain.style.transform = "translateX(100%)";
    bodyElement.style.overflow = "scroll";

    setTimeout(() => {
      resetModal.style.display = "none";
    }, 1000)
  }
})


// log-in--message
const logInMessage = document.querySelector('.log-in--container');
setTimeout(() => {
  logInMessage.style.transform = "translateY(-1000%)";
}, 2000);

// reset-password
const forgotPass = document.querySelector('.pass-reset');
const resetModal = document.querySelector('#reset-password');
const returnLogIn = document.querySelector('.return-login');

forgotPass.onclick = () => {
  resetModal.style.display = "flex";
  signInModal.style.display = "none";
}
returnLogIn.onclick = () => {
  signInModal.style.display = "flex";
  resetModal.style.display = "none";
}
