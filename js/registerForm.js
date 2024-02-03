const lrRegisterUsername = document.getElementById("lrRegisterUsername");
const lrRegisterPassword = document.getElementById("lrRegisterPassword");
const lrRegisterRepeatPassword = document.getElementById("lrRegisterRepeatPassword");
const btnFormRegister = document.getElementById("btnFormRegister");
let arrayUsers = Array();

// ---------------------------------FUNCIONES-------------------------------------

//------------------- VALIDACIONES DEL FORMULARIO REGISTER----------------------------
// Verifica que todos los campos esten completos y si alguno no esta completo se envia un mensaje de error
function isRequired(input) {
    if (input.value === null || input.value === undefined || input.value.trim() === "") {
        let mensaje = `El campo es obligatorio`;
        showInputError(input, mensaje);
    } else {
        showInputCorrect(input);
        return true;
    }
    return false
}

function checkLength(input) {
    if (isRequired(input)) {
        if (input.value.length <= 4) {
            showInputError(input, "El minimo de caracteres es de 5")
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

function checkPasswordSame(password1, password2) {
    if (isRequired(password2)) {
        if (password1.value != password2.value) {
            showInputError(password2, "Las contraseñas no son iguales");
        } else {
            showInputCorrect(password2);
            return true;
        }
    }
    return false;
}

function allInputsValid() {
    let arrayInputsValid = Array();
    arrayInputsValid.push(checkLength(lrRegisterUsername));
    arrayInputsValid.push(checkPasswordValid(lrRegisterPassword));
    arrayInputsValid.push(checkPasswordSame(lrRegisterPassword, lrRegisterRepeatPassword));
    return arrayInputsValid[0] && arrayInputsValid[1] && arrayInputsValid[2];
}

function showInputError(input, mensaje) {
    let error = document.querySelector(`#${input.id} + span`);
    error.style = "display:block"
    error.textContent = mensaje;
}

function showInputCorrect(input) {
    let correcto = document.querySelector(`#${input.id} + span`);
    correcto.style = "display:none";
}

// Verifica que el username no exista en el local storage
function isUsernameExistInLocalStorage(input) {
    let isUsernameExistInLS = false;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key == input.value) {
            isUsernameExistInLS = true;
            showInputError(input, "El username ya existe");
            break;
        } else {
            showInputCorrect(input);
        }
    }
    return !isUsernameExistInLS;
}

function createUser(inputUsername, inputPassword) {
    return new User(inputUsername.value, inputPassword.value);
}

function saveToLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

function saveToSessionStorage(key, object) {
    sessionStorage.setItem(key, JSON.stringify(object));
}


// -------------------------------------EVENTOS---------------------------------------
btnFormRegister.addEventListener("click", () => {
    if (allInputsValid() && isUsernameExistInLocalStorage(lrRegisterUsername)) {
        let newUser = createUser(lrRegisterUsername, lrRegisterPassword);
        if (localStorage.getItem("users")) {
            arrayUsers = JSON.parse(localStorage.getItem("users"));
            arrayUsers.push(newUser);
            saveToLocalStorage("users", arrayUsers);
            saveToSessionStorage("connected", newUser);
        }else{
            arrayUsers.push(newUser);
            saveToLocalStorage("users", arrayUsers);
            saveToSessionStorage("connected", newUser);
        }
        checkUserConnected();
        // location.href = "../pages/userIndex.html";
    }
});

// let arrayUsersToLS = [];

// const vaalro = new User("Vaalro", "contraseña");
// const usuario = new User("Alvaro", "contraseña");
// arrayUsersToLS.push(vaalro);
// arrayUsersToLS.push(usuario);
// arrayUsersToLS[0].addGameEasy({ score: 22, time: "22:00:00" });

// localStorage.setItem("Users", JSON.stringify(arrayUsersToLS));

// let arrayUsersFromLS = JSON.parse(localStorage.getItem("Users"));
// console.log("Array del localStorage");
// console.log(arrayUsersFromLS);

// arrayUsersFromLS.forEach((element, index) => {
//     arrayUsersFromLS[index] = User.fromJSON(element);
//     // let user = User.fromJSON(element);
//     // console.log(array);
// });
// arrayUsersFromLS[0].setUsername("pedro")



// console.log(arrayUsersFromLS[0]);


// console.log({username, password} = new User());
// let {username, password} = new User();

// localStorage.setItem("Users", JSON.stringify());

// -----------------------------------------------------------------------
// let user = new ObjectUser()