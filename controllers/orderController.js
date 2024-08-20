const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { product, quantity, supplier, deliveryDate } = req.body;

        // Find the product by ID
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Create the new order
        const newOrder = new Order({
            product,
            quantity,
            supplier,
            deliveryDate
        });

        await newOrder.save();

        // Update the product stock
        existingProduct.quantity -= quantity;
        await existingProduct.save();

        res.json(newOrder);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

//Get order by id
exports.readOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Update order status
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('product');
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.json({ msg: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
