// all windows event listener
window.addEventListener("click", function (e) {
    var target = e.target;
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
