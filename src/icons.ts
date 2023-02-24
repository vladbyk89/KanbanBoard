// all windows event listener
window.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("profileBtn")) {
    displayProfile(currentUser);
  }

  if (target.classList.contains("signOutbtn")) {
    localStorage.removeItem("currentUser");
    window.location.href = "entryPage.html";
  }

  if (target.classList.contains("exitProfilePage")) {
    profileWindow.style.display = "none";
  }
  if (target.classList.contains("backToMainBtn")) {
    localStorage.removeItem("currentBoard");
    window.location.href = "index.html";
  }
  if (target.classList.contains("editBoard")) {
    console.log("Edit board clicked");
    editBoardWindow.style.display = "flex";
    nameInputEle.value = currentBoard.name;
    colorInputEle.value = currentBoard.backgroundColor;
  }
});

function editBoard() {
  currentBoard.name = nameInputEle.value;
  currentBoard.backgroundColor = colorInputEle.value;
  localStorage.setItem("currentBoard", JSON.stringify(currentBoard));
  boardTitleNew.textContent = currentBoard.name;
  boardPageNew.style.backgroundColor = currentBoard.backgroundColor;
  updateUserBoardList(currentUser, currentBoard);
}
