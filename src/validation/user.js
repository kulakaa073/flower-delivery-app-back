import Joi from 'joi';

export const userDataSchema = Joi.object({
  phone: Joi.string(),
  email: Joi.string().email(),
});
