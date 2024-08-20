const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;

        // Ensure quantity is not negative
        const validQuantity = quantity < 0 ? 0 : quantity;

        const newProduct = new Product({ name, description, price, quantity: validQuantity });
        await newProduct.save();
        res.json(newProduct);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);  
        res.status(500).json({ msg: "An error occurred while fetching products", error: err.message });
    }
};

// Get a single product by ID
exports.readProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;

        // Ensure quantity is not negative
        const validQuantity = quantity < 0 ? 0 : quantity;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, quantity: validQuantity },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
