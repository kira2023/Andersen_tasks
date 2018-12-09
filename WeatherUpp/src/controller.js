function AppController(view, model) {
    this.view = view;
    this.model = model;
};

AppController.prototype.processingWeather = function(searchStr) {
    this.view.manageSpinner(true);
    this.model.searchWeather(searchStr)
        .then((data) => {
            this.view.renderWeather(data);
        })
        .catch((error) => {
            this.view.renderError()
        })
        .finally(() => this.view.manageSpinner(false));
};

AppController.prototype.init = function() {
    this.view.onSearchWeather((searchStr) => this.processingWeather(searchStr));
};

const view = new AppView();
const model = new AppModel();

const controller =  new AppController(view, model);
controller.init();
