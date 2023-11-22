const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const middlewares = require('../../../src/middlewares');
const schema = require('../../../src/middlewares/validations/validateInputValues');
const { productModel } = require('../../../src/models');
const { productsFromModel } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - MIDDLEWARES', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('ValidateProductFields', function () {
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

  describe('ValidateSaleFields', function () {
    it('Requisição sem sales', function () {
      sinon.stub(schema, 'validateAddSale')
        .returns({ status: 'INVALID_VALUE', message: '"value" does not contain 1 required value(s)' });
      
      const req = { params: {}, body: [] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();

      middlewares.validateSaleFields(req, res, next);

      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"value" does not contain 1 required value(s)' });
    });

    it('Requisição sem productId', function () {
      sinon.stub(schema, 'validateAddSale')
        .returns({ status: 'BAD_REQUEST', message: '"productId" is required' });
    
      const req = { params: {}, body: [{ quantity: 1 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();

      middlewares.validateSaleFields(req, res, next);

      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Requisição sem quantity', function () {
      sinon.stub(schema, 'validateAddSale')
        .returns({ status: 'BAD_REQUEST', message: '"quantity" is required' });
    
      const req = { params: {}, body: [{ productId: 1 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();
  
      middlewares.validateSaleFields(req, res, next);
  
      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Requisição com quantity menor que 1', function () {
      sinon.stub(schema, 'validateAddSale')
        .returns({ status: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' });
    
      const req = { params: {}, body: [{ productId: 1, quantity: 0 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();
  
      middlewares.validateSaleFields(req, res, next);
  
      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Requisição com sale válida', function () {
      sinon.stub(schema, 'validateAddSale')
        .returns(undefined);
    
      const req = { params: {}, body: [{ productId: 1, quantity: 1 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();
  
      middlewares.validateSaleFields(req, res, next);
  
      expect(next).to.have.been.calledWith();
    });
  });

  describe('Validate productId from Sales', function () {
    it('Requisição com productId inválido', async function () {
      sinon.stub(productModel, 'findAll')
        .resolves(productsFromModel);
          
      const req = { params: {}, body: [{ productId: 0, quantity: 2 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();
      
      await middlewares.validateProductIdFromSales(req, res, next);
  
      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Requisição com productId válido', async function () {
      sinon.stub(productModel, 'findAll')
        .resolves(productsFromModel);
          
      const req = { params: {}, body: [{ productId: 1, quantity: 2 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();
      
      await middlewares.validateProductIdFromSales(req, res, next);
  
      expect(next).to.have.been.calledWith();
    });
  });

  describe('Validate productId', function () {
    it('Requisição com productId inválido', async function () {
      sinon.stub(productModel, 'findAll')
        .resolves(productsFromModel);
          
      const req = { params: { id: 0 }, body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();
      
      await middlewares.validadeProductId(req, res, next);
  
      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Requisição com productId válido', async function () {
      sinon.stub(productModel, 'findAll')
        .resolves(productsFromModel);
          
      const req = { params: { id: 1 }, body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub().returns();
      
      await middlewares.validadeProductId(req, res, next);
  
      expect(next).to.have.been.calledWith();
    });
  });
});
