const Product = require('../models/Product');

exports.generateReport = async (req, res) => {
    try {
        const products = await Product.find();
        const report = {
            totalProducts: products.length,
            totalValue: products.reduce((acc, product) => acc + product.price * Math.max(product.quantity, 0), 0),
            stockDetails: products.map(product => ({
                name: product.name,
                quantity: Math.max(product.quantity, 0), // Ensure quantity is at least 0
                value: product.price * Math.max(product.quantity, 0)
            }))
        };
        res.json(report);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
