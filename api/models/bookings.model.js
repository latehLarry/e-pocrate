const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookingSchema = new Schema ({
    date: {
        type: Date,
        required: [true, "SVP indiquez la date du rendez-vous"],
        min: new Date(+Date.now() - 7*24*60*60*1000),
    },

    time: {
        type: String,
        required: [true, "L'huere due rendez-vous SVP"],
    },

    complain: {
        type: String,
        required: [true, "Votre problem SVP!"],
    },

    user: {
        type: String,
        required: [true, "Ajouter votre nom complet SVP"],
    },

    _userID: {
        type: String
    }
});

module.exports = mongoose.model("Booking", bookingSchema, "bookings");
