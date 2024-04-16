import { CustomException } from '../../../exceptions/custom.exception.js';
import { customResponse } from '../../../utils/response/custom.response.js';
import {
  SUCCESS,
  CODE_200,
  CODE_404,
  ERROR,
  UNSUCCESSFUL_SEARCH,
  SUCCESSFUL_SEARCH,
} from '../../../utils/constants/index.js';
export class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async findOneById(id) {
    const findOne = await this.repository.getById(id);
    if (!findOne)
      throw new CustomException({
        status: ERROR,
        code: CODE_404,
        message: UNSUCCESSFUL_SEARCH,
        data: null,
      });
    return customResponse({
      status: SUCCESS,
      code: CODE_200,
      message: SUCCESSFUL_SEARCH,
      data: findOne,
    });
  }

  async findAll() {
    const findAll = await this.repository.findAll();
    if (!findAll.length) {
      throw new CustomException({
        status: ERROR,
        code: CODE_404,
        message: UNSUCCESSFUL_SEARCH,
        data: null,
      });
    }
    return customResponse({
      status: SUCCESS,
      code: CODE_200,
      message: SUCCESSFUL_SEARCH,
      data: findAll,
    });
  }
}
