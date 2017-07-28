angular.module('DepartureService', []).factory('DepartureService', ['$http', '$q', function ($http, $q) {

    var REST_SERVICE_URI = 'http://localhost:8080/api/departure/';

    var factory = {
        getDeparture: getDeparture,
        createDeparture: createDeparture,
        getAllDepartures: getAllDepartures,
        getAllDeparturesForFlight: getAllDeparturesForFlight,
        getAllDeparturesForFlightBetweenDates: getAllDeparturesForFlightBetweenDates
    };

    return factory;

    function getDeparture(departureCode) {
        return $http.get(REST_SERVICE_URI + departureCode);
    }

    function createDeparture(departure) {
        return $http.post(REST_SERVICE_URI, departure);
    }

    function getAllDeparturesForFlight(flightCode) {
        return $http.get(REST_SERVICE_URI + flightCode);
    }

    function getAllDepartures() {
        return $http.get(REST_SERVICE_URI);
    }

    function getAllDeparturesForFlightBetweenDates(flightCode, begin_date, end_date) {
        return $http.get(REST_SERVICE_URI + flightCode + "/" + begin_date + "/" + end_date);
    }

}]);