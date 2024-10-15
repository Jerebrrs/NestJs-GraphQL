import 'dotenv/config';
import * as joi from 'joi';
interface EnvVars {
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  STATE: string;
  DB_PORT: number;
  DB_HOST: string;
}
const envShema = joi
  .object({
    PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    STATE: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envShema.validate({ ...process.env });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
  dbName: envVars.DB_NAME,
  state: envVars.STATE,
  dbPort: envVars.DB_PORT,
  dbHost: envVars.DB_HOST,
};
