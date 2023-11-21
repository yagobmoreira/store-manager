const salesFromModel = [
  {
    saleId: 1,
    date: '2023-11-21T20:24:30.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-11-21T20:24:30.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-11-21T20:24:30.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleFromModel = [
  {
    date: '2023-11-21T19:52:27.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-11-21T19:52:27.000Z',
    productId: 2,
    quantity: 10,
  },
];

const salesFromService = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const saleFromService = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const saleFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  salesFromModel,
  saleFromModel,
  salesFromService,
  saleFromService,
  saleFromServiceNotFound,
};