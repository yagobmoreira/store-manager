const { productModel } = require('../models');

const validateProductIdFromSales = async (req, res, next) => {
  const saleData = req.body;

  const products = await productModel.findAll();
  
  const productsIds = products.map(({ id }) => id);

  const isValidProductId = saleData.every(({ productId }) => productsIds.includes(productId));

  if (!isValidProductId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  next();
};

module.exports = validateProductIdFromSales;