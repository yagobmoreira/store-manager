const { saleModel } = require('../models');

const getAllSales = async () => {
  const sales = await saleModel.findAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findSaleById = async (id) => {
  const sale = await saleModel.findById(id);
  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }     
  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  getAllSales,
  findSaleById,
};