let palabra;
let palabraCorrectaArray;
let palabraDesordenada;
function obtenerPalabras() {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            const respuesta = JSON.parse(request.responseText);
            // Dependiendo de la dificultad se generarán ciertas palabras
            if (dificultad == "easy") {
                palabra = obtenerPalabraAleatoria(respuesta.easy);
                palabraCorrectaArray = [...palabra];
                palabraDesordenada = desordenarPalabra(palabra);
            } else if (dificultad == "medium") {
                palabra = obtenerPalabraAleatoria(respuesta.medium);
                palabraCorrectaArray = [...palabra];
                palabraDesordenada = desordenarPalabra(palabra);
            } else if (dificultad == "hard") {
                palabra = obtenerPalabraAleatoria(respuesta.hard);
                palabraCorrectaArray = [...palabra];
                palabraDesordenada = desordenarPalabra(palabra);
            }
            console.log(palabra);
            generarPalabraDesordenadaTablero();

            let filaItem = document.querySelectorAll(".fila-item");
            let letraUsuario = document.querySelectorAll(".letra");
            let letrasEscritasPorElUsuario = Array();
            let contador = 0;

            document.addEventListener("keydown", (e) => {
                let userInput = e.key;
                // Verifica si la tecla presionada es una letra
                if (/^[a-zA-Z]$/.test(userInput)) {
                    // Efecto de presionar una tecla en el teclado virtual
                    filaItem.forEach((item) => {
                        if(userInput.toUpperCase() == item.textContent){
                            item.classList.add("fila-item-toggle");
                            setTimeout(() => {
                                item.classList.remove("fila-item-toggle");
                            }, 100);
                        }
                    });
                    // 
                    if (contador < letraUsuario.length) {
                        // Muestra por pantalla lo que escribe el usuario
                        letraUsuario[contador].textContent = userInput.toUpperCase();
                        // Guarda lo que escribe el usuario para despues compararlo
                        letrasEscritasPorElUsuario.push(userInput.toUpperCase());
                        contador++;
                        if (contador == letraUsuario.length) {
                            console.log("PROBANDO COMBINACION");
                            // Si el juego ha sido terminado lo guarda el tiempo y lo marca como finalizado y pasa al siguiente juego
                            if (compararElementosDeLosArrays(letrasEscritasPorElUsuario, palabraCorrectaArray)) {
                                mostrarDialogo("Felicidades adivinaste la palabra");
                                userConnected.resultGame(createGameAdivinarPalabraDesordenada, dificultad, tiempoTranscurrido);
                                saveGame(userConnected);
                                irAlSiguienteJuego();

                            } else {
                                contador++;
                                letrasEscritasPorElUsuario = Array();
                                mostrarDialogo("Incorrecto")
                            }

                            if (contador > letraUsuario.length) {
                                setTimeout(() => {
                                    contador = 0;
                                    letraUsuario.forEach((letra) => letra.textContent = "__");
                                }, 100)
                            }
                        }
                    }
                }
            });

        } else if (request.readyState === 4) {
            mostrarDialogo("Ha ocurrido un error D:");
        }
    });
    request.open("GET", "/js/games/adivinarPalabraDesordenada/palabras.json", true);
    request.send();
}

function obtenerPalabraAleatoria(arrayPalabras) {
    min = Math.ceil(0);
    max = Math.floor(arrayPalabras.length);
    return arrayPalabras[Math.floor(Math.random() * (max - min + 1) + min)].toUpperCase();
}

function desordenarPalabra(palabra) {
    return palabra.split('').sort(function () {
        return 0.5 - Math.random();
    }).join('').toUpperCase();
}

function generarPalabraDesordenadaTablero() {
    main.innerHTML = `<div class="adivinarPalabraDesordenada-main"></div>`;

    let adivinarPalabraDesordenadaMain = document.querySelector(".adivinarPalabraDesordenada-main");
    adivinarPalabraDesordenadaMain.innerHTML = `
        <h2>Ordena la palabra</h2>
        <section class="palabra-desordenada"></section>
        <section class="palabra"></section>
        <section class="teclado">
                <div class="fila fila1">
                    <div class="fila-item-relleno fila1-relleno1"></div>
                    <button class="fila-item">Q</button>
                    <button class="fila-item">W</button>
                    <button class="fila-item">E</button>
                    <button class="fila-item">R</button>
                    <button class="fila-item">T</button>
                    <button class="fila-item">Y</button>
                    <button class="fila-item">U</button>
                    <button class="fila-item">I</button>
                    <button class="fila-item">O</button>
                    <button class="fila-item">P</button>
                    <div class="fila-item-relleno fila1-relleno2"></div>
                    <div class="fila-item-relleno fila1-relleno2"></div>
                    <div class="fila-item-relleno fila1-relleno3"></div>
                </div>

                <div class="fila fila2">
                    <div class="fila-item-relleno fila2-relleno1"></div>
                    <button class="fila-item">A</button>
                    <button class="fila-item">S</button>
                    <button class="fila-item">D</button>
                    <button class="fila-item">F</button>
                    <button class="fila-item">G</button>
                    <button class="fila-item">H</button>
                    <button class="fila-item">J</button>
                    <button class="fila-item">K</button>
                    <button class="fila-item">L</button>
                    <button class="fila-item">Ñ</button>
                    <div class="fila-item-relleno fila2-relleno2"></div>
                    <div class="fila-item-relleno fila2-relleno2"></div>
                    <div class="fila-item-relleno fila2-relleno3"></div>
                </div>

                <div class="fila fila3">
                    <div class="fila-item-relleno fila3-relleno1"></div>
                    <button class="fila-item">Z</button>
                    <button class="fila-item">X</button>
                    <button class="fila-item">C</button>
                    <button class="fila-item">V</button>
                    <button class="fila-item">B</button>
                    <button class="fila-item">N</button>
                    <button class="fila-item">M</button>
                    <div class="fila-item-relleno fila3-relleno2"></div>
                    <div class="fila-item-relleno fila3-relleno2"></div>
                    <div class="fila-item-relleno fila3-relleno2"></div>
                    <div class="fila-item-relleno fila3-relleno3"></div>
                </div>

                <div class="fila fila4">
                    <div class="fila-item-relleno fila4-relleno1"></div>
                    <div class="fila-item-relleno fila4-relleno2"></div>
                    <div class="fila-item-relleno fila4-relleno3"></div>
                    <button class="fila-item-espacio"></button>
                    <div class="fila-item-relleno fila4-relleno1"></div>
                    <div class="fila-item-relleno fila4-relleno2"></div>
                    <div class="fila-item-relleno fila4-relleno3"></div>
                    <div class="fila-item-relleno fila4-relleno3"></div>
                </div>

            </section>
    `;
    // Genera las letras que se mostraran de la palabraDesordenada por pantalla
    for (let i = 0; i < palabraDesordenada.length; i++) {
        document.querySelector(".palabra-desordenada").innerHTML += `<div class="letra-desordenada">${palabraDesordenada[i]}</div>`;
    }
    // Genera los espacios donde saldran las letras que el usuario presione
    for (let i = 0; i < palabra.length; i++) {
        document.querySelector(".palabra").innerHTML += `<div class="letra">__</div>`
    }
}

function compararElementosDeLosArrays(arrayLetrasUsuario, arrayPalabraCorrecta) {
    let array = Array();
    for (let i = 0; i < arrayPalabraCorrecta.length; i++) {
        if (arrayPalabraCorrecta[i] == arrayLetrasUsuario[i]) {
            array.push(true);
        } else {
            array.push(false);
        }
    }
    let resultado = array.reduce((acumulador, valorActual) => acumulador && valorActual, true);
    return resultado;
};