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
  const message = error.message || INTERNAL_SERVER_ERROR;
  return customResponse({
    status: ERROR,
    code: error?.code <= 599 ? error?.code : CODE_500,
    message,
    data: null,
  });
};
