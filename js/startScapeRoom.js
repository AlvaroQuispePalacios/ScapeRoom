// En este archivo me canse del ingles
const btnStartScapeRoom = document.getElementById("btnStartScapeRoom");
const main = document.getElementById("main");
const submenu = document.querySelector(".submenu");
const dialogue = document.querySelector(".dialogue");

const arrayDeJuegos = [createGameMemory, createGameAdivinarPalabraDesordenada, createOtherGame2, createGameCodigoCesar];
const juegosDesordenados = seleccionarJuegosAleatoriamente();
let dificultad;
let user = User.fromJSON(JSON.parse(sessionStorage.getItem("connected")));
console.log(user);
console.log(user.getUsername());
console.log(juegosDesordenados);

// ---------------------------- MENU ----------------------
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
        <button onclick="selectDifficulty('easy')">Facil</button>
        <button onclick="selectDifficulty('medium')">Intermedio</button>
        <button onclick="selectDifficulty('hard')">Dificil</button>
    </div>
    `;
}

// Si el memory es el primero en crearse
function isCreateMemoryFirst() {
    if (juegosDesordenados[0] == createGameMemory) {
        return true;
    }
    return false;
}

function selectDifficulty(difficulty) {
    // Desaparecera el mensaje por defecto despues de 7seg
    setTimeout(() => {
        dialogue.style = "display: none";
    }, 5000);

    if (difficulty == "easy") {

        dificultad = "easy";

        // user.addGameEasy(
        //     {
        //         games: [
        //             {
                        
        //             }
        //         ],
        //         time: ,
        //         score: 

        //     }
        // );

        juegosDesordenados.splice(2);

        if (isCreateMemoryFirst()) {
            juegosDesordenados[0](8);
        } else {
            juegosDesordenados[0]();
        }
        submenu.style = "display: flex";
        console.log(juegosDesordenados);


    } else if (difficulty == "medium") {
        dificultad = "medium";

        juegosDesordenados.splice(3);
        if (isCreateMemoryFirst()) {
            juegosDesordenados[0](12);
        } else {
            juegosDesordenados[0]();
        }

        submenu.style = "display: flex";

        console.log(juegosDesordenados);

    } else if (difficulty == "hard") {
        dificultad = "hard";

        if (isCreateMemoryFirst()) {
            juegosDesordenados[0](12);
        } else {
            juegosDesordenados[0]();
        }

        submenu.style = "display: flex";
        console.log(juegosDesordenados);
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
function irAlSiguienteJuego(){
    juegosDesordenados.shift();

    if(juegosDesordenados.length == 0){
        setTimeout(() => {
            limpiarMain();
            mostrarDialogo("Se acabo")
        }, 2000);
    }else if((juegosDesordenados[0] == createGameMemory) && dificultad == "easy"){
        setTimeout(() => {
            juegosDesordenados[0](8);
            
        }, 2000);
    }else if((juegosDesordenados[0] == createGameMemory) && dificultad == "medium"){
        setTimeout(() => {
            juegosDesordenados[0](12);
            
        }, 2000);
    }else if((juegosDesordenados[0] == createGameMemory) && dificultad == "hard"){
        setTimeout(() => {
            juegosDesordenados[0](16);
        }, 2000);
    }else{
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0]();
        }, 2000);
    }
}

function createGameAdivinarPalabraDesordenada() {
    limpiarMain();
    // ASYNC
    obtenerPalabras();
    
    console.log("Otro juego");
    // irAlSiguienteJuego();
}

function createOtherGame2() {
    console.log("Otro juego");

    // irAlSiguienteJuego();
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

//
btnStartScapeRoom.addEventListener("click", () => {
    main.innerHTML = createMenuSelectDifficulty();
});
