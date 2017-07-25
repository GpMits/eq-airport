var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Departure', {
    flight_id: {
        type: ObjectId
    },
    departure_time  : {
        type: Date,
        default: new Date()
    },
    lane_used: {
        type: Number,
        default: 0
    },
    controllers: {
        type: [ObjectId]
    }
});