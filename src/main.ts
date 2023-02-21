userList = userListFromStorage();

// if user is in login.html run this
if (window.location.pathname.endsWith("login.html")) {
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
    window.addEventListener("keydown", ({ key }) => {
      if (key == "Enter") {
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
  });
}

// if user is in register.html run this
if (window.location.pathname.endsWith("register.html")) {
  form.addEventListener("submit", handleFormSubmit);
}

// if user is in index.html run this
if (window.location.pathname.endsWith("index.html")) {
  renderBoardsToMain(currentUser.boardList);

  createBoardWindowBtn.addEventListener(
    "click",
    () => (newBoardWindow.style.display = "flex")
  );

  cancelCreateBoardBtn.addEventListener(
    "click",
    () => (newBoardWindow.style.display = "none")
  );
  createBoardBtn.addEventListener("click", createBoard);

  signOutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  searchBar.addEventListener("keyup", () => {
    if (searchBar.value != "") {
      boardArea.innerHTML = "";
      const listToDisplay: Board[] | boolean = findBoard(
        searchBar.value,
        currentUser.boardList
      );
      if (listToDisplay !== false) {
        renderBoardsToMain(listToDisplay);
      }
    } else {
      renderBoardsToMain(currentUser.boardList);
    }
  });

  boardArea.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.dataset.name) deleteBoard(target.dataset.name);
    renderBoardsToMain(currentUser.boardList);

    if (target.classList.contains("boardClick")) {
      setCurrentBoard(target.innerHTML);
      window.location.href = "NewBoard.html";
    }
  });
}

// if user is in NewBoard.html run this
if (window.location.pathname.endsWith("NewBoard.html")) {
  renderLists();
}

