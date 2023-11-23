const date1 = '2023-11-21T20:24:30.000Z';
const date2 = '2023-11-21T19:52:27.000Z';

const salesFromModel = [
  {
    saleId: 1,
    date: date1,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: date1,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: date1,
    productId: 3,
    quantity: 15,
  },
];

const saleFromModel = [
  {
    date: date2,
    productId: 1,
    quantity: 5,
  },
  {
    date: date2,
    productId: 2,
    quantity: 10,
  },
];

const saleIdFromDB = { insertId: 4 };
const saleIdFromModel = 4;

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

const saleCreatedFromModel = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const saleFromServiceCreated = {
  status: 'CREATED',
  data: saleCreatedFromModel,
};

const salesFromDB = [
  {
    id: 1,
    date: date2,
  },
  {
    id: 2,
    date: date2,
  },
];

const saleUpdatedFromModel = [
  {
    date: date2,
    productId: 1,
    quantity: 1,
  },
  {
    date: date2,
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  salesFromModel,
  saleFromModel,
  salesFromService,
  saleFromService,
  saleFromServiceNotFound,
  saleIdFromDB,
  saleIdFromModel,
  saleFromServiceCreated,
  saleCreatedFromModel,
  salesFromDB,
  saleUpdatedFromModel,
};