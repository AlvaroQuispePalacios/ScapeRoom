// JavaScript -> Con este archivo tiene la funcionalidad de mostrar los datos en la tarjeta del usuario y poder modificar sus datos
// uc(user-card)
const ucFormUsername = document.getElementById("ucFormUsername");
const ucFormPassword = document.getElementById("ucFormPassword");
const btnSaveChangeInfoUser = document.getElementById("btnSaveChangeInfoUser");
const arrayUsers = JSON.parse(localStorage.getItem("users"));
const userConnected = JSON.parse(sessionStorage.getItem("connected"));


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

// Verifica que el username no se repita
function isUsernameExistInLocalStorage(input) {
    let isUsernameExist = false;

    let arrayUsersExceptUserConnected = Array();

    arrayUsers.forEach((user) => {
        if (user.username != userConnected.username) {
            arrayUsersExceptUserConnected.push(user);
        }
    });

    arrayUsersExceptUserConnected.forEach((user) => {
        if (user.username == input.value) {
            console.log("El usuario existe");
            showInputError(ucFormUsername, "El usuario ya existe");

            isUsernameExist = true;
        }
    });

    return !isUsernameExist;
}

function updateDataUser(inputUsername, inputPassword) {
    arrayUsers.forEach((user) => {
        if(user.username == userConnected.username){
            user.username = inputUsername.value;
            user.password = inputPassword.value;
            userConnected.username = inputUsername.value;
            userConnected.password = inputPassword.value;
            localStorage.setItem("users", JSON.stringify(arrayUsers));
            sessionStorage.setItem("connected", JSON.stringify(userConnected));
        }
    });
}

function showUserInfoCard() {
    let userToSt = JSON.parse(sessionStorage.getItem("connected"));
    console.log(userToSt);
    ucFormUsername.value = userToSt.username;
    ucFormPassword.value = userToSt.password;
}

showUserInfoCard();

btnSaveChangeInfoUser.addEventListener("click", () => {
    if (allInputsValid() && isUsernameExistInLocalStorage(ucFormUsername)) {
        console.log("El username se puede cambiar");
        updateDataUser(ucFormUsername, ucFormPassword);
        showUserInfoCard();
        showInfoUserNavbar();
    } else {
        console.log("El username no es valido");
    }
});


