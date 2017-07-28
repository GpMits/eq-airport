angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/flight', {
            templateUrl: 'views/flight.html',
            controller: 'FlightController'
        })

        .when('/arrivals', {
            templateUrl: 'views/arrivals.html',
            controller: 'ArrivalsController'
        })

        .when('/departures', {
            templateUrl: 'views/departures.html',
            controller: 'DeparturesController'
        })

        .when('/controllers', {
            templateUrl: 'views/controllers.html',
            controller: 'ControllersController'
        })

}]);