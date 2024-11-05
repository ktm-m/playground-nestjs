import Joi, { ObjectSchema } from '@hapi/joi';

export const configValidationSchema: ObjectSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_TYPE: Joi.string().default('postgres').required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
});
