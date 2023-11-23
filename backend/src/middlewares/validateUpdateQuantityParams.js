const { productModel, saleModel } = require('../models');

const existsProduct = async (productId) => {
  const products = await productModel.findAll();
  return products.some(({ id }) => id === Number(productId));
};

const existsSale = async (saleId) => {
  const sales = await saleModel.getAllSales();
  return sales.some(({ id }) => id === Number(saleId));
};

const validateUpdateQuantityParams = async (req, res, next) => {
  const { saleId, productId } = req.params;
  const isValidSaleId = await existsSale(saleId);
  const isValidProductId = await existsProduct(productId);
  if (!isValidSaleId) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  if (!isValidProductId) {
    return res.status(404).json({ message: 'Product not found in sale' });
  }
  next();
};

module.exports = validateUpdateQuantityParams;