// En este archivo se procerá los datos de los usuarios para mostrar el nombre, 

let tablaPuntuacionesUsuarios = document.querySelector(".tabla-puntuaciones-usuarios");
let usuarios = JSON.parse(localStorage.getItem("users"));
console.log(usuarios);

function generarEntradaRanking(usuario, index, mejorIntento){
    tablaPuntuacionesUsuarios.innerHTML = "";
    let juegos = Array();
    mejorIntento.gamesOfTheGame.forEach((item) => {
        if(item.gameName == "createGameMemory"){
            juegos.push("Memory");
        }else if(item.gameName == "createGameCodigoCesar"){
            juegos.push("Codigo Cesar");
        }else if(item.gameName == "createGameAdivinarPalabraDesordenada"){
            juegos.push("Palabra Desordenada");
        }
    });
    juegos.join(", ");
    tablaPuntuacionesUsuarios.innerHTML += `
    <div class="usuario-puntaje">
        <div class="usuario-puntaje-item">${index + 1}</div>
        <div class="usuario-puntaje-item">${usuario.username}</div>
        <div class="usuario-puntaje-item">${juegos}</div>
        <div class="usuario-puntaje-item">${mejorIntento.totalTime}</div>
        <div class="usuario-puntaje-item">${mejorIntento.score}</div>
    </div>
    `;
}

usuarios.forEach((usuario, index) => {
    let gamesEasy = usuario.games.easy;
    let arrayJuegosFinalizados = Array();
    console.log(gamesEasy);
    gamesEasy.forEach((game) => {
        if(game.finalizedGame == true){
            arrayJuegosFinalizados.push(game);
        }
    })
    arrayJuegosFinalizados.sort((a, b) => {return a.score - b.score});
    console.log(arrayJuegosFinalizados);
    
    generarEntradaRanking(usuario, index, arrayJuegosFinalizados[arrayJuegosFinalizados.length - 1]);
});
