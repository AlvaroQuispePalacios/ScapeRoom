// En este archivo me canse del ingles
const btnStartScapeRoom = document.getElementById("btnStartScapeRoom");
const main = document.getElementById("main");
const submenu = document.querySelector(".submenu");
const dialogue = document.querySelector(".dialogue");
// const nGames = 2;

const arrayDeJuegos = [createGameMemory, createOtherGame1, createOtherGame2, createFinal];
const juegosDesordenados = seleccionarJuegosAleatoriamente();
let dificultad;
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
        juegosDesordenados.splice(2);
        console.log(juegosDesordenados);

        if (isCreateMemoryFirst()) {
            juegosDesordenados[0](8);
        } else {
            juegosDesordenados[0]();
        }
        submenu.style = "display: flex";

    } else if (difficulty == "medium") {
        dificultad = "medium";
        juegosDesordenados.splice(3);
        if (isCreateMemoryFirst()) {
            juegosDesordenados[0](12);
        } else {
            juegosDesordenados[0]();
        }
        // isCreateMemory(12);
        submenu.style = "display: flex";

    } else if (difficulty == "hard") {
        dificultad = "hard";
        if (isCreateMemoryFirst()) {
            juegosDesordenados[0](12);
        } else {
            juegosDesordenados[0]();
        }
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

function createOtherGame1() {
    juegosDesordenados.shift();
    if(juegosDesordenados.length == 0){
        setTimeout(() => {
            limpiarMain();
        }, 2000);

    }else if((juegosDesordenados[0] == createGameMemory) && dificultad == "easy"){
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0](8);
            
        }, 2000);
    }else if((juegosDesordenados[0] == createGameMemory) && dificultad == "medium"){
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0](12);
            
        }, 2000);
    }else if((juegosDesordenados[0] == createGameMemory) && dificultad == "hard"){
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0](16);
            
        }, 2000);
    }else{
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0]();
            
        }, 2000);
    }
}

function createOtherGame2() {
    juegosDesordenados.shift();
    if(juegosDesordenados.length == 0){
        console.log("los juegos terminaron");
        limpiarMain();
    }else if((juegosDesordenados[0] == createGameMemory) && dificultad == "easy"){
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0](8);
            
        }, 2000);
    }else if((juegosDesordenados[0] == createGameMemory) && dificultad == "medium"){
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0](12);
            
        }, 2000);
    }else if((juegosDesordenados[0] == createGameMemory) && dificultad == "hard"){
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0](16);
            
        }, 2000);
    }else{
        setTimeout(() => {
            // Ejecutamos el siguiente juego
            juegosDesordenados[0]();
            
        }, 2000);
    }

}

function createFinal() {
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
