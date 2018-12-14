function AppModel() {};

AppModel.prototype.searchWeather = function(searchStr) {
    const srcUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchStr}&units=metric&APPID=def1f3aa27892f05c5bc3dd1e69e4309`;
    
    return doSearchRequest(srcUrl);
};
AppModel.prototype.searchCity = function(searchStr) {
    const srcUrl = `http://localhost:3000/city-search?q=${searchStr}`;

    return doSearchRequest(srcUrl);
};

function doSearchRequest(searchUrl) {
    
    return fetch(searchUrl)
        .then(function (response) {
            return response.json();
        })
};
