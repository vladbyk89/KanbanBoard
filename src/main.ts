profileBtn.addEventListener("click", () => {
  displayUser(currentUser);
});

backToMain.addEventListener(
  "click",
  () => (profileWindow.style.display = "none")
);

createBoardWindowBtn.addEventListener(
  "click",
  () => (newBoardWindow.style.display = "flex")
);

cancelCreateBoardBtn.addEventListener(
  "click",
  () => (newBoardWindow.style.display = "none")
);
createBoardBtn.addEventListener("click", createBoard);

function createBoard() {
  console.log("createBoard() running");
  if (boardName.value && boardColor.value) {
    if (!currentUser) return alert("not signed in");
    const newBoard = new Board(boardName.value, boardColor.value);
    addNewBoardToUserInLocalStorage(currentUser, newBoard);
    location.href = "board.html";
    console.table(preMadeUserList);
  } else {
    alert("missing field");
  }
}
