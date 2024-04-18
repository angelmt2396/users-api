import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  SECRET_LOGIN: process.env.SECRET_LOGIN,
  SECRET_PWD: process.env.SECRET_PWD,
  BASIC_AUTH_ACTIVE: process.env.BASIC_AUTH_ACTIVE,
};
