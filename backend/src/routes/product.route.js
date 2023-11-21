const express = require('express');
const { productController } = require('../controllers');

const route = express.Router();

route.get('/', productController.findAll);
route.get('/:id', productController.findById);
route.post('/', productController.createProduct);

module.exports = route;