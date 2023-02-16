


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
  constructor(
    public name: string, 
    public items: string
    ) {}
}

const preMadeList: User[] = [
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
    "itayA",
    "144322",
    "itaiAmosi@gmail.com",
    "0540987654"
  ),
];

localStorage.setItem("signedUpUsers", JSON.stringify(preMadeList));

let currentUser: User = preMadeList[0];