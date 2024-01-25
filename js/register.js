// const lrRegisterUsername = document.getElementById("lrRegisterUsername");

let arrayUsersToLS = [];

const usuario = new User("Alvaro", "contraseña");

arrayUsersToLS.push(usuario);
arrayUsersToLS[0].addGameEasy({ score: 22, time: "22:00:00" });
localStorage.setItem("Users", JSON.stringify(arrayUsersToLS));

let arrayUsersFromLS = JSON.parse(localStorage.getItem("Users"));
arrayUsersFromLS.forEach( (e) => {
    User.fromJSON(e);
    console.log(e);
});
console.log(arrayUsersFromLS);
// console.log(arrayUsersFromLS.getUsername());

// let userFromLS = User.fromJSON(arrayUsersFromLS[0]);
// userFromLS.addGameMedium({ score: 32, time: "2:52:05"});
// console.log(userFromLS);

// localStorage.setItem("Users", JSON.stringify());