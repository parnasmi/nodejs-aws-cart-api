import * as dotenv from 'dotenv';

dotenv.config();

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const RDS_CONNECTION_URL = process.env.RDS_CONNECTION_URL;