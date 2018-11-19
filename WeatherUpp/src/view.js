function appView() {

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
    const contentView = document.querySelector('.content');
    const spinner = document.querySelector('.spinner');
    
    const error = document.querySelector('.error');
    
    const enterKeyCode = 13;

    function onSearchWeather(callback) {
        searchButton.addEventListener('click', () => {
            const searchStr = searchInput.value.trim();
            callback(searchStr);
        });

        searchInput.addEventListener('keyup', (event) => {
            if (event.keyCode === enterKeyCode) { 
                const searchStr = searchInput.value.trim();
                callback(searchStr);
            }
        });
    }

    function renderWeather(data) {
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
    
            contentView.classList.remove('hide');
        } else {
            error.innerText = 'Sorry, weather for this city not found('
        }
    }

    function manageSpinner(isSpinnerDisplay) {
        if (isSpinnerDisplay) {
            spinner.classList.remove('hide');
        } else {
            spinner.classList.add('hide');
        }
    }

    function renderError() {
        error.innerText = 'Сonnection error! Try again later.';
    }

    return {
        onSearchWeather: onSearchWeather,
        renderWeather: renderWeather,
        manageSpinner: manageSpinner,
        renderError: renderError
    }

}
