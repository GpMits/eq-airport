angular.module('ArrivalService', []).factory('ArrivalService', ['$http', '$q', function ($http, $q) {

    var REST_SERVICE_URI = 'http://localhost:8080/api/arrival/';

    var factory = {
        getArrival: getArrival,
        createArrival: createArrival,
        getAllArrivals, getAllArrivals,
        getAllArrivalsForFlight: getAllArrivalsForFlight,
        getAllArrivalsForFlightBetweenDates: getAllArrivalsForFlightBetweenDates
    };

    return factory;

    function getArrival(arrivalCode) {
        return $http.get(REST_SERVICE_URI + arrivalCode);
    }

    function createArrival(arrival) {
        return $http.post(REST_SERVICE_URI, arrival);
    }

    function getAllArrivalsForFlight(flightCode) {
        return $http.get(REST_SERVICE_URI + flightCode);
    }

    function getAllArrivals() {
        return $http.get(REST_SERVICE_URI);
    }

    function getAllArrivalsForFlightBetweenDates(flightCode, begin_date, end_date) {
        return $http.get(REST_SERVICE_URI + flightCode + "/" + begin_date + "/" + end_date);
    }

}]);