const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const bookingSchema = new Schema({

    endAt: {
        type: Date,
        required: 'Ending Date is required'
    },
    startAt: {
        type: Date,
        required: 'Starting Date is required'
    },
    totalPrice: {
        type: Number
    },
    days: {
        type: Number
    },
    guests: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    rental: { type: Schema.Types.ObjectId, ref: 'Rental'},
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Booking', bookingSchema);

