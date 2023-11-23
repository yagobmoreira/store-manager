const validateProductFields = require('./validateProductFields');
const validateSaleFields = require('./validateSaleFields');
const validateProductIdFromSales = require('./validateProductIdFromSales');
const validadeProductId = require('./validateProductId');
const validateSaleId = require('./validateSaleId');
const validateUpdateQuantityBody = require('./validateUpdateQuantityBody');
const validateUpdateQuantityParams = require('./validateUpdateQuantityParams');

module.exports = {
  validateProductFields,
  validateSaleFields,
  validateProductIdFromSales,
  validadeProductId,
  validateSaleId,
  validateUpdateQuantityBody,
  validateUpdateQuantityParams,
};