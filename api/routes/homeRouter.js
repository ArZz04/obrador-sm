const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const productController = require('../controllers/productController');
const familyController = require('../controllers/familyController');

// ------------------ PRODUCT ------------------
router.put('/product/:productId', productController.updateProduct);
router.get('/products/families', productController.getProducts);

router.get('/families/last', familyController.lastFModified);
router.get('/products/info', infoController.getInfo);

module.exports = router;