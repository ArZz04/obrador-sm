const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const productController = require('../controllers/productController');

// ------------------ PRODUCT ------------------
router.put('/product/:productId', productController.updateProduct);
router.get('/products/info', infoController.getInfo);

module.exports = router;