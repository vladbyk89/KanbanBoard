loginContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
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
    } else {
      alert("user not in database");
    }
  }
});

// console.table(checkIfUserExists("vladb89", "12345678"));

console.log(findUser("vladb89"));
