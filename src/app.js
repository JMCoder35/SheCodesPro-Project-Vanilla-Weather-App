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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let days = response.data.daily;
  let daysElement = document.querySelector("#weather-forecast-days");
  let forecastElement = document.querySelector("#weather-forecast");
  let daysHTML = `<div class="col-2 weather-forecast-days"`;
  days.forEach(function (forecastDay, index) {
    if (index < 6) {
      daysHTML =
        daysHTML +
        `<div class="weather-forecast-days">${formatDay(forecastDay.dt)}</div>
        `;
    }
  });
  let forecastHTML = `<div class="col-4 weather-forecast"`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast-temperatures">
       <span><img
        class="forecast-image"
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="36"
      /></span>
      <span class="forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}°</span> /
       <span class="forecast-temperature-min">${Math.round(
         forecastDay.temp.min
       )}°</span>
    </div>
    `;
    }
  });

  daysHTML = daysHTML + `</div>`;
  daysElement.innerHTML = daysHTML;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "29ed711e6c528e8877439d3d2d9efee4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
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
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like) + "°F";
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function search(city) {
  let apiKey = "29ed711e6c528e8877439d3d2d9efee4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function retrievePosition(position) {
  let apiKey = "29ed711e6c528e8877439d3d2d9efee4";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("click", handleSubmit);

navigator.geolocation.getCurrentPosition(retrievePosition);

fitty("#weather-forecast");
