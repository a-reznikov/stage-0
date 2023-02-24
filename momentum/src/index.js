import playList from './scripts/playList';
import settings from './scripts/settings';
import uploadLinks from './scripts/uploadLinks';


//Time and Date
//console.log("test");
//console.log("settings", settings);
const time = document.querySelector('.time');
const dateFull = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const inputName = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const tegPhotos = document.querySelector('.teg__photos');
let langGlobal = settings.language[0];
let langTime = `${langGlobal}-${langGlobal.charAt(0).toUpperCase() + langGlobal.slice(1)}`;
let sourcePhoto = settings.photoSource[0];

let windText = '';
let humidityText = '';

//console.log(langTime);

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString(`${langTime}`, options);
  time.textContent = currentTime;
  dateFull.textContent =  currentDate;
  getTimeOfDay();
  setTimeout(showTime, 1000);
}

showTime()

//Greeting
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let dayPart = Math.floor(hours / 6);
  let timeOfDay = '';
  switch(dayPart) {
    case 1:  timeOfDay = "morning";
      return timeOfDay;
    case 2:  timeOfDay = "afternoon";
      return timeOfDay;
    case 3:  timeOfDay = "evening";
      return timeOfDay;
    case 0:  timeOfDay = "night";
      return timeOfDay;
  }
}

function greetingTranslation() {
  if (langGlobal === 'en') {
    windText = 'Wind speed: ';
    humidityText = 'Humidity: ';
    greeting.textContent = `Good ${getTimeOfDay()}`;
    inputName.placeholder = "Enter your name...";
    tegPhotos.placeholder = "tag search...";
  } else if (langGlobal === 'ru') {
    windText = 'Скорость ветра: ';
    humidityText = 'Влажность: ';
    inputName.placeholder = "Введите Ваше имя...";
    tegPhotos.placeholder = "поиск по тегу...";
    switch(`${getTimeOfDay()}`) {
      case "morning":  greeting.textContent = `Доброе утро`;
        return greeting;
      case "afternoon":  greeting.textContent = `Добрый день`;
        return greeting;
      case "evening":  greeting.textContent = `Добрый вечер`;
        return greeting;
      case "night":  greeting.textContent = `Доброй ночи`;
        return greeting;
    }
  }
}

greetingTranslation();


//Slider
let randomNum = Math.floor(Math.random() * 20 + 1);

function getRandomNum(num) {
  let numLen = String(num).length;
  if (numLen < 2) {
    randomNum = String('0' + num);
    return randomNum;
  } else {
    return randomNum;
  }
}

function getLinkToImage(tag) {
  const img = new Image();
  if (sourcePhoto === 'unsplash') {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=rFNda98nRaQNNJVmFzvMRRIsiJfFl0KTXe4vLdcd-Ik`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        img.src = data.urls.regular;
        img.onload = () => {      
          body.style.backgroundImage = `url('${img.src}')`;
        }; 
      });
  } else if (sourcePhoto === 'flickr') {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e75103dd642cdbd338bfce618d58606e&tags=${tag}&extras=url_h&format=json&nojsoncallback=1`;
    const photosArray = [];
    fetch(url)
      .then(res => res.json())
      .then(data => {
        data.photos.photo.forEach(element => {
          if (element.width_h > element.height_h && element.url_h !== "") {
            photosArray.push(element.url_h);
          }
        });
        let randomPhoto = Math.floor(Math.random() * photosArray.length + 1);
        img.src = photosArray[randomPhoto];
        img.onload = () => {      
          body.style.backgroundImage = `url('${img.src}')`;
        }; 
      });
  }
}

function setBg(timeDay, numberPicture) {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/a-reznikov/stage1-tasks/assets/images/${timeDay}/${numberPicture}.jpg`;
  img.onload = () => {      
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/a-reznikov/stage1-tasks/assets/images/${timeDay}/${numberPicture}.jpg')`;
  }; 
}

setBg(getTimeOfDay(), getRandomNum(randomNum));

function getSlideNext() {
  if (sourcePhoto === 'github') {
    randomNum = Number(getRandomNum(randomNum)) + 1;
    if (randomNum > 20) {
      randomNum = 1;
    }
    setBg(getTimeOfDay(), getRandomNum(randomNum));
  } else {
    reloadBg();
    console.log('Source from Api')
  }
}

function getSlidePrev() {
  if (sourcePhoto === 'github') {
    randomNum = Number(getRandomNum(randomNum)) - 1;
    if (randomNum < 1) {
      randomNum = 20;
    }
    setBg(getTimeOfDay(), getRandomNum(randomNum));
  } else {
    reloadBg();
    console.log('Source from Api')
  }
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


//Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
let speedWind = 'm/s';

async function getWeather() {  
  if (city.value === "") {
    city.value = "Minsk"
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langGlobal}&appid=bc50cc0ba8db1784f2c3e644ffa70527&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  //console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
  if (data.cod === '404' ) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-404`);
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    if (langGlobal === 'en') {
      temperature.textContent = `${data.message}`;
    } else if (langGlobal === 'ru') {
      temperature.textContent = `город не найден`;
    }
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${windText}${Math.round(data.wind.speed)} ${speedWind}`;
    humidity.textContent = `${humidityText}${data.main.humidity} %`;
  }
  
}

function choozeCity(e) {
  if (e.code === "Enter") {
    //console.log(city.value);
    getWeather();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', choozeCity);

//Quote

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {  
  let quotesLang = `quotes-${langGlobal}`;
  const quotes = `src/assets/quotes/${quotesLang}.json`;
  const res = await fetch(quotes);
  const data = await res.json(); 
  let randomQuote = Math.floor(Math.random() * 99);
  if (langGlobal === 'ru') {
    randomQuote = Math.floor(Math.random() * 19);
  }
  //console.log(data.quotes[randomQuote]);
  quote.textContent = data.quotes[randomQuote].quote;
  author.textContent = data.quotes[randomQuote].author;
}

document.addEventListener('DOMContentLoaded', getQuotes);
changeQuote.addEventListener('click', getQuotes);

//Player
const player = document.querySelector(".player");
const volumeLine = document.querySelector(".volume-line");
const timeLine = document.querySelector(".time-line");
const timeProgress = document.querySelector(".time-progress");
const currentTime = document.querySelector(".current-time");
const musicLength = document.querySelector(".music-length");

//console.log(player);
//console.log('playList.length', playList.length);
let playListArray = document.querySelector('.play-list');

let isPlay = false;
let playNum = 0;

playList.forEach(element => {
  const li = document.createElement('li');
  const songPlayButton = document.createElement('button');
  const songTitleList = document.createElement('span');
  li.classList.add('play-item');
  songPlayButton.classList.add('play');
  songPlayButton.classList.add('player-icon');
  songPlayButton.classList.add('play-song');
  songTitleList.classList.add('song-title-list');
  songTitleList.textContent = element.title;
  playListArray.append(li);
  li.append(songPlayButton);
  li.append(songTitleList);
  //console.log(element.title);
});

const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const musicPlayNow = document.querySelector('.music-play-now');
const songTitleList = document.querySelector('.song-title-list');
let playItem = document.querySelectorAll('.play-item');
let playSongButton = document.querySelectorAll('.play-song');
const audio = new Audio();

if (langGlobal === 'en') {
  musicPlayNow.textContent =  'Music dont play now';
} else {
  musicPlayNow.textContent =  'Музыка не воспроизводится';
}

let timePause = 0;
let previousSong = 0;

function playAudio() {
  //console.log('playList[playNum]', playList[playNum].title);
  musicPlayNow.textContent =  playList[playNum].title;
  const previousPlayButton = playItem[previousSong].querySelector('.play-song');
  playItem[previousSong].classList.remove('play-item-now');
  previousPlayButton.classList.remove('pause');
  playItem[playNum].classList.add('play-item-now');
  const playButton = playItem[playNum].querySelector('.play-song');
  if (isPlay === false) {
    audio.src = playList[playNum].src;
    audio.currentTime = timePause;
    audio.play();
    playButton.classList.add('pause');
    play.classList.add('pause');
    isPlay = true;
    //console.log("play");
  } else {
    timePause = audio.currentTime;
    audio.pause();
    playButton.classList.remove('pause');
    play.classList.remove('pause');
    isPlay = false;
    //console.log("pause");
  }
}

let playItemArr = Array.prototype.slice.call(playItem);

// playSongButton.forEach(songButton => {
//   songButton.addEventListener('click', function() {
//     console.log(songButton);
//   })
// });

playItemArr.forEach(song => {
  song.addEventListener('click', function() {
    previousSong = playNum;
    playNum = playItemArr.indexOf(song);
    if (previousSong === playNum) {
      timePause = audio.currentTime;
      playAudio();
    } else {
      isPlay = false;
      timePause = 0;
      playAudio();
    }
  })
});


function prevAudion() {
  previousSong = playNum;
  timePause = 0;
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else {
    playNum = playNum - 1;
  }
  isPlay = false;
  playAudio();
}

function nextAudion() {
  previousSong = playNum;
  timePause = 0;
  if (playNum === playList.length - 1) {
    playNum = 0;
  } else {
    playNum = playNum + 1;
  }
  isPlay = false;
  playAudio();
}

//Volume mute
const volumeButton = player.querySelector(".volume");
//console.log(volumeButton);
audio.muted = false;

function volumeMute() {
 // console.log("click mute")
  if (audio.muted === false) {
    volumeButton.classList.remove("ico-play");
    volumeButton.classList.add("ico-mute");
    audio.muted = true;
  } else {
    volumeButton.classList.remove("ico-mute");
    volumeButton.classList.add("ico-play");
    audio.muted = false;
  }
}

audio.volume = 0.2;

//Volume change
function volumeChange(e) {
  const volumeLineWidth = window.getComputedStyle(volumeLine).width;
  const newVolumeLineWidth = e.offsetX / parseInt(volumeLineWidth);
  audio.volume = newVolumeLineWidth;
  player.querySelector('.volume-progress').style.width = (newVolumeLineWidth * 100) + '%';
}


//Time change
function timeChange(e) {
  const timeLineWidth = window.getComputedStyle(timeLine).width;
  const newTimeLineWidth = e.offsetX / parseInt(timeLineWidth) * audio.duration;
  audio.currentTime = newTimeLineWidth;
}

//Time progress
function ChangeTimeProgress() {
  timeProgress.style.width = audio.currentTime / audio.duration * 100 + "%";
  currentTime.textContent = converteTime(audio.currentTime);
  if (isNaN(audio.duration)) {
    musicLength.textContent = "0:00";
  } else {
    musicLength.textContent = converteTime(audio.duration);
  }
  if (audio.currentTime === audio.duration) {
    nextAudion();
  }
}


function converteTime(time) {
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60);
  let timeplay = `${minutes}:${String(seconds).padStart(2, 0)}`;
  return timeplay;
}

play.addEventListener('click', playAudio);
playPrev.addEventListener('click', prevAudion);
playNext.addEventListener('click', nextAudion);
volumeButton.addEventListener('click', volumeMute);
volumeLine.addEventListener('click', (e) => { volumeChange(e); }, false);
timeLine.addEventListener('click', (e) => { timeChange(e); }, false);
setInterval(ChangeTimeProgress, 250);



//Settings
const settingsButton = document.querySelector('.settings__ico');
const settingsContainer = document.querySelector('.settings__container');
const swichButtons = document.querySelectorAll('.checkbox');
const swichButtonsLang = document.querySelectorAll('.checkbox__lang');
const swichButtonsSource = document.querySelectorAll('.checkbox__source');
const optionsList = document.querySelectorAll('.options__list');
const setupList = document.querySelectorAll('.setup');
let saveSatting = [];
let saveLang = [];
let saveSource = [];

//console.log(swichButtonsLang);
//console.log(settings.language);

function getLanguage(set) {
  set.forEach(elementId => {
    swichButtonsLang.forEach(element => {
      if (element.id === elementId) {
        element.checked = 'checked';
      } else {
        element.checked = false;
      }
    });
  });
}

function clearSelectedLang() {
  swichButtonsLang.forEach(element => {
    element.checked = false;
  });
}

swichButtonsLang.forEach(lang => {
  lang.addEventListener('click', function () {
    if (lang.checked === true) {
      clearSelectedLang();
      lang.checked = 'checked';
      saveLang[0] = lang.id;
      langGlobal = saveLang[0];
      langTime = `${langGlobal}-${langGlobal.charAt(0).toUpperCase() + langGlobal.slice(1)}`;
      translateAll();
    } else {
      lang.checked = 'checked';
    }
  })
});

function getSettings(set) {
  set.forEach(elementId => {
    swichButtons.forEach(element => {
      if (element.id === elementId) {
        let block = document.querySelector(`.${element.id}`);
        block.style.opacity = 1;
        element.checked = 'checked';
        saveSatting.push(element.id);
      }
    });
    //console.log(element);
  });
}

function showSettings() {
  settingsContainer.classList.toggle('settings__opened');
}

function clearSelectedSetup() {
  setupList.forEach(element => {
    element.classList.remove('selected');
  });
}


setupList.forEach(setup => {
  setup.addEventListener('click', function() {
    clearSelectedSetup();
    setup.classList.toggle('selected');
    optionsList.forEach(element => {
      if (element.classList.contains(setup.id)) {
        element.classList.add('opened');
      } else {
        element.classList.remove('opened');
      }
    });
  })
});

swichButtons.forEach(element => {
  element.addEventListener('click', function() {
    let block = document.querySelector(`.${element.id}`);
    if (element.checked) {
      if (saveSatting.indexOf(element.id) === -1) {
        saveSatting.push(element.id);
        block.style.opacity = 1;
      }
    } else {
      if (saveSatting.indexOf(element.id) !== -1) {
        saveSatting.splice(saveSatting.indexOf(element.id), 1);
        block.style.opacity = 0;
      }
    }
  })
});


//Photos

function getSource(set) {
  set.forEach(elementId => {
    swichButtonsSource.forEach(element => {
      if (element.id === elementId) {
        element.checked = 'checked';
      } else {
        element.checked = false;
      }
    });
  });
}

function clearSelectedSource() {
  swichButtonsSource.forEach(element => {
    element.checked = false;
  });
}

swichButtonsSource.forEach(source => {
  source.addEventListener('click', function () {
    if (source.checked === true) {
      clearSelectedSource();
      source.checked = 'checked';
      saveSource[0] = source.id;
      sourcePhoto = saveSource[0];
      reloadBg();
    } else {
      source.checked = 'checked';
    }
  })
});

function choozeTag(e) {
  if (e.code === "Enter") {
    reloadBg();
  }
}

tegPhotos.addEventListener('keypress', choozeTag);

function reloadBg() {
  if (sourcePhoto === 'github') {
    tegPhotos.value = "";
    setBg(getTimeOfDay(), getRandomNum(randomNum));
  } else if (sourcePhoto === 'unsplash') {
    if (tegPhotos.value !== "") {
      getLinkToImage(tegPhotos.value);
      console.log('Source unsplash with teg', tegPhotos.value);
    } else {
      getLinkToImage(getTimeOfDay());
      console.log('Source unsplash with timeday')
    }
  } else if (sourcePhoto === 'flickr') {
    if (tegPhotos.value !== "") {
      getLinkToImage(tegPhotos.value);
      console.log('Source flickr with teg', tegPhotos.value);
    } else {
      getLinkToImage(getTimeOfDay());
      console.log('Source flickr with timeday')
    }
  }
}

isPlay = false;

//Links

const searchInput = document.querySelector('.search-input');
const linksTitle = document.querySelector('.links__title');
const linksContainer = document.querySelector('.links__container');
const newLinks = document.querySelector('.new-links');
const addLinksContainer = document.querySelector('.add-links__container');
const searchLogo = document.querySelector('.search-logo');
const chromeTab = document.querySelector('.chrome_tab');
const apps = document.querySelector('.apps');
const buttonBack = document.querySelector('.button-back');
const createLink = document.querySelector('.create__link');
const linksList = document.querySelector('.links__list');
const inputLinksName = document.querySelector('.input-links-name');
const inputLinksLink = document.querySelector('.input-links-link');
let linksItems = document.querySelectorAll('.links__item');
let linksDeleteButton = document.querySelectorAll('.links__delete');
let newlinksHref = document.querySelectorAll('.links-item-href');
let saveLinks = {
  nameLinks: [],
  hrefLinks: [],
};


function searchOpen(e) {
  if (e.code === "Enter") {
    if (searchLogo.classList.contains('yandex')) {
      window.open(`https://yandex.ru/search/?text=${searchInput.value}`, '_blank');
    } else {
      window.open(`https://www.google.com/search?q=${searchInput.value}`, '_blank');
    }
  }
}
searchInput.addEventListener('keypress', searchOpen);

function showLinks() {
  linksContainer.classList.toggle('links__opened');
  addLinksContainer.classList.remove('add-links__opened');
}

function showNewLinks() {
  addLinksContainer.classList.toggle('add-links__opened');
  inputLinksName.value = "";
  inputLinksLink.value = "";
}

function changeLogo() {
  searchLogo.classList.toggle('yandex');
}

function openChromeTab() {
  window.open("https://google.com/", "_blank");
}

function openApps() {
  window.open("https://chrome.google.com/webstore/", "_blank");
}

function createNewLink() {
  const linksItem = document.createElement('li');
  const linksItemHref = document.createElement('a')
  const LinksDelete = document.createElement('div')
  linksItem.classList.add('links__item');
  linksItemHref.classList.add('links-item-href');
  LinksDelete.classList.add('links__delete');
  linksItemHref.textContent = inputLinksName.value;
  linksItemHref.href = `${inputLinksLink.value}`;
  linksItemHref.target= "_blank";
  linksList.append(linksItem);
  linksItem.append(linksItemHref);
  linksItem.append(LinksDelete);
  saveLinks.nameLinks.push(`${inputLinksName.value}`);
  saveLinks.hrefLinks.push(`${inputLinksLink.value}`);
  linksDeleteButton = document.querySelectorAll('.links__delete');
  showNewLinks();
}

function getLinks(setLinks) {
  setLinks.nameLinks.forEach(element => {
    const linksItem = document.createElement('li');
    const linksItemHref = document.createElement('a')
    const LinksDelete = document.createElement('div')
    linksItem.classList.add('links__item');
    linksItemHref.classList.add('links-item-href');
    LinksDelete.classList.add('links__delete');
    linksItemHref.textContent = element;
    linksItemHref.href = `${setLinks.hrefLinks[setLinks.nameLinks.indexOf(element)]}`;
    linksItemHref.target= "_blank";
    linksList.append(linksItem);
    linksItem.append(linksItemHref);
    linksItem.append(LinksDelete);
  });
}



linksList.addEventListener('click', function (event) {
  if (event.target.nodeName === 'DIV'){
    event.target.closest('li').remove();
    newlinksHref = document.querySelectorAll('.links-item-href');
    saveLinks = {
      nameLinks: [],
      hrefLinks: [],
    };
    newlinksHref.forEach(newHref => {
      saveLinks.nameLinks.push(`${newHref.textContent}`);
      saveLinks.hrefLinks.push(`${newHref.href}`);
    });
  }
})

let linksDeleteButtonArray = Array.prototype.slice.call(linksDeleteButton);

function closeContainer(e) {
  if (settingsContainer.classList.contains('settings__opened') && !settingsContainer.contains(e.target) && !settingsButton.contains(e.target)) {
    showSettings();
  }
  if (linksContainer.classList.contains('links__opened') && !linksContainer.contains(e.target) && !linksTitle.contains(e.target)) {
    if (linksDeleteButtonArray.length === 0) {
      showLinks();
    }
    linksDeleteButton.forEach(element => {
      if (!element.contains(e.target)) {
        showLinks();
      }
    });
  }
}

window.addEventListener('click', (e) => { closeContainer(e); }, false);




linksTitle.addEventListener('click', showLinks);
newLinks.addEventListener('click', showNewLinks);
searchLogo.addEventListener('click', changeLogo);
chromeTab.addEventListener('click', openChromeTab);
apps.addEventListener('click', openApps);
buttonBack.addEventListener('click', showNewLinks);
createLink.addEventListener('click', createNewLink);

//Translate
const setupGeneral = document.querySelector('.setup__general');
const setupPhotos = document.querySelector('.setup__photos');
const setupLanguages = document.querySelector('.setup__languages');
const optionGeneral = document.querySelector('.option_general');
const descriptionGeneral = document.querySelector('.description_general');
const actionGeneral = document.querySelector('.action_general');
const blockTime = document.querySelector('.block-time');
const blockDate = document.querySelector('.block-date');
const blockGreeting = document.querySelector('.block-greeting');
const blockQuote = document.querySelector('.block-quote');
const blockWeather = document.querySelector('.block-weather');
const blockPlayer = document.querySelector('.block-player');
const blockLinks = document.querySelector('.block-links');
const optionPhotos = document.querySelector('.option_photos');
const descriptionPhotos = document.querySelector('.description_photos');
const actionPhotos = document.querySelector('.action_photos');
const tagTitle = document.querySelector('.tag__title');
const optionLanguages = document.querySelector('.option_languages');
const descriptionLanguages = document.querySelector('.description_languages');
const actionLanguages = document.querySelector('.action_languages');
const linksName = document.querySelector('.links__name');
const linksLink = document.querySelector('.links__link');


function translateSettings() {
  if (langGlobal === 'en') {
    setupGeneral.textContent =  'General';
    setupPhotos.textContent =  'Photos';
    setupLanguages.textContent =  'Languages';
    optionGeneral.textContent =  'General';
    descriptionGeneral.textContent =  'Customize your dashboard';
    actionGeneral.textContent =  'Show:';
    blockTime.textContent =  'Clock';
    blockDate.textContent =  'Date';
    blockGreeting.textContent =  'Greeting';
    blockQuote.textContent =  'Quotes';
    blockWeather.textContent =  'Weather';
    blockPlayer.textContent =  'Audio player';
    blockLinks.textContent =  'Links';
    optionPhotos.textContent =  'Photos';
    descriptionPhotos.textContent =  'Select a photo source';
    actionPhotos.textContent =  'Sources:';
    tagTitle.textContent =  'Get photos by tag (only in English):';
    optionLanguages.textContent =  'Languages';
    descriptionLanguages.textContent =  'Available languages for the app';
    actionLanguages.textContent =  'Change:';

  } else if (langGlobal === 'ru') {
    setupGeneral.textContent =  'Общие';
    setupPhotos.textContent =  'Фото';
    setupLanguages.textContent =  'Язык';
    optionGeneral.textContent =  'Общие';
    descriptionGeneral.textContent =  'Настройте свою информационную панель';
    actionGeneral.textContent =  'Показать:';
    blockTime.textContent =  'Часы';
    blockDate.textContent =  'Дата';
    blockGreeting.textContent =  'Приветствие';
    blockQuote.textContent =  'Цитаты';
    blockWeather.textContent =  'Погода';
    blockPlayer.textContent =  'Аудио плеер';
    blockLinks.textContent =  'Ссылки';
    optionPhotos.textContent =  'Фото';
    descriptionPhotos.textContent =  'Выберите источник фотографий';
    actionPhotos.textContent =  'Источники:';
    tagTitle.textContent =  'Фотографий по тегам (только на английском языке):';
    optionLanguages.textContent =  'Язык';
    descriptionLanguages.textContent =  'Доступные языки для приложения';
    actionLanguages.textContent =  'Изменить:';
  }
}

function translateAll() {
  if (langGlobal === 'en') {
    musicPlayNow.textContent =  'Music dont play now';
    linksTitle.textContent =  'Links';
    chromeTab.textContent =  'New tab';
    apps.textContent =  'Webstore Chrome';
    newLinks.textContent =  'New Link';
    createLink.textContent =  'Create';
    linksName.textContent =  'Name';
    linksLink.textContent =  'Link';
    speedWind = 'm/s'
    if (city.value === "Минск") {
      city.value = "Minsk";
    }
  } else if (langGlobal === 'ru') {
    musicPlayNow.textContent =  'Музыка не воспроизводится';
    linksTitle.textContent =  'Ссылки';
    chromeTab.textContent =  'Новая вкладка';
    apps.textContent =  'Интернет-магазин Chrome';
    newLinks.textContent =  'Новая ссылка';
    createLink.textContent =  'Создать';
    linksName.textContent =  'Название';
    linksLink.textContent =  'Ссылка';
    speedWind = 'м/с'
    if (city.value === "Minsk") {
      city.value = "Минск";
    }
  }
  greetingTranslation();
  getWeather();
  showTime();
  getQuotes();
  translateSettings();
}


function getLocalStorage() {
  if(localStorage.getItem('name')) {
    inputName.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  if(localStorage.getItem('tag')) {
    tegPhotos.value = localStorage.getItem('tag');
  }
  if(localStorage.getItem('setting')) {
    let oldSettings = localStorage.getItem('setting').split(',');
    //console.log('Load from SaveSettings', oldSettings);
    getSettings(oldSettings);
  } else {
    //console.log('Load from settings.blocks', settings.blocks);
    getSettings(settings.blocks);
  }
  if(localStorage.getItem('lang')) {
    let oldSettingsLang = localStorage.getItem('lang').split(',');
    //console.log('Load from Save langGlobal =', oldSettingsLang[0]);
    saveLang[0] = oldSettingsLang[0];
    langGlobal = saveLang[0];
    langTime = `${langGlobal}-${langGlobal.charAt(0).toUpperCase() + langGlobal.slice(1)}`;
    getLanguage(oldSettingsLang);
    translateAll();
  } else {
    //console.log('Load from Settings langGlobal =', settings.language[0]);
    getLanguage(settings.language);
  }
  if (localStorage.getItem('source')) {
    let oldSettingsSource = localStorage.getItem('source').split(',');
    //console.log('Load from Save Source =', oldSettingsSource[0]);
    saveSource[0] = oldSettingsSource[0];
    sourcePhoto = saveSource[0];
    getSource(oldSettingsSource);
    reloadBg();
  } else {
    //console.log('Load from Settings Source =', settings.photoSource[0]);
    getSource(settings.photoSource);
  }
  if (localStorage.getItem('saveNameLinks')) {
    saveLinks.nameLinks = localStorage.getItem('saveNameLinks').split(',');
    saveLinks.hrefLinks = localStorage.getItem('saveHrefLinks').split(',');
    getLinks(saveLinks);
    linksItems = document.querySelectorAll('.links__item');
    linksDeleteButton = document.querySelectorAll('.links__delete');
  } else {
    getLinks(uploadLinks);
  }

}
window.addEventListener('load', getLocalStorage);

function setLocalStorage() {
  localStorage.setItem('name', inputName.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('setting', saveSatting);
  localStorage.setItem('lang', saveLang);
  localStorage.setItem('source', saveSource);
  localStorage.setItem('saveNameLinks', saveLinks.nameLinks);
  localStorage.setItem('saveHrefLinks', saveLinks.hrefLinks);
  localStorage.setItem('tag', tegPhotos.value );
  //console.log('Reload', saveLang);
}
window.addEventListener('beforeunload', setLocalStorage);

settingsButton.addEventListener('click', showSettings);
