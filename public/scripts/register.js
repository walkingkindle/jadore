/* eslint-disable prettier/prettier */
const curtain = document.querySelector('.register-curtain');
const registerBox = document.querySelector('.sign-modal');
const signUp = document.querySelector('.sign-up');
const signIn = document.querySelector('.sign-in');
const signUpModal = document.getElementById('register');
const signInModal = document.getElementById('log-in');
// sign-up
signUp.onclick = () => {
  curtain.style.transform = "translateX(0%)";
  signUpModal.style.display = "flex";
  signInModal.style.display = "none";
}

// sing-in 
signIn.onclick = () => {
  curtain.style.transform = "translateX(0%)";
  signInModal.style.display = "flex";
  signUpModal.style.display = "none";
}

// curtain behavior
curtain.addEventListener("click", (event) => {
  if (!signUpModal.contains(event.target) && !signInModal.contains(event.target)) {
    curtain.style.transform = "translateX(100%)";
  }
})
