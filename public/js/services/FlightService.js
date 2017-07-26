angular.module('FlightService', []).factory('FlightService', ['$http', '$q', function ($http, $q) {

    var REST_SERVICE_URI = 'http://localhost:8080/api/flight/';

    var factory = {
        getFlight: getFlight,
        createFlight: createFlight,
        getLast10Flights: getLast10Flights
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

    function getLast10Flights() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
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