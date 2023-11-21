const { addProductSchema } = require('./schemas');

const validateAddProduct = (keysObjectToValidate) => {
  const { error } = addProductSchema.validate(keysObjectToValidate);
  if (error && error.message === '"name" is required') {
    return { status: 'BAD_REQUEST', message: error.message };
  }
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateAddProduct,
};