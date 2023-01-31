document.addEventListener("DOMContentLoaded", function() {
  const serviceButtons = document.querySelectorAll(".button");
  let arrayActiveButtons = [];
  serviceButtons.forEach(button => {
    button.addEventListener("click", function() {
      if (arrayActiveButtons.length < 2) {
        if (button.classList.contains('button_active')) {
          button.classList.remove('button_active');
          arrayActiveButtons.shift(button);
        } else {
          button.classList.add('button_active');
          arrayActiveButtons.push(button);
        }
        console.log(arrayActiveButtons);
        console.log(arrayActiveButtons.length);
      } else {
        if (button.classList.contains('button_active')) {
          button.classList.remove('button_active');
          arrayActiveButtons.shift(button);
        } else {
          let button_disable = String(arrayActiveButtons[0]['id']);
          document.querySelector(`.${button_disable}`).classList.remove('button_active');
          arrayActiveButtons.shift();
          button.classList.add('button_active');
          arrayActiveButtons.push(button);
        }
        console.log(arrayActiveButtons);
        console.log(arrayActiveButtons.length);
      }
      
    });
  });
  

  // let exceptGardens = document.querySelectorAll(".service__item");
  // document.getElementById("gardens").addEventListener("click", function() {
  //   console.log('Нажата кнопка Gardens');
  //   document.getElementById("gardens").classList.toggle("button_active");
  //   if (document.getElementById("gardens").classList.contains("button_active")) {
  //     exceptGardens.forEach(item => {
  //       if (item.classList.contains("garden-care") === false) {
  //         item.classList.add("blur");
  //       }
  //     })
  //   } else {
  //     exceptGardens.forEach(item => {
  //       if (item.classList.contains("garden-care") === false) {
  //         item.classList.remove("blur");
  //       }
  //     })
  //   }
  // })
  // document.getElementById("lawn").addEventListener("click", function() {
  //   console.log('Нажата кнопка Lawn');
  //   document.getElementById("lawn").classList.toggle("button_active");
  //   if (document.getElementById("lawn").classList.contains("button_active")) {
  //     exceptGardens.forEach(item => {
  //       if (item.classList.contains("lawn") === false) {
  //         item.classList.add("blur");
  //       }
  //     })
  //   } else {
  //     exceptGardens.forEach(item => {
  //       if (item.classList.contains("lawn") === false) {
  //         item.classList.remove("blur");
  //       }
  //     })
  //   }
  // })
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

// console.log("1. Вёрстка соответствует макету. Ширина экрана 768px +24\nблок <header> +2\nсекция welcome +3\nсекция about +4\nсекция service +4\nсекция prices +4\nсекция contacts +4\nблок <footer> + 3\n1. Вёрстка соответствует макету. Ширина экрана 380px +24\nблок <header> +2\nсекция welcome +3\nсекция about +4\nсекция service +4\nсекция prices +4\nсекция contacts +4\nблок <footer> + 3\n3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nнет полосы прокрутки при ширине страницы от 1440рх до 380px +7\nнет полосы прокрутки при ширине страницы от 380px до 320рх +8\n4. На ширине экрана 380рх и меньше реализовано адаптивное меню +22 (Допускается появление адаптивного меня на ширине более 380, но не допускается на ширине более 770px)\nпри ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2\nпри нажатии на бургер-иконку плавно появляется адаптивное меню +4\nадаптивное меню соответствует цветовой схеме макета +4\nпри нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\nссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4\nпри клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4\nИтого: 85 баллов");