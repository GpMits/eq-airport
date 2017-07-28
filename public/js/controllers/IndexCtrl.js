angular.module('IndexCtrl', [])
.controller('IndexController',function ($rootScope, $scope, $location){
    $scope.goToPage = function(page){
        $location.path('/' + page)
    }
});