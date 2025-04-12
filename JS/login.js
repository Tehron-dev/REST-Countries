const elLoginForm = document.querySelector(".js-login-form");
const elLoginName = elLoginForm.querySelector(".js-login-name");
const elLoginEmail = elLoginForm.querySelector(".js-login-email");
const elLoginUsername = elLoginForm.querySelector(".js-login-username");
const elLoginPassword = elLoginForm.querySelector(".js-login-password");
const elErrorMsg = document.querySelector(".js-login-err-msg");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const users = window.localStorage.getItem("users") ? JSON.parse(window.localStorage.getItem("users")) : [];

const validUser = (evt) => {
    evt.preventDefault();
    const emailValue = elLoginEmail.value;
    const nameValue = elLoginName.value.trim();
    const usernameValue = elLoginUsername.value.trim();
    const passwordValue = elLoginPassword.value.trim();
    const checkEmail = users.find((user) => user.emailValue == emailValue);
    const checkUsername = users.find(({usernameValue}) => usernameValue == usernameValue);
    if(emailValue && emailRegex.test(emailValue) && !checkEmail && !checkUsername){
        users.push({nameValue, emailValue, usernameValue, passwordValue});
        window.localStorage.setItem("users", JSON.stringify(users));
        window.location.href = `./countries.html`;
    }
    else {
        if(!checkUsername) elErrorMsg.textContent = "Bunday username mavjud !";
        elErrorMsg.classList.remove("hidden");
    };
};

elLoginForm.addEventListener("submit", validUser);