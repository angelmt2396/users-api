import { validationResult } from 'express-validator';
import {
  ERROR,
  CODE_400,
  DATA_VALIDATION_ERROR,
} from '../utils/constants/index.js';
export const ValidateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const result = {
      status: ERROR,
      code: CODE_400,
      message: DATA_VALIDATION_ERROR,
      data: errors.array(),
    };
    res.status(result.code).json(result);
  }
  next();
};
