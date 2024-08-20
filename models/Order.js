const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    supplier: { type: String, required: true },
    orderStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    deliveryDate: { type: Date }
});

module.exports = mongoose.model('Order', OrderSchema);
