// if user is in entryPage.html run this
if (window.location.pathname.endsWith("entryPage.html")) {
  signUpPanelBtn.addEventListener("click", () => {
    entryPageMainContainer.classList.add("active");
  });

  signInPanelBtn.addEventListener("click", () => {
    entryPageMainContainer.classList.remove("active");
  });
  signUpForm.addEventListener("submit", handleSignUp);

  signInForm.addEventListener("submit", handleSignIn);

  signInForm.addEventListener("keydown", (e) => {
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
      const listToDisplay: Board[] = currentUser.boardList.filter((ele) =>
        ele.name.toLowerCase().includes(searchBar.value)
      );
      if (listToDisplay) {
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
      window.location.href = "board.html";
    }
  });
}

// if user is in board.html run this
if (window.location.pathname.endsWith("board.html")) {
  renderBoardInBoardPage();

  addListBtn.addEventListener("click", createList);

  editBoardBtn.addEventListener("click", () => {
    editBoard(currentBoard);
    editBoardWindow.style.display = "none";
  });
  

  boardContainer.addEventListener("dragover", (e) => {
    let cardIsDragged = false;
    cards.forEach((card) => {
      if (card.classList.contains("is-dragging")) {
        cardIsDragged = true;
      }
    });

    if (cardIsDragged) return;
    e.preventDefault();

    const leftList = insertLeftOfLisk(boardContainer, e.clientX);
    const curList = boardContainer.querySelector(".is-draggin") as HTMLElement;

    if (!leftList) {
      boardContainer.appendChild(curList);
    } else {
      boardContainer.insertBefore(curList, leftList);
    }
    // currentBoard.update();
    updateCurrentBoard();
  });

  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.className === "newCardBtn") {
      const listElement = target.closest(
        ".boardContainer__main__list"
      ) as HTMLDivElement;
      const newCardTextArea = listElement.querySelector(
        ".newCardTextArea"
      ) as HTMLTextAreaElement;
      if (newCardTextArea.value == "") return;
      // saveCardTolocalStorage(newCardTextArea.value, listElement.id);
      createCardElement(newCardTextArea.value, listElement);
      newCardTextArea.value = "";
    }
    if (target.classList.contains("cancelEditBoardBtn")) {
      editBoardWindow.style.display = "none";
    }
    if (target.classList.contains("editListBtn")) {
      console.log("Edit List btn is clicked");
    }
    if (target.classList.contains("editCardBtn")) {
      console.log("Edit Card btn is clicked");
    }
  });
}
