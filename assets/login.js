const loginForm = document.querySelector("#login--form")
const emailInput = document.getElementById("email");
const paswswordInput = document.getElementById("password");
const errorMessage = document.getElementById("form__error")


const users = JSON.parse(localStorage.getItem("users")) || []

const saveToSessionStorage = (user) => {
    sessionStorage.setItem("activeUser", JSON.stringify(user))
}

//funcion para verificar si el input esta vacio

const isEmpty = (input) => {
    return !input.value.trim().length;
  };
  

//funcion para validar si el email existe

const isExistingEmail = (input) =>{
    return users.some((user) => user.email === input.value.trim())
}

//funcion para verificar que la contraseña sea igual a la que se registro con el email-

const isMatchingPass = (input) =>{
    const user = users.find((user) => user.email === emailInput.value.trim())

    return user.password === input.value.trim();
}

//funcion para validar los dos campos

const isValidAcount = () =>{
    let valid = false;

    if(isEmpty(emailInput)){
        showError("Por favor completa los campos")  
        return
    } 

    if(!isExistingEmail(emailInput)){
        showError("El email es incorrecto")
        return
    }

    if(isEmpty(paswswordInput)){
        showError("Por favor completa los campos")  
        return
    } 

    if(!isMatchingPass(paswswordInput)){
        showError("La contraseña es incorrecta")
        return
    }

    alert("estas en linea")
        
    showSuccess()
    valid = true
    return valid
}

const login = (e) =>{
    e.preventDefault()

    if (isValidAcount()){
        const user = users.find((user) => user.email === emailInput.value.trim())
        saveToSessionStorage(user)
        window.location.href = "home.html"
    }

}

//funcion de error
const showError = (message) =>{
    errorMessage.textContent = message
}


//funcion de exito 
const showSuccess =()=>{
   errorMessage.textContent = ""
}



//funcion de inicializacion 
const init =()=>{
    loginForm.addEventListener("submit" , login)
  
}

init()