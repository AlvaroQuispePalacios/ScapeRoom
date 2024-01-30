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

    getUsername() {
        return this.username;
    }

    setUsername(newUsername) {
        this.username = newUsername;
    }

    addGameEasy(gameObject) {
        this.games.easy.push(gameObject);
    }

    addGameMedium(gameObject) {
        this.games.medium.push(gameObject);
    }

    addGameHard(gameObject) {
        this.games.hard.push(gameObject);
    }

    // Método estático para reconstruir el objeto desde su representación serializable
    static fromJSON(objectUser) {
        let user = new User(objectUser.username, objectUser.password);
        user.games = objectUser.games;
        return user;
    }
}