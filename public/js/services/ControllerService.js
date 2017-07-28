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
        return $http.get(REST_SERVICE_URI + controllerCode);
    }

    function createController(controller) {
        return $http.post(REST_SERVICE_URI, controller);
    }

    function getAllControllers() {
        return $http.get(REST_SERVICE_URI);
    }

    function updateController(controller) {
        return $http.put(REST_SERVICE_URI + controller.code, controller);
    }
}]);