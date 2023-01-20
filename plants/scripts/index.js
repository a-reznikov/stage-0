document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("burger").addEventListener("click", function() {
    document.querySelector(".header").classList.toggle("header__opened");
    document.querySelector(".nav").classList.toggle("nav__opened");
    document.querySelector(".hamburger").classList.toggle("hamburger__opened");
  })
  document.getElementById("main").addEventListener("click", function() {
    removeClass();
  })
  document.getElementById("footer").addEventListener("click", function() {
    removeClass();
  })
  document.getElementById("home__link").addEventListener("click", function() {
    removeClass();
  })
  document.getElementById("about__link").addEventListener("click", function() {
    removeClass();
  })
  document.getElementById("service__link").addEventListener("click", function() {
    removeClass();
  })
  document.getElementById("prices__link").addEventListener("click", function() {
    removeClass();
  })
  document.getElementById("contacts__link").addEventListener("click", function() {
    removeClass();
  })
  document.getElementById("logo__link").addEventListener("click", function() {
    removeClass();
  })
})

const removeClass = () => {
  document.querySelector(".header").classList.remove("header__opened");
  document.querySelector(".nav").classList.remove("nav__opened");
  document.querySelector(".hamburger").classList.remove("hamburger__opened");
}

// // console.log("Вёрстка валидная +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css + 12\nИнтерактивность, реализуемая через css +20")