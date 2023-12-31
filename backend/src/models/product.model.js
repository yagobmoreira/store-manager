const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);
  return product;
};

const insert = async (productData) => {
  const { name } = productData;
  const query = 'INSERT INTO products (name) VALUE (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const update = async (productData) => {
  const { id, name } = productData;
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [name, id]);
  return affectedRows;
};

const remove = async (productId) => {
  const query = 'DELETE FROM products WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [productId]);
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};