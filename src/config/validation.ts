import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(8080),
  MONGO_URI: Joi.string().required(),
  API_KEY: Joi.string().required(),
});