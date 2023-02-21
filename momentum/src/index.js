import playList from './scripts/playList';
import settings from './scripts/settings';


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

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-En', options);
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

greeting.textContent = `Good ${getTimeOfDay()}`;


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

function setBg(timeDay, numberPicture) {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeDay}/${numberPicture}.jpg`;
  img.onload = () => {      
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeDay}/${numberPicture}.jpg')`;
  }; 
}

setBg(getTimeOfDay(), getRandomNum(randomNum));

function getSlideNext() {
  randomNum = Number(getRandomNum(randomNum)) + 1;
  if (randomNum > 20) {
    randomNum = 1;
  }
  setBg(getTimeOfDay(), getRandomNum(randomNum));
}

function getSlidePrev() {
  randomNum = Number(getRandomNum(randomNum)) - 1;
  if (randomNum < 1) {
    randomNum = 20;
  }
  setBg(getTimeOfDay(), getRandomNum(randomNum));
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

async function getWeather() {  
  if (city.value === "") {
    city.value = "Minsk"
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=bc50cc0ba8db1784f2c3e644ffa70527&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  //console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)} °C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity} %`;
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
  const quotes = 'src/assets/quotes/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  let randomQuote = Math.floor(Math.random() * 99);
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
const audio = new Audio();

function playAudio() {
  //console.log('playList[playNum]', playList[playNum].title);
  musicPlayNow.textContent =  playList[playNum].title;
  if (isPlay === false) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    play.classList.add('pause');
    isPlay = true;
    //console.log("play");
  } else {
    audio.pause();
    play.classList.remove('pause');
    isPlay = false;
    //console.log("pause");
  }
}


function prevAudion() {
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else {
    playNum = playNum - 1;
  }
  isPlay = false;
  playAudio();
}

function nextAudion() {
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
  if (isPlay === false) {  
    musicLength.textContent = "0:00"
  } else {
    musicLength.textContent = converteTime(audio.duration);
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
let saveSatting = [];


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

swichButtons.forEach(element => {
  element.addEventListener('click', function() {
    let block = document.querySelector(`.${element.id}`);
    if (element.checked) {
      //console.log("cheked", element.id);
      if (saveSatting.indexOf(element.id) === -1) {
        saveSatting.push(element.id);
        block.style.opacity = 1;
      }
      //console.log("Settings", settings.blocks);
    } else {
      //console.log("Not cheked", element.id);
      if (saveSatting.indexOf(element.id) !== -1) {
        saveSatting.splice(saveSatting.indexOf(element.id), 1);
        block.style.opacity = 0;
      }
      //console.log("Settings", settings.blocks);
    }
  })
});

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    inputName.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('setting')) {
    let oldSettings = localStorage.getItem('setting').split(',');
    console.log('Load from SaveSettings', oldSettings);
    getSettings(oldSettings);
  } else {
    console.log('Load from settings.blocks', settings.blocks);
    getSettings(settings.blocks);
  }

}
window.addEventListener('load', getLocalStorage);

function setLocalStorage() {
  localStorage.setItem('name', inputName.value);
  localStorage.setItem('setting', saveSatting);
  console.log('Reload', saveSatting);
}
window.addEventListener('beforeunload', setLocalStorage);

settingsButton.addEventListener('click', showSettings);
