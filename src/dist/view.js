// Login page elements
var loginContainer = document.querySelector(".loginContainer");
var loginUserName = document.querySelector("#loginUserName");
var loginPassword = document.querySelector("#loginPassword");
// Register page element
var registerContainer = document.querySelector(".registerContainer");
var form = document.querySelector("form");
// Main page elements
var profileBtn = document.querySelector(".profileBtn");
var profileWindow = document.querySelector(".profileWindow");
var profileDiv = document.querySelector(".profile");
var backToMain = document.querySelector(".backToMain");
var createBoardWindowBtn = document.querySelector(".createBoardWindowBtn");
var createBoardBtn = document.querySelector(".createBoardBtn");
var cancelCreateBoardBtn = document.querySelector(".cancelCreateBoardBtn");
var newBoardWindow = document.querySelector(".newBoardWindow");
var boardName = document.querySelector("#boardName");
var boardColor = document.querySelector("#boardColor");
var signOutBtn = document.getElementById("signOutbtn");
var boardArea = document.querySelector(".mainpageContainer__main__boards__boardArea");
var searchBar = document.querySelector(".mainpageContainer__topNav__search");
window.addEventListener("click", function (e) {
    var target = e.target;
    if (target.classList.contains("profileBtn")) {
        displayUser(currentUser);
    }
    if (target.classList.contains("backToMain")) {
        profileWindow.style.display = "none";
    }
});
