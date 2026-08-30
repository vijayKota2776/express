const mongoose = require('mongoose');
const restaurant = require('./restaurant');

const restaurantSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
    },
    name: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    isavailable: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Menu', restaurantSchema);