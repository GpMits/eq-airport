angular.module('DeparturesCtrl', [])
.controller('DeparturesController',function ($rootScope, $scope, DepartureService, FlightService){
    $scope.departures_list = [];
    
    $scope.getDepartures = function() {
        var flight_codes = {};
        FlightService.getLastNFlights(0).then(
            function (flights) {
                for (var i = 0, len = flights.length; i < len; i++) {
                    flight_codes[flights[i]._id] = flights[i].code;
                    DepartureService.getAllDeparturesForFlight(flights[i].code).then(
                        function (departures) {
                            for (var j = 0, len = departures.length; j < len; j++) {
                                var departure = {
                                    flight_code: flight_codes[departures[j].flight_id],
                                    date_time: departures[j].departure_time,
                                    lane: departures[j].lane_used,
                                    controllers: departures[j].controllers.join()
                                }
                                $scope.departures_list.push(departure)
                            }
                        },
                        function (reason) {
                            console.error('Error while fetching Departures');
                        }
                    )
                }
            },
            function (reason) {
                console.error('Error while fetching Flights');
            }
        )

    }
    $scope.getDepartures();
});