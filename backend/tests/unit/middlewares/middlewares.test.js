const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const middlewares = require('../../../src/middlewares');
const schema = require('../../../src/middlewares/validations/validateInputValues');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - MIDDLEWARES', function () {
  describe('ValidateProductFields', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Requisição sem name', function () {
      sinon.stub(schema, 'validateAddProduct')
        .returns({ status: 'BAD_REQUEST', message: '"name" is required' });
      
      const req = { params: {}, body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();

      middlewares.validateProductFields(req, res, next);

      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Requisição com name menor que 5 caracteres', function () {
      sinon.stub(schema, 'validateAddProduct')
        .returns({ status: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
    
      const req = { params: {}, body: { name: 'Test' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();

      middlewares.validateProductFields(req, res, next);

      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('Requisição com name válido', function () {
      sinon.stub(schema, 'validateAddProduct')
        .returns(undefined);

      const req = { params: {}, body: { name: 'Produto1' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();

      middlewares.validateProductFields(req, res, next);

      expect(next).to.have.been.calledWith();
    });
  });
});