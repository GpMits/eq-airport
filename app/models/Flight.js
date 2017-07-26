var mongoose = require('mongoose');

module.exports = mongoose.model('Flight', {
    code: {
        type: String,
        default: ''
    },
    carrier: {
        type: String,
        default: ''
    },
    departing_airport: {
        type: String,
        default: ''
    },
    destination_airport: {
        type: String,
        default: ''
    },
    days_of_week: {
        type: [String],
        default: []
    },
    departure: {
        type: Date,
        default: null
    },
    arrival: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});