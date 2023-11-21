const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { 
  productsFromService,
  productsFromModel,
  productFromModel,
  productFromService,
  productFromServiceNotFound,
} = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando Testes - PRODUCT CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando products com sucesso - status 200', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(productsFromService);

    const req = { params: {}, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Recuperando product pelo id com sucesso - status 200', async function () {
    sinon.stub(productService, 'findProductById').resolves(productFromService);

    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  it('Não recupera product com id inexistente - status 404', async function () {
    sinon.stub(productService, 'findProductById').resolves(productFromServiceNotFound);

    const req = { params: { id: 978327131 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
});
