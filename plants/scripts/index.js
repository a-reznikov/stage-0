window.onload = function() {
  console.log('Hello burger!');

  addBurgerClickHandler();
}

const addBurgerClickHandler = () => {
  document.querySelector('.hamburger').addEventListener('click', (e) => {
    if (e.target.classList.contains('hamburger__opened')) {
      console.log("Burger is opened");
    } else {
      openNavMenu();
      transformeBurger();
      console.log("Burger just open now");
    }

  })
}

const openNavMenu = () => {
  let headerNav = document.querySelector('.header');
  let nav = document.querySelector('.nav');
  let navList = document.querySelector('.nav-list');
  headerNav.classList.add('header__nav');
  nav.classList.add('nav__opened');
  navList.classList.add('nav-list-direction');
}

const transformeBurger = () => {
  let hamburgerOpened = document.querySelector('.hamburger');
  hamburgerOpened.classList.add('hamburger__opened');
}



// console.log("Вёрстка валидная +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css + 12\nИнтерактивность, реализуемая через css +20")