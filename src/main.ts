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

window.addEventListener("click", (e) =>{
console.log(e.target);
});
