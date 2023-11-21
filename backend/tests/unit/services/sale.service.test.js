const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { 
  salesFromModel,
  saleFromModel,
} = require('../mocks/sales.mock');

describe('Realizando testes - SALE SERVICE', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando sales com sucesso', async function () {
    sinon.stub(saleModel, 'findAll').resolves(salesFromModel);

    const responseData = [
      {
        saleId: 1,
        date: '2023-11-21T20:24:30.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: '2023-11-21T20:24:30.000Z',
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: '2023-11-21T20:24:30.000Z',
        productId: 3,
        quantity: 15,
      },
    ];

    const responseService = await saleService.getAllSales();

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Recuperando sales pelo id com sucesso', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleFromModel);

    const inputData = 1;
    const responseData = [
      {
        date: '2023-11-21T19:52:27.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023-11-21T19:52:27.000Z',
        productId: 2,
        quantity: 10,
      },
    ];

    const responseService = await saleService.findSaleById(inputData);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });
});