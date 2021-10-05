function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursay",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#currentTemp");
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let dateTimeElement = document.querySelector("#dateTime");
  let windSpeedElement = document.querySelector("#windSpeed");
  let currentIconElement = document.querySelector("#currentIcon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusLink.classList.add("active");
  cityElement.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like) + "°C";
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  //remove the .unit class css from celsius link
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#currentTemp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let feelsLikeElement = document.querySelector("#feelsLike");
  temperatureElement.innerHTML = fahrenheitTemperature;
  feelsLikeElement.innerHTML = fahrenheitTemperature + "°F";
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  //remove the .unit class css from fahrenheit link
  let temperatureElement = document.querySelector("#currentTemp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let feelsLikeElement = document.querySelector("#feelsLike");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  feelsLikeElement.innerHTML = Math.round(celsiusTemperature) + "°C";
}

let apiKey = "29ed711e6c528e8877439d3d2d9efee4";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("click", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
