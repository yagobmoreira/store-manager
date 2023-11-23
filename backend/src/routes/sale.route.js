const express = require('express');
const { saleController } = require('../controllers');
const middlewares = require('../middlewares');

const route = express.Router();

route.get('/', saleController.findAll);
route.get('/:id', saleController.findById);
route.post(
  '/',
  middlewares.validateSaleFields,
  middlewares.validateProductIdFromSales,
  saleController.createSale,
);
route.delete(
  '/:id',
  middlewares.validateSaleId,
  saleController.deleteSale,
);
route.put(
  '/:saleId/products/:productId/quantity',
  middlewares.validateUpdateQuantityBody,
  middlewares.validateUpdateQuantityParams,
  saleController.updateQuantity,
);

module.exports = route;