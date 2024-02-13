// En este archivo me canse del ingles
const btnStartScapeRoom = document.getElementById("btnStartScapeRoom");
const main = document.getElementById("main");
const submenu = document.querySelector(".submenu");
const submenuHintsDialogue = document.querySelector(".submenu-hints-dialogue");
// const nGames = 2;

const arrayDeJuegos = [createGameMemory, createOtherGame1, createOtherGame2];
const juegosDesordenados = seleccionarJuegosAleatoriamente();
let dificultad;
console.log(juegosDesordenados);

// ---------------------------- MENU ----------------------
function seleccionarJuegosAleatoriamente() {
    for (let i = arrayDeJuegos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayDeJuegos[i], arrayDeJuegos[j]] = [arrayDeJuegos[j], arrayDeJuegos[i]];
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
function isCreateMemoryFirst(){
    if(juegosDesordenados[0] == createGameMemory){
        return true;
    }
    return false;
}

function selectDifficulty(difficulty) {
    if (difficulty == "easy") {
        juegosDesordenados.splice(1, 2, createFinal);
        console.log(juegosDesordenados);
        if(isCreateMemoryFirst()){
            juegosDesordenados[0](8);
        }else{
            juegosDesordenados[0]();
        }

        submenu.style = "display: flex";
        
    } else if (difficulty == "medium") {
        dificultad = "medium";
        // isCreateMemory(12);

    } else if (difficulty == "hard") {
        dificultad = "hard";
        // isCreateMemory(16);
    }
}

function createOtherGame1(){

}

function createOtherGame2(){

}

function createFinal(){
    document.querySelector("#main > div").remove();
    crearCandado();
    console.log("Inicia el final del juego");
}

function createGameMemory(cantidadDeCartas) {

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