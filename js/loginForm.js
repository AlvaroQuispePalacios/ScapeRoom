const lrLoginUsername = document.getElementById("lrLoginUsername");
const lrLoginPassword = document.getElementById("lrLoginPassword");
const btnFormLogin = document.getElementById("btnFormLogin");

// 
function searchUserToLs(){
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let userToLs = JSON.parse(localStorage.getItem(key));
        if((userToLs.username == lrLoginUsername.value) && (userToLs.password == lrLoginPassword.value)){
            saveUserToSessionStorage(key, userToLs);
            location.href = "../pages/userIndex.html";
            break;
        }else{
            showInputError(lrLoginPassword, "El usuario o la contraseña son incorrectos");
        }
    }
}

btnFormLogin.addEventListener("click", searchUserToLs);