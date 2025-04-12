const elForm = document.querySelector(".js-register-form");
const elPassword = document.querySelector(".js-password");
const elErrorMsg = document.querySelector(".js-error-msg");
const elUsername = document.querySelector(".js-username");

elForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
  
      const username = elUsername.value.trim();
      const password = elPassword.value.trim();
      const users = JSON.parse(localStorage.getItem("users")) || [];
      
      const isExist = users.find((user) => user.username == username);
      if (isExist) {
        elErrorMsg.classList.remove("hidden");
      } else {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", username);
        window.location.href = `/index.html`;
      }
});
      