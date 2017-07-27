angular.module('FlightCtrl', [])
.controller('newDepartureModalCtrl', function ($scope, $uibModalInstance, ControllerService, DepartureService){
    $scope.controllers = []
    $scope.erroMessage = false;
    $scope.warningMessage = false;

    $scope.searchController = function(keyEvent) {
        $scope.erroMessage = false;
        $scope.warningMessage = false;
        
        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            if($scope.controllers[i].code == $scope.controllerCodeSearch){
                $scope.warningMessage = true;
                $scope.warningMessageText = "Controller already added!";
                return;
            }
        }

        if (keyEvent.which === 13){
            ControllerService.getController($scope.controllerCodeSearch).then(
                function (res) {
                    if(res){
                        if(res.busy){
                            $scope.warningMessage = true;
                            $scope.warningMessageText = "Controller was added to another departure/departure!";
                        }else{
                            $scope.controllers.push(res);
                        }
                    }else{
                        $scope.erroMessage = true;
                        $scope.erroMessageText = "Controller not found!";
                    }
                },
                function (reason) {
                    console.error('Error while fetching Controller');
                }
            );
        }
    }

    $scope.findController = function() {
        $scope.erroMessage = false;
        $scope.warningMessage = false;

        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            if($scope.controllers[i].code == $scope.controllerCodeSearch){
                $scope.warningMessage = true;
                $scope.warningMessageText = "Controller already added!";
                return;
            }
        }

        ControllerService.getController($scope.controllerCodeSearch).then(
            function (res) {
                if(res){
                    if(res.busy){
                        $scope.warningMessage = true;
                        $scope.warningMessageText = "Controller was added to another departure/departure!";
                    }else{
                        $scope.controllers.push(res);
                    }
                }else{
                    $scope.erroMessage = true;
                    $scope.erroMessageText = "Controller not found!";
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

        var departure_date_time = new Date($scope.departure_date.getFullYear(), 
                                         $scope.departure_date.getMonth(), $scope.departure_date.getDate(), 
                                         $scope.departure_time.getHours(), $scope.departure_time.getMinutes(), 
                                         $scope.departure_time.getSeconds());
        var begin_date_time = new Date(departure_date_time.getTime() - (12*60*60*1000));
        var end_date_time = new Date(departure_date_time.getTime() + (12*60*60*1000));

        DepartureService.getAllDeparturesForFlightBetweenDates($scope.flight._id, begin_date_time, end_date_time).then(
            function (res) {
                if(res.length == 0){
                    departure = {
                        departure_time: departure_date_time,
                        lane_used: $scope.lane,
                        controllers: controllers_codes,
                        flight_id: $scope.flight._id
                    }

                    DepartureService.createDeparture(departure).then(
                        function (res) {
                            console.log("Departure Inserted in DB!");
                            for (var i = 0, len = controllers_codes.length; i < len; i++) {
                                controller = {
                                    code: controllers_codes[i],
                                    busy: true
                                }
                                console.log(controller)
                                ControllerService.updateController(controller).then(
                                    function (res) {
                                        console.log("Controller updated!");
                                    },
                                    function (reason) {
                                        console.error('Error while updating Controller');
                                    }
                                )
                            }
                            $scope.showDepartureCreated = true;
                            $uibModalInstance.close();
                        },
                        function (reason) {
                            console.error('Error while creating Departure');
                        }
                    );
                } else {
                    $scope.erroMessage = true;
                    $scope.erroMessageText = "A valid departure must be at least " +
                                             "12 hours away from another departure for this flight";
                }
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
    $scope.erroMessage = false;
    $scope.warningMessage = false;

    $scope.searchController = function(keyEvent) {
        $scope.erroMessage = false;
        $scope.warningMessage = false;
        
        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            if($scope.controllers[i].code == $scope.controllerCodeSearch){
                $scope.warningMessage = true;
                $scope.warningMessageText = "Controller already added!";
                return;
            }
        }

        if (keyEvent.which === 13){
            ControllerService.getController($scope.controllerCodeSearch).then(
                function (res) {
                    if(res){
                        if(res.busy){
                            $scope.warningMessage = true;
                            $scope.warningMessageText = "Controller was added to another arrival/departure!";
                        }else{
                            $scope.controllers.push(res);
                        }
                    }else{
                        $scope.erroMessage = true;
                        $scope.erroMessageText = "Controller not found!";
                    }
                },
                function (reason) {
                    console.error('Error while fetching Controller');
                }
            );
        }
    }

    $scope.findController = function() {
        $scope.erroMessage = false;
        $scope.warningMessage = false;

        for (var i = 0, len = $scope.controllers.length; i < len; i++) {
            if($scope.controllers[i].code == $scope.controllerCodeSearch){
                $scope.warningMessage = true;
                $scope.warningMessageText = "Controller already added!";
                return;
            }
        }

        ControllerService.getController($scope.controllerCodeSearch).then(
            function (res) {
                if(res){
                    if(res.busy){
                        $scope.warningMessage = true;
                        $scope.warningMessageText = "Controller was added to another arrival/departure!";
                    }else{
                        $scope.controllers.push(res);
                    }
                }else{
                    $scope.erroMessage = true;
                    $scope.erroMessageText = "Controller not found!";
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

        var arrival_date_time = new Date($scope.arrival_date.getFullYear(), 
                                         $scope.arrival_date.getMonth(), $scope.arrival_date.getDate(), 
                                         $scope.arrival_time.getHours(), $scope.arrival_time.getMinutes(), 
                                         $scope.arrival_time.getSeconds());
        var begin_date_time = new Date(arrival_date_time.getTime() - (12*60*60*1000));
        var end_date_time = new Date(arrival_date_time.getTime() + (12*60*60*1000));

        ArrivalService.getAllArrivalsForFlightBetweenDates($scope.flight._id, begin_date_time, end_date_time).then(
            function (res) {
                if(res.length == 0){
                    arrival = {
                        arrival_time: arrival_date_time,
                        lane_used: $scope.lane,
                        controllers: controllers_codes,
                        flight_id: $scope.flight._id
                    }

                    ArrivalService.createArrival(arrival).then(
                        function (res) {
                            console.log("Arrival Inserted in DB!");
                            for (var i = 0, len = controllers_codes.length; i < len; i++) {
                                controller = {
                                    code: controllers_codes[i],
                                    busy: true
                                }
                                console.log(controller)
                                ControllerService.updateController(controller).then(
                                    function (res) {
                                        console.log("Controller updated!");
                                    },
                                    function (reason) {
                                        console.error('Error while updating Controller');
                                    }
                                )
                            }
                            $scope.showArrivalCreated = true;
                            $uibModalInstance.close();
                        },
                        function (reason) {
                            console.error('Error while creating Arrival');
                        }
                    );
                } else {
                    $scope.erroMessage = true;
                    $scope.erroMessageText = "A valid arrival must be at least " +
                                             "12 hours away from another arrival for this flight";
                }
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