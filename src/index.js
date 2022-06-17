let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = today.getDay();

let hour = today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDayTime = document.querySelector("#day-time");
currentDayTime.innerHTML = `${days[day]} , ${hour}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  getTemperature(searchInput.value);
}

function getTemperature(cityName) {
  let apiKey = "cf7e06fd5931209278b90bb80e2b393a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function showTemperature(response) {
  let cityNameElement = document.querySelector("#city");
  cityNameElement.innerHTML = response.data.name;
  let temperatureResponse = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temperatureResponse} ºC`;
  console.log(response.data);
  showDescription(response.data.weather[0].description);
  showHumidty(response.data.main.humidity);
  showWind(response.data.wind.speed);
}

function showDescription(description) {
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
}

function showHumidty(humidity) {
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity : ${humidity}%`;
}
function showWind(wind) {
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind : ${wind}km/h`;
}

function searchLocation(position) {
  let apiKey = "cf7e06fd5931209278b90bb80e2b393a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

let search = document.querySelector("#search-form");
search.addEventListener("submit", showCity);
getTemperature("Berlin");
