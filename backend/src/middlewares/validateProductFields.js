const schema = require('./validations/validateInputValues');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateProductFields = (req, res, next) => {
  const productData = req.body;
  const error = schema.validateAddProduct(productData);
  if (error) {
    return res.status(mapStatusHTTP(error.status)).json({ message: error.message });
  }
  next();
};

module.exports = validateProductFields;