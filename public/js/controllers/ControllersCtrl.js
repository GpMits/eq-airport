angular.module('ControllersCtrl', [])
.controller('ControllersController',function ($rootScope, $scope, ControllerService){
    $scope.controllers_list = [];
    
    $scope.getControllers = function() {
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
});