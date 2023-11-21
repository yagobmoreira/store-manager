const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { 
  productsFromModel,
  productFromModel,
  productIdFromDB,
  productIdFromModel,
} = require('../mocks/products.mock');

describe('Realizando Testes - PRODUCT MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando os products com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromModel]);

    const products = await productModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.deep.equal(productsFromModel);
  });

  it('Recuperando um product com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromModel]]);

    const inputData = 1;
    const product = await productModel.findById(inputData);

    expect(product).to.be.an('object');
    expect(product).to.deep.equal(productFromModel);
  });

  it('Não recupera um product com id inválido', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const inputData = 99999;
    const product = await productModel.findById(inputData);

    expect(product).to.be.equal(undefined);
  });

  it('Inserindo um product com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productIdFromDB]);

    const inputData = { name: 'Novo Produto' };
    const insertId = await productModel.insert(inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.be.equal(productIdFromModel);
  });
});
