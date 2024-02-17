const palabras = Array();
let palabraDesordenada;

function obtenerPalabra(){
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
        // 4 significa que ha terminado la peticion
        // El 200 significa si ha tenido una respuesta exitosa(successful responses)
        if (request.readyState === 4 && request.status === 200) {
            const respuesta = JSON.parse(request.responseText);
            // miCallback(undefined, respuesta);
            console.log(respuesta);

        } else if (request.readyState === 4) {
            // miCallback("No se han podido obtener los datos", undefined);
        }
    });
    request.open("GET", "./palabras.json");
    request.send();
}

function desordenarPalabra(){

}

function generarPalabraDesordenada(){
    main.innerHTML = `<div class="adivinarPalabraDesordenada-main"></div>`;

    document.querySelector(".adivinarPalabraDesordenada-main").innerHTML = `<div class="palabra-desordenada"></div>`;
}

function generarPalabraUsuario(){

}

function generarTeclado(){

}

obtenerPalabra();