//import { time } from 'scripts/time';

//Time and Date
console.log("test");
const time = document.querySelector('.time');
const dateFull = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const inputName = document.querySelector('.name');

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



