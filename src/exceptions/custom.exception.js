import {
  INTERNAL_SERVER_ERROR,
  CODE_500,
  ERROR,
} from '../utils/constants/index.js';
export class CustomException extends Error {
  constructor(info) {
    super(info?.message || INTERNAL_SERVER_ERROR);
    this.status = ERROR;
    this.message = info?.message || INTERNAL_SERVER_ERROR;
    this.code = info?.code ?? CODE_500;
    this.data = info?.data ?? null;
  }
}
