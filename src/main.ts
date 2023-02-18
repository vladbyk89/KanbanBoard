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
      const listToDisplay: Board[] | boolean = findProductName(
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
}

window.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  // console.log(returnBoard(target.innerHTML));
  if (target.classList.contains("profileBtn")) {
    displayUser(currentUser);
  }

  if (target.classList.contains("signOutbtn")) {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }

  if (target.classList.contains("backToMain")) {
    profileWindow.style.display = "none";
  }
  if (target.classList.contains("boardClick")) {
    setCurrentBoard(target.innerHTML);
    window.location.href = "board.html";
  }

  // if (target.classList.contains("createBoardBtn")) {
  //   createBoard();
  // }
  // if (target.classList.contains("cancelCreateBoardBtn")) {
  //   newBoardWindow.style.display = "none";
  // }
  // if (target.classList.contains("createBoardWindowBtn")) {
  //   newBoardWindow.style.display = "flex";
  // }
  // if (target.classList.contains("mainpageContainer__topNav__search")) {
  //   searchBar.addEventListener("keyup", () => {
  //     if (searchBar.value != "") {
  //       boardArea.innerHTML = "";
  //       const listToDisplay: Board[] | boolean = findProductName(
  //         searchBar.value,
  //         currentUser.boardList
  //       );
  //       if (listToDisplay !== false) {
  //         renderBoardsToMain(listToDisplay);
  //       }
  //     } else {
  //       renderBoardsToMain(currentUser.boardList);
  //     }
  //   });
  // }
});
