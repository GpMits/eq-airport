var Arrival = require('./models/Arrival');
var Controller = require('./models/Controller');
var Departure = require('./models/Departure');
var Flight = require('./models/Flight');

var ObjectId = require('mongodb').ObjectID;

module.exports = function (app) {

    //Get Flight by code
    app.get('/api/flight/:code', function (req, res) {
        var code = req.params.code;
        Flight.findOne({
            "code": code
        }, function (err, flight) {
            if (err)
                res.send(err);
            else if (!flight)
                res.send(200, null);
            else
                res.send(flight);
        });
    });

    //Get Controller by code
    app.get('/api/controller/:code', function (req, res) {
        var code = req.params.code;
        Controller.findOne({
            "code": code
        }, function (err, controller) {
            if (err)
                res.send(err);
            else if (!controller)
                res.send(200, null);
            else
                res.send(controller);
        });
    });

    //Get Arrivals by Flight code
    app.get('/api/arrival/:flight_code', function (req, res) {
        var flight_code = req.params.flight_code;
        var flight;
        Flight.findOne({
            "code": flight_code
        }, function (err, flight) {
            if (err)
                res.send(err);
            else if (flight) {
                Arrival.find({
                    "flight_id": new ObjectId(flight._id)
                }, function (err, arrivals) {
                    if (err)
                        res.send(err);
                    else
                        res.send(200, arrivals);
                });
            } else {
                res.send(200, []);
            }
        });
    });

    //Get Departures by Flight code
    app.get('/api/departure/:flight_code', function (req, res) {
        var flight_code = req.params.flight_code;
        var flight;
        Flight.findOne({
            "code": flight_code
        }, function (err, flight) {
            if (err)
                res.send(err);
            else if (flight) {
                Departure.find({
                    "flight_id": new ObjectId(flight._id)
                }, function (err, departures) {
                    if (err)
                        res.send(err);
                    else
                        res.send(200, departures);
                });
            } else {
                res.send(200, []);
            }
        });
    });

    //Create new Flight
    app.post('/api/flight', function (req, res) {
        var flight = Flight({
            code: req.body.code,
            carrier: req.body.carrier,
            departing_airport: req.body.departing_airport,
            destination_airport: req.body.destination_airport,
            days_of_week: req.body.days_of_week,
            departure: req.body.departure,
            arrival: req.body.arrival
        });

        flight.save(function (err, flight) {
            if (err)
                res.send(err);
            else
                res.send(200, flight)
        });
    });

    //Create new Controller
    app.post('/api/controller', function (req, res) {
        var controller = Controller({
            code: req.body.code,
            name: req.body.name,
            surname: req.body.surname
        });
        
        controller.save(function (err, controller) {
            if (err)
                res.send(err);
            else
                res.send(200, controller)
        });
    });

    //Create new Arrival
    app.post('/api/arrival', function (req, res) {
        var arrival = Arrival({
            flight_id: req.body.flight_id,
            arrival_time: req.body.arrival_time,
            lane_used: req.body.lane_used,
            controllers: req.body.controllers
        });

        arrival.save(function (err, arrival) {
            if (err)
                res.send(err);
            else
                res.send(200, arrival);
        });
    });

    //Create new Departure
    app.post('/api/departure', function (req, res) {
        var departure = Arrival({
            flight_id: req.body.flight_id,
            departure_time: req.body.arrival_time,
            lane_used: req.body.lane_used,
            controllers: req.body.controllers
        });

        departure.save(function (err, departure) {
            if (err)
                res.send(err);
            else
                res.send(200, departure);
        });
    });

    //Remaining requests
    app.get('*', function (req, res) {
        res.send(404)
    });


};