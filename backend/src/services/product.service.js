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

const updateProduct = async (productData) => {
  const { id, name } = productData;
  const affectedRows = await productModel.update({ id, name });
  if (affectedRows > 0) {
    const updatedProduct = await productModel.findById(id);
    return { status: 'SUCCESSFUL', data: updatedProduct };
  }
};

const deleteProduct = async (id) => {
  const affectedRows = await productModel.remove(id);
  if (affectedRows > 0) {
    return { status: 'NO_CONTENT' };
  }
};

const getProductByName = async (name) => {
  const products = await productModel.findAll();
  const product = products
    .filter(({ name: productName }) => productName.toLowerCase().includes(name.toLowerCase()));

  if (!name) {
    return { status: 'SUCCESSFUL', data: products };
  }
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  getAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
};