// FINAL DEL JUEGO
/*
    - Al terminar el los juegos obtendran una nota con un numero 
    - Crea un nuevo div.final-main dentro del main
    - Crea la cerradura y la funcionalidad 4 digitos 
*/
// let nota = document.querySelector(".candado-nota");
let codigo = Array();

function generarCodigo() {
    min = Math.ceil(0);
    max = Math.floor(9);
    let candado = document.querySelector(".candado");
    for(let i = 0 ; i < 4; i++){
        let numeroRandom = Math.floor(Math.random() * (max - min + 1) + min);
        codigo.push(numeroRandom+2);
        candado.innerHTML += `<div class="codigo-item item${i+1}">${numeroRandom}</div>`;
    }

    //
    for(let y = 0; y < codigo.length; y++){
        if(codigo[y] == 10){
            codigo[y] = 1;
        }
        if(codigo[y] == 11){
            codigo[y] = 0;
        }
    }

    console.log(codigo);
}

function crearCandado() {
    main.innerHTML = `<div class="final-main"></div>`;
    document.querySelector(".final-main").innerHTML = `
        <article class="candado">

            <section class="candado-tablero">

                <div class="candado-tablero-item">
                    <button>▲</button>
                    <section>0</section>
                    <button>▼</button>
                </div>

                <div class="candado-tablero-item">
                    <button>▲</button>
                    <section>0</section>
                    <button>▼</button>
                </div>

                <div class="candado-tablero-item">
                    <button>▲</button>
                    <section>0</section>
                    <button>▼</button>
                </div>

                <div class="candado-tablero-item">
                    <button>▲</button>
                    <section>0</section>
                    <button>▼</button>
                </div>

            </section>

            <section class="candado-btn">
                <button id="btnProbarCodigo">Probar combinación</button>
            </section>
    </article>
    <section class="candado-nota">
        <img src="../img/nota1.png" alt="nota1">
    </section>

    <div class="main-popup">
        <div class="contenido-popup">
            <img src="../../../img/nota3.png" alt="nota2" class="nota2" />
        </div>
    </div>  
    `;
}

// Da la funcionalidad a los botones para poder cambiar los numeros y adivinar el codigo
function cambiarNumeroDeLaCerradura() {
    let candadoTableroItem = document.querySelectorAll(".candado-tablero-item");
    candadoTableroItem.forEach((item) => {
        item.children[0].addEventListener("click", () => {
            item.children[1].textContent = Number(item.children[1].textContent) + 1;
            if (Number(item.children[1].textContent) > 9) {
                item.children[1].textContent = 0;
            }
        });

        item.children[2].addEventListener("click", () => {
            item.children[1].textContent = Number(item.children[1].textContent) - 1;
            if (Number(item.children[1].textContent) < 0) {
                item.children[1].textContent = 9;
            }
        });
    });
}

//Prueba el codigo introducido por el usuario y si el codigo es correcto salta al siguiente juego o si es el juego final salta la ventana donde se muestra el tiempo de la partida, pistas utilizadas y el puntaje de la partida
function probarCodigo(){
    let codigoIntroducido = Array();
    let esCodigoValido = Array();
    let candadoTableroItemNumero = document.querySelectorAll(".candado-tablero-item section");
    candadoTableroItemNumero.forEach((numero) => {
        codigoIntroducido.push(Number(numero.textContent));
    });

    for(let i = 0; i < 4; i++){
        if(codigo[i] == codigoIntroducido[i]){
            esCodigoValido.push(true);
        }else{
            esCodigoValido.push(false);
        }
    }

    juegoAdivinarCodigoCompletado(esCodigoValido)
    console.log(esCodigoValido);

}  

function juegoAdivinarCodigoCompletado(array) {
    if(array[0] && array[1] && array[2] && array[3]){
        mostrarDialogo("Juego completado");
        // Si quieres introducir para poder regresar a una partida hay que agregar juegoAdivinarCodigoCompletado = true para guardarlo en la partida, con el codigo generado anteriormente y volverlos a cargar para poder jugar donde lo dejamos
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
}

/*
    - Cuando se presione la nota aparecera la nota mas grande con las intrucciones si es en modo facil utilizara el cifrado cesar, en medio otro cifrado, y en dificil otro
*/

function mirarNota() {
    let mainPopUp = document.querySelector(".main-popup");
    mainPopUp.style = "display:block";
}

function dejarDeMirarNota() {
    let mainPopUp = document.querySelector(".main-popup");
    mainPopUp.style = "display:none";
}