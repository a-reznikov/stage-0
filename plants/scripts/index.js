document.addEventListener("DOMContentLoaded", function() {
  const serviceButtons = document.querySelectorAll(".button");
  let arrayActiveButtons = [];
  let serviceItemsBlur = document.querySelectorAll(".service__item")
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
        //console.log(arrayActiveButtons);
        //console.log(arrayActiveButtons.length);
      } else if (arrayActiveButtons.length >= 2) {
        if (button.classList.contains('button_active')) {
          button.classList.remove('button_active');
          if (button === arrayActiveButtons[0]){
            arrayActiveButtons.shift(button);
          } else {
            arrayActiveButtons.pop(button);
          }        
        } else {
          let button_disable = String(arrayActiveButtons[0]['id']);
          document.querySelector(`.${button_disable}`).classList.remove('button_active');
          arrayActiveButtons.shift();
          button.classList.add('button_active');
          arrayActiveButtons.push(button);
        }
        //console.log(arrayActiveButtons);
        //console.log(arrayActiveButtons.length);
      } else {
        serviceItemsBlur.forEach(item => {
          item.classList.remove("blur");
        });
      }
      if (arrayActiveButtons.length > 0) {
        serviceItemsBlur.forEach(item => {
          item.classList.add("blur");
        });
      } else {
        serviceItemsBlur.forEach(item => {
          item.classList.remove("blur");
        });
      }
    for (nonBlurItems in arrayActiveButtons) {
      //console.log("nonblur", arrayActiveButtons);
      //console.log("nonblur", arrayActiveButtons[nonBlurItems]['id']);
      let nonBlurItem = String(arrayActiveButtons[nonBlurItems]['id']);
      // console.log(document.querySelector(`.${nonBlurItem}`));
      serviceItemsBlur.forEach(item => {
        if (item.classList.contains(`${nonBlurItem}`)) {
          // console.log(item);
          item.classList.remove('blur');
        }
      });
    }
    });
  });

  const pricesItems = document.querySelectorAll(".price-item");
  const priceDropDown = document.querySelectorAll(".item-upper");
  priceDropDown.forEach(dropdown => {
    dropdown.addEventListener("click", function() {
      console.log(dropdown['id']);
      pricesItems.forEach(priceItem => {
        if(priceItem.classList.contains(`${dropdown['id']}`)) {
          priceItem.classList.toggle("price-opened");
        } else {
          priceItem.classList.remove("price-opened");
        }
      });
      // if (dropdown.classList.contains("basics")) {
      //   pricesItems.forEach(priceItem => {
      //     if (priceItem.classList.contains("basics")) {
      //       priceItem.classList.add("price-opened");
      //     } else {
      //       priceItem.classList.remove("price-opened");
      //     }
      // });
      // }
      
  });
  });

  document.querySelector(".contact-item").addEventListener("click", function() {
    document.querySelector(".contact__wrapper").classList.toggle("contact__wrapper-opened");
    document.querySelector(".contact-item-title").innerHTML = 'City';
    if (document.querySelector(".contact__wrapper").classList.contains("contact__wrapper-selected")) {
      document.querySelector(".contact__wrapper").classList.add("contact__wrapper-opened");
      document.querySelector(".contact__wrapper").classList.remove("contact__wrapper-selected");
    }
  });
  const citySelect = document.querySelectorAll(".city");
  const cardOpened = document.querySelectorAll(".contact__selected");
  citySelect.forEach(city => {
    city.addEventListener("click", function() {
      console.log(city['id']);
      console.log(city.textContent);
      cardOpened.forEach(card => {
        if (card.classList.contains(`${city['id']}`)) {
          document.querySelector(".contact-item-title").innerHTML = city.textContent;
          card.classList.add("card__opened");
        } else {
          card.classList.remove("card__opened");
        }
      });
      document.querySelector(".contact__wrapper").classList.toggle("contact__wrapper-selected");
    });
  });

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