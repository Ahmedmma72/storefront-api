import 'dotenv/config';
import { Pool } from 'pg';

const {
  SF_POSTGRES_USER,
  SF_POSTGRES_PASSWORD,
  SF_POSTGRES_HOST,
  SF_DEV_DB,
  SF_TEST_DB,
  SF_DEV_PORT,
  SF_TEST_PORT,
} = process.env;

const devConfig = {
  user: SF_POSTGRES_USER,
  password: SF_POSTGRES_PASSWORD,
  host: SF_POSTGRES_HOST,
  database: SF_DEV_DB,
  port: parseInt(SF_DEV_PORT as string),
};
const testConfig = {
  user: SF_POSTGRES_USER,
  password: SF_POSTGRES_PASSWORD,
  host: SF_POSTGRES_HOST,
  database: SF_TEST_DB,
  port: parseInt(SF_TEST_PORT as string),
};
const config = process.env.ENV === 'test' ? testConfig : devConfig;
const client = new Pool(config);

export default client;
