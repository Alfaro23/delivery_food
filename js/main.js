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
const cardInfo = document.querySelector(".title-restaurant");
let title = document.querySelector(".food-title");
let star = document.querySelector(".rating");
let price_food = document.querySelector(".price");
let category = document.querySelector(".category");

const getData = async function (url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}. статус ошибки: ${response.status}`)
    }

    return await response.json();
}

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
function createCardRestaurant(restaurant) {

    const { image, kitchen, name, price, stars, products, time_of_delivery } = restaurant;

    const cardRestaurant = document.createElement("a");
    cardRestaurant.className = "card card-restaurant";
    cardRestaurant.products = products;
    cardRestaurant.info = { kitchen, name, price, stars };

    const card = `
        <img src="${image}" alt="pizza-plus" class="card-image">
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">${name}</h3>
                <span class="card-tag tag">${time_of_delivery} мин</span>
            </div>
            <div class="card-info">
                <div class="rating"><img src="image/star.svg" alt="Star" class="rating-star">${stars}</div>
                <div class="price">от ${price} ₽</div>
                <div class="category">${kitchen}</div>
            </div>
        </div>
    `;

    cardRestaurant.insertAdjacentHTML("beforeend", card)
    cardsRestaurants.insertAdjacentElement("beforeend", cardRestaurant);
}

//создание карточек с товарами ресторанов
function createCardGood(goods) {
    console.log(goods);

    const { description, image, name, price } = goods;

    const card = document.createElement("div");
    card.className = "card";

    card.insertAdjacentHTML("beforeend", `
        <img src="${image}" alt="pizza-plus" class="card-image">
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">${description}</div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary">
                    <span class="button-card-text">В корзину</span>
                    <img src="image/shopping-cart-reg.svg" alt="shopping-cart" class="button-card-image">
                </button>
                <strong class="card-price-bold">${price} ₽</strong>
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
            cardsMenu.textContent = "";
            containerPromo.classList.add("hide");
            restaurant.classList.add("hide");
            menu.classList.remove("hide");

            const { kitchen, name, price, stars  } = restaurant.info;

            title.textContent = name;
            star.textContent = stars;
            price_food.textContent = `От ${price} ₽`;
            category.textContent = kitchen;

            getData(`./db/${restaurant.products}`).then((data) => {
                data.forEach(createCardGood);
            });
        }
    } else {
        toggleModalAuth();
    }
}

function init() {
    getData("./db/partners.json").then((data) => {
        data.forEach(createCardRestaurant);
    });
    checkAuth();
    cardsRestaurants.addEventListener("click", openGoods);
    openMenuForm.addEventListener("click", Menu);
    closeMenuForm.addEventListener("click", Menu);
}

init();
