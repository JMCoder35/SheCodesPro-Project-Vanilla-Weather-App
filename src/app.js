function displayTemperature(response) {
  console.log(response.data.main);
  let temperatureElement = document.querySelector("#currentTemp");
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feelsLike");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
}

let apiKey = "29ed711e6c528e8877439d3d2d9efee4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
