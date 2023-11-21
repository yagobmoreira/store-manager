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
});