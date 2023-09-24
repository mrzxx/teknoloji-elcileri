const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.get('/',productsController.getProduct);
router.get('/add-product',productsController.getAddProduct);
router.post('/add-product',productsController.postAddProduct);
router.get('/product/:productid',productsController.getById);
router.get('/category/:catid',productsController.getByCatId);
router.post('/cart',productsController.postCart);
router.get('/cart',productsController.getCart);
router.get('/cart/delete/:productid',productsController.deleteCartItem);
router.get('/delete/:productid',productsController.getDeleteById);
router.get('/product/update/:productid&:name&:price&:desc',productsController.updateById);

module.exports = router;