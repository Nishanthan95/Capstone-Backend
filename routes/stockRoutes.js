const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware('admin'), stockController.createStock);
router.get('/', authMiddleware, stockController.getStocks);
router.get('/:id', authMiddleware, stockController.readStock);
router.put('/:id', authMiddleware, roleMiddleware('admin'), stockController.updateStock);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), stockController.deleteStock);

module.exports = router;