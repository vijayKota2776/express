const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
   restaurantid:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Restaurant',
    },
    name: {
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);