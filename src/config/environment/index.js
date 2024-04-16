import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
};
