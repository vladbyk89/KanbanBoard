loginContainer.addEventListener("click", function (e) {
    var target = e.target;
    if (target.className === "newUserBtn") {
        window.location.href = "register.html";
    }
    if (target.className == "loginBtn") {
        if (loginUserName.value === "" || loginPassword.value === "") {
            return alert("missing input");
        }
        if (checkIfUserExists(loginUserName.value, loginPassword.value)) {
            setCurrentUser(loginUserName.value);
            loginUserName.value = "";
            loginPassword.value = "";
            window.location.href = "index.html";
        }
        else {
            alert("user not in database");
        }
    }
});
