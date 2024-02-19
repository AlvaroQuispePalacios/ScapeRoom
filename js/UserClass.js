class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.games = {
            easy: [],
            medium: [],
            hard: [],
        };
    }

    getUsername() {
        return this.username;
    }

    setUsername(newUsername) {
        this.username = newUsername;
    }

    addGameEasy(arrayGames) {
        let gameEasy = {
            gamesOfTheGame: [],
            difficulty: "easy",
            totalTime: "",
            score: 2400,
            finalizedGame: false,
        };

        arrayGames.forEach((item) => {
            gameEasy.gamesOfTheGame.push({
                gameName: item.name,
                time: "",
                finalized: false,
            });
        });

        this.games.easy.push(gameEasy);
    }

    addGameMedium(arrayGames) {
        let gameMedium = {
            gamesOfTheGame: [],
            difficulty: "medium",
            totalTime: "",
            score: 2100,
            finalizedGame: false,
        };

        arrayGames.forEach((item) => {
            gameMedium.gamesOfTheGame.push({
                name: item.name,
                time: "",
                finalized: false,
            });
        });

        this.games.medium.push(gameMedium);
    }

    addGameHard(arrayGames) {
        let gameHard = {
            gamesOfTheGame: [],
            difficulty: "hard",
            totalTime: "",
            score: 1800,
            finalizedGame: false,
        };

        arrayGames.forEach((item) => {
            gameHard.gamesOfTheGame.push({
                name: item.name,
                time: "",
                finalized: false,
            });
        });

        this.games.hard.push(gameHard);
    }

    // Método estático para reconstruir el objeto desde su representación serializable
    static fromJSON(objectUser) {
        let user = new User(objectUser.username, objectUser.password);
        user.games = objectUser.games;
        return user;
    }
}
