const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const middlewares = require('../../../src/middlewares');
const schema = require('../../../src/middlewares/validations/validateInputValues');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - MIDDLEWARES - UpdateQuantityBody', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Requisição sem quantity', function () {
    sinon.stub(schema, 'validateUpdateQuantity')
      .returns({ status: 'BAD_REQUEST', message: '"quantity" is required' });

    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    middlewares.validateUpdateQuantityBody(req, res, next);

    expect(next).to.not.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Requisição com quantity menor ou igual a zero', function () {
    sinon.stub(schema, 'validateUpdateQuantity')
      .returns({ status: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' });

    const req = { body: { quantity: 0 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    middlewares.validateUpdateQuantityBody(req, res, next);

    expect(next).to.not.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
});