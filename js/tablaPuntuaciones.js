// En este archivo se procerá los datos de los usuarios para mostrar el nombre, 
const tablaPuntuacionesUsuarios = document.querySelector(".tabla-puntuaciones-usuarios");
const btnTablaPuntuacionesDificultadEasy = document.getElementById("btnTablaPuntuacionesDificultadEasy");
const btnTablaPuntuacionesDificultadMedium = document.getElementById("btnTablaPuntuacionesDificultadMedium");
const btnTablaPuntuacionesDificultadHard = document.getElementById("btnTablaPuntuacionesDificultadHard");
const btnDificultad = document.querySelectorAll(".btn-dificultad");
let usuarios = JSON.parse(localStorage.getItem("users"));

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
        // Verifica que al menos exista una partida 
        if(arrayJuegosFinalizados.length > 0){
            // Ordena en orden ascendente las partidas del usuario dejando la mejor partida al final del array
            arrayJuegosFinalizados.sort((a, b) => { return a.score - b.score });
            // Se le pasa el usuario y la mejor partida de este usuario 
            mejoresPartidas.push({ "usuario": usuario, "mejorPartida": arrayJuegosFinalizados[arrayJuegosFinalizados.length - 1] });
        }
        
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
            // Solamente se ordenara las partidas que se hayan finalizado
            if (game.finalizedGame == true) {
                arrayJuegosFinalizados.push(game);
            }
        })
        // Verifica que al menos exista una partida 
        if(arrayJuegosFinalizados.length > 0){
            // Ordena en orden ascendente las partidas del usuario dejando la mejor partida al final del array
            arrayJuegosFinalizados.sort((a, b) => { return a.score - b.score });
            // Se le pasa el usuario y la mejor partida de este usuario 
            mejoresPartidas.push({ "usuario": usuario, "mejorPartida": arrayJuegosFinalizados[arrayJuegosFinalizados.length - 1] });
        }
        
    });
    // Acomoda las partidas dependiendo del score para asi poder mostrarla en la tabla de puntuaciones
    mejoresPartidas.sort((a, b) => { return b.mejorPartida.score - a.mejorPartida.score });
    generarEntradaRanking(mejoresPartidas);
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
        // Verifica que al menos exista una partida 
        if(arrayJuegosFinalizados.length > 0){
            // Ordena en orden ascendente las partidas del usuario dejando la mejor partida al final del array
            arrayJuegosFinalizados.sort((a, b) => { return a.score - b.score });
            // Se le pasa el usuario y la mejor partida de este usuario 
            mejoresPartidas.push({ "usuario": usuario, "mejorPartida": arrayJuegosFinalizados[arrayJuegosFinalizados.length - 1] });
        }
        
    });
    // Acomoda las partidas dependiendo del score para asi poder mostrarla en la tabla de puntuaciones
    mejoresPartidas.sort((a, b) => { return b.mejorPartida.score - a.mejorPartida.score });
    generarEntradaRanking(mejoresPartidas);
}

obtenerMejorJuegoEasy();

btnTablaPuntuacionesDificultadEasy.addEventListener("click", () => {
    btnTablaPuntuacionesDificultadEasy.classList.add("btn-seleccionado");
    btnTablaPuntuacionesDificultadMedium.classList.remove("btn-seleccionado");
    btnTablaPuntuacionesDificultadHard.classList.remove("btn-seleccionado");
    obtenerMejorJuegoEasy();
});
btnTablaPuntuacionesDificultadMedium.addEventListener("click",() => {
    btnTablaPuntuacionesDificultadMedium.classList.add("btn-seleccionado");
    btnTablaPuntuacionesDificultadEasy.classList.remove("btn-seleccionado");
    btnTablaPuntuacionesDificultadHard.classList.remove("btn-seleccionado");
    obtenerMejorJuegoMedium()  ;
});
btnTablaPuntuacionesDificultadHard.addEventListener("click", () => {
    btnTablaPuntuacionesDificultadHard.classList.add("btn-seleccionado");
    btnTablaPuntuacionesDificultadMedium.classList.remove("btn-seleccionado");
    btnTablaPuntuacionesDificultadEasy.classList.remove("btn-seleccionado");
    obtenerMejorJuegoHard();
});