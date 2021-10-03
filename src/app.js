function displayTemperature(response) {
  console.log(response.data.main.temp);
}

let apiKey = "29ed711e6c528e8877439d3d2d9efee4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
