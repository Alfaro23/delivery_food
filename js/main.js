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
const cardsRestaurants = document.querySelector(".cards");
const containerPromo = document.querySelector(".container-promo");
const restaurant = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const cardsMenu = document.querySelector(".cards-menu");

function toggleModalAuth() {
    modalAuth.classList.toggle("is-open");
}

const Menu = () => {
    modal.classList.toggle("is-open");
}

//функция для авторизованного пользователя
function autorized() {
    userName.textContent = login;
    function logOut() {
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

//функция для неавторизованного пользователя
function notAutorized() {
    console.log("Не авторизован");

    function logIn(event) {
        event.preventDefault();
        console.log("логин");
        if (loginInput.value == "") {
            alert("Поле логино не должно быть пустым!");
            toggleModalAuth();
        } else {
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
//функция для проверки авторизации
function checkAuth() {
    if (login) {
        autorized();
    } else {
        notAutorized();
    }
}

//функция для генерации карточки ресторана
function createCardRestaurant() {
    const card = `
    <a class="card">
        <img src="image/tanyki.svg" alt="pizza-plus" class="card-image">
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">Тануки</h3>
                <span class="card-tag tag">50 мин</span>
            </div>
            <div class="card-info">
                <div class="rating"><img src="image/star.svg" alt="Star" class="rating-star"> 4.5</div>
                <div class="price">от 1500 ₽</div>
                <div class="category">Тануки</div>
            </div>
        </div>
    </a>
    `;

    cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

//создание карточек с товарами ресторанов
function createCardGood() {
    const card = document.createElement("div");
    card.className = "card";

    card.insertAdjacentHTML("beforeend", `
        <img src="image/rest/roll.svg" alt="pizza-plus" class="card-image">
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">Ролл угорь стандарт</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">Рис, угорь, соус унаги, кунжут, водоросли нори.</div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary">
                    <span class="button-card-text">В корзину</span>
                    <img src="image/shopping-cart-reg.svg" alt="shopping-cart" class="button-card-image">
                </button>
                <strong class="card-price-bold">250 ₽</strong>
            </div>
        </div>
    `);

    cardsMenu.insertAdjacentElement("beforeend", card);

}

function openGoods(event) {
    const target = event.target;
    const restaurant = target.closest(".card");
    if (login) {
        if (restaurant) {
            containerPromo.classList.add("hide");
            restaurant.classList.add("hide");
            menu.classList.remove("hide");
    
            cardsMenu.textContent = "";
    
            createCardGood();
            createCardGood();
            createCardGood();
            createCardGood();
        }
    } else {
        toggleModalAuth();
    }

}

checkAuth();
createCardRestaurant();
cardsRestaurants.addEventListener("click", openGoods);
openMenuForm.addEventListener("click", Menu);
closeMenuForm.addEventListener("click", Menu);
new WOW().init();