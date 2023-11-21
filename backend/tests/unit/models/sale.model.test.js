const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');
const { salesFromModel, saleFromModel } = require('../mocks/sales.mock');

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
});
