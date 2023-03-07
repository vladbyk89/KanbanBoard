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

  static currentUserFromStorage() {
    try {
      const getUser = localStorage.getItem("currentUser");
      if (getUser) {
        const obj: User = JSON.parse(getUser);
        currentUser = new User(
          obj.firstName,
          obj.lastName,
          obj.gender,
          obj.userName,
          obj.password,
          obj.email,
          obj.phoneNumber,
          obj.boardList,
          obj.uid
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  static setCurrentUser(userName: string) {
    try {
      const getLocalStorage = localStorage.getItem("signedUpUsers");
      if (getLocalStorage) {
        const usersList = JSON.parse(getLocalStorage) as User[];
        const findUser = usersList.find((user) => user.userName === userName);
        if (findUser) {
          currentUser = findUser as User;
          localStorage.setItem("currentUser", JSON.stringify(findUser));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

let currentUser: User;
User.currentUserFromStorage();

class Board {
  constructor(
    public name: string,
    public backgroundImage: string,
    public lists: List[] = [],
    public uid: string = Math.random().toString(36).slice(2)
  ) {}

  static getCurrentBoardFromStorage() {
    try {
      const getBoard = localStorage.getItem("currentBoard");
      if (getBoard) {
        const obj = JSON.parse(getBoard);
        currentBoard = new Board(
          obj.name,
          obj.backgroundImage,
          obj.lists,
          obj.uid
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  static setCurrentBoard(boardName: string) {
    try {
      const findBoard = currentUser.boardList.find(
        (board) => board.name === boardName
      );
      localStorage.setItem("currentBoard", JSON.stringify(findBoard));
    } catch (error) {
      console.log(error);
    }
  }

  update() {
    this.lists = [];
    const listElements = boardContainer.querySelectorAll(
      ".boardContainer__main__list"
    );
    listElements.forEach((list) => {
      const listName = list.querySelector("h2")?.innerHTML as string;
      const cardsArr: string[] = [];
      list
        .querySelectorAll("p")
        .forEach((card) => cardsArr.push(card.innerHTML));
      const newList = new List(listName, Array.from(cardsArr));
      this.lists.push(newList);
    });
    localStorage.setItem("currentBoard", JSON.stringify(this));
    updateUserBoardList(currentUser, this);
  }
  edit(newName:string, imageSrc:string){
    this.name = newName;
    this.backgroundImage = imageSrc;
    
  }
}

let currentBoard: Board;
Board.getCurrentBoardFromStorage();

class List {
  constructor(
    public name: string,
    public cards: string[] = [],
    public uid = Math.random().toString(36).slice(2),
    public position = position
  ) {}
}

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
  new Board("Golden Board", "./img/NASA.jpg"),
  new Board("Cyan Board", "./img/pink-sea.jpg"),
  new Board("Magenta Board", "./img/purple-flower.jpg"),
  new Board("Salmon Board", "./img/sea.jpg"),
  new Board("SlateBlue Board", "./img/wall-painting.jpg"),
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

// let currentBoard: Board = currentBoardFromStorage();
// function currentBoardFromStorage(): Board {
//   try {
//     const getBoard = localStorage.getItem("currentBoard");
//     if (getBoard) {
//       const obj = JSON.parse(getBoard);
//       const board = new Board(obj.name, obj.backgroundImage, obj.lists, obj.uid)
//       console.log(board);
//       console.log(JSON.parse(getBoard));
//       return board;
//     }
//     const fakeBoard: Board = new Board('empty', 'empty');
//     return fakeBoard
//   } catch (error) {
//     console.log(error);
//     const fakeBoard: Board = new Board('empty', 'empty');
//     return fakeBoard
//   }
// }
