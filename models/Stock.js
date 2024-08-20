const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    
});

module.exports = mongoose.model('Stock', StockSchema);
