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
const valueTempMax = document.querySelector('.temp-value-max');
const imgWeather = document.querySelector('.weather-img');
const blockView = document.querySelector('.block-view');
const spinner = document.querySelector('.spinner');

const error = document.querySelector('.error');

const enterKeyCode = 13;

searchButton.addEventListener("click", searchWeather);
searchInput.addEventListener('keyup', keyPressHandler);

function processingWeather(data) {
    if (data.name) {
        error.innerText = '';

        valueCity.innerText = data.name;
        valueCountry.innerText = data.sys.country;
        valueTemp.innerText = data.main.temp;
        valuePress.innerText = data.main.pressure;
        valueHum.innerText = data.main.humidity;
        valueWind.innerText = data.wind.speed;
        description.innerText = data.weather[0].main;
        valueTempMin.innerText = data.main.temp_min;
        valueTempMax.innerText = data.main.temp_max;
        imgWeather.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        spinner.classList.add('block-view');
        blockView.classList.remove('block-view');
        console.log(data);
    } else {
        error.innerText = 'Sorry, weather for this city not found('
    }
}

function searchWeather() {
    const searchInputValue = searchInput.value.trim();

    if (searchInputValue) {
        const srsUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchInputValue}&units=metric&APPID=def1f3aa27892f05c5bc3dd1e69e4309`;

        spinner.classList.remove('block-view');
        
        fetch(srsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(processingWeather);
    } 
}

function keyPressHandler(event) {
    if(event.keyCode === enterKeyCode){
        searchWeather();
    }
}