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

module.exports = {
  findAll,
  findById,
  createSale,
  deleteSale,
};