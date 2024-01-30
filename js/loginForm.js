
const lrLoginUsername = document.getElementById("lrLoginUsername");
const lrLoginPassword = document.getElementById("lrLoginPassword");

function searchUserToLs(){
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key();
        let userToLs = localStorage.getItem(key);
        if((userToLs.username == lrLoginUsername.value) && (userToLs.password == lrLoginPassword.value)){
            location.href = "../pages/userIndex.html";
            break;
        }else{
            showInputError(lrLoginPassword, "Error");
        }
    }
}
showInputError(lrLoginPassword, "Error");
