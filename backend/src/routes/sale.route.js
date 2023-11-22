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

module.exports = route;