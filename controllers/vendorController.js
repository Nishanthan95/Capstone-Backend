const Vendor = require('../models/Vendor');

// Create a new vendor
exports.createVendor = async (req, res) => {
    try {
        const newVendor = new Vendor(req.body);
        await newVendor.save();
        res.json(newVendor);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get all vendors
exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('productsSupplied');
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ msg: "An error occurred while fetching vendors", error: err.message });
    }
};

// Get a single vendor by ID
exports.readVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id).populate('productsSupplied');
        if (!vendor) {
            return res.status(404).json({ msg: 'Vendor not found' });
        }
        res.json(vendor);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Update a vendor by ID
exports.updateVendor = async (req, res) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedVendor) {
            return res.status(404).json({ msg: 'Vendor not found' });
        }
        res.json(updatedVendor);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Delete a vendor by ID
exports.deleteVendor = async (req, res) => {
    try {
        await Vendor.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Vendor deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
