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


signOutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

renderBoardsToMain(currentUser.boardList);

