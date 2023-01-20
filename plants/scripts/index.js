document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("burger").addEventListener("click", function() {
    document.querySelector(".header").classList.toggle("header__opened");
    document.querySelector(".nav").classList.toggle("nav__opened");
    document.querySelector(".hamburger").classList.toggle("hamburger__opened");
  })
})

// // console.log("Вёрстка валидная +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css + 12\nИнтерактивность, реализуемая через css +20")