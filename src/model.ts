let currentUser: User = currentUserFromStorage();
let currentBoard: Board = currentBoardFromStorage();
let userList: User[] = userListFromStorage();
let cards = document.querySelectorAll(
  ".boardContainer__main__list__card"
) as NodeListOf<HTMLDivElement>;
class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public gender: string,
    public userName: string,
    public password: string,
    public email: string,
    public phoneNumber: string,
    public boardList: Board[] = [],
    public uid: string = Math.random().toString(36).slice(2)
  ) {}
}

class Board {
  constructor(
    public name: string,
    public backgroundColor: string,
    public lists: List[] = [],
    public uid: string = Math.random().toString(36).slice(2)
  ) {}
  // update() {
  //   this.lists = [];
  //   const listElements = boardContainer.querySelectorAll(
  //     ".boardContainer__main__list"
  //   );
  //   listElements.forEach((list) => {
  //     const listName = list.querySelector("h2")?.innerHTML as string;
  //     const cardsArr: string[] = [];
  //     list
  //       .querySelectorAll("p")
  //       .forEach((card) => cardsArr.push(card.innerHTML));
  //     const newList = new List(listName, Array.from(cardsArr));
  //     this.lists.push(newList);
  //   });
  //   localStorage.setItem("currentBoard", JSON.stringify(this));
  //   updateUserBoardList(currentUser, this);
  // }
}

class List {
  constructor(
    public name: string,
    public cards: string[] = [],
    public uid = Math.random().toString(36).slice(2)
  ) {}
}

// class Card {
//   constructor(
//     public name: string,
//     public uid = Math.random().toString(36).slice(2)
//   ) {}
// }

const preMadeUserList: User[] = [
  new User(
    "Vladislav",
    "Bykanov",
    "male",
    "vladb89",
    "12345678",
    "vladi@gmail.com",
    "0548155232"
  ),
  new User(
    "Itai",
    "Gelberg",
    "male",
    "itaiG",
    "12345",
    "itaiGel@gmail.com",
    "0541234567"
  ),
  new User(
    "Itay",
    "Amosi",
    "male",
    "itayz1e",
    "144322",
    "itayAmosi@gmail.com",
    "0540987654"
  ),
];

const preMadeBoardList: Board[] = [
  new Board("Golden Board", "darkgoldenrod"),
  new Board("Cyan Board", "darkcyan"),
  new Board("Magenta Board", "darkmagenta"),
  new Board("Salmon Board", "darksalmon"),
  new Board("SlateBlue Board", "darkslateblue"),
];

const preMadeListList = [
  new List("To Do", ["buy chocolate", "write a song", "go for a jog"]),
  new List("Design", ["Design html page", "Create logo"]),
  new List("Backlog", ["Register", "Accessibility", "CRUD Lists", "Login"]),
  new List("Finish", [
    "open repo",
    "Create Main Page",
    "Create Login Page",
    "Create Sign Up page",
  ]),
];

if (!localStorage.getItem("signedUpUsers")) {
  preMadeBoardList[0].lists.push(...preMadeListList);
  preMadeUserList[0].boardList.push(...preMadeBoardList);
  preMadeUserList[1].boardList.push(...preMadeBoardList);
  preMadeUserList[2].boardList.push(...preMadeBoardList);
  localStorage.setItem("signedUpUsers", JSON.stringify(preMadeUserList));
}
