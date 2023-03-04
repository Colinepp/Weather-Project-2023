let now = new Date();
let day = document.querySelector("#day");
let time = document.querySelector("#time");
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0".concat(minutes);
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let today = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
day.innerHTML = `${today} ${date}. ${month}`;
time.innerHTML = `${hour}:${minutes}`;

function showWeather(response) {
  let todayTemp = document.querySelector("#todayTemp");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#todayWeatherDesc").innerHTML =
    response.data.weather[0].main;
  let temperature = Math.round(response.data.main.temp);
  todayTemp.innerHTML = `${temperature}`;
}

function retriveSearchLocation(city) {
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function searchLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#input").value;
  retriveSearchLocation(city);
}

let submitSearchLocation = document.querySelector("#fullForm");
submitSearchLocation.addEventListener("submit", searchLocation);

function retriveCurrentLocation(position) {
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retriveCurrentLocation);
}
let submitCurrentLocation = document.querySelector("#currentLocationButton");
submitCurrentLocation.addEventListener("click", currentLocation);

function changeFahrenheit() {
  let Fahrenheit = document.querySelector("#fahrenheit");
  let tempFahrenheit = document.querySelector("#todayTemp");
  tempFahrenheit.innerHTML = "30";
}
fahrenheit.addEventListener("click", changeFahrenheit);
