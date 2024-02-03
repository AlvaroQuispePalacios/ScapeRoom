// JavaScript que muestra la informacion del usuario en el navbar(Username) y que tiene la funcionalidad de poder cerrar la sesion
// Este JavaScript se encuentra en userIndex(Pagina de inicio del usuario) y userInfo(Datos del usuario donde se puede modificar sus datos)
const cerrarSesion = document.querySelector(".closeSession");
const linkUserInfo = document.querySelector(".linkUserInfo");

function showInfoUserNavbar(){
    let userConnected = JSON.parse(sessionStorage.getItem("connected"));
    linkUserInfo.textContent = userConnected.username;
}

function closeSession(){
    sessionStorage.clear();
    checkUserConnected();
}

function checkUserConnected(){
    if(sessionStorage.getItem("connected") == null){
        location.href = "../index.html";
    }
}

cerrarSesion.addEventListener("click", closeSession);

window.addEventListener("load", () => {
    checkUserConnected();
    showInfoUserNavbar();
});

