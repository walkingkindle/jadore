const curtain = document.querySelector('.register-curtain');
const registerBox = document.querySelector('.register');
const signUp = document.querySelector('.sign-up');
signUp.onclick = () => {
  curtain.style.transform = "translateX(0%)";
}
curtain.addEventListener("click", (event) => {
  if (!registerBox.contains(event.target)) {
    curtain.style.transform = "translateX(100%)";
  }
})