//
const express = require('express');
const router = express.Router();
const { updateOrderStatus, trackOrder } = require('../controllers/orderController');

router.post('/update-status', updateOrderStatus);
router.get('/track/:orderId', trackOrder);

module.exports = router;
