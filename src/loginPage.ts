loginContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  console.log(target.className);
  if (target.className === "newUserBtn") {
    window.location.href = "register.html";
  }
  if (target.className == "loginBtn") {
    if (loginUserName.value === "" || loginPassword.value === "") {
      return alert("missing input");
    }
    if (checkIfUserExists(loginUserName.value, loginPassword.value)) {
      loginUserName.value = "";
      loginPassword.value = "";
      window.location.href = "index.html";
    } else {
      alert("user not in database");
    }
  }
});

function checkIfUserExists(userName: string, password: string) {
  const getLocalStorage = localStorage.getItem("signedUpUsers");
  if (getLocalStorage) {
    const userListFromStorage: User[] = JSON.parse(getLocalStorage);
    return userListFromStorage.find(
      (user) => user.userName === userName && user.password === password
    );
  }
}

// console.table(checkIfUserExists("vladb89", "12345678"));
