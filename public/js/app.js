angular.module('eq-airport', [
    'ngAnimate', 
    'ngMaterial',
    'ngRoute',
    'ui.bootstrap',
    'appRoutes',
    'MainCtrl',
    'FlightCtrl',
    'FlightService',
    'ArrivalService',
    'DepartureService',
    'ControllerService'
])
.config(function ($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('red');
  });