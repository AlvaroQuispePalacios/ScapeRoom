// FINAL DEL JUEGO
/*
    - Al terminar el los juegos obtendran una nota con un numero 
    - Crea un nuevo div.final-main dentro del main
    - Crea la cerradura y la funcionalidad 4 digitos 
*/

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
    `;
}


function cambiarNumeroDeLaCerradura(){
    let candadoTableroItem = document.querySelectorAll(".candado-tablero-item");
    // Da la funcionalidad a los botones para poder cambiar los numeros y adivinar el codigo
    candadoTableroItem.forEach((item) => {
        item.children[0].addEventListener("click", () => {
            item.children[1].textContent = Number(item.children[1].textContent) + 1;
            if(Number(item.children[1].textContent) > 9){
                item.children[1].textContent = 0;
            }
        });

        item.children[2].addEventListener("click", () => {
            item.children[1].textContent = Number(item.children[1].textContent) - 1;
            if(Number(item.children[1].textContent) < 0){
                item.children[1].textContent = 9;
            }
        });
    });
}
