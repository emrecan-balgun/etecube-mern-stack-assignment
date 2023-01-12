const express = require('express');

const productController = require('../controllers/productController.js');

const router = express.Router();

router.route('/').get(productController.getAllProducts); // localhost:8000/products
router.route('/').post(productController.createProduct); // localhost:8000/products
router.route('/:id').get(productController.getProduct); // localhost:8000/products/:id
router.route('/:id').put(productController.updateProduct); // localhost:8000/products/:id
router.route('/:id').delete(productController.deleteProduct); // localhost:8000/products/:id

module.exports = router;
