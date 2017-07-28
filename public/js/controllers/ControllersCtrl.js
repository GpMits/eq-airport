angular.module('ControllersCtrl', [])
.controller('addControllerCtrl', function ($scope, $uibModalInstance){
    $scope.ok = function () {

        controller = {
            code: $scope.code,
            name: $scope.name,
            surname: $scope.surname,
        }
        $uibModalInstance.close(controller);
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
            console.log('Modal dismissed at: ' + new Date());
        });
    }

    $scope.getControllers = function() {
        $scope.controllers_list = [];
        ControllerService.getAllControllers().then(
            function (controllers) {
                for (var i = 0, len = controllers.length; i < len; i++) {
                    if(controllers[i].busy){
                        controllers[i].busy = "Busy";
                    }else{
                        controllers[i].busy = "Free";
                    }
                    $scope.controllers_list.push(controllers[i]);
                }
            },
            function (reason) {
                console.error('Error while fetching Controllers');
            }
        )
    }
    $scope.getControllers();

    $scope.insertController = function(controller){
        ControllerService.createController(controller).then(
            function (res) {
                console.log("Controller Inserted in DB!");
                $scope.showControllerCreated = true;
                $scope.getControllers();
            },
            function (reason) {
                console.error('Error while creating Controller');
            }
        )
    }
});