angular.module('MainCtrl', [])
.controller('modalCtrl', function ($scope, $uibModalInstance){
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
.controller('MainController',function ($rootScope, $scope, $uibModal,$location, FlightService){
    var modalInstance;
    $scope.showFlightCreated = false;
    $scope.searchError = false;

    $scope.openModal = function(){
        $scope.showFlightCreated = false;
        $scope.searchError = false;
        modalInstance = $uibModal.open({
            templateUrl: "views/addFlightModal.html",
            controller: 'modalCtrl',
            scope : $scope
        });
    
        modalInstance.result.then(function (flight) {
            $scope.insertFlight(flight);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

    $scope.insertFlight = function(flight){
        FlightService.createFlight(flight).then(
            function (res) {
                console.log("Flight Inserted in DB!")
                $scope.showFlightCreated = true;
                $scope.getLast10Flights();
            },
            function (reason) {
                console.error('Error while creating Flight');
            }
        )
    }

    $scope.getLast10Flights = function(){
        FlightService.getLast10Flights().then(
            function (res) {
                $scope.flights = res;
                console.log(res);
            },
            function (reason) {
                console.error('Error while fetching Flights');
            }
        )
    }
    $scope.getLast10Flights();

    $scope.findFlight = function(keyEvent) {
        $scope.searchError = false;
        if (keyEvent.which === 13){
            FlightService.getFlight($scope.flightCodeSearch).then(
                function (res) {
                    if(res){
                        $rootScope.flight = res;
                        $location.path('/flight');
                    }else{
                        $scope.searchError = true;
                        console.log("NOT FOUND");
                    }
                },
                function (reason) {
                    console.error('Error while fetching Flight');
                }
            )
        }
    }
});