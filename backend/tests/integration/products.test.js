const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const connection = require('../../src/models/connection');
const { productService } = require('../../src/services');
const { 
  productsMock,
  productMock,
  createdProductMock,
  updatedProductMock,
} = require('./mocks/products.mock');

const { expect, use } = chai;

use(chaiHttp);

const routeIdOne = '/products/1';

describe('Testando os endpoints de products', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET /products', function () {
    it('retorna um array de produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const response = await chai
        .request(app)
        .get('/products');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal(productsMock);
    });

    it('retorna um array vazio se não houver produtos', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);

      const response = await chai
        .request(app)
        .get('/products');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal([]);
    });

    it('retorna um product pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[productMock]]);

      const response = await chai
        .request(app)
        .get(routeIdOne);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.equal(productMock);
    });

    it('retorna um producto pelo name', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);
      sinon.stub(productService, 'getProductByName').resolves({ status: 'SUCCESSFUL', data: [productMock] });

      const response = await chai
        .request(app)
        .get('/products/search?name=Thor');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal([productMock]);
    });
  });

  describe('POST /products', function () {
    it('cria um produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      sinon.stub(productService, 'createProduct').resolves({ status: 'CREATED', data: createdProductMock });

      const response = await chai
        .request(app)
        .post('/products')
        .send({ name: 'Novo Produto' });

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.equal(createdProductMock);
    });

    it('retorna um erro na criação de um produto se não tem name na requisição', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

      const response = await chai
        .request(app)
        .post('/products')
        .send({});

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('"name" is required');
    });

    it('retorna um erro na criação de um produto se o name é menor que 5 caracteres', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

      const response = await chai
        .request(app)
        .post('/products')
        .send({ name: 'New' });

      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('PUT /products/:id', function () {
    it('atualiza um produto', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([productsMock])
        .onSecondCall()
        .resolves([{ affectedRows: 1 }])
        .onThirdCall()
        .resolves([[updatedProductMock]]);
      sinon.stub(productService, 'updateProduct')
        .resolves({ status: 'SUCCESSFUL', data: updatedProductMock });

      const response = await chai
        .request(app)
        .put(routeIdOne)
        .send({ name: 'Novo Nome' });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.equal(updatedProductMock);
    });

    it('retorna um erro na atualização de um produto se não tem name na requisição', async function () {
      sinon.stub(connection, 'execute').resolves([[productMock]]);

      const response = await chai
        .request(app)
        .put(routeIdOne)
        .send({});

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('"name" is required');
    });

    it('retorna um erro na atualização de um produto se o name é menor que 5 caracteres', async function () {
      sinon.stub(connection, 'execute').resolves([[productMock]]);

      const response = await chai
        .request(app)
        .put(routeIdOne)
        .send({ name: 'Novo' });

      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('DELETE /products/:id', function () {
    it('deleta um produto', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([productsMock])
        .onSecondCall()
        .resolves([{ affectedRows: 1 }]);

      const response = await chai
        .request(app)
        .delete(routeIdOne);

      expect(response.status).to.be.equal(204);
      expect(response.body).to.be.an('object');
    });

    it('retorna um erro na deleção de um produto se o id não existe', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);

      const response = await chai
        .request(app)
        .delete('/products/71263');

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('Product not found');
    });
  });
});