let currentUser: User = currentUserFromStorage();

class User {
  private uid: string;
  constructor(
    public firstName: string,
    public lastName: string,
    public gender: string,
    public userName: string,
    public password: string,
    public email: string,
    public phoneNumber: string,
    public boardList: Board[] = []
  ) {
    this.uid = Math.random().toString(36).slice(2);
  }
  getuid() {
    return this.uid;
  }
}

class Board {
  constructor(
    public name: string,
    public backgroundColor: string,
    public lists: List[] = []
  ) {}
}

class List {
  constructor(public name: string, public cards: string[] = []) {}
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
    "abcdefgh",
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

localStorage.setItem("signedUpUsers", JSON.stringify(preMadeUserList));

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


