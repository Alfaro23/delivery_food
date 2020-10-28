const openMenuForm = document.querySelector("#open-card");
const closeMenuForm = document.querySelector(".close");
const modal = document.querySelector(".modal");
const button_text = document.querySelector(".button-primary");

let buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const buttonCloseAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
let login = localStorage.getItem("DeliveryLogin");
let loginInput = document.querySelector("#login");
let userName = document.querySelector(".user-name");
let buttonOut = document.querySelector(".button-out");

// console.log(button_text);

function toggleModalAuth() {
    modalAuth.classList.toggle("is-open");
}

//const Menu = () => {
  //  modal.classList.toggle("is-open");
//}
function autorized() {
    userName.textContent = login;
    function logOut(){
        login = null;
        buttonAuth.style.display = "";
        userName.style.display = "";
        buttonOut.style.display = "";
        buttonOut.removeEventListener("click", logOut);
        localStorage.removeItem("DeliveryLogin");
        checkAuth();
    }

    console.log("Авторизован");
    buttonAuth.style.display = "none";
    userName.style.display = "inline";
    buttonOut.style.display = "block";

    buttonOut.addEventListener("click", logOut);
}


function notAutorized() {
    console.log("Не авторизован");

    function logIn(event){
        event.preventDefault();
        console.log("логин");
        if(loginInput.value == ""){
            alert("Поле логино не должно быть пустым!");
            toggleModalAuth();
        }else{
            login = loginInput.value;
        }

        localStorage.setItem("DeliveryLogin", login);

        toggleModalAuth();
        buttonAuth.removeEventListener("click", toggleModalAuth);
        buttonCloseAuth.removeEventListener("click", toggleModalAuth);
        logInForm.removeEventListener("submit", logIn);
        logInForm.reset();
        checkAuth();
    }

    buttonAuth.addEventListener("click", toggleModalAuth);
    buttonCloseAuth.addEventListener("click", toggleModalAuth);
    logInForm.addEventListener("submit", logIn);
}
function checkAuth(){
    if(login){
        autorized();
    }else{
        notAutorized();
    }
}
checkAuth();

//openMenuForm.addEventListener("click", Menu);
//closeMenuForm.addEventListener("click", Menu);
//new WOW().init();