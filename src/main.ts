profileBtn.addEventListener("click", () => {
  displayUser(preMadeList[1]);
});

backToMain.addEventListener(
  "click",
  () => (profileWindow.style.display = "none")
);

createBoardWindowBtn.addEventListener("click", () => {
  newBoardWindow.style.display = "flex";
});

createBoardBtn.addEventListener("click", createBoard);

function createBoard() {
  console.log("clicked");
  if (boardName.value && boardColor.value) {
    console.log("object");
    const newBoard = new Board(boardName.value, boardColor.value);
    addNewBoardToUserInLocalStorage(currentUser, newBoard);
    location.href = "board.html";
    console.table(preMadeList);
  }
}

