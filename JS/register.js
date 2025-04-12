const elRegisterForm = document.querySelector(".js-register-form");
const elPassword = document.querySelector(".js-password");
const elErrorMsg = document.querySelector(".js-error-msg");
const elEmail = document.querySelector(".js-email");

elRegisterForm?.addEventListener("submit", (evt) => {
      evt.preventDefault();
  
      const email = elEmail.value.trim();
      const password = elPassword.value.trim();
      const users = JSON.parse(localStorage.getItem("users")) || [];
      
      const isExist = users.find((user) => user.emailValue == email);
      const isPassword = isExist != undefined ? isExist.passwordValue == password : "Email not found !";
      if (isExist && isPassword) {
        window.location.href = `./html/countries.html`;
        elPassword.value = '';
        elEmail.value = '';
      } else {
        elErrorMsg.classList.remove("hidden");
        elPassword.value = '';
        elEmail.value = '';
      };
});