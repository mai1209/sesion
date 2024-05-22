const userName = document.getElementById("user-name")
const logoutBtn = document.getElementById("logout-message")

//nos traemos los usuarios del session
const activeUser = JSON.parse(sessionStorage.getItem("activeUser"))


const showUserName  =() =>{
    userName.textContent = `${activeUser.name} `
}

const logout = () =>{
    if (window.confirm("estas seguro que deseas cerrar sesion?")) {
        sessionStorage.removeItem("activeUser")
       
        window.location.href = "../index.html"
    }
}




//funcion inicializadora
 
const init =()=>{
showUserName()
logoutBtn.addEventListener("click" , logout)
}

init()