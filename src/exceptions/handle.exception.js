import { customResponse } from '../utils/response/custom.response.js';
import { CustomException } from './custom.exception.js';
import {
  INTERNAL_SERVER_ERROR,
  CODE_500,
  ERROR,
} from '../utils/constants/index.js';

export const handleException = (error) => {
  console.error(error);
  if (error instanceof CustomException) {
    return customResponse(error);
  }
  return customResponse({
    status: ERROR,
    code: CODE_500,
    message: INTERNAL_SERVER_ERROR,
    data: null,
  });
};
