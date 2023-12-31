const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const query = 'SELECT * FROM sales';
  const [sales] = await connection.execute(query);
  return camelize(sales);
};

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

const saveSalesProducts = async (sale, saleId) => {
  let insertPromises = [];

  if (sale && sale.length > 0) {
    insertPromises = sale.map(({ productId, quantity }) => connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [saleId, productId, quantity],
    ));
    await Promise.all(insertPromises);
  }
};

const insert = async (sale) => {
  // https://www.geeksforgeeks.org/how-to-convert-javascript-datetime-to-mysql-datetime/
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = 'INSERT INTO sales (date) VALUE (?)';
  const [{ insertId }] = await connection.execute(query, [currentDate]);
  
  await saveSalesProducts(sale, insertId);

  return insertId;
};

const remove = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [id]);
  return affectedRows;
};

const update = async (saleId, productId, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  const [{ affectedRows }] = await connection.execute(query, [quantity, saleId, productId]);
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insert,
  getAllSales,
  remove,
  update,
};