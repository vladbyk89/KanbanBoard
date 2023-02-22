userList = userListFromStorage();

if (window.location.pathname.endsWith("entryPage.html")) {
  newForm.addEventListener("submit", handleSignUp);

  loginForm.addEventListener("submit", handleSignIn);

  loginForm.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      if (userNameInput.value === "" || passwordInput.value === "") {
        return;
      }
      handleSignIn(e);
    }
  });
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
  renderBoardInBoardPage();
  addListBtn.addEventListener("click", () => {
    const newList = new List(newListInput.value);

    mainContaier.append(createNewColumn(newList));
  });

  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.className === "newCardBtn") {
      const listElement = target.closest(
        ".boardContainer__mainNew__column__list"
      ) as HTMLDivElement;
      const newCardTextArea = target.parentNode?.querySelector(
        ".newCardTextArea"
      ) as HTMLTextAreaElement;
      createNewCard(newCardTextArea.value, listElement);
      newCardTextArea.value = "";
    }
  });
}
