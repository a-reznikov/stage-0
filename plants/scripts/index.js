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
      //console.log(dropdown['id']);
      pricesItems.forEach(priceItem => {
        if(priceItem.classList.contains(`${dropdown['id']}`)) {
          priceItem.classList.toggle("price-opened");
        } else {
          priceItem.classList.remove("price-opened");
        }
      });
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
      //console.log(city['id']);
      //console.log(city.textContent);
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

console.log("1. При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50\n - При выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20\n - Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20\n - Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10\n2.Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50\n - При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25\n - Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25\n3. В разделе contacts реализован select с выбором городов +25\n - В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15\n - При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу +10");