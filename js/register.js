const lrRegisterUsername = document.getElementById("lrRegisterUsername");
const lrRegisterPassword = document.getElementById("lrRegisterPassword");
const lrRegisterRepeatPassword = document.getElementById("lrRegisterRepeatPassword");
const btnFormRegister = document.getElementById("btnFormRegister");


// ---------------------------------FUNCIONES-------------------------------------
//------------------- VALIDACIONES DEL FORMULARIO REGISTER----------------------------
// Verifica que todos los campos esten completos y si alguno no esta completo se envia un mensaje de error
function isRequired(input) {
    // let arrayInputRequired = Array();

    // inputs.forEach((input) => {
    //     if (input.value === null || input.value === undefined || input.value.trim() === "") {
    //         let mensaje = `El campo es obligatorio`;
    //         showInputError(input, mensaje);
    //         arrayInputRequired.push(false);
    //     } else {
    //         showInputCorrect(input);
    //         arrayInputRequired.push(true);
    //         console.log("Esta completo");
    //     };
    // });

    // let allInputsValid = arrayInputRequired.reduce((previousValue, nextValue) => {
    //     return previousValue && nextValue;
    // });

    // return allInputsValid;
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

function checkPasswordValid(input){
    let re;
    if(isRequired(input)){
        
    }
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


function showInputError(input, mensaje) {
    let error = document.querySelector(`#${input.id} + span`);
    error.style = "display:block"
    error.textContent = mensaje;
}

function showInputCorrect(input) {
    let correcto = document.querySelector(`#${input.id} + span`);
    correcto.style = "display:none";
}

function allInputsValid() {

}


// -------------------------------------EVENTOS---------------------------------------
btnFormRegister.addEventListener("click", () => {
    checkLength(lrRegisterUsername);
    checkPasswordSame(lrRegisterPassword, lrRegisterRepeatPassword);
    // isRequired(lrRegisterRepeatPassword);
    // let allInputsComplete = isRequired([lrRegisterUsername, lrRegisterPassword, lrRegisterRepeatPassword]);
    // if(allInputsComplete){
    //     checkLength(lrRegisterUsername);
    //     checkPasswordSame(lrRegisterPassword, lrRegisterRepeatPassword);
    // }
    // console.log(isRequired([lrRegisterUsername, lrRegisterPassword, lrRegisterRepeatPassword]));
    // isRequired([lrRegisterUsername, lrRegisterPassword, lrRegisterRepeatPassword]);

    // console.log(lrRegisterUsername.value);
    // console.log(lrRegisterPassword.value);
    // console.log(lrRegisterRepeatPassword.value);
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