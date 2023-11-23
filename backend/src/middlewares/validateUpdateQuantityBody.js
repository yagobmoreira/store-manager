const schema = require('./validations/validateInputValues');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateUpdateQuantityBody = (req, res, next) => {
  const error = schema.validateUpdateQuantity(req.body);
  if (error) {
    return res.status(mapStatusHTTP(error.status)).json({ message: error.message });
  }
  next();
};

module.exports = validateUpdateQuantityBody;