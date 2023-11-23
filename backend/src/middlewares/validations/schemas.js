const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const newSaleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const addSaleSchema = Joi.array().items(newSaleSchema.required());

const updateQuantitySchema = Joi.object({
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  addProductSchema,
  addSaleSchema,
  updateQuantitySchema,
};