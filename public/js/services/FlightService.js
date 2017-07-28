angular.module('FlightService', []).factory('FlightService', ['$http', '$q', function ($http, $q) {

    var REST_SERVICE_URI = 'http://localhost:8080/api/flight/';

    var factory = {
        getFlight: getFlight,
        createFlight: createFlight,
        getLastNFlights: getLastNFlights,
        getFlightsCodes: getFlightsCodes
    };

    return factory;

    function getFlight(flightCode) {
        return $http.get(REST_SERVICE_URI + flightCode);
    }

    function createFlight(flight) {
        return $http.post(REST_SERVICE_URI, flight);
    }

    function getLastNFlights(n) {
        return $http.get(REST_SERVICE_URI + 'n/' + n);
    }

    function getFlightsCodes(flight_ids) {
        return $http.get(REST_SERVICE_URI + 'codes/' + flight_ids.join());
    }

}]);