profileBtn.addEventListener("click", function () {
    displayUser(currentUser);
});
backToMain.addEventListener("click", function () { return (profileWindow.style.display = "none"); });
createBoardWindowBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "flex"); });
cancelCreateBoardBtn.addEventListener("click", function () { return (newBoardWindow.style.display = "none"); });
createBoardBtn.addEventListener("click", createBoard);
signOutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});
renderBoardsToMain(currentUser.boardList);
