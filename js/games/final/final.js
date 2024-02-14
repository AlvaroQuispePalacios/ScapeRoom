// FINAL DEL JUEGO
/*
    - Al terminar el los juegos obtendran una nota con un numero 
    - Crea un nuevo div.final-main dentro del main
    - Crea la cerradura y la funcionalidad 4 digitos 
*/
let nota = document.querySelector(".candado-nota img");

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
                <button>Probar combinación</button>
            </section>
    </article>
    <section class="candado-nota">
        <img src="../img/nota1.png" alt="nota1">
    </section>
    `;
}

// Da la funcionalidad a los botones para poder cambiar los numeros y adivinar el codigo
function cambiarNumeroDeLaCerradura() {
    let candadoTableroItem = document.querySelectorAll(".candado-tablero-item");
    candadoTableroItem.forEach((item) => {
        item.children[0].addEventListener("click", () => {
            item.children[1].textContent =
                Number(item.children[1].textContent) + 1;
            if (Number(item.children[1].textContent) > 9) {
                item.children[1].textContent = 0;
            }
        });

        item.children[2].addEventListener("click", () => {
            item.children[1].textContent =
                Number(item.children[1].textContent) - 1;
            if (Number(item.children[1].textContent) < 0) {
                item.children[1].textContent = 9;
            }
        });
    });
}
/*
    - Cuando se presione la nota aparecera la nota mas grande con las intrucciones si es en modo facil utilizara el cifrado cesar, en medio otro cifrado, y en dificil otro
*/

function mirarNota(){
    nota.addEventListener("click", () => {
        // Agregar animacion de acercamiento a nota2(Es un popup)
    });
}