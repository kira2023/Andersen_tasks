(function appController() {

    const view = appView();
    const model = appModel();

    function init() {
        view.onSearchWeather(processingWeather);
    }

    function processingWeather(searchStr) {
        view.manageSpinner(true);
        model.searchWeather(searchStr)
            .then((data) => {
                view.renderWeather(data);
            })
            .catch((error) => {
                view.renderError()
            })
            .finally(() => view.manageSpinner(false));
    }

    init()
})()
