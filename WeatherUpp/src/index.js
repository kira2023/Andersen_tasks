const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const valueCity = document.querySelector('.city-name');
const valueCountry = document.querySelector('.country-name');
const description = document.querySelector('.description');
const valueTemp = document.querySelector('.celsius-num');
const valuePress = document.querySelector('.pressure-value');
const valueHum = document.querySelector('.humidity-value');
const valueWind = document.querySelector('.wind-value');
const valueTempMin = document.querySelector('.temp-value-min');
const valueTempMax= document.querySelector('.temp-value-max');

const error = document.querySelector('.error');

searchButton.addEventListener("click", searchWeather);

function processingWeather(data) {
    if (data.name) {
        error.innerText = '';

        valueCity.innerText = data.name;
        valueCountry.innerText = data.sys.country;
        valueTemp.innerText = convertFromKelvintoCelsius(data.main.temp);
        valuePress.innerText = data.main.pressure;
        valueHum.innerText = data.main.humidity;
        valueWind.innerText = data.wind.speed;
        description.innerText = data.weather[0].main;
        valueTempMin.innerText = convertFromKelvintoCelsius(data.main.temp_min);
        valueTempMax.innerText = convertFromKelvintoCelsius(data.main.temp_max);

        console.log(data);
    } else {
        error.innerText = 'Sorry, weather for this city not found('
    }
}

function searchWeather() {
    const searchInputValue = searchInput.value;

    if (searchInputValue) {
        const srsUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchInputValue}&APPID=def1f3aa27892f05c5bc3dd1e69e4309`;

        fetch(srsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(processingWeather);
    } 
}

function convertFromKelvintoCelsius(num){
    return Math.round(num - 273.15);
}