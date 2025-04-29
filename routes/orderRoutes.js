const express = require('express');
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post('/', orderController.createOrder);
// router.get('/orders/:id', orderController.getOrderById);
router.get('/user/:userId', orderController.getOrdersByUserId);

module.exports = router;