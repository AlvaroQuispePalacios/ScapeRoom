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

    resultGame(functionGame, dificultad, tiempoTranscurrido){
        
        let gameEasyLength = this.games.easy.length;
        let gameMediumLength = this.games.medium.length;
        let gameHardLength = this.games.hard.length;

        if(dificultad == "easy"){
            // Verifica si el juego que se esta ejecutando en el scapeRoom ha finalizado, si ha finalizado lo declara como finalizado
            let arrayJuegosFinalizados = Array();
            let scapeRoomFinalizado;

            // Cuando un juego termina lo marca como completado 
            this.games.easy[gameEasyLength - 1].gamesOfTheGame.forEach((game) => {
                if(game.gameName == functionGame.name){
                    game.finalized = true;
                    game.time = tiempoTranscurrido.textContent;
                }
            });
            
            // Si todos los juegos del scapeRoom fueron terminados marca que el scapeRoom ha finalizado 
            this.games.easy[gameEasyLength - 1].gamesOfTheGame.forEach((game) => {
                if(game.finalized){
                    arrayJuegosFinalizados.push(true);
                }else{
                    arrayJuegosFinalizados.push(false);
                }
            });

            scapeRoomFinalizado = arrayJuegosFinalizados.reduce((acumulador, valorActual) => acumulador && valorActual, true);

            // Marca la partida como acabada si todos los juegos de la partida han sido completados
            if(scapeRoomFinalizado){
                this.games.easy[gameEasyLength - 1].finalizedGame = true;
                // Obtiene el tiempo en que termino el ultimo juego de la partida y lo iguala al tiempo total de la partida
                this.games.easy[gameEasyLength - 1].totalTime = this.games.easy[gameEasyLength - 1].gamesOfTheGame[this.games.easy[gameEasyLength - 1].gamesOfTheGame.length - 1].time;

                // Transformar el tiempo total de la partida para poder restar 3 pts por cada segundo de partida
                let x = new Date(`1970-01-01T${this.games.easy[this.games.easy.length - 1].totalTime}`);
                let horas = x.getHours();
                let minutos = x.getMinutes();
                let segundos = x.getSeconds();
                let tiempoTotalEnSegundos = horas * 3600 + minutos * 60 + segundos;
                this.games.easy[gameEasyLength - 1].score -= (tiempoTotalEnSegundos * 3); 
            }

        }else if(dificultad == "medium"){
            let arrayJuegosFinalizados = Array();
            let scapeRoomFinalizado;

            // Cuando un juego termina lo marca como completado 
            this.games.medium[gameMediumLength - 1].gamesOfTheGame.forEach((game) => {
                if(game.gameName == functionGame.name){
                    game.finalized = true;
                    game.time = tiempoTranscurrido.textContent;
                }
            });
            
            // Si todos los juegos del scapeRoom fueron terminados marca que el scapeRoom ha finalizado 
            this.games.medium[gameMediumLength - 1].gamesOfTheGame.forEach((game) => {
                if(game.finalized){
                    arrayJuegosFinalizados.push(true);
                }else{
                    arrayJuegosFinalizados.push(false);
                }
            });

            scapeRoomFinalizado = arrayJuegosFinalizados.reduce((acumulador, valorActual) => acumulador && valorActual, true);

            // Marca la partida como acabada si todos los juegos de la partida han sido completados
            if(scapeRoomFinalizado){
                this.games.medium[gameMediumLength - 1].finalizedGame = true;
                // Obtiene el tiempo en que termino el ultimo juego de la partida y lo iguala al tiempo total de la partida
                this.games.medium[gameMediumLength - 1].totalTime = this.games.medium[gameMediumLength - 1].gamesOfTheGame[this.games.medium[gameMediumLength - 1].gamesOfTheGame.length - 1].time;

                // Transformar el tiempo total de la partida para poder restar 3 pts por cada segundo de partida
                let x = new Date(`1970-01-01T${this.games.medium[this.games.medium.length - 1].totalTime}`);
                let horas = x.getHours();
                let minutos = x.getMinutes();
                let segundos = x.getSeconds();
                let tiempoTotalEnSegundos = horas * 3600 + minutos * 60 + segundos;
                this.games.medium[gameMediumLength - 1].score -= (tiempoTotalEnSegundos * 3); 
            }

        }else if(dificultad == "hard"){
            let arrayJuegosFinalizados = Array();
            let scapeRoomFinalizado;

            // Cuando un juego termina lo marca como completado 
            this.games.hard[gameHardLength - 1].gamesOfTheGame.forEach((game) => {
                if(game.gameName == functionGame.name){
                    game.finalized = true;
                    game.time = tiempoTranscurrido.textContent;
                }
            });
            
            // Si todos los juegos del scapeRoom fueron terminados marca que el scapeRoom ha finalizado 
            this.games.hard[gameHardLength - 1].gamesOfTheGame.forEach((game) => {
                if(game.finalized){
                    arrayJuegosFinalizados.push(true);
                }else{
                    arrayJuegosFinalizados.push(false);
                }
            });

            scapeRoomFinalizado = arrayJuegosFinalizados.reduce((acumulador, valorActual) => acumulador && valorActual, true);

            // Marca la partida como acabada si todos los juegos de la partida han sido completados
            if(scapeRoomFinalizado){
                this.games.hard[gameHardLength - 1].finalizedGame = true;
                // Obtiene el tiempo en que termino el ultimo juego de la partida y lo iguala al tiempo total de la partida
                this.games.hard[gameHardLength - 1].totalTime = this.games.hard[gameHardLength - 1].gamesOfTheGame[this.games.hard[gameHardLength - 1].gamesOfTheGame.length - 1].time;

                // Transformar el tiempo total de la partida para poder restar 3 pts por cada segundo de partida
                let x = new Date(`1970-01-01T${this.games.hard[this.games.hard.length - 1].totalTime}`);
                let horas = x.getHours();
                let minutos = x.getMinutes();
                let segundos = x.getSeconds();
                let tiempoTotalEnSegundos = horas * 3600 + minutos * 60 + segundos;
                this.games.hard[gameHardLength - 1].score -= (tiempoTotalEnSegundos * 3); 
            }
        }
    }

    // Método estático para reconstruir el objeto desde su representación serializable
    static fromJSON(objectUser) {
        let user = new User(objectUser.username, objectUser.password);
        user.games = objectUser.games;
        return user;
    }
}
