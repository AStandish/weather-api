const fetchButton = document.getElementById("fetch-button");
const inputName = document.getElementById("inputName");
const currentDay = document.getElementById("today");
const currentWeather = document.getElementById("currentWeather");
const forecast = document.getElementById("forecastWeather");

let savedCitiesArray = JSON.parse(localStorage.getItem("cityName")) || [];

function getApi(input) {
  // fetch request gets a list of all the repos for the node.js organization
  const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=9d69570cc2097eb0470c7256980f5753`;
  fetch(requestUrl)
    .then(function (res) {
      // console.log("res looks like", res);
      return res.json();
    })
    .then(function (data) {
      // console.log("data looks like", data);
      // getCurrentWeather(data[0]);
      getForecastWeather(data[0]);
    });
}

function getCurrentWeather(location) {
  const lat = location.lat;
  const lon = location.lon;
  const requestUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=9d69570cc2097eb0470c7256980f5753`;
  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("weather endpoint data", data);
      displayWeather(data);
    });
}

function getForecastWeather(location) {
  const lat = location.lat;
  const lon = location.lon;
  const requestUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=9d69570cc2097eb0470c7256980f5753`;
  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("forecast endpoint data", data);
      // displayForecast(data.list[4]);
    });
}

// const date = new Date(data.current.dt * 1000);

// dateTime.text(
//   "(" +
//     (date.getMonth() + 1) +
//     "/" +
//     date.getDate() +
//     "/" +
//     date.getFullYear() +
//     ")"
// );

function displayForecast(data) {
  console.log(data);
  forecast.innerHTML = "";
  for (let i = 0; i < data.list.length; i++) {
    const currentWeatherItem = data.list[i];
    if (currentWeatherItem.dt_txt.indexOf("15:00:00") > 0) {
      console.log(currentWeatherItem);
      console.log("windspeed", currentWeatherItem.wind.speed);
      console.log("temp", currentWeatherItem.main.temp);
      console.log("humidity", currentWeatherItem.main.humidity);
      console.log("currentWeather", currentWeatherItem.weather[0].icon);
      let colElement = document.createElement("div");
      colElement.classList.add("col");
      let tempElement = document.createElement("p");
      tempElement.textContent = "temp: " + currentWeatherItem.main.temp;
      let windElement = document.createElement("p");
      windElement.textContent = "windspeed: " + currentWeatherItem.wind.speed;
      let humidityElement = document.createElement("p");
      humidityElement.textContent =
        "humidity: " + currentWeatherItem.main.humidity;
      let iconElement = document.createElement("img");
      const iconUrl =
        "http://openweathermap.org/img/w/" +
        currentWeatherItem.weather[0].icon +
        ".png";
      iconElement.setAttribute("src", iconUrl);
      colElement.append(tempElement, windElement, humidityElement, iconElement);
      forecast.append(colElement);
    }
  }
  let date = moment().format("MMMM Do, YYYY");
}

function displayWeather(data) {
  console.log(data);
  currentWeather.innerHTML = "";
  const currentWeatherItem = data.list[0];
  let tempElement = document.createElement("p");
  tempElement.textContent = "temp: " + currentWeatherItem.main.temp;
  let windElement = document.createElement("p");
  windElement.textContent = "windspeed: " + currentWeatherItem.wind.speed;
  let humidityElement = document.createElement("p");
  humidityElement.textContent = "humidity: " + currentWeatherItem.main.humidity;
  let iconElement = document.createElement("img");
  const iconUrl =
    "http://openweathermap.org/img/w/" +
    currentWeatherItem.weather[0].icon +
    ".png";
  iconElement.setAttribute("src", iconUrl);
  currentWeather.append(tempElement, windElement, humidityElement, iconElement);
}

fetchButton.addEventListener("click", function (event) {
  event.preventDefault();
  let cityInput = inputName.value;
  getApi(cityInput);
  saveToLocalStorage(cityInput);
});

function saveToLocalStorage(cityName) {
  console.log("click heard!");
  savedCitiesArray.push(cityName);
  console.log(savedCitiesArray);
  localStorage.setItem("cityName", JSON.stringify(savedCitiesArray));
}

// let getCity = [];
//   const cityName = localStorage.getItem("cityName");
//   if (cityNameStr) {
//     cityName = JSON.parse(cityNameStr);

//   };

//   localStorage.setItem("cityName", JSON.stringify(cityName));

/*function renderCityName() {
  cityName = JSON.parse(localStorage.getItem("cityNameStr"));
  for (let i = 0; i < cityName.length; i++) {
    cityName = document.createElement("div");
    console.log();*/
