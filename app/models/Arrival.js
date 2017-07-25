var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Arrival', {
    flight_id: {
        type: ObjectId
    },
    arrival_time : {
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