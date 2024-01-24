// const lrRegisterUsername = document.getElementById("lrRegisterUsername");
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.games = { 
            easy: [],
            medium: [],
            hard: []
        };
    }

    get getUsername(){
        return this.username;
    }

    addGameEasy (gameObject) {
        this.games.easy.push(gameObject);
    }

    addGameMedium (gameObject) {
        this.games.medium.push(gameObject);
    }

    addGameHard (gameObject) {
        this.games.hard.push(gameObject);
    }
}

let arrayUsers = [];
const usuario = new User("Alvaro", "contraseña");
arrayUsers.push(usuario);
arrayUsers[0].addGameEasy({score: 22, time: "22:00:00"});
console.log(arrayUsers[0].getUsername);

localStorage.setItem("Users", JSON.stringify(arrayUsers));
let arrayUsersLS = JSON.parse(localStorage.getItem("Users"));
console.log(arrayUsersLS);
console.log(arrayUsersLS[0]);
console.log(arrayUsersLS[0].getUsername);

