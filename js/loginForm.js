const lrLoginUsername = document.getElementById("lrLoginUsername");
const lrLoginPassword = document.getElementById("lrLoginPassword");
const btnFormLogin = document.getElementById("btnFormLogin");

// Verificar si un usuario esta conectado
function checkUserLogged(){
    if(sessionStorage.getItem("connected") != null){
        location.href = "../pages/userIndex.html";
    }
}

function isUserExistInLs(usernameInput, passwordInput){
    let array = [false];
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let userToLs = JSON.parse(localStorage.getItem(key));
        if(userToLs.username == usernameInput.value && userToLs.password == passwordInput.value){
            array[0] = true;
            array.push(userToLs);
        }
    }
    return array;
}

function userLogin(){
    let [isUserExist, userObject] = isUserExistInLs(lrLoginUsername, lrLoginPassword);
    if(isUserExist){
        saveUserToSessionStorage("connected", userObject);
        location.href = "../pages/userIndex.html";
    }else{
        showInputError(lrLoginPassword, "El usuario o la contraseña son incorrectos");
    }
}

btnFormLogin.addEventListener("click", userLogin);

window.addEventListener("load", () => {
    checkUserLogged();;
});