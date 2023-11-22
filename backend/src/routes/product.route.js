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
  middlewares.validadeProductId,
  productController.updateProduct,
);
route.delete(
  '/:id',
  middlewares.validadeProductId,
  productController.deleteProduct,
);

module.exports = route;