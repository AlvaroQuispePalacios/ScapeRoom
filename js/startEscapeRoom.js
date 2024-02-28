// En este archivo me canse del ingles
const btnStartEscapeRoom = document.getElementById("btnStartEscapeRoom");
const btnMostrarPartidasIncompletas = document.getElementById(
    "btnMostrarPartidasIncompletas"
);
const btnVolverAInicio = document.getElementById("btnVolverAInicio");
const main = document.getElementById("main");
const submenu = document.querySelector(".submenu");
const dialogue = document.querySelector(".dialogue");
//
const arrayDeJuegos = [
    createGameMemory,
    createGameAdivinarPalabraDesordenada,
    createGameCodigoCesar,
];
const juegosDesordenados = seleccionarJuegosAleatoriamente();
// Dificultad de la partida
let dificultad;
// El puntaje con el que comienzas y al pasar del tiempo o al uso de alguna pìsta disminuye
let maxScore;
let userConnected = User.fromJSON(
    JSON.parse(sessionStorage.getItem("connected"))
);

console.log("Usuario del sesion");
console.log(userConnected);
console.log("Juegos");
console.log(juegosDesordenados);

//
function saveGame(user) {
    let usersLocalStorage = JSON.parse(localStorage.getItem("users"));
    usersLocalStorage.forEach((userLS, index) => {
        if (userLS.username == user.username) {
            console.log("Usuario encontrado en localStorage");
            usersLocalStorage[index] = user;
        }
    });
    console.log("guardando en localStorage y SessionStorage");
    localStorage.setItem("users", JSON.stringify(usersLocalStorage));
    sessionStorage.setItem("connected", JSON.stringify(user));
}

// ------------------------ CRONOMETRO -------------------------------
const tiempoTranscurrido = document.querySelector(".tiempoTranscurrido");
let contadorIniciarCronometro = 0;
let cronometro;
let miFecha = new Date();
miFecha.setHours(0, 0, 0, 0);
tiempoTranscurrido.textContent = "00:00:00";

function crono() {
    let segundos = miFecha.getSeconds();
    let minutos = miFecha.getMinutes();
    let horas = miFecha.getHours();

    segundos += 1;

    if (segundos == 60) {
        segundos = 0;
        minutos += 1;

        miFecha.setMinutes(minutos);
    }
    miFecha.setSeconds(segundos);

    if (horas < 10) {
        horas = "0" + horas;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    if (segundos < 10) {
        segundos = "0" + segundos;
    }

    tiempoTranscurrido.textContent = `${horas}:${minutos}:${segundos}`;
}

function reiniciarCronometro() {
    miFecha.setHours(0, 0, 0, 0);
    tiempoTranscurrido.textContent = "00:00:00";
}

function iniciarCrono() {
    cronometro = setInterval(crono, 1000);
}

function pararCrono() {
    clearInterval(cronometro);
}

// ---------------------------- MENUS ----------------------
function seleccionarJuegosAleatoriamente() {
    for (let i = arrayDeJuegos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayDeJuegos[i], arrayDeJuegos[j]] = [
            arrayDeJuegos[j],
            arrayDeJuegos[i],
        ];
    }
    return arrayDeJuegos;
}

function createMenuSelectDifficulty() {
    return `
        <div class="menu-select-difficulty">
            <h2>Selecciona la dificultad</h2>
            <button onclick="selectDifficulty('easy', false)">Facil</button>
            <button onclick="selectDifficulty('medium', false)">Intermedio</button>
            <button onclick="selectDifficulty('hard', false)">Dificil</button>
        </div>
    `;
}

function crearMenuMostrarPartidasIncompletas() {
    let partidasIncompletasContent = document.querySelector(
        ".partidas-incompletas-content"
    );
    partidasIncompletasContent.innerHTML = "";
    // Muestra las partidas no acabadas que la dificultad sea fácil
    userConnected.games.easy.forEach((gameEasy, index) => {
        if (!gameEasy.finalizedGame) {
            partidasIncompletasContent.innerHTML += `
            <div class="partidas-incompletas-content-item">
                <button onclick="cargarPartidaFacil('${index}')">
                    <span>Dificultad: <span>Fácil</span></span>
                </button>
            </div>
            `;
        }
    });

    userConnected.games.medium.forEach((gameMedium, index) => {
        if (!gameMedium.finalizedGame) {
            partidasIncompletasContent.innerHTML += `
            <div class="partidas-incompletas-content-item">
                <button onclick="cargarPartidaMedia('${index}')">
                    <span>Dificultad: <span>Intermedio</span></span>
                </button>
            </div>
            `;
        }
    });

    userConnected.games.hard.forEach((gameDificil, index) => {
        if (!gameDificil.finalizedGame) {
            partidasIncompletasContent.innerHTML += `
            <div class="partidas-incompletas-content-item">
                <button onclick="cargarPartidaDificil('${index}')">
                    <span>Dificultad: <span>Difícil</span></span>
                </button>
            </div>
            `;
        }
    });
}

/*-----------------------------Sistema de recuperación de partidas----------------------*
 * El sistema de recuperar partida se basa en tomar los datos de esta partida y crear una nueva partida "vacia" en el cual se le pasara los datos de la partida original, esto se hace para ponerlo al final del todo del array de las partidas faciles porque el código trabaja siempre en la última partida del array
 */
function cargarPartidaFacil(index) {
    let indexT = Number(index);
    let partida = userConnected.games.easy[indexT];
    let tiempo = "00:00:00";
    // Carga el cronometro con el tiempo del ultimo juego finalizado
    for (let i = partida.gamesOfTheGame.length - 1; i > -1; i--) {
        if (partida.gamesOfTheGame[i].finalized) {
            // ultimoJuegoFinalizado =
            tiempo = partida.gamesOfTheGame[i].time;
            break;
        }
    }
    // Poner el tiempo del ultimo juego finalizado
    let [horas, minutos, segundos] = tiempo.split(":").map(Number);
    miFecha.setHours(horas);
    miFecha.setMinutes(minutos);
    miFecha.setSeconds(segundos);
    tiempoTranscurrido.textContent = tiempo;

    juegosDesordenados.splice(0);
    // LLena el array con los juegos de la partida que no han sido completado la cual queremos retomar
    // console.log("Guardando los juegos de la partia que se quiere recuperar");
    partida.gamesOfTheGame.forEach((item) => {
        if (!item.finalized) {
            if (item.gameName == createGameMemory.name) {
                juegosDesordenados.push(createGameMemory);
            } else if (
                item.gameName == createGameAdivinarPalabraDesordenada.name
            ) {
                juegosDesordenados.push(createGameAdivinarPalabraDesordenada);
            } else if (item.gameName == createGameCodigoCesar.name) {
                juegosDesordenados.push(createGameCodigoCesar);
            }
        }
    });

    // Juego que reemplazara al original(No importa los juegos con los que se inicialize porque se tomaran los juegos de la partida que queremos recuperar)
    userConnected.addGameEasy(juegosDesordenados);
    // Guardamos los datos de la partida original a la copia
    userConnected.games.easy[userConnected.games.easy.length - 1] = partida;
    // console.log("Mostrando partida nueva en la ultima posicion con los datos de la vieja partida");
    // console.log(userConnected.games.easy[userConnected.games.easy.length - 1]);
    // console.log("Eliminando partida antigua");
    // Eliminamos la partida original porque estaremos trabajando con la copia ahora
    userConnected.games.easy.splice(indexT, 1);
    console.log(userConnected);
    // Guardamos los cambios en el local y session
    saveGame(userConnected);
    // Iniciamos la partida con el primer juego que no ha sido completado
    selectDifficulty("easy", true);
}

function cargarPartidaMedia(index) {
    let indexT = Number(index);
    let partida = userConnected.games.medium[indexT];
    let tiempo = "00:00:00";

    // Tomar el tiempo del último juego de la partida
    for (let i = partida.gamesOfTheGame.length - 1; i > -1; i--) {
        if (partida.gamesOfTheGame[i].finalized) {
            // ultimoJuegoFinalizado =
            tiempo = partida.gamesOfTheGame[i].time;
            break;
        }
    }

    // Cargar el tiempo en el cronometro

    let [horas, minutos, segundos] = tiempo.split(":").map(Number);
    miFecha.setHours(horas);
    miFecha.setMinutes(minutos);
    miFecha.setSeconds(segundos);
    tiempoTranscurrido.textContent = tiempo;

    juegosDesordenados.splice(0);
    // LLena el array con los juegos de la partida que no han sido completado la cual queremos retomar
    // console.log("Guardando los juegos de la partia que se quiere recuperar");
    partida.gamesOfTheGame.forEach((item) => {
        if (!item.finalized) {
            if (item.gameName == createGameMemory.name) {
                juegosDesordenados.push(createGameMemory);
            } else if (
                item.gameName == createGameAdivinarPalabraDesordenada.name
            ) {
                juegosDesordenados.push(createGameAdivinarPalabraDesordenada);
            } else if (item.gameName == createGameCodigoCesar.name) {
                juegosDesordenados.push(createGameCodigoCesar);
            }
        }
    });

    // Juego que reemplazara al original(No importa los juegos con los que se inicialize porque se tomaran los juegos de la partida que queremos recuperar)
    userConnected.addGameMedium(juegosDesordenados);
    // Guardamos los datos de la partida original a la copia
    userConnected.games.medium[userConnected.games.medium.length - 1] = partida;
    userConnected.games.medium.splice(indexT, 1);
    // Guardamos los cambios en el local y session
    saveGame(userConnected);
    // Iniciamos la partida con el primer juego que no ha sido completado
    selectDifficulty("medium", true);
}

function cargarPartidaDificil(index) {
    let indexT = Number(index);
    let partida = userConnected.games.hard[indexT];
    let tiempo = "00:00:00";
    // Tomar el tiempo del último juego de la partida
    for (let i = partida.gamesOfTheGame.length - 1; i > -1; i--) {
        if (partida.gamesOfTheGame[i].finalized) {
            // ultimoJuegoFinalizado =
            tiempo = partida.gamesOfTheGame[i].time;
            break;
        }
    }
    // Cargar el tiempo en el cronometro
    let [horas, minutos, segundos] = tiempo.split(":").map(Number);
    miFecha.setHours(horas);
    miFecha.setMinutes(minutos);
    miFecha.setSeconds(segundos);
    tiempoTranscurrido.textContent = tiempo;

    juegosDesordenados.splice(0);
    // LLena el array con los juegos de la partida que no han sido completado la cual queremos retomar
    // console.log("Guardando los juegos de la partia que se quiere recuperar");
    partida.gamesOfTheGame.forEach((item) => {
        if (!item.finalized) {
            if (item.gameName == createGameMemory.name) {
                juegosDesordenados.push(createGameMemory);
            } else if (
                item.gameName == createGameAdivinarPalabraDesordenada.name
            ) {
                juegosDesordenados.push(createGameAdivinarPalabraDesordenada);
            } else if (item.gameName == createGameCodigoCesar.name) {
                juegosDesordenados.push(createGameCodigoCesar);
            }
        }
    });

    // Juego que reemplazara al original(No importa los juegos con los que se inicialize porque se tomaran los juegos de la partida que queremos recuperar)
    userConnected.addGameHard(juegosDesordenados);
    // Guardamos los datos de la partida original a la copia
    userConnected.games.hard[userConnected.games.hard.length - 1] = partida;
    userConnected.games.hard.splice(indexT, 1);
    console.log(userConnected);
    // Guardamos los cambios en el local y session
    saveGame(userConnected);
    // Iniciamos la partida con el primer juego que no ha sido completado
    selectDifficulty("hard", true);
}

function createMenuFinal() {
    submenu.style = "display: none";
    let puntajeTotal;
    if (dificultad == "easy") {
        puntajeTotal =
            userConnected.games.easy[userConnected.games.easy.length - 1].score;
    } else if (dificultad == "medium") {
        puntajeTotal =
            userConnected.games.medium[userConnected.games.medium.length - 1]
                .score;
    } else if (dificultad == "hard") {
        puntajeTotal =
            userConnected.games.hard[userConnected.games.hard.length - 1].score;
    }
    return `
    <div class="puntuacion-main">
        <h1>Puntuación Total</h1>

        <div class="puntuacion">${puntajeTotal}</div>
        <div class="puntuacion-items">
            <section class="puntuacion-item">
                <h2>Algo</h2>
                <p></p>
            </section>
            <section class="puntuacion-item">
                <h2>Tiempo</h2>
                <p>${tiempoTranscurrido.textContent}</p>
            </section>
            <section class="puntuacion-item">
                <h2>Pistas usadas</h2>
                <p>0</p>
            </section>
        </div>
        <div class="botones-TablaDePuntuaciones">
            <button class="btn-TablaDePuntuaciones" onclick="">Volver a jugar</button>
            <button class="btn-TablaDePuntuaciones" onclick="redirigirATablaPuntuaciones()">Tabla de puntuaciones</button>
        </div>
    </div>
    `;
}

function redirigirATablaPuntuaciones() {
    location.href = "../pages/tablaPuntuaciones.html";
}
// Si el memory es el primero en crearse
function isCreateMemoryFirst() {
    if (juegosDesordenados[0] == createGameMemory) {
        return true;
    }
    return false;
}

function selectDifficulty(difficulty, partidaGuardada) {
    console.log(partidaGuardada);
    // Desaparecera el mensaje por defecto despues de 5seg
    setTimeout(() => {
        dialogue.style = "display: none";
    }, 5000);

    // Cargando partida guardada
    if (partidaGuardada) {
        if (difficulty == "easy") {
            maxScore = 2400;
            dificultad = "easy";
            if (isCreateMemoryFirst()) {
                juegosDesordenados[0](8);
            } else {
                juegosDesordenados[0]();
            }
        } else if (difficulty == "medium") {
            maxScore = 2100;
            dificultad = "medium";
            if (isCreateMemoryFirst()) {
                juegosDesordenados[0](12);
            } else {
                juegosDesordenados[0]();
            }
        } else if (difficulty == "hard") {
            dificultad = "hard";
            maxScore = 1800;
            // Agregar la partida al jugador
            if (isCreateMemoryFirst()) {
                juegosDesordenados[0](16);
            } else {
                juegosDesordenados[0]();
            }
        }

        iniciarCrono();
        submenu.style = "display: flex";
    } else {
        // Nueva partida
        if (difficulty == "easy") {
            maxScore = 2400;
            dificultad = "easy";
            //
            juegosDesordenados.splice(2);
            userConnected.addGameEasy(juegosDesordenados);
            // Agregar la partida al jugador
            saveGame(userConnected);

            if (isCreateMemoryFirst()) {
                juegosDesordenados[0](8);
            } else {
                juegosDesordenados[0]();
            }

            console.log(juegosDesordenados);
        } else if (difficulty == "medium") {
            maxScore = 2100;
            dificultad = "medium";
            //
            juegosDesordenados.splice(3);

            // Agregar la partida al jugador
            userConnected.addGameMedium(juegosDesordenados);
            saveGame(userConnected);

            if (isCreateMemoryFirst()) {
                juegosDesordenados[0](12);
            } else {
                juegosDesordenados[0]();
            }

            console.log(juegosDesordenados);
        } else if (difficulty == "hard") {
            dificultad = "hard";
            maxScore = 1800;
            // Agregar la partida al jugador
            userConnected.addGameHard(juegosDesordenados);
            saveGame(userConnected);

            if (isCreateMemoryFirst()) {
                juegosDesordenados[0](16);
            } else {
                juegosDesordenados[0]();
            }

            console.log(juegosDesordenados);
        }

        iniciarCrono();
        submenu.style = "display: flex";
    }
}

// Limpia el main entre juegos
function limpiarMain() {
    document.querySelector("#main > div").remove();
}

function mostrarDialogo(mensaje) {
    dialogue.style = "display: block";
    dialogue.textContent = mensaje;
    setTimeout(() => {
        dialogue.style = "display: none";
    }, 3000);
}

// Ejecutamos el siguiente juego, en el caso del Memory depende de la dificultad mostrara cierto numero de cartas a adivinar
function irAlSiguienteJuego() {
    juegosDesordenados.shift();

    if (juegosDesordenados.length == 0) {
        pararCrono();
        // Mostrar pantalla final con la puntuacion

        setTimeout(() => {
            limpiarMain();
            main.innerHTML = createMenuFinal();
            console.log("creando menu final");
            mostrarDialogo("Se acabo");
        }, 2000);
    } else if (
        juegosDesordenados[0] == createGameMemory &&
        dificultad == "easy"
    ) {
        setTimeout(() => {
            juegosDesordenados[0](8);
        }, 2000);
    } else if (
        juegosDesordenados[0] == createGameMemory &&
        dificultad == "medium"
    ) {
        setTimeout(() => {
            juegosDesordenados[0](12);
        }, 2000);
    } else if (
        juegosDesordenados[0] == createGameMemory &&
        dificultad == "hard"
    ) {
        setTimeout(() => {
            juegosDesordenados[0](16);
        }, 2000);
    } else {
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0]();
        }, 2000);
    }
}

function createGameAdivinarPalabraDesordenada() {
    limpiarMain();
    obtenerPalabras();
    console.log("Otro juego");
}

function createOtherGame2() {
    console.log("Otro juego");
    irAlSiguienteJuego();
}

function createGameCodigoCesar() {
    limpiarMain();
    crearCandado();
    generarCodigo();
    cambiarNumeroDeLaCerradura();

    let mainPopUp = document.querySelector(".main-popup");
    let nota = document.querySelector(".candado-nota");
    let btnProbarCodigo = document.querySelector("#btnProbarCodigo");

    nota.addEventListener("click", mirarNota);
    mainPopUp.addEventListener("click", dejarDeMirarNota);
    btnProbarCodigo.addEventListener("click", probarCodigo);
}

function createGameMemory(cantidadDeCartas) {
    limpiarMain();
    generarCartas(cantidadDeCartas);
    generarContenidoEnCartas(cantidadDeCartas);

    let cartas = document.querySelectorAll(".card-memory");

    cartas.forEach((carta) => {
        carta.addEventListener("click", () => {
            darVueltaCarta(carta);
            compararCartas();
            juegoMemoryCompletado(cantidadDeCartas);
        });
    });
}

//-------------------------------- EVENTOS ----------------------------------
btnStartEscapeRoom.addEventListener("click", () => {
    main.innerHTML = createMenuSelectDifficulty();
});

btnMostrarPartidasIncompletas.addEventListener("click", () => {
    document.querySelector(".menu-start-game").style = "display: none";
    document.querySelector(".partidas-incompletas-main").style =
        "display: block";
    crearMenuMostrarPartidasIncompletas();
});

btnVolverAInicio.addEventListener("click", () => {
    document.querySelector(".menu-start-game").style = "display: block";
    document.querySelector(".partidas-incompletas-main").style =
        "display: none";
});
