// Botones para mostrar el formulario de registro o login
const btnShowLogin = document.getElementById("btnShowLogin");
const btnShowRegister = document.getElementById("btnShowRegister");
// Formulario a mostrar
const lrLogin = document.getElementById("lrLogin");
const lrRegister = document.getElementById("lrRegister");

btnShowRegister.addEventListener("click", () => {
    lrLogin.style = "animation-name: hidden;animation-duration: .5s;";
    setTimeout(() => {
        lrLogin.style = "opacity: 0"
        lrLogin.style ="display:none"
    }, 400);
    lrRegister.style = "animation-name: show;animation-duration: .5s; display:flex";
});

btnShowLogin.addEventListener("click", () => {
    lrRegister.style = "animation-name: hidden;animation-duration: .5s;";
    setTimeout(() => {
        lrRegister.style = "opacity: 0"
        lrRegister.style ="display:none"
    }, 400);
    lrLogin.style = "animation-name: show;animation-duration: .5s; display:flex";
});