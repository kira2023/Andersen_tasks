function appModel() {

    function searchWeather(searchStr) {
        if (searchStr) {
            const srsUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchStr}&units=metric&APPID=def1f3aa27892f05c5bc3dd1e69e4309`;

            return fetch(srsUrl)
                .then(function (response) {
                    return response.json();
                })
        } 
    }
    
    return {
        searchWeather: searchWeather
    }
}