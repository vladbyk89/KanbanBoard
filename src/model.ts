class User {
  private uid: string;
  constructor(
    public firstName: string,
    public lastName: string,
    public gender: string,
    public userName: string,
    public password: string,
    public email: string,
    public phoneNumber: string
  ) {
    this.uid = Math.random().toString(36).slice(2);
  }
  getuid() {
    return this.uid;
  }
}

const preMadeList: User[] = [
  new User(
    "vladislav",
    "bykanov",
    "male",
    "vladb89",
    "12345678",
    "vladi@gmail.com",
    "0548155232"
  ),
  new User(
    "itai",
    "Gelberg",
    "male",
    "itaiG",
    "abcdefgh",
    "itaiGel@gmail.com",
    "0541234567"
  ),
  new User(
    "itai",
    "Amosi",
    "male",
    "itaiA",
    "87654321",
    "itaiAmosi@gmail.com",
    "0540987654"
  ),
];

localStorage.setItem('signedUpUsers', JSON.stringify(preMadeList))