const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true, 
        min: [0, 'Quantity cannot be less than zero'],  
        default: 0  },
    location: { type: String },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
