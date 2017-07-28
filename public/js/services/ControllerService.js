angular.module('ControllerService', []).factory('ControllerService', ['$http', '$q', function ($http, $q) {

    var REST_SERVICE_URI = 'http://localhost:8080/api/controller/';

    var factory = {
        getController: getController,
        createController: createController,
        getAllControllers: getAllControllers,
        updateController: updateController
    };

    return factory;

    function getController(controllerCode) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + controllerCode)
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

    function createController(controller) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, controller)
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

    function getAllControllers() {
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

    function updateController(controller) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI + controller.code, controller)
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