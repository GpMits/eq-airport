angular.module('DepartureService', []).factory('DepartureService', ['$http', '$q', function ($http, $q) {

    var REST_SERVICE_URI = 'http://localhost:8080/api/departure/';

    var factory = {
        getDeparture: getDeparture,
        createDeparture: createDeparture,
        getAllDeparturesForFlight: getAllDeparturesForFlight,
        getAllDeparturesForFlightBetweenDates: getAllDeparturesForFlightBetweenDates
    };

    return factory;

    function getDeparture(departureCode) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + departureCode)
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

    function createDeparture(departure) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, departure)
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

    function getAllDeparturesForFlight(flightCode) {
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

    function getAllDeparturesForFlightBetweenDates(flightCode, begin_date, end_date) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + flightCode + "/" + begin_date + "/" + end_date)
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