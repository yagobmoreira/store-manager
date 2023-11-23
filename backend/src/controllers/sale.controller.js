const { saleService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await saleService.getAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.findSaleById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const createSale = async (req, res) => {
  const { status, data } = await saleService.createSale(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status } = await saleService.deleteSale(id);
  return res.status(mapStatusHTTP(status)).end();
};

const updateQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await saleService.updateQuantity(saleId, productId, quantity);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  createSale,
  deleteSale,
  updateQuantity,
};