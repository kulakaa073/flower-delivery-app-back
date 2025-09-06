import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const updateFavouritesSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      flowerId: Joi.string().custom((value, helper) => {
        if (value && !isValidObjectId(value)) {
          return helper.message('Flower id should be a valid mongo id');
        }
        return true;
      }),
    }),
  ),
});
