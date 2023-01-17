const weatherDisplay = document.querySelector(".weather");
const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const toggle = document.querySelector(".toggle");

// Fetch weather data from API
const fetchWeather = async (city) => {
  const url = `/api?q=${city}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404") {
    alert("City not found");
    return;
  }

  if (data.cod === 401) {
    alert("Invalid API Key");
    return;
  }

  const displayDataCelsius = {
    city: data.name,
    temp: kelvinToCelsius(data.main.temp),
  };

  const displayDataFahrenheit = {
    city: data.name,
    temp: kelvinToFahrenheit(data.main.temp),
  };

  temperatureCelsius
    ? addWeatherToDOM(displayDataCelsius)
    : addWeatherToDOM(displayDataFahrenheit);
};

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = temperatureCelsius
    ? `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;C</h2>
  `
    : `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;F</h2>
  `;
  cityInput.value = "";
};

// Convert Kelvin to Fahrenheit
const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
};

// Convert Kelvin to Celsius
const kelvinToCelsius = (temp) => {
  return Math.ceil(temp - 273.15);
};

let temperatureCelsius = true;
// Event listener for form submission
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cityInput.value === "") {
    alert("Please enter a City");
  } else {
    fetchWeather(cityInput.value);
  }
});

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("toggle")) {
    html.classList.remove("toggle");
    e.target.innerHTML = "Temperature in Celsius";
    temperatureCelsius = true;
  } else {
    html.classList.add("toggle");
    e.target.innerHTML = "Temperature in Fahrenheit";
    temperatureCelsius = false;
  }
});

// Initial fetch
fetchWeather("Wuerzburg");
