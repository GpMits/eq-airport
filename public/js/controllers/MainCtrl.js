angular.module('MainCtrl', [])
.controller('addFlightController', function ($scope, $uibModalInstance, FlightService){
    $scope.ok = function () {
        $scope.errorMessage = false;
        if (!$scope.code || !$scope.carrier || !$scope.dep_airport || !$scope.dest_airport 
            || $scope.days_of_week.lenght == 0 || !$scope.departure || !$scope.arrival){
                $scope.errorMessage = true;
                $scope.errorMessageText = "Please fill all fields!";
                return;
        }

        FlightService.getFlight($scope.code).then(
            function (res) {
                if(res){
                    $scope.errorMessage = true;
                    $scope.errorMessageText = "There is already a flight with code " + $scope.code + "!";
                }else{
                    var days_of_week_strings = [];
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
                }
            },
            function (reason) {
                console.error('Error while fetching Flight');
            }
        );
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.days_of_week = {
        SUN: false,
        MON: false,
        TUE: false,
        WED: false,
        THU: false,
        FRI: false,
        SAT: false,
    };

    $scope.daySelection = function(day){
        $scope.days_of_week[day] = !$scope.days_of_week[day];
    };
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
            controller: 'addFlightController',
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
                console.log("Flight Inserted in DB!");
                $scope.showFlightCreated = true;
                $scope.getLast10Flights();
            },
            function (reason) {
                console.error('Error while creating Flight');
            }
        )
    }

    $scope.getLast10Flights = function(){
        FlightService.getLastNFlights(10).then(
            function (res) {
                $scope.flights = res;
            },
            function (reason) {
                console.error('Error while fetching Flights');
            }
        )
    }
    $scope.getLast10Flights();

    $scope.searchFlight = function(keyEvent) {
        $scope.searchError = false;
        if (keyEvent.which === 13){
            FlightService.getFlight($scope.flightCodeSearch).then(
                function (res) {
                    if(res){
                        $rootScope.flight = res;
                        $location.path('/flight');
                    }else{
                        $scope.searchError = true;
                    }
                },
                function (reason) {
                    console.error('Error while fetching Flight');
                }
            );
        }
    }
    $scope.teste = function () {
        console.log("testeeee")
    }
    $scope.findFlight = function(code) {
        FlightService.getFlight(code).then(
            function (res) {
                if(res){
                    $rootScope.flight = res;
                    $location.path('/flight');
                }else{
                    $scope.searchError = true;
                }
            },
            function (reason) {
                console.error('Error while fetching Flight');
            }
        );
    };
});