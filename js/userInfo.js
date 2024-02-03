// JavaScript -> Con este archivo tiene la funcionalidad de mostrar los datos en la tarjeta del usuario y poder modificar sus datos
// uc(user-card)
const ucFormUsername = document.getElementById("ucFormUsername");
const ucFormPassword = document.getElementById("ucFormPassword");
const btnSaveChangeInfoUser = document.getElementById("btnSaveChangeInfoUser");
let arrayUsers;

function isRequired(input) {
    if (input.value === null || input.value === undefined || input.value.trim() === "") {
        let mensaje = `El campo es obligatorio`;
        showInputError(input, mensaje);
    } else {
        showInputCorrect(input);
        return true;
    }
    return false;
}

function checkLength(input) {
    if (isRequired(input)) {
        if (input.value.length <= 4) {
            showInputError(input, "El minimo de caracteres es de 5");
        } else if (input.value.length >= 5) {
            showInputCorrect(input);
            return true;
        }
    }
    return false;
}

function checkPasswordValid(input) {
    let re = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (checkLength(input)) {
        if (re.test(input.value.trim())) {
            return true;
        } else {
            showInputError(input, "Se necesita 1 mayuscula y 1 numero");
            return false;
        }
    }
    return false;
}

function allInputsValid() {
    let arrayInputsValid = Array();
    arrayInputsValid.push(checkLength(ucFormUsername));
    arrayInputsValid.push(checkPasswordValid(ucFormPassword));
    return arrayInputsValid[0] && arrayInputsValid[1];
}

function showInputError(input, mensaje) {
    let error = document.querySelector(`#${input.id} + span`);
    error.style = "display:block";
    error.textContent = mensaje;
}

function showInputCorrect(input) {
    let correcto = document.querySelector(`#${input.id} + span`);
    correcto.style = "display:none";
}

// Verifica que el username no se repita excepto el mismo
function isUsernameExistInLocalStorage(input) {
    let isUsernameExist = false
    arrayUsers = JSON.parse(localStorage.getItem("users"));
    let contador = 0;
    arrayUsers.forEach((user) => {
        if(contador == 0){
            if(user.name == input.value){
                contador++;
            }
        }else if(contador > 0){
            if(user.name == input.value){
                isUsernameExist = true;
            }
        }
    });
    return !isUsernameExist;
}

function showUserInfoCard() {
    let userToSt = JSON.parse(sessionStorage.getItem("connected"));
    ucFormUsername.value = userToSt.username;
    ucFormPassword.value = userToSt.password;
}

showUserInfoCard();


btnSaveChangeInfoUser.addEventListener("click", () => {
    if (allInputsValid() && isUsernameExistInLocalStorage(ucFormUsername)) {
        console.log(":D");
    } else {
        console.log("D:");
    }
});


