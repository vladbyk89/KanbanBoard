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

// ---------------------- index.html ----------------------
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
  boardImageBtn.addEventListener("click", () => {
    backgroundImageSelectionDiv.style.display = "grid";
    const backgroundImages = document.querySelectorAll(
      ".backgroundImage"
    ) as NodeListOf<HTMLImageElement>;
    backgroundImages.forEach((img) => {
      img.addEventListener("click", () => {
        imageDisplayedInCreate.src = img.src;
        backgroundImageSelectionDiv.style.display = "none";
      });
    });
  });

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
    if (target.dataset.name) {
      const check = confirm("Are you sure you want to delete?");
      if (check) deleteBoard(target.dataset.name);
      renderBoardsToMain(currentUser.boardList);
    }

    if (target.classList.contains("boardClick")) {
      setCurrentBoard(target.innerHTML);
      window.location.href = "board.html";
    }
  });
}

//---------------------- board.html ----------------------
if (window.location.pathname.endsWith("board.html")) {
  renderBoardInBoardPage();

  addListBtn.addEventListener("click", createList);

  editBoardBtn.addEventListener("click", () => {
    editBoard(currentBoard);
    editBoardWindow.style.display = "none";
  });

  updatedBoardImageBtn.addEventListener("click", () => {
    console.log("click");
    backgroundImageSelectionDiv.style.display = "grid";

    const backgroundImages = document.querySelectorAll(
      ".backgroundImage"
    ) as NodeListOf<HTMLImageElement>;
    backgroundImages.forEach((img) => {
      img.addEventListener("click", () => {
        imageDisplayedInEdit.src = img.src;
        backgroundImageSelectionDiv.style.display = "none";
      });
    });
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
      boardContainer.insertBefore(curList, deleteBoxDiv);
    } else {
      boardContainer.insertBefore(curList, leftList);
    }
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

  boardContainer.addEventListener("keyup", () => {
    updateCurrentBoard();
  });
  newListInput.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
      createList();
    }
  });

  deleteBoxDiv.addEventListener("drop", (event) => {
    event.preventDefault();
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const element = document.getElementById(event.dataTransfer!.getData("Text"));
      element?.parentNode?.removeChild(element);
      updateCurrentBoard();
    }
  });
}
