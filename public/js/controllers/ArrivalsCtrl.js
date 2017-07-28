angular.module('ArrivalsCtrl', [])
.controller('ArrivalsController',function ($rootScope, $scope, ArrivalService, FlightService){
    $scope.arrivals_list = [];

    $scope.getArrivals = function() {
        var flight_codes = {};
        FlightService.getLastNFlights(0).then(
            function (flights) {
                for (var i = 0, len = flights.length; i < len; i++) {
                    flight_codes[flights[i]._id] = flights[i].code;
                    ArrivalService.getAllArrivalsForFlight(flights[i].code).then(
                        function (arrivals) {
                            for (var j = 0, len = arrivals.length; j < len; j++) {
                                var arrival = {
                                    flight_code:  flight_codes[arrivals[j].flight_id],
                                    date_time: arrivals[j].arrival_time,
                                    lane: arrivals[j].lane_used,
                                    controllers: arrivals[j].controllers.join()
                                }
                                $scope.arrivals_list.push(arrival)
                            }
                        },
                        function (reason) {
                            console.error('Error while fetching Arrivals');
                        }
                    )
                }
            },
            function (reason) {
                console.error('Error while fetching Flights');
            }
        )

    }
    $scope.getArrivals();
});