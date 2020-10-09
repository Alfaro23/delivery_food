const openMenuForm = document.querySelector("#open-card");
const closeMenuForm = document.querySelector(".close");
const modal = document.querySelector(".modal");

new WOW().init();

const Menu = ()=>{
    modal.classList.toggle("is-open");
}

openMenuForm.addEventListener("click", Menu);
closeMenuForm.addEventListener("click", Menu);