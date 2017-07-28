angular.module('DeparturesCtrl', [])
.controller('DeparturesController',function ($rootScope, $scope, DepartureService, FlightService){
    $scope.departures_list = [];

    $scope.getDepartures = function() {
        var flight_codes = {};
        var flight_ids = [];
                    
        DepartureService.getAllDepartures().then(
            function (departures) {
                for (var i = 0, len = departures.length; i < len; i++) {
                    flight_ids.push(departures[i].flight_id);
                }

                function onlyUnique(value, index, self) { 
                    return self.indexOf(value) === index;
                }
                var flight_ids_unique = flight_ids.filter( onlyUnique );
                FlightService.getFlightsCodes(flight_ids_unique).then(
                    function (flights){
                        for (var i = 0, len = flights.data.length; i < len; i++) {
                            flight_codes[flights.data[i]._id] = flights.data[i].code;
                        }

                        for (var i = 0, len = departures.length; i < len; i++) {
                            var departure = {
                                flight_code:  flight_codes[departures[i].flight_id],
                                date_time: departures[i].departure_time,
                                lane: departures[i].lane_used,
                                controllers: departures[i].controllers.join()
                            }
                            $scope.departures_list.push(departure)
                        }
                    },
                    function (reason) {
                        console.error('Error while fetching Flights');
                    }
                )
            },
            function (reason) {
                console.error('Error while fetching Departures');
            }
        )
    }
    $scope.getDepartures();
});