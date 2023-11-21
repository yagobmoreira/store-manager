const express = require('express');
const { saleController } = require('../controllers');

const route = express.Router();

route.get('/', saleController.findAll);
route.get('/:id', saleController.findById);

module.exports = route;