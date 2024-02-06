const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
//const familiesController = require('../controllers/familiesController');
//const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

// ------------------ PRODUCT ------------------

// RUTA PARA OBTENER TODOS LOS PRODUCTOS
//router.get('/products', productController.getProducts);
// RUTA PARA OBTENER UN PRODUCTO POR ID
//router.get('/products/:id', productController.getProductById);
// RUTA PARA OBTENER PRODUCTOS POR FAMILIA
//router.get('/products/family/:family', productController.getProductsByFamily);
// RUTA PARA OBTENER PRODUCTOS POR SUBFAMILIA
//router.get('/products/subfamily/:subfamily', productController.getProductsBySubfamily);
// RUTA PARA OBTENER PRODUCTOS POR NOMBRE
//router.post('/products/byname', productController.getProductByName);
// RUTA PARA CREAR UN PRODUCTO
//router.post('/products/create', productController.createProduct);
// RUTA PARA ACTUALIZAR UN PRODUCTO
router.put('/product/:id', productController.updateProduct);
// RUTA PARA BORRAR UN PRODUCTO
//router.delete('/product/:id', productController.deleteProduct);

router.get('/products/info', infoController.getInfo);


// ------------------ FAMILY -------------------

// RUTA PARA OBTENER TODAS LAS FAMILIASQ@
//router.get('/families', familiesController.getFamilies);
// RUTA PARA OBTENER UNA FAMILIA POR ID
//router.get('/families/:id', familiesController.getFamilyById);
// RUTA PARA OBTENER FAMILIAS POR NOMBRE
                                                                                                                    //router.post('/products/byname', productController.getProductByName);
// RUTA PARA CREAR UNA FAMILIA
//router.post('/families/create', familiesController.createFamily);

// ------------------ USER ---------------------

// RUTA PARA OBTENER TODOS LOS USUARIOS
// RUTA PARA OBTENER UN USUARIO POR ID
// RUTA PARA OBTENER UN USUARIO POR NOMBRE
// RUTA PARA CREAR UN USUARIO
// RUTA PARA ACTUALIZAR UN USUARIO
// RUTA PARA BORRAR UN USUARIO
// RUTA PARA LOGIN
// RUTA PARA LOGOUT
// RUTA PARA OBTENER EL PERFIL DE UN USUARIO

module.exports = router;