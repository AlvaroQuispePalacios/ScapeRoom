// En este archivo se procerá los datos de los usuarios para mostrar el nombre, 

const tablaPuntuacionesUsuarios = document.querySelector(".tabla-puntuaciones-usuarios");
const btnTablaPuntuacionesDificultadEasy = document.getElementById("btnTablaPuntuacionesDificultadEasy");
const btnTablaPuntuacionesDificultadMedium = document.getElementById("btnTablaPuntuacionesDificultadMedium");
const btnTablaPuntuacionesDificultadHard = document.getElementById("btnTablaPuntuacionesDificultadHard");

let usuarios = JSON.parse(localStorage.getItem("users"));
console.log(usuarios);
// Crea una entrada en la tabla de puntuaciones con los datos del mejor juego de cada usuario dependiendo de la dificultad 
// function generarEntradaRanking(usuario, index, mejorIntento) {
//     let juegos = Array();
//     if (mejorIntento != undefined) {
//         mejorIntento.gamesOfTheGame.forEach((item) => {
//             if (item.gameName == "createGameMemory") {
//                 juegos.push("Memory");
//             } else if (item.gameName == "createGameCodigoCesar") {
//                 juegos.push("Codigo Cesar");
//             } else if (item.gameName == "createGameAdivinarPalabraDesordenada") {
//                 juegos.push("Palabra Desordenada");
//             }
//         });
//         juegos.join(",");
//         tablaPuntuacionesUsuarios.innerHTML += `
//         <div class="usuario-puntaje">
//             <div class="usuario-puntaje-item">${index + 1}</div>
//             <div class="usuario-puntaje-item">${usuario.username}</div>
//             <div class="usuario-puntaje-item">${juegos}</div>
//             <div class="usuario-puntaje-item">${mejorIntento.totalTime}</div>
//             <div class="usuario-puntaje-item">${mejorIntento.score}</div>
//         </div>
//         `;
//     } else {
//         tablaPuntuacionesUsuarios.innerHTML += `Aún no hay partidas, sé el primero en obtener el primer puesto`;
//     }
// }

function generarEntradaRanking(mejoresPartidas) {
    mejoresPartidas.forEach((item, index) => {
        let juegos = Array();
            item.mejorPartida.gamesOfTheGame.forEach((item2) => {
                if (item2.gameName == "createGameMemory") {
                    juegos.push("Memory");
                } else if (item2.gameName == "createGameCodigoCesar") {
                    juegos.push("Codigo Cesar");
                } else if (item2.gameName == "createGameAdivinarPalabraDesordenada") {
                    juegos.push("Palabra Desordenada");
                }
            });
    
            juegos.join(", ");
    
            tablaPuntuacionesUsuarios.innerHTML += `
                <div class="usuario-puntaje">
                    <div class="usuario-puntaje-item">${index + 1}</div>
                    <div class="usuario-puntaje-item">${item.usuario.username}</div>
                    <div class="usuario-puntaje-item">${juegos}</div>
                    <div class="usuario-puntaje-item">${item.mejorPartida.totalTime}</div>
                    <div class="usuario-puntaje-item">${item.mejorPartida.score}</div>
                </div>
            `;
        
    });
}
// Obtiene el mejor juego del usuario en la dificultad fácil que haya sido terminado y lo muestra en la tabla de puntuaciones
function obtenerMejorJuegoEasy() {
    // Limpia la tabla de puntuaciones para poder mostrar las entradas
    tablaPuntuacionesUsuarios.innerHTML = "";
    // Guarda las mejores partidas de cada jugador
    let mejoresPartidas = Array();
    // Recorre todos los usuario buscando sus mejores partidas 
    usuarios.forEach((usuario) => {
        let gamesEasy = usuario.games.easy;
        let arrayJuegosFinalizados = Array();
        gamesEasy.forEach((game) => {
            if (game.finalizedGame == true) {
                arrayJuegosFinalizados.push(game);
            }
        })
        // Ordena en orden ascendente las partidas del usuario dejando la mejor partida al final del array
        arrayJuegosFinalizados.sort((a, b) => { return a.score - b.score });
        // Se le pasa el usuario y la mejor partida de este usuario 
        mejoresPartidas.push({ "usuario": usuario, "mejorPartida": arrayJuegosFinalizados[arrayJuegosFinalizados.length - 1] });
    });
    // Acomoda las partidas dependiendo del score para asi poder mostrarla en la tabla de puntuaciones
    mejoresPartidas.sort((a, b) => { return b.mejorPartida.score - a.mejorPartida.score });
    generarEntradaRanking(mejoresPartidas);
}

function obtenerMejorJuegoMedium() {
    // Limpia la tabla de puntuaciones para poder mostrar las entradas
    tablaPuntuacionesUsuarios.innerHTML = "";
    // Guarda las mejores partidas de cada jugador
    let mejoresPartidas = Array();
    // Recorre todos los usuario buscando sus mejores partidas 
    usuarios.forEach((usuario) => {
        let gamesMedium = usuario.games.medium;
        let arrayJuegosFinalizados = Array();
        gamesMedium.forEach((game) => {
            if (game.finalizedGame == true) {
                arrayJuegosFinalizados.push(game);
            }
        })
        // Ordena en orden ascendente las partidas del usuario dejando la mejor partida al final del array
        arrayJuegosFinalizados.sort((a, b) => { return a.score - b.score });
        // Se le pasa el usuario y la mejor partida de este usuario 
        mejoresPartidas.push({ "usuario": usuario, "mejorPartida": arrayJuegosFinalizados[arrayJuegosFinalizados.length - 1] });
    });
    // Verifica que al menos exista 1 partida para mostrar si no existe ninguna
    if(mejoresPartidas.mejorPartida != undefined){
        // Acomoda las partidas dependiendo del score para asi poder mostrarla en la tabla de puntuaciones
        mejoresPartidas.sort((a, b) => { return b.mejorPartida.score - a.mejorPartida.score });
        generarEntradaRanking(mejoresPartidas);
    }else{
        tablaPuntuacionesUsuarios.innerHTML += `Aún no hay partidas, sé el primero en obtener el primer puesto`;
    }
}

function obtenerMejorJuegoHard() {
    // Limpia la tabla de puntuaciones para poder mostrar las entradas
    tablaPuntuacionesUsuarios.innerHTML = "";
    // Guarda las mejores partidas de cada jugador
    let mejoresPartidas = Array();
    // Recorre todos los usuario buscando sus mejores partidas 
    usuarios.forEach((usuario) => {
        let gamesHard = usuario.games.hard;
        let arrayJuegosFinalizados = Array();
        gamesHard.forEach((game) => {
            if (game.finalizedGame == true) {
                arrayJuegosFinalizados.push(game);
            }
        })
        // Ordena en orden ascendente las partidas del usuario dejando la mejor partida al final del array
        arrayJuegosFinalizados.sort((a, b) => { return a.score - b.score });
        // Se le pasa el usuario y la mejor partida de este usuario 
        mejoresPartidas.push({ "usuario": usuario, "mejorPartida": arrayJuegosFinalizados[arrayJuegosFinalizados.length - 1] });
    });
    // Acomoda las partidas dependiendo del score para asi poder mostrarla en la tabla de puntuaciones
    mejoresPartidas.sort((a, b) => { return b.mejorPartida.score - a.mejorPartida.score });
    generarEntradaRanking(mejoresPartidas);
}

obtenerMejorJuegoEasy();
btnTablaPuntuacionesDificultadEasy.addEventListener("click", obtenerMejorJuegoEasy);
btnTablaPuntuacionesDificultadMedium.addEventListener("click", obtenerMejorJuegoMedium);
btnTablaPuntuacionesDificultadHard.addEventListener("click", obtenerMejorJuegoHard);