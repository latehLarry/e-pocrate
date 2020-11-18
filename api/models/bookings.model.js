const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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

    isForSibling: {

    },
    sibling: {
        type: ObjectId,
        ref: 'Sibling'
    },
    complain: {
        type: String,
        required: [true, "Votre problem SVP!"],
    },
    doctorId: {
        type: ObjectId,
        ref: 'Doctor'
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: [true, "Ajouter votre nom complet SVP"],
    },
    type: {
        type: String,
        required: true,
        enum: ['rdv', 'teleconsultation']
    },
    _userID: {
        type: String
    }
});

module.exports = mongoose.model("Booking", bookingSchema, "bookings");
