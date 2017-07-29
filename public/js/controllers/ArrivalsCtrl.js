angular.module('ArrivalsCtrl', [])
.controller('ArrivalsController',function ($rootScope, $scope, ArrivalService, FlightService){
    $scope.arrivals_list = [];

    //Get all arrivals from db
    $scope.getArrivals = function() {
        var flight_codes = {};
        var flight_ids = [];
        
        //Get all arrivals
        ArrivalService.getAllArrivals().then(
            function (arrivals) {

                //Collect the flight_ids from the arrivals
                if(arrivals.data){
                    for (var i = 0, len = arrivals.data.length; i < len; i++) {
                        flight_ids.push(arrivals.data[i].flight_id);
                    }
                }

                //Throw out non unique ids
                function onlyUnique(value, index, self) { 
                    return self.indexOf(value) === index;
                }
                var flight_ids_unique = flight_ids.filter( onlyUnique );

                //Get the flight codes, using the ids list
                FlightService.getFlightsCodes(flight_ids_unique).then(
                    function (flights){
                        if(flights.data){
                            for (var i = 0, len = flights.data.length; i < len; i++) {
                                flight_codes[flights.data[i]._id] = flights.data[i].code;
                            }

                            for (var i = 0, len = arrivals.data.length; i < len; i++) {
                                var arrival = {
                                    flight_code:  flight_codes[arrivals.data[i].flight_id],
                                    date_time: arrivals.data[i].arrival_time,
                                    lane: arrivals.data[i].lane_used,
                                    controllers: arrivals.data[i].controllers.join()
                                }
                                $scope.arrivals_list.push(arrival)
                            }
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