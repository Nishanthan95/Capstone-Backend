const Stock = require('../models/Stock');

exports.createStock = async (req, res) => {
    try {
        const newStock = new Stock(req.body);
        await newStock.save();
        res.json(newStock);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        console.error(err);  
        res.status(500).json({ msg: "An error occurred while fetching stocks", error: err.message });
    }
};

exports.readStock = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).json({ msg: 'Stock not found' });
        }
        res.json(stock);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


exports.updateStock = async (req, res) => {
    try {
        const updatedStock = await Stock.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStock) {
            return res.status(404).json({ msg: 'Stock not found' });
        }
        res.json(updatedStock);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteStock = async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Stock deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
