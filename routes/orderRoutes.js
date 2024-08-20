const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Create a new order
router.post('/', authMiddleware, roleMiddleware('admin'), orderController.createOrder);

// Get all orders
router.get('/', authMiddleware, orderController.getOrders);
// Get order by Id
router.get('/:id', authMiddleware, orderController.getOrders);

// Update an order status
router.put('/:id', authMiddleware, roleMiddleware('admin'), orderController.updateOrder);

// Delete an order
router.delete('/:id', authMiddleware, roleMiddleware('admin'), orderController.deleteOrder);

module.exports = router;
