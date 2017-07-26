angular.module('ControllerService', []).factory('ControllerService', ['$http', '$q', function ($http, $q) {

    var REST_SERVICE_URI = 'http://localhost:8080/api/controller/';

    var factory = {
        getController: getController,
        createController: createController,
        getAllControllers: getAllControllers
    };

    return factory;

    function getController(flightCode) {
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

    function createController() {
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