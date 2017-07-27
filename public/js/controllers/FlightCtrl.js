angular.module('FlightCtrl', [])
.controller('newDepartureModalCtrl', function ($scope, $uibModalInstance, ControllerService, DepartureService){
    $scope.controllers = []
    console.log("DEPPPP")
    $scope.searchError = false;
    $scope.alreadyAddedError = false;

    $scope.searchController = function(keyEvent) {
        $scope.searchError = false;
        $scope.alreadyAddedError = false;
        
        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            if($scope.controllers[i].code == $scope.controllerCodeSearch){
                console.log($scope.controllers[i])
                $scope.alreadyAddedError = true;
                return;
            }
        }

        if (keyEvent.which === 13){
            ControllerService.getController($scope.controllerCodeSearch).then(
                function (res) {
                    if(res){
                        console.log('Found');
                        $scope.controllers.push(res);
                    }else{
                        $scope.searchError = true;
                    }
                },
                function (reason) {
                    console.error('Error while fetching Controller');
                }
            );
        }
    }

    $scope.findController = function() {
        $scope.searchError = false;
        $scope.alreadyAddedError = false;

        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            if($scope.controllers[i].code == $scope.controllerCodeSearch){
                $scope.alreadyAddedError = true;
                return;
            }
        }

        ControllerService.getController($scope.controllerCodeSearch).then(
            function (res) {
                if(res){
                    console.log('Found');
                    $scope.controllers.push(res);
                }else{
                    $scope.searchError = true;
                }
            },
            function (reason) {
                console.error('Error while fetching Controller');
            }
        );
    };

    $scope.removeController = function (controller){
        var index = $scope.controllers.indexOf(controller);
        $scope.controllers.splice(index);
    }

    $scope.ok = function () {
        var controllers_codes = [];
        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            controllers_codes.push($scope.controllers[i].code);
        }
        console.log($scope.departure_date)
        console.log($scope.departure_time)
        var departure_date_time = new Date($scope.departure_date.getFullYear(), 
                                         $scope.departure_date.getMonth(), $scope.departure_date.getDate(), 
                                         $scope.departure_time.getHours(), $scope.departure_time.getMinutes(), 
                                         $scope.departure_time.getSeconds());
        console.log(departure_date_time)
        departure = {
            departure_time: departure_date_time,
            lane_used: $scope.lane,
            controllers: controllers_codes,
            flight_id: $scope.flight._id
        }

        DepartureService.createDeparture(departure).then(
            function (res) {
                console.log("Departure Inserted in DB!");
                $scope.showDepartureCreated = true;
                $uibModalInstance.close();
            },
            function (reason) {
                console.error('Error while creating Departure');
            }
        )
        
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

})
.controller('newArrivalModalCtrl', function ($scope, $uibModalInstance, ControllerService, ArrivalService){
    $scope.controllers = []
    $scope.searchError = false;
    $scope.alreadyAddedError = false;

    $scope.searchController = function(keyEvent) {
        $scope.searchError = false;
        $scope.alreadyAddedError = false;
        
        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            if($scope.controllers[i].code == $scope.controllerCodeSearch){
                console.log($scope.controllers[i])
                $scope.alreadyAddedError = true;
                return;
            }
        }

        if (keyEvent.which === 13){
            ControllerService.getController($scope.controllerCodeSearch).then(
                function (res) {
                    if(res){
                        console.log('Found');
                        $scope.controllers.push(res);
                    }else{
                        $scope.searchError = true;
                    }
                },
                function (reason) {
                    console.error('Error while fetching Controller');
                }
            );
        }
    }

    $scope.findController = function() {
        $scope.searchError = false;
        $scope.alreadyAddedError = false;

        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            if($scope.controllers[i].code == $scope.controllerCodeSearch){
                $scope.alreadyAddedError = true;
                return;
            }
        }

        ControllerService.getController($scope.controllerCodeSearch).then(
            function (res) {
                if(res){
                    console.log('Found');
                    $scope.controllers.push(res);
                }else{
                    $scope.searchError = true;
                }
            },
            function (reason) {
                console.error('Error while fetching Controller');
            }
        );
    };

    $scope.removeController = function (controller){
        var index = $scope.controllers.indexOf(controller);
        $scope.controllers.splice(index);
    }

    $scope.ok = function () {
        var controllers_codes = [];
        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            controllers_codes.push($scope.controllers[i].code);
        }
        console.log($scope.arrival_date)
        console.log($scope.arrival_time)
        var arrival_date_time = new Date($scope.arrival_date.getFullYear(), 
                                         $scope.arrival_date.getMonth(), $scope.arrival_date.getDate(), 
                                         $scope.arrival_time.getHours(), $scope.arrival_time.getMinutes(), 
                                         $scope.arrival_time.getSeconds());
        console.log(arrival_date_time)
        arrival = {
            arrival_time: arrival_date_time,
            lane_used: $scope.lane,
            controllers: controllers_codes,
            flight_id: $scope.flight._id
        }

        ArrivalService.createArrival(arrival).then(
            function (res) {
                console.log("Arrival Inserted in DB!");
                $scope.showArrivalCreated = true;
                $uibModalInstance.close();
            },
            function (reason) {
                console.error('Error while creating Arrival');
            }
        )
        
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

})
.controller('FlightController',function ($rootScope, $scope, $uibModal, ArrivalService, DepartureService){
    $scope.flight = $rootScope.flight;
    $scope.departures_arrivals = [];

    $scope.openNewArrivalModal = function(){
        $scope.showFlightCreated = false;
        $scope.searchError = false;
        modalInstance = $uibModal.open({
            templateUrl: "views/addArrivalModal.html",
            controller: 'newArrivalModalCtrl',
            scope: $scope
        });
    
        modalInstance.result.then(function () {
            $scope.showArrivalCreated = true;
            $scope.getLastDeparturesArrivals();

        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

    $scope.openNewDepartureModal = function(){
        $scope.showFlightCreated = false;
        $scope.searchError = false;
        modalInstance = $uibModal.open({
            templateUrl: "views/addDepartureModal.html",
            controller: 'newDepartureModalCtrl',
            scope: $scope
        });
    
        modalInstance.result.then(function () {
            $scope.showDepartureCreated = true;
            $scope.getLastDeparturesArrivals();

        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

    $scope.getLastDeparturesArrivals = function() {
        $scope.departures_arrivals = [];
        ArrivalService.getAllArrivalsForFlight($scope.flight.code).then(
            function (res) {
                for (var i = 0, len = res.length; i < len; i++) {
                    var da = {
                        type: "Arrival",
                        date_time: res[i].arrival_time,
                        lane: res[i].lane_used,
                        controllers: res[i].controllers
                    }
                    $scope.departures_arrivals.push(da)
                }
                DepartureService.getAllDeparturesForFlight($scope.flight.code).then(
                    function (res) {
                        for (var i = 0, len = res.length; i < len; i++) {
                            var da = {
                                type: "Departure",
                                date_time: res[i].departure_time,
                                lane: res[i].lane_used,
                                controllers: res[i].controllers
                            }
                            $scope.departures_arrivals.push(da)
                        }
                    },
                    function (reason) {
                        console.error('Error while fetching Departures');
                    }
                )
            },
            function (reason) {
                console.error('Error while fetching Arrivals');
            }
        )
    }
    $scope.getLastDeparturesArrivals();

});