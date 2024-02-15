// --------------------------------- JUEGO MEMORY-----------------------------
const animacionCarta = [
    { transform: "rotate3d(0, 2, 0, 0deg)" },
    { transform: "rotate3d(0, 2, 0, 45deg)" },
    { transform: "rotate3d(0, 2, 0, 90deg)" },
    { transform: "rotate3d(0, 2, 0, 45deg)" },
    { transform: "rotate3d(0, 2, 0, 0deg)" },
];

let arrayCompararCartasObjeto = Array();
let arrayCompararCartasContenido = Array();
let contadorMemory = 0;
let aciertosMemory = 0;
let memoryCompletado = false;


// Da la animacion de vuelta de carta y agrega la carta en el array correspondiente
function darVueltaCarta(carta) {
    carta.animate(animacionCarta, 500);
    carta.disabled = true;
    carta.firstElementChild.style = "opacity: 1";
    arrayCompararCartasObjeto.push(carta);
    arrayCompararCartasContenido.push(carta.firstElementChild.textContent);
    contadorMemory++;
}

// Compara las cartas elegidas y si el contenido es igual deja a las cartas deshabilitadas y si no les da vuelta nuevamente
function compararCartas() {
    if (contadorMemory == 2) {
        if (arrayCompararCartasContenido[0] == arrayCompararCartasContenido[1]) {
            contadorMemory = 0;
            aciertosMemory++;
            arrayCompararCartasContenido = [];
            arrayCompararCartasObjeto = [];
        } else {
            setTimeout(() => {
                arrayCompararCartasObjeto.forEach((carta) => {
                    carta.animate(animacionCarta, 500);
                    carta.disabled = false;
                    carta.firstElementChild.style = "opacity: 0";
                });
                arrayCompararCartasContenido = [];
                arrayCompararCartasObjeto = [];
                contadorMemory = 0;
            }, 400);
        }
    }
}

// Genera el contenedor de las cartas y genera las cartas
function generarCartas(cantidadCartas) {
    main.innerHTML = `<div class="memory-main"></div>`;
    for (let i = 0; i < cantidadCartas; i++) {
        document.querySelector(".memory-main").innerHTML +=
            `
            <button class="card-memory">
                <span class="card-memory-content"></span>
            </button>
        `;
    }
}

function generarContenidoEnCartas(cantidadCartas) {
    let arrayDesornado = [];
    // Genera el contenido del array
    for (let i = 0; i < cantidadCartas / 2; i++) {
        arrayDesornado.push(i + 1);
    }
    arrayDesornado.forEach((e) => {
        arrayDesornado.push(e);
    });
    // Desordena el array
    arrayDesornado = arrayDesornado.sort(() => {
        return Math.random() - 0.5;
    })

    // Ingresa el contenido del array a las cartas
    let cards = document.querySelectorAll(".card-memory-content");
    cards.forEach((card, index) => {
        card.textContent = arrayDesornado[index];
    })
}

function juegoMemoryCompletado(cantidadDeCartas) {
    if(aciertosMemory == (cantidadDeCartas/2)){
        console.log("El juego memory acabo");
        memoryCompletado = true;
        // Aqui ira la animacion de obtener una nota donde habra un numero
        mostrarDialogo("Juego completado")
        irAlSiguienteJuego();
    }
}


