window.onload = function() {
  console.log('Hello burger!');

  addBurgerClickHandler();
}

const addBurgerClickHandler = () => {
  document.querySelector('.hamburger').addEventListener('click', (e) => {
    if (e.target.classList.contains('hamburger__opened')) {
      closeNavMenu();
      console.log("Burger is opened");
    } else {
      openNavMenu();
      console.log("Burger just open now");
    }

  })
}

const openNavMenu = () => {
  let headerNav = document.querySelector('.header');
  let nav = document.querySelector('.nav');
  let navList = document.querySelector('.nav-list');
  let navItem = document.querySelectorAll('.nav-item');
  let hamburgerOpened = document.querySelector('.hamburger');

  headerNav.classList.add('header__nav');
  nav.classList.add('nav__opened');
  navList.classList.add('nav-list-direction');
  navItem.forEach(item => {
    item.classList.add('nav-item-undercrossed');
  })
  hamburgerOpened.classList.add('hamburger__opened');
}

const closeNavMenu = () => {
  let headerNav = document.querySelector('.header');
  let nav = document.querySelector('.nav');
  let navList = document.querySelector('.nav-list');
  let navItem = document.querySelectorAll('.nav-item');
  let hamburgerOpened = document.querySelector('.hamburger');

  headerNav.classList.remove('header__nav');
  nav.classList.remove('nav__opened');
  navList.classList.remove('nav-list-direction');
  navItem.forEach(item => {
    item.classList.remove('nav-item-undercrossed');
  })
  hamburgerOpened.classList.remove('hamburger__opened');
}




// console.log("Вёрстка валидная +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css + 12\nИнтерактивность, реализуемая через css +20")