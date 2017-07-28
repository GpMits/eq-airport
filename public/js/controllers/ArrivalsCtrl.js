angular.module('ArrivalsCtrl', [])
.controller('ArrivalsController',function ($rootScope, $scope, ArrivalService, FlightService){
    $scope.arrivals_list = [];

    $scope.getArrivals = function() {
        var flight_codes = {};
        var flight_ids = [];
                    
        ArrivalService.getAllArrivals().then(
            function (arrivals) {
                for (var i = 0, len = arrivals.length; i < len; i++) {
                    flight_ids.push(arrivals[i].flight_id);
                }

                function onlyUnique(value, index, self) { 
                    return self.indexOf(value) === index;
                }
                var flight_ids_unique = flight_ids.filter( onlyUnique );
                FlightService.getFlightsCodes(flight_ids_unique).then(
                    function (flights){
                        for (var i = 0, len = flights.length; i < len; i++) {
                            flight_codes[flights[i]._id] = flights[i].code;
                        }

                        for (var i = 0, len = arrivals.length; i < len; i++) {
                            var arrival = {
                                flight_code:  flight_codes[arrivals[i].flight_id],
                                date_time: arrivals[i].arrival_time,
                                lane: arrivals[i].lane_used,
                                controllers: arrivals[i].controllers.join()
                            }
                            $scope.arrivals_list.push(arrival)
                        }
                    },
                    function (reason) {
                        console.error('Error while fetching Flights');
                    }
                )
            },
            function (reason) {
                console.error('Error while fetching Arrivals');
            }
        )
    }
    $scope.getArrivals();
});