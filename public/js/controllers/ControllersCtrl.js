angular.module('ControllersCtrl', [])
.controller('addControllerCtrl', function ($scope, $uibModalInstance, ControllerService){
    $scope.ok = function () {
        $scope.errorMessage = false;
        //Check if all fields are filled
        if (!$scope.code || !$scope.name || !$scope.surname){
                $scope.errorMessage = true;
                $scope.errorMessageText = "Please fill all fields!";
                return;
        }

        //Check if the controller is unique
        ControllerService.getController($scope.code).then(
            function (res) {
                if(res.data){
                    $scope.errorMessage = true;
                    $scope.errorMessageText = "There is already a controller with code " + $scope.code + "!";
                }else{
                    controller = {
                    code: $scope.code,
                    name: $scope.name,
                    surname: $scope.surname,
                }
                $uibModalInstance.close(controller);
                }
            },
            function (reason) {
                console.error('Error while fetching Controller!');
            }
        );
        
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
.controller('ControllersController',function ($rootScope, $scope, $uibModal, ControllerService){
    var modalInstance;

    $scope.openModal = function(){
        $scope.showControllerCreated = false;
        modalInstance = $uibModal.open({
            templateUrl: "views/addControllerModal.html",
            controller: 'addControllerCtrl',
            scope : $scope
        });
    
        modalInstance.result.then(function (controller) {
            $scope.insertController(controller);
        }, function () {
        });
    }

    //Get all controllers from db
    $scope.getControllers = function() {
        $scope.controllers_list = [];
        ControllerService.getAllControllers().then(
            function (controllers) {
                if(controllers.data){
                    for (var i = 0, len = controllers.data.length; i < len; i++) {
                        if(controllers.data[i].busy){
                            controllers.data[i].busy = "Busy";
                        }else{
                            controllers.data[i].busy = "Free";
                        }
                        $scope.controllers_list.push(controllers.data[i]);
                    }
                }
            },
            function (reason) {
                console.error('Error while fetching Controllers');
            }
        )
    }
    $scope.getControllers();

    //Add the new controller in db
    $scope.insertController = function(controller){
        ControllerService.createController(controller).then(
            function (res) {
                $scope.showControllerCreated = true;
                $scope.getControllers();
            },
            function (reason) {
                console.error('Error while creating Controller');
            }
        )
    }
});