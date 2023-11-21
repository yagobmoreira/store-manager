const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const query = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
  FROM sales s INNER JOIN sales_products sp ON sp.sale_id = s.id`;

  const [sales] = await connection.execute(query);
  return camelize(sales);
};

const findById = async (saleId) => {
  const query = `SELECT s.date, sp.product_id, sp.quantity 
  FROM sales s INNER JOIN sales_products sp ON sp.sale_id = s.id
  WHERE sp.sale_id = ?`;
  const [sale] = await connection.execute(query, [saleId]);
  return camelize(sale);
};

module.exports = {
  findAll,
  findById,
};