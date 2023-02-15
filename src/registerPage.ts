// Look at this function.. maybe you can use it to create new user
function handleSubmit(e) {
    e.preventDefault();
    // e.stopPropagation();
    const gender = this.elements.gender.value;
    const firstName = this.elements.firstName.value;
    const lastName = this.elements.lastName.value;
    const password = this.elements.password.value;
    const userName = this.elements.userName.value;
    const email = this.elements.email.value;
    const phone = this.elements.phoneNumber.value;
    const arr = [gender, firstName, lastName, password, userName, email, phone];
    if(arr.some(ele => ele == '' )) return alert('missing field')
    const newUser = new User(
      firstName,
      lastName,
      gender,
      userName,
      password,
      email,
      phone
    );
    const signedUpUsers = JSON.parse(localStorage.getItem('signedUpUsers') || '[]') as User[];
    signedUpUsers.push(newUser);
    localStorage.setItem('signedUpUsers', JSON.stringify(signedUpUsers));
    location.href='index.html';
      console.table(signedUpUsers)
    e.target.reset();
  }


  form.addEventListener("submit",handleSubmit)