var mongoose = require('mongoose');

module.exports = mongoose.model('Controller', {
    code  : {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    surname: {
        type: String,
        default: ''
    }
});