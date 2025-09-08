import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string()
          .required()
          .custom((value, helper) => {
            if (value && !isValidObjectId(value)) {
              return helper.message('Flower id should be a valid mongo id');
            }
            return true;
          }),
        count: Joi.number().required().messages({
          'number.base': 'Flower count must be a number',
          'any.required': 'Flower count is required',
        }),
        priceAtPurchase: Joi.number().required().messages({
          'number.base': 'Price must be a number',
          'any.required': 'Price is required',
        }),
      }),
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'items must be an array',
      'array.min': 'At least one item is required',
    }),
  // we get total from front, and verify by recalc on back
  total: Joi.number().required().messages({
    'number.base': 'total must be a number',
    'any.required': 'total is required',
  }),
  deliveryAddress: Joi.string().required().messages({
    'string.base': 'Delivery address must be a string',
    'any.required': 'Delivery address is required',
  }),
  shopId: Joi.string()
    .required()
    .custom((value, helper) => {
      if (value && !isValidObjectId(value)) {
        return helper.message('Shop id should be a valid mongo id');
      }
      return true;
    }),
  couponId: Joi.string()
  .custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Coupon id should be a valid mongo id');
    }
    return true;
  }),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});
