const cerrarSesion = document.getElementById("closeSession");
const linkUserInfo = document.getElementById("linkUserInfo");

function showinfoUserNavbar(){
    
}

function closeSession(){
    sessionStorage.clear();
    checkUserLogged();
}

function checkUserLogged(){
    if(sessionStorage.length <= 0){
        location.href = "../index.html";
    }
}

cerrarSesion.addEventListener("click", closeSession);

window.addEventListener("load", () => {

    checkUserLogged();
});

