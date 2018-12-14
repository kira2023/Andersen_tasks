function BaseView(){};

BaseView.prototype.getElement = function(selector){
    return document.querySelector(selector);
}
BaseView.prototype.render = function(element, content){
    element.innerHTML = content;
}

function AppView() {

    this.searchInput = this.getElement('.search-input');
    this.searchButton = this.getElement('.search-button');
    this.valueCity = this.getElement('.city-name');
    this.valueCountry = this.getElement('.country-name');
    this.description = this.getElement('.description');
    this.valueTemp = this.getElement('.celsius-num');
    this.valuePress = this.getElement('.pressure-value');
    this.valueHum = this.getElement('.humidity-value');
    this.valueWind = this.getElement('.wind-value');
    this.valueTempMin = this.getElement('.temp-value-min');
    this.valueTempMax = this.getElement('.temp-value-max');
    this.imgWeather = this.getElement('.weather-img');
    this.contentView = this.getElement('.content');
    this.spinner = this.getElement('.spinner');
    this.dropdown = this.getElement('.dropdown');
    
    this.error = this.getElement('.error');  
};

    AppView.prototype = Object.create(BaseView.prototype);
    AppView.prototype.constructor = AppView;

    AppView.prototype.enterKeyCode = 13;
    AppView.prototype.onSearchWeather = function(callback) {
        this.searchButton.addEventListener('click', () => {
            const searchStr = this.searchInput.value.trim();
            callback(searchStr);
            this.renderCity(false);
        });

        this.searchInput.addEventListener('keyup', (event) => {
            if (event.keyCode === this.enterKeyCode) { 
                const searchStr = this.searchInput.value.trim();
                callback(searchStr);
                this.renderCity(false);
            }
        });
    };
    
    AppView.prototype.onSearchCity = function(callback) {
        let lastSearchStr;
        let timeId;

        this.searchInput.addEventListener('keyup', (event) => {
            if (event.keyCode !== this.enterKeyCode) { 
                const inputValue = this.searchInput.value.trim();
                if (inputValue === lastSearchStr ) {
                    return;
                } 
                lastSearchStr = inputValue;
                clearTimeout(timeId);

                if(!lastSearchStr){
                    this.renderCity(false);
                    return;
                }

                timeId  = setTimeout(() => callback(lastSearchStr), 1000);
            }
        });
    };

    AppView.prototype.onSelectCity = function(callback) {
        this.dropdown.addEventListener('click', (event) => {
            const selectedCity = event.target.innerText;
            if(selectedCity){
                this.searchInput.value = selectedCity;
                callback(selectedCity);
                this.renderCity(false);
            }
        })
    }

    AppView.prototype.renderWeather = function(data) {
        if (data.name) {

            this.render(this.error, '');
                
            this.render(this.valueCity, data.name);
            this.render(this.valueCountry, data.sys.country);
            this.render(this.valueTemp, data.main.temp);
            this.render(this.valuePress, data.main.pressure);
            this.render(this.valueHum, data.main.humidity);
            this.render(this.valueWind, data.wind.speed);
            this.render(this.description, data.weather[0].main);
            this.render(this.valueTempMin, data.main.temp_min);
            this.render(this.valueTempMax, data.main.temp_max);

            this.imgWeather.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    
            this.contentView.classList.remove('hide');
        } else {
            this.render(this.error, 'Sorry, weather for this city not found =( ');
        }
    };

    AppView.prototype.renderCity = function(data){
        if (data) {       
            let content = '';      
            data.forEach(item => {
                content += `<li class="dropdown__item">${item.city}</li>`
            });
            this.render(this.dropdown, content);
        } else{
            content =  ' ';
            this.render(this.dropdown, content);
        }
    };

    AppView.prototype.manageSpinner = function(isSpinnerDisplay) {
        if (isSpinnerDisplay) {
            this.spinner.classList.remove('hide');
        } else {
            this.spinner.classList.add('hide');
        }
    };
    AppView.prototype.renderError = function () {
        this.render( this.error, 'Сonnection error! Try again later.');
    };
