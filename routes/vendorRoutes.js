const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middlewares/authMiddleware');

// Vendor routes
router.post('/', authMiddleware, vendorController.createVendor);
router.get('/', authMiddleware, vendorController.getVendors);
router.get('/:id', authMiddleware, vendorController.readVendor);
router.put('/:id', authMiddleware, vendorController.updateVendor);
router.delete('/:id', authMiddleware, vendorController.deleteVendor);

module.exports = router;
