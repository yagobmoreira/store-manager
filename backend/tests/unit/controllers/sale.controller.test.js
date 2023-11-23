const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { 
  salesFromService,
  salesFromModel,
  saleFromModel,
  saleFromService,
  saleFromServiceNotFound,
  saleFromServiceCreated,
  saleCreatedFromModel,
  updatedSaleFromService,
} = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando Testes - SALE CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando sales com sucesso - status 200', async function () {
    sinon.stub(saleService, 'getAllSales').resolves(salesFromService);

    const req = { params: {}, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Recuperando sales pelo id com sucesso - status 200', async function () {
    sinon.stub(saleService, 'findSaleById').resolves(saleFromService);

    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Não recupera sales com id inexistente - status 404', async function () {
    sinon.stub(saleService, 'findSaleById').resolves(saleFromServiceNotFound);

    const req = { params: { id: 978327131 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Criando uma nova sale com sucesso - status 201', async function () {
    sinon.stub(saleService, 'createSale').resolves(saleFromServiceCreated);

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

    const req = { params: { }, body: { inputData } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleCreatedFromModel);
  });

  it('Removendo uma sale com sucesso - status 204', async function () {
    sinon.stub(saleService, 'deleteSale').resolves({ status: 'NO_CONTENT' });

    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };

    await saleController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('Atualizando uma sale com sucesso - status 200', async function () {
    sinon.stub(saleService, 'updateQuantity').resolves(updatedSaleFromService);

    const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 10 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await saleController.updateQuantity(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedSaleFromService.data);
  });
});
