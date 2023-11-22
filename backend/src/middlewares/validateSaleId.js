const { saleModel } = require('../models');

const validateSaleId = async (req, res, next) => {
  const requestId = Number(req.params.id);

  const sales = await saleModel.getAllSales();
  const salesIds = sales.map(({ id }) => id);

  const isValidSaleId = salesIds.includes(requestId);

  if (!isValidSaleId) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  
  next();
};

module.exports = validateSaleId;