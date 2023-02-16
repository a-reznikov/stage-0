//import { time } from 'scripts/time';

//Time and Date
console.log("test");
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
    case 1:  timeOfDay = "morning ";
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


function getLocalStorage() {
  if(localStorage.getItem('name')) {
    inputName.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

function setLocalStorage() {
  localStorage.setItem('name', inputName.value);
}
window.addEventListener('beforeunload', setLocalStorage);


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
const city = document.querySelector('.city');

async function getWeather() {  
  if (city.value === "") {
    city.value = "Minsk"
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=bc50cc0ba8db1784f2c3e644ffa70527&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function choozeCity(e) {
  if (e.code === "Enter") {
    console.log(city.value);
    getWeather();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', choozeCity);



