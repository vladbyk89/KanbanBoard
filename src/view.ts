// Login page elements
const loginContainer = document.querySelector(
  ".loginContainer"
) as HTMLDivElement;
const loginUserName = document.querySelector(
  "#loginUserName"
) as HTMLInputElement;
const loginPassword = document.querySelector(
  "#loginPassword"
) as HTMLInputElement;

// Register page element
const registerContainer = document.querySelector(
  ".registerContainer"
) as HTMLDivElement;
const form = document.querySelector("form") as HTMLFormElement;

// Main page elements
const profileBtn = document.querySelector(".profileBtn") as HTMLElement;
const profileWindow = document.querySelector(
  ".profileWindow"
) as HTMLDivElement;
const profileDiv = document.querySelector(".profile") as HTMLDivElement;
const backToMain = document.querySelector(".backToMain") as HTMLElement;

const createBoardWindowBtn = document.querySelector(
  ".createBoardWindowBtn"
) as HTMLButtonElement;
const createBoardBtn = document.querySelector(
  ".createBoardBtn"
) as HTMLButtonElement;
const cancelCreateBoardBtn = document.querySelector(
  ".cancelCreateBoardBtn"
) as HTMLButtonElement;
const newBoardWindow = document.querySelector(
  ".newBoardWindow"
) as HTMLDivElement;
const boardName = document.querySelector("#boardName") as HTMLInputElement;
const boardColor = document.querySelector("#boardColor") as HTMLInputElement;
const signOutBtn = document.getElementById("signOutbtn") as HTMLButtonElement;
const boardArea = document.querySelector(
  ".mainpageContainer__main__boards__boardArea"
) as HTMLDivElement;
const searchBar = document.querySelector(
  ".mainpageContainer__topNav__search"
) as HTMLInputElement;

//Board page
const boardTitle = document.querySelector(
  ".boardContainer__topNav__boardName"
) as HTMLDivElement;

window.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  // console.log(returnBoard(target.innerHTML));
  if (target.classList.contains("profileBtn")) {
    displayUser(currentUser);
  }

  if (target.classList.contains("backToMain")) {
    profileWindow.style.display = "none";
  }
  if (target.classList.contains("boardClick")) {
    window.location.href = "board.html";
  }
});
