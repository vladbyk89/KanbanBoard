loginContainer.addEventListener("click", function (e) {
    var target = e.target;
    console.log(target.className);
    if (target.className === "newUserBtn") {
        window.location.href = "register.html";
    }
    if (target.className == "loginBtn") {
        checkInput();
    }
});
function checkInput() {
    loginInputField.forEach(function (input) {
        if (input.value == "") {
            return alert("missing input field");
        }
        else {
            input.value = "";
            window.location.href = "index.html";
        }
    });
}
