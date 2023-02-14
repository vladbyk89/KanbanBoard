loginContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  console.log(target.className);
  if (target.className === "newUserBtn") {
    window.location.href = "register.html";
  }
  if (target.className == "loginBtn") {
    checkInput();
  }
});

function checkInput() {
  loginInputField.forEach((input) => {
    if (input.value == "") {
      return alert("missing input field");
    } else {
      input.value = "";
      window.location.href = "index.html";
    }
  });
}
