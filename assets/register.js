//llamamos a los elementos que vamos a usar.

const registerForm = document.querySelector("#register-form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");

//donde se guardan los usuarios guardados en el local storage.
const users = JSON.parse (localStorage.getItem("users")) || [];
const saveToLocalStorage = () =>{
  localStorage.setItem("users" , JSON.stringify(users))
}
//funcion para verificar si el input esta vacio

const isEmpty = (input) => {
  return !input.value.trim().length;
};

//funcion para verificar que el input se encuentra entre dos numeros

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length < max;
};

//funcion para mostrar el error

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.add("error");
  formField.classList.remove("success");

  //otra forma de llamar elementos. paso 1 se llama al small, paso 2 se pone en display block para que no se muestre en el dom y paso 3 se escribe el mensaje que se quiere mostrar de error.
  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

//funcion cuando todo esta bien en el imput

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  //se vuelve a llamar al elemento
  const error = formField.querySelector("small");
  error.textContent = "";
};

//funcion para verificar el nombre y apellido  del usuario
const checkInput = (input) => {
  let valid = false;
  const MIN_CHARACTERS = 3;
  const MAX_CHARACTERS = 25;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isBetween(input, MIN_CHARACTERS, MAX_CHARACTERS)) {
    showError(
      input,
      `Este campo debe tener entre ${MIN_CHARACTERS} y ${MAX_CHARACTERS} caracteres`
    );
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

//funcion para validar el email se usan regex

const isEmailValid = (input) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //se hace un test del valor del imput
  return re.test(input.value.trim());
};

//funcion para verificar si esta guardado el mail
const isExistingEmail = (input) => {
  return users.some((user) => user.email === input.value.trim());
};

//funcion para checkear las validaciones del email
const checkEmail = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, "El mail es obligatorio, por favor completa el campo.");
    return;
  }

  if (!isEmailValid(input)) {
    showError(input, "El email ingresado no es valido");
    return;
  }

  if (isExistingEmail(input)) {
    showError(input, "El email ya se encuentra registrado");
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

//funcion para validar la  contraseña

const isPasswordValid = (input) => {
  const re = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //se hace un test del valor del imput
  return re.test(input.value.trim());
};

//funcion para checkear la contraseña
const checkPassword = (input) => {
 let valid = false;
 
  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isPasswordValid(input)) {
    showError(input,"La contraseña debe contener una minuscula, una mayuscula, un numero y al menos 8 caracteres");
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

//funcion para verificar el numero de telefono 

const isPhoneNumberValid = (input) =>{
  const re = /^\d{10}$/;
  return re.test(input.value.trim())
};

//funcion para checkear numero de telefono
  const checkPhoneNumber = (input) =>{
    let valid = false;

    if (isEmpty(input)){
      showError(input, "Este campo es obligatorio");
      return;
    }

    if(!isPhoneNumberValid(input)){
      showError(input, "El numero de telefono debe contener 10 digitos")
      return;
    
    }

    showSuccess(input);
    valid = true;
    return valid;
  }

  //funcion para validar el formulario 

  const validateForm =(e) =>{
    e.preventDefault();

    let isNameValid = checkInput(nameInput);
    let isLastNameValid = checkInput(lastNameInput);
    let isEmailValid = checkEmail(emailInput);
    let isPasswordValid = checkPassword(passInput);
    let isPhoneNumberValid = checkPhoneNumber(phoneInput);

    let isValidForm = isNameValid && isLastNameValid && isEmailValid && isPasswordValid && isPhoneNumberValid; 

      if (isValidForm) {
         users.push({
          name: nameInput.value,
          lasName: lastNameInput.value,
          email: emailInput.value,
          password: passInput.value,
          phone: phoneInput.value,
         })

         saveToLocalStorage(users)
         alert("te logueaste bien")
        //ruta para redirigir al login 
         window.location.href = "login.html"
      }

  }

//funcion init

const init = () => {
  nameInput.addEventListener("input", () => checkInput(nameInput));
  lastNameInput.addEventListener("input", () => checkInput(lastNameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  passInput.addEventListener("input", () => checkPassword(passInput));
  phoneInput.addEventListener("input",() => checkPhoneNumber(phoneInput));
  registerForm.addEventListener("submit",  validateForm )

};

init();
