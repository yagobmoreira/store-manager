const express = require('express');
const { productController } = require('../controllers');
const middlewares = require('../middlewares');

const route = express.Router();

route.get('/', productController.findAll);
route.get('/:id', productController.findById);
route.post(
  '/',
  middlewares.validateProductFields,
  productController.createProduct,
);
route.put(
  '/:id',
  middlewares.validateProductFields,
  middlewares.validadeProductIdPut,
  productController.updateProduct,
);

module.exports = route;