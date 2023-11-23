const date1 = '2023-11-23T14:51:40.000Z';

const salesMock = [
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

const saleMock = [
  {
    date: date1,
    productId: 1,
    quantity: 5,
  },
  {
    date: date1,
    productId: 2,
    quantity: 10,
  },
];

const createdSaleMock = {
  id: 3,
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

const salesFromDB = [
  {
    id: 1,
    date: date1,
  },
  {
    id: 2,
    date: date1,
  },
];

const validRequestMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const invalidProductIdRequestMock = [
  {
    productId: 0,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const invalidQuantityRequestMock = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const requestWithoutQuantityMock = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const updatedSaleMock = {
  ...salesMock[0],
  quantity: 1,
};

module.exports = {
  salesMock,
  saleMock,
  createdSaleMock,
  salesFromDB,
  validRequestMock,
  invalidProductIdRequestMock,
  invalidQuantityRequestMock,
  requestWithoutQuantityMock,
  updatedSaleMock,
};