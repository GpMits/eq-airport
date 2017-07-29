angular.module('DeparturesCtrl', [])
.controller('DeparturesController',function ($rootScope, $scope, DepartureService, FlightService){
    $scope.departures_list = [];

    $scope.getDepartures = function() {
        var flight_codes = {};
        var flight_ids = [];
                    
        DepartureService.getAllDepartures().then(
            function (departures) {
                if(departures.data){
                    for (var i = 0, len = departures.data.length; i < len; i++) {
                        flight_ids.push(departures.data[i].flight_id);
                    }
                }

                //Throw out non unique ids
                function onlyUnique(value, index, self) { 
                    return self.indexOf(value) === index;
                }
                var flight_ids_unique = flight_ids.filter( onlyUnique );
                
                FlightService.getFlightsCodes(flight_ids_unique).then(
                    function (flights){
                        if(flights.data){
                            for (var i = 0, len = flights.data.length; i < len; i++) {
                                flight_codes[flights.data[i]._id] = flights.data[i].code;
                            }

                            for (var i = 0, len = departures.data.length; i < len; i++) {
                                var departure = {
                                    flight_code:  flight_codes[departures.data[i].flight_id],
                                    date_time: departures.data[i].departure_time,
                                    lane: departures.data[i].lane_used,
                                    controllers: departures.data[i].controllers.join()
                                }
                                $scope.departures_list.push(departure)
                            }
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