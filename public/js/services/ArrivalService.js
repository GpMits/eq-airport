angular.module('ArrivalService', []).factory('ArrivalService', ['$http', '$q', function ($http, $q) {

    var REST_SERVICE_URI = 'http://localhost:8080/api/arrival/';

    var factory = {
        getArrival: getArrival,
        createArrival: createArrival,
        getAllArrivalsForFlight: getAllArrivalsForFlight
    };

    return factory;

    function getArrival(arrivalCode) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + arrivalCode)
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

    function createArrival(arrival) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, arrival)
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

    function getAllArrivalsForFlight(flightCode) {
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

}]);