const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const middlewares = require('../../../src/middlewares');
const { saleModel, productModel } = require('../../../src/models');
const { salesFromDB } = require('../mocks/sales.mock');
const { productsFromModel } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - MIDDLEWARES - UpdateQuantityParams', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Requisição com saleId inválido', async function () {
    sinon.stub(saleModel, 'getAllSales').resolves(salesFromDB);
    sinon.stub(productModel, 'findAll').resolves(productsFromModel);

    const req = { params: { saleId: 73213, productId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await middlewares.validateUpdateQuantityParams(req, res, next);

    expect(next).to.not.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Requisição com productId inválido', async function () {
    sinon.stub(saleModel, 'getAllSales').resolves(salesFromDB);
    sinon.stub(productModel, 'findAll').resolves(productsFromModel);

    const req = { params: { saleId: 1, productId: 1233 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await middlewares.validateUpdateQuantityParams(req, res, next);

    expect(next).to.not.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found in sale' });
  });

  it('Requisição com saleId e productId válidos', async function () {
    sinon.stub(saleModel, 'getAllSales').resolves(salesFromDB);
    sinon.stub(productModel, 'findAll').resolves(productsFromModel);

    const req = { params: { saleId: 1, productId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await middlewares.validateUpdateQuantityParams(req, res, next);

    expect(next).to.have.been.calledWith();
    expect(res.status).to.not.have.been.calledWith();
    expect(res.json).to.not.have.been.calledWith();
  });
});
