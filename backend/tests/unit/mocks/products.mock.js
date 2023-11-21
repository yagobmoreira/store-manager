const productsFromModel = [
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

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const productsFromService = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const productFromService = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const productIdFromDB = { insertId: 4 };
const productIdFromModel = 4;
const productCreatedFromModel = {
  id: 4,
  name: 'Novo produto',
};

const productFromServiceCreated = {
  status: 'CREATED',
  data: productCreatedFromModel,
};

module.exports = {
  productsFromModel,
  productFromModel,
  productsFromService,
  productFromService,
  productFromServiceNotFound,
  productIdFromDB,
  productIdFromModel,
  productFromServiceCreated,
  productCreatedFromModel,
};