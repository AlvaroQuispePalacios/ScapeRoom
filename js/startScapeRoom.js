// En este archivo me canse del ingles
const btnStartScapeRoom = document.getElementById("btnStartScapeRoom");
const main = document.getElementById("main");
const nGames = 2;
// --------------------------------- JUEGO MEMORY-----------------------------

let arrayCompararCartasId = Array();
let arrayCompararCartasObjeto = Array();
let arrayCompararCartasContenido = Array();
let contadorMemory = 0;
let memoryCompletado;

// function darVuelta(cardMemoryId){
//     let cardMemory =  document.querySelector(`#${cardMemoryId} > span`);
//     cardMemory.style = "opacity:1";
//     arrayCompararCartasContenido.push(cardMemory.textContent);
//     arrayCompararCartasId.push(cardMemoryId);
//     if(contadorMemory < 2){
//         contadorMemory++;
//         if(arrayCompararCartasId.length == 2){
//             if((arrayCompararCartasContenido[0] == arrayCompararCartasContenido[1]) && (arrayCompararCartasId[0] != arrayCompararCartasId[1])){
//                 setTimeout(() => {
//                     arrayCompararCartasId.forEach((card) => {
//                         document.querySelector(`#${card}`).remove();
//                     });
//                     arrayCompararCartasContenido = Array();
//                     arrayCompararCartasId = Array();
//                     contadorMemory = 0;
//                     if(document.querySelector(".memory-main").children.length == 0){
//                         memoryCompletado = true;
//                     }
//                 }, 200);
//             }else{
//                 setTimeout(() => {
//                     document.querySelector(`#${arrayCompararCartasId[0]} > span`).style = "opacity:0";
//                     document.querySelector(`#${arrayCompararCartasId[1]} > span`).style = "opacity:0";
//                     arrayCompararCartasContenido = Array();
//                     arrayCompararCartasId = Array();
//                     contadorMemory = 0;
//                 }, 300);
//             }
//         }
//     }

// }

function darVueltaCarta(carta){
    carta.firstElementChild.style = "opacity: 1";
}

function compararCartas(carta){
    if(contadorMemory == 2){
        if((arrayCompararCartasContenido[0] == arrayCompararCartasContenido[1]) && (arrayCompararCartasObjeto[0] != arrayCompararCartasObjeto[1])){
            console.log(":D");
            console.log(arrayCompararCartasContenido);
            console.log(arrayCompararCartasObjeto);
        }else{
            console.log("D:");
            console.log(arrayCompararCartasContenido);
            console.log(arrayCompararCartasObjeto);
        }
    }else if (contadorMemory > 2){
        arrayCompararCartasContenido = arrayCompararCartasContenido.splice(2);
        arrayCompararCartasObjeto = arrayCompararCartasObjeto.splice(2);
        contadorMemory = 1;
    }
}

function generarCartas(cantidadCartas){
    main.innerHTML = `<div class="memory-main"></div>`;
    // for(let i = 0; i < cantidadCartas; i++){
    //     document.querySelector(".memory-main").innerHTML += 
    //     `
    //         <div class="card-memory" id="cardMemory${i+1}" onclick="darVuelta('cardMemory${i+1}')">
    //             <span class="card-memory-content"></span>
    //         </div>
    //     `;
    // }
    for(let i = 0; i < cantidadCartas; i++){
        document.querySelector(".memory-main").innerHTML += 
        `
            <div class="card-memory">
                <span class="card-memory-content"></span>
            </div>
        `;
    }
    
    let cartas = document.querySelectorAll(".card-memory");
    cartas.forEach((carta, index) => {
        carta.addEventListener("click", () => {
            darVueltaCarta(carta);
            arrayCompararCartasObjeto.push(index);
            arrayCompararCartasContenido.push(carta.firstElementChild.textContent);
            contadorMemory++;
            compararCartas();
        });
    });
}

function generarContenidoEnCartas(cantidadCartas){
    let arrayDesornado = [];
    // Genera el contenido del array
    for(let i = 0; i < cantidadCartas/2; i++){
        arrayDesornado.push(i+1);
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

function createGameMemory(cantidadDeCartas){
    generarCartas(cantidadDeCartas);
    generarContenidoEnCartas(cantidadDeCartas);

}

function seleccionarJuegosAleatoriamente(){

}

function createMenuSelectDifficulty(){
    return `
    <div class="menu-select-difficulty">
        <h2>Selecciona la dificultad</h2>
        <button onclick="selectDifficulty('easy')">Facil</button>
        <button onclick="selectDifficulty('medium')">Intermedio</button>
        <button onclick="selectDifficulty('hard')">Dificil</button>
    </div>
    `;
}

function selectDifficulty(difficulty){
    if(difficulty == "easy"){
        createGameMemory(8);
    }else if(difficulty == "medium"){
        createGameMemory(12);

    }else if(difficulty == "hard"){
        createGameMemory(16);
    }
}
// 

btnStartScapeRoom.addEventListener("click", () => {
    main.innerHTML = createMenuSelectDifficulty();
});