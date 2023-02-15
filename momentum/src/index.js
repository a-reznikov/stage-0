//import { time } from 'scripts/time';

//time(1, 2);
console.log("test");
const time = document.querySelector('.time');
const dateFull = document.querySelector('.date');

function showTime() {
  const date = new Date();
  console.log(date);
  const currentTime = date.toLocaleTimeString();
  const options = {month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-En', options);
  time.textContent = currentTime;
  dateFull.textContent = currentDate;
  setTimeout(showTime, 1000);
}

showTime();