const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const connection = require('../../src/models/connection');
const middlewares = require('../../src/middlewares');
const { productsMock } = require('./mocks/products.mock');
const {
  salesMock,
  saleMock,
  createdSaleMock,
  salesFromDB,
  validRequestMock,
  invalidProductIdRequestMock,
  invalidQuantityRequestMock,
  requestWithoutQuantityMock,
  updatedSaleMock,
} = require('./mocks/sales.mock');
const { saleService } = require('../../src/services');

const { expect, use } = chai;

use(chaiHttp);

const routeIdOne = '/sales/1';
const saleNotFound = 'Sale not found';

describe('Testando os endpoints de sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET /sales', function () {
    it('retorna um array de vendas', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock]);

      const response = await chai.request(app)
        .get('/sales');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal(salesMock);
    });

    it('retorna uma venda pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([saleMock]);

      const response = await chai.request(app)
        .get(routeIdOne);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal(saleMock);
    });

    it('retorna erro 404 se não encontrar venda pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);

      const response = await chai.request(app)
        .get(routeIdOne);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal(saleNotFound);
    });
  });

  describe('POST /sales', function () {
    it('cria uma sale com sucesso', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([productsMock])
        .onSecondCall()
        .resolves([{ insertId: 3 }]);
      
      const response = await chai.request(app)
        .post('/sales')
        .send(validRequestMock);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.equal(createdSaleMock);
    });

    it('retorna erro 404 se não encontrar produto pelo id', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([productsMock])
        .onSecondCall()
        .resolves([[]]);

      const response = await chai
        .request(app)
        .post('/sales')
        .send(invalidProductIdRequestMock);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('Product not found');
    });

    it('retorna um erro 422 se a quantidade for menor que 1', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(middlewares, 'validateSaleFields')
        .returns(res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }));

      const response = await chai.request(app)
        .post('/sales')
        .send(invalidQuantityRequestMock);
      
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it('Retorna um erro 400 se não tiver o campo quantity', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(middlewares, 'validateSaleFields')
        .returns(res.status(400).json({ message: '"quantity" is required' }));

      const response = await chai.request(app)
        .post('/sales')
        .send(requestWithoutQuantityMock);
      
      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('"quantity" is required');
    });
  });

  describe('DELETE /sales/:id', function () {
    it('deleta uma venda pelo id', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([salesFromDB])
        .onSecondCall()
        .resolves([{ affectedRows: 1 }]);

      const response = await chai.request(app)
        .delete(routeIdOne);

      expect(response.status).to.be.equal(204);
      expect(response.body).to.deep.equal({});
    });

    it('retorna erro 404 se não encontrar venda pelo id', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(connection, 'execute')
        .resolves([salesFromDB]);
      sinon.stub(middlewares, 'validateSaleId')
        .returns(res.status(404).json({ message: saleNotFound }));

      const response = await chai.request(app)
        .delete('/sales/12345');

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal(saleNotFound);
    });
  });

  describe('PUT /sales/:id', function () {
    it('Retorna erro 400 se não tiver o campo quantity', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(middlewares, 'validateUpdateQuantityBody')
        .returns(res.status(400).json({ message: '"quantity" is required' }));

      const response = await chai
        .request(app)
        .put('/sales/1/products/1/quantity')
        .send({});

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('"quantity" is required');
    });

    it('Retorna erro 422 se a quantidade for menor que 1', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(middlewares, 'validateUpdateQuantityBody')
        .returns(res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }));

      const response = await chai
        .request(app)
        .put('/sales/1/products/1/quantity')
        .send({ quantity: 0 });

      expect(response.status).to.be.equal(422);
      expect(response.body.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it('Retorna erro 404 se não encontrar venda pelo id', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([salesFromDB])
        .onSecondCall()
        .resolves([productsMock]);

      sinon.stub(middlewares, 'validateUpdateQuantityParams')
        .resolves(res.status(404).json({ message: saleNotFound }));

      const response = await chai
        .request(app)
        .put('/sales/12345/products/1/quantity')
        .send({ quantity: 1 });

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal(saleNotFound);
    });

    it('Atualiza a quantidade de um produto na venda', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([salesFromDB])
        .onSecondCall()
        .resolves([productsMock]);
      sinon.stub(saleService, 'updateQuantity')
        .resolves({ status: 'SUCCESSFUL', data: { ...salesMock[0], quantity: 1 } });

      const response = await chai
        .request(app)
        .put('/sales/1/products/1/quantity')
        .send({ quantity: 1 });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(updatedSaleMock);
    });
  });
});