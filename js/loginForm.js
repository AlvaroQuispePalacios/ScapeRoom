const lrLoginUsername = document.getElementById("lrLoginUsername");
const lrLoginPassword = document.getElementById("lrLoginPassword");
const btnFormLogin = document.getElementById("btnFormLogin");


// Verificar si un usuario esta conectado
function checkUserConnected(){
    if(sessionStorage.getItem("connected") != null){
        location.href = "../pages/userIndex.html";
    }
}

function isUserExistInLs(usernameInput, passwordInput){
    let array = [false];
    arrayUsers = JSON.parse(localStorage.getItem("users"));
    arrayUsers.forEach((user) => {
        if((user.username == usernameInput.value) && (user.password == passwordInput.value)){
            array[0] = true;
            array.push(user);
            return;
        }
    });
    return array;
}

function userLogin(){
    let [isUserExist, userObject] = isUserExistInLs(lrLoginUsername, lrLoginPassword);
    if(isUserExist){
        saveToSessionStorage("connected", userObject);
        location.href = "../pages/userIndex.html";
    }else{
        showInputError(lrLoginPassword, "El usuario o la contraseña son incorrectos");
    }
}

btnFormLogin.addEventListener("click", userLogin);

window.addEventListener("load", () => {
    checkUserConnected();;
});