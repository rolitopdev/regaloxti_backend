const express = require('express');
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.delete('/:orderId', orderController.deleteOrderById);

module.exports = router;