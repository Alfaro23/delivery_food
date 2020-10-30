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
const cart = [];
const modalBody = document.querySelector(".modal-info");
const modalPrice = document.querySelector(".price-tag");
const buttonClearCart = document.querySelector(".button-clear-cart");

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
        openMenuForm.style.display = "";
        buttonOut.removeEventListener("click", logOut);
        localStorage.removeItem("DeliveryLogin");
        checkAuth();
    }

    console.log("Авторизован");
    buttonAuth.style.display = "none";
    userName.style.display = "inline";
    buttonOut.style.display = "flex";
    openMenuForm.style.display = "flex";
    // buttonCard.style.display = "flex";

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

    const { description, image, name, price, id } = goods;

    const card = document.createElement("div");
    card.className = "card";
    // card.id = id;

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
                <button class="button button-primary button-add-cart" id=${id}>
                    <span class="button-card-text">В корзину</span>
                    <img src="image/shopping-cart-reg.svg" alt="shopping-cart" class="button-card-image">
                </button>
                <strong class="card-price-bold card-price">${price} ₽</strong>
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

function addToCart(event){
    const target = event.target;
    const buttonAddToCart = target.closest(".button-add-cart");
    if(buttonAddToCart){
        const card = target.closest(".card");
        const title = card.querySelector(".card-title-reg").textContent;
        const cost = card.querySelector(".card-price").textContent;
        const id = buttonAddToCart.id;

        const food = cart.find(function(item){ return item.id === id});
        if(food){
            food.count += 1;
        }else{
            cart.push({
                id,
                title,
                cost,
                count: 1
            });
        }
    }
}

function renderCart(){
    //modalBody
    modalBody.textContent = " ";
    cart.forEach(function({ id, title, cost, count }){
        const itemCart = `
            <div class="food-row">
                <span class="food-name">${title}</span>
                <strong class="food-price">${cost}</strong>
                <div class="food-counter">
                    <button class="counter-button counter-minus" data-id=${id}>-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button counter-plus" data-id=${id}>+</button>
                </div>
            </div>
        `;

        modalBody.insertAdjacentHTML("afterbegin", itemCart);

    });

    const totalPrice = cart.reduce(function(result, item){
        return result + (parseFloat(item.cost))*item.count;
    }, 0);
    modalPrice.textContent = totalPrice + " ₽";
}

function changeCount(event){
    const target = event.target;

    if(target.classList.contains("counter-button")){
        const food = cart.find(function(item){
            return item.id === target.dataset.id;
        });

        if(target.classList.contains("counter-minus")){
            food.count--;
            if(food.count == 0){
                cart.splice(cart.indexOf(food), 1);
            }
        }
        if(target.classList.contains("counter-plus")) food.count++;

        renderCart();
    }
}

function init() {
    getData("./db/partners.json").then((data) => {
        data.forEach(createCardRestaurant);
    });
    checkAuth();
    buttonClearCart.addEventListener("click", function(){
        cart.length = 0;
        renderCart();
    });
    modalBody.addEventListener("click", changeCount);
    cardsMenu.addEventListener("click", addToCart);
    cardsRestaurants.addEventListener("click", openGoods);
    openMenuForm.addEventListener("click", function(){
        renderCart();
        Menu();
    });
    closeMenuForm.addEventListener("click", Menu);
}

init();
