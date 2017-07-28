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
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + flightCode)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function createFlight(flight) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, flight)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function getLastNFlights(n) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'n/' + n)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function getFlightsCodes(flight_ids) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'codes/' + flight_ids.join())
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

}]);