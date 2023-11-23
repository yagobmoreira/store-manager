const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const schema = require('../../../src/middlewares/validations/validateInputValues');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - SCHEMA', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('ValidateAddProduct', function () {
    it('Requisição sem name', function () {
      const keysObjectToValidate = {};
      const response = schema.validateAddProduct(keysObjectToValidate);

      expect(response.status).to.be.equal('BAD_REQUEST');
      expect(response.message).to.be.equal('"name" is required');
    });

    it('Requisição com name menor que 5 caracteres', function () {
      const keysObjectToValidate = { name: 'Test' };
      const response = schema.validateAddProduct(keysObjectToValidate);

      expect(response.status).to.be.equal('INVALID_VALUE');
      expect(response.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('Requisição com name válido', function () {
      const keysObjectToValidate = { name: 'Produto1' };
      const response = schema.validateAddProduct(keysObjectToValidate);

      expect(response).to.be.equal(undefined);
    });
  });

  describe('ValidateAddSale', function () {
    it('Requisição sem productId', function () {
      const keysObjectToValidate = [{ quantity: 1 }];
      const response = schema.validateAddSale(keysObjectToValidate);

      expect(response.status).to.be.equal('BAD_REQUEST');
      expect(response.message).to.be.equal('"productId" is required');
    });

    it('Requisição sem quantity', function () {
      const keysObjectToValidate = [{ productId: 1 }];
      const response = schema.validateAddSale(keysObjectToValidate);

      expect(response.status).to.be.equal('BAD_REQUEST');
      expect(response.message).to.be.equal('"quantity" is required');
    });

    it('Requisição com quantity menor que 1', function () {
      const keysObjectToValidate = [{ productId: 1, quantity: 0 }];
      const response = schema.validateAddSale(keysObjectToValidate);

      expect(response.status).to.be.equal('INVALID_VALUE');
      expect(response.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it('Requisição com productId e quantity válidos', function () {
      const keysObjectToValidate = [{ productId: 1, quantity: 1 }];
      const response = schema.validateAddSale(keysObjectToValidate);

      expect(response).to.be.equal(undefined);
    });
  });

  describe('ValidateUpdateQuantity', function () {
    it('Requisição sem quantity', function () {
      const keysObjectToValidate = {};
      const response = schema.validateUpdateQuantity(keysObjectToValidate);

      expect(response.status).to.be.equal('BAD_REQUEST');
      expect(response.message).to.be.equal('"quantity" is required');
    });

    it('Requisição com quantity menor que 1', function () {
      const keysObjectToValidate = { quantity: 0 };
      const response = schema.validateUpdateQuantity(keysObjectToValidate);

      expect(response.status).to.be.equal('INVALID_VALUE');
      expect(response.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it('Requisição com quantity válido', function () {
      const keysObjectToValidate = { quantity: 1 };
      const response = schema.validateUpdateQuantity(keysObjectToValidate);

      expect(response).to.be.equal(undefined);
    });
  });
});