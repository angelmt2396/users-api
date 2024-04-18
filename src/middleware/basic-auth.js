import { response } from 'express';
import {
  CODE_401,
  ERROR_BA_401,
  UNAUTHORIZED,
  INVALID_USER,
  INVALID_PASSWORD,
} from '../utils/constants/index.js';
import environment from '../config/environment/index.js';
import { compare } from '../utils/encryption/bcrypt.utils.js';
export const basicAuth = async (req, res = response, next) => {
  if (parseInt(environment.BASIC_AUTH_ACTIVE)) {
    const result = {
      status: UNAUTHORIZED,
      code: CODE_401,
      message: ERROR_BA_401,
      data: null,
    };
    const base64 = req.headers.authorization;
    if (!base64 || base64.indexOf('Basic ') === -1) {
      return res.status(result.code).json(result);
    }

    try {
      const base64Credentials = base64.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'ascii',
      );
      const [username, password] = credentials.split(':');
      if (username !== environment.SECRET_LOGIN) {
        result.message = INVALID_USER;
        return res.status(result.code).json(result);
      }

      if (!(await compare(environment.SECRET_PWD, password))) {
        result.message = INVALID_PASSWORD;
        return res.status(result.code).json(result);
      }
      req.username = username;
      next();
    } catch (e) {
      result.message = 'Token no valido.';
      return res.status(result.code).json(result);
    }
  } else {
    next();
  }
};
