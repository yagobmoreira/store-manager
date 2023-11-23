const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { 
  salesFromModel,
  saleFromModel,
  saleIdFromModel,
  saleUpdatedFromModel,
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

  it('Recuperando sales pelo id com falha', async function () {
    sinon.stub(saleModel, 'findById').resolves(undefined);

    const inputData = 99889;
    const responseData = { message: 'Sale not found' };

    const responseService = await saleService.findSaleById(inputData);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Criando uma nova sale com sucesso', async function () {
    sinon.stub(saleModel, 'insert').resolves(saleIdFromModel);
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

    const responseData = {
      id: 4,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    const responseService = await saleService.createSale(inputData);

    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Removendo uma sale com sucesso', async function () {
    sinon.stub(saleModel, 'remove').resolves(1);

    const inputData = 1;
    const responseService = await saleService.deleteSale(inputData);

    expect(responseService.status).to.be.equal('NO_CONTENT');
  });

  it('Não remove uma sale com falha', async function () {
    sinon.stub(saleModel, 'remove').resolves(0);

    const inputData = 1;
    const responseService = await saleService.deleteSale(inputData);

    expect(responseService).to.be.equal(undefined);
  });

  it('Atualizando a quantidade de uma sale com sucesso', async function () {
    sinon.stub(saleModel, 'update').resolves(1);
    sinon.stub(saleModel, 'findById').resolves(saleUpdatedFromModel);

    const inputData = {
      saleId: '1',
      productId: '1',
      quantity: 1,
    };
    
    const responseData = {
      saleId: 1,
      ...saleUpdatedFromModel[0],
    };

    const responseService = await saleService.updateQuantity(...Object.values(inputData));
    
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Não atualiza a quantidade de uma sale com falha', async function () {
    sinon.stub(saleModel, 'update').resolves(0);

    const inputData = {
      saleId: '1',
      productId: '1',
      quantity: 1,
    };

    const responseService = await saleService.updateQuantity(...Object.values(inputData));

    expect(responseService).to.be.equal(undefined);
  });
});