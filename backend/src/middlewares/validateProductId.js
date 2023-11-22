const { productModel } = require('../models');

const validadeProductId = async (req, res, next) => {
  const requestId = Number(req.params.id);

  const products = await productModel.findAll();
  const productsIds = products.map(({ id }) => id);

  const isValidProductId = productsIds.includes(requestId);

  if (!isValidProductId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  next();
};

module.exports = validadeProductId;