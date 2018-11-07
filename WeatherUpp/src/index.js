const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const valueCity = document.querySelector('.value-city');
const valueTemp = document.querySelector('.value-temperature');
const valuePress = document.querySelector('.value-pressure');
const error = document.querySelector('.error');

searchButton.addEventListener("click", searchWeather);

function processingWeather(data) {
    if (data.name) {
        error.innerText = '';

        valueCity.innerText = data.name;
        valueTemp.innerText = data.main.temp;
        valuePress.innerText = data.main.pressure;
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