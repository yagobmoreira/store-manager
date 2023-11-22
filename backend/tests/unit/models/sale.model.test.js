const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');
const { 
  salesFromModel,
  saleFromModel,
  saleIdFromDB,
  saleIdFromModel,
} = require('../mocks/sales.mock');

describe('Realizando Testes - SALE MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando as sales com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromModel]);

    const products = await saleModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.deep.equal(salesFromModel);
  });

  it('Recuperando sales pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromModel]);

    const inputData = 1;
    const product = await saleModel.findById(inputData);

    expect(product).to.be.an('array');
    expect(product).to.deep.equal(saleFromModel);
  });

  it('Não recupera uma sale com id inválido', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const inputData = 99999;
    const product = await saleModel.findById(inputData);

    expect(product).to.deep.equal([]);
  });

  it('Inserindo uma sale com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([saleIdFromDB])
      .onSecondCall()
      .resolves(null);

    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const insertId = await saleModel.insert(inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.be.equal(saleIdFromModel);
  });

  it('Removendo uma sale com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const inputData = 1;
    const affectedRows = await saleModel.remove(inputData);

    expect(affectedRows).to.be.a('number');
    expect(affectedRows).to.be.equal(1);
  });

  it('Não remove uma sale com id inválido', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

    const inputData = 77136712;
    const affectedRows = await saleModel.remove(inputData);

    expect(affectedRows).to.be.a('number');
    expect(affectedRows).to.be.equal(0);
  });
});
