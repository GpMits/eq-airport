angular.module('FlightCtrl', [])
.controller('newArrivalModalCtrl', function ($scope, $uibModalInstance){
    $scope.ok = function () {
        var days_of_week_strings = []
        for (var day in $scope.days_of_week){
                if($scope.days_of_week[day]){
                    days_of_week_strings.push(day);
                }
        }

        flight = {
            code: $scope.code,
            carrier: $scope.carrier,
            departing_airport: $scope.dep_airport,
            destination_airport: $scope.dest_airport,
            days_of_week: days_of_week_strings,
            departure: $scope.departure,
            arrival: $scope.arrival
        }
        $uibModalInstance.close(flight);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.days_of_week = {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    }
})
.controller('FlightController',function ($rootScope, $scope, $uibModal, FlightService){
    $scope.flight = $rootScope.flight;

    $scope.openNewArrivalModal = function(){
        $scope.showFlightCreated = false;
        $scope.searchError = false;
        modalInstance = $uibModal.open({
            templateUrl: "views/addArrivalModal.html",
            controller: 'modalCtrl'
        });
    
        modalInstance.result.then(function (flight) {
            $scope.insertFlight(flight);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }
});