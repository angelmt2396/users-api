import { CustomException } from '../../../exceptions/custom.exception.js';
import { handleException } from '../../../exceptions/handle.exception.js';
import {
  CODE_200,
  SUCCESS,
  SUCCESSFUL_DELETE,
  SUCCESSFUL_CREATE,
  CODE_201,
  ERROR,
  CODE_404,
  UNSUCCESSFUL_SEARCH,
  SUCCESSFUL_SEARCH,
} from '../../../utils/constants/index.js';
import { customResponse } from '../../../utils/response/custom.response.js';
import { BaseService } from '../base/base.service.js';
import { userRepository } from '../../../repositories/user.repository.js';

class UserService extends BaseService {
  constructor(userRepository) {
    super(userRepository);
    this.userRepository = userRepository;
  }

  async createUser(user) {
    try {
      const { username, password, email, role } = user;
      // Valido que exista
      // existe error ya existe un usuario asignado a ese username
      // no existe, valido que exista el rol
      // error no existe ese rol

      const userCreate = await this.userRepository.create({
        username,
        password,
        email,
        roles: [role],
      });
      return customResponse({
        status: SUCCESS,
        message: SUCCESSFUL_CREATE,
        code: CODE_201,
        data: userCreate,
      });
    } catch (error) {
      throw handleException(error);
    }
  }

  async updateUser(user) {
    try {
      const { username, password, email, role } = user;
      const findUser = await userRepository.findOneByUsername(username);
      if (!findUser.data) throw new CustomException(findUser);
      const userCreate = await this.userRepository.update(findUser.data.id, {
        username,
        password,
        email,
        roles: [role],
      });
      return customResponse({
        status: SUCCESS,
        message: SUCCESSFUL_CREATE,
        code: CODE_200,
        data: userCreate,
      });
    } catch (error) {
      throw handleException(error);
    }
  }

  async findOneByUsername(username) {
    const user = await this.userRepository.findOneByUsername({ username });
    if (!user)
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
      data: user,
    });
  }

  async deleteMany(usernames) {
    const condition = { _id: { $in: usernames } };
    await this.userRepository.deleteMany(condition);
    return customResponse({
      status: SUCCESS,
      message: SUCCESSFUL_DELETE,
      code: CODE_200,
      data: null,
    });
  }
}

export const userService = new UserService(userRepository);
