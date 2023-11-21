const { productModel } = require('../models');

const getAllProducts = async () => {
  const products = await productModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findProductById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

const createProduct = async (productData) => {
  const newProductId = await productModel.insert(productData);
  const newProduct = await productModel.findById(newProductId);
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  getAllProducts,
  findProductById,
  createProduct,
};