const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const middlewares = require('../../../src/middlewares');
const { saleModel } = require('../../../src/models');
const { salesFromDB } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - MIDDLEWARES', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Requisição com id inválido', async function () {
    sinon.stub(saleModel, 'getAllSales')
      .resolves(salesFromDB);

    const req = { params: { id: 999 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await middlewares.validateSaleId(req, res, next);

    expect(next).to.not.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Requisição com id válido', async function () {
    sinon.stub(saleModel, 'getAllSales')
      .resolves(salesFromDB);

    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await middlewares.validateSaleId(req, res, next);

    expect(next).to.have.been.calledWith();
  });
});