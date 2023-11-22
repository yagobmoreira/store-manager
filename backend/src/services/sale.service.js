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

const createSale = async (sale) => {
  const newSaleId = await saleModel.insert(sale);
  const data = { id: newSaleId, itemsSold: sale };
  return { status: 'CREATED', data };
};

module.exports = {
  getAllSales,
  findSaleById,
  createSale,
};