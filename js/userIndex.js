const cerrarSesion = document.getElementById("closeSession");




function closeSession(){
    sessionStorage.clear();
}

function checkUserLogged(){
    if(sessionStorage.length <= 0){
        location.href = "../index.html";
    }
}


cerrarSesion.addEventListener("click", closeSession);
window.addEventListener("load", checkUserLogged());

