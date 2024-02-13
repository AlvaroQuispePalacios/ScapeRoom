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
                    <section>Flecha arriba</section>
                    <section>0</section>
                    <section>Flecha abajo</section>
                </div>

                <div class="candado-tablero-item">
                    <section>Flecha arriba</section>
                    <section>0</section>
                    <section>Flecha abajo</section>
                </div>

                <div class="candado-tablero-item">
                    <section>Flecha arriba</section>
                    <section>0</section>
                    <section>Flecha abajo</section>
                </div>

                <div class="candado-tablero-item">
                    <section>Flecha arriba</section>
                    <section>0</section>
                    <section>Flecha abajo</section> 
                </div>

            </section>

            <section>
                <button>Probar combinación</button>
            </section>
        </article>
    `;
}
