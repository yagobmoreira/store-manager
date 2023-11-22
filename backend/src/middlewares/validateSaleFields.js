const schema = require('./validations/validateInputValues');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateSaleFields = async (req, res, next) => {
  const saleData = req.body;

  const error = schema.validateAddSale(saleData);
  if (error) {
    return res.status(mapStatusHTTP(error.status)).json({ message: error.message });
  }
  next();
};

module.exports = validateSaleFields;