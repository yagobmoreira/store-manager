const { addProductSchema, addSaleSchema } = require('./schemas');

function validateAddProduct(keysObjectToValidate) {
  const { error } = addProductSchema.validate(keysObjectToValidate);
  if (error && error.message === '"name" is required') {
    return { status: 'BAD_REQUEST', message: error.message };
  }
  if (error) return { status: 'INVALID_VALUE', message: error.message };
}

function formatErrorMsg(errorMsg) {
  return errorMsg.replace(/\[\d+\]\./g, '');
}

function badRequestError(error) {
  const errorMsgs = ['"productId" is required', '"quantity" is required'];
  let validationError = '';
  if (error.message) {
    validationError = formatErrorMsg(error.message);
  }
  const isBadRequest = errorMsgs.some((msg) => msg === validationError);
  if (error && isBadRequest) return validationError;
}

function validateAddSale(keysObjectToValidate) {
  const { error } = addSaleSchema.validate(keysObjectToValidate);
  let errorMsg = '';
  if (error && error.message) errorMsg = badRequestError(error);
  
  if (errorMsg) return { status: 'BAD_REQUEST', message: errorMsg };

  if (error) return { status: 'INVALID_VALUE', message: formatErrorMsg(error.message) };
}

module.exports = {
  validateAddProduct,
  validateAddSale,
};