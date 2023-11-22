const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { 
  productsFromModel,
  productFromModel,
  productIdFromModel,
  productCreatedFromModel,
} = require('../mocks/products.mock');

describe('Realizando testes - PRODUCT SERVICE', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando products com sucesso', async function () {
    sinon.stub(productModel, 'findAll').resolves(productsFromModel);

    const responseData = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
    ];

    const responseService = await productService.getAllProducts();

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Recuperando um product pelo id com sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(productFromModel);

    const inputData = 1;
    const responseData = {
      id: 1,
      name: 'Martelo de Thor',
    };

    const responseService = await productService.findProductById(inputData);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Recuperando um product pelo id que não existe', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const inputData = 999;
    const responseData = {
      message: 'Product not found',
    };

    const responseService = await productService.findProductById(inputData);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Criando um novo product com sucesso', async function () {
    sinon.stub(productModel, 'insert').resolves(productIdFromModel);
    sinon.stub(productModel, 'findById').resolves(productCreatedFromModel);

    const inputData = {
      name: 'Novo produto',
    };

    const responseData = {
      id: 4,
      name: 'Novo produto',
    };

    const responseService = await productService.createProduct(inputData);
    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.deep.equal(responseData);
  });
});