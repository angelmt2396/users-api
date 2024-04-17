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
  UNSUCCESSFUL_CREATE,
  CODE_400,
  UNSUCCESSFUL_ROLE_SEARCH,
} from '../../../utils/constants/index.js';
import { customResponse } from '../../../utils/response/custom.response.js';
import { BaseService } from '../base/base.service.js';
import { userRepository } from '../../../repositories/user.repository.js';
import { roleService } from '../role/role.service.js';
import UserModel from '../../../models/user.model.js';
class UserService extends BaseService {
  constructor(userRepository, roleService) {
    super(userRepository);
    this.userRepository = userRepository;
    this.roleService = roleService;
  }

  async createUser(user) {
    try {
      const { username, password, email, role: rolename } = user;
      const findUser = await userRepository.findOneByUsername({ username });
      if (findUser) {
        throw new CustomException({
          status: ERROR,
          code: CODE_400,
          message: UNSUCCESSFUL_CREATE,
          data: null,
        });
      }

      const findRole = await this.roleService.findOneByRolename({ rolename });

      if (!findRole?.data) {
        throw new CustomException({
          status: ERROR,
          code: CODE_404,
          message: UNSUCCESSFUL_ROLE_SEARCH,
          data: null,
        });
      }
      const id = findRole.data._id;
      const userCreate = await this.userRepository.create(
        new UserModel({
          username,
          password,
          email,
          roles: [id],
          createdBy: 'SYS',
        }),
      );
      return customResponse({
        status: SUCCESS,
        message: SUCCESSFUL_CREATE,
        code: CODE_201,
        data: this.createOrUpdateUserData(userCreate),
      });
    } catch (error) {
      throw handleException(error);
    }
  }

  async updateUser(user) {
    try {
      const { username, password, email, role: rolename } = user;
      const findUser = await this.findOneByUsername(username);
      if (!findUser.data) throw new CustomException(findUser);
      const findRole = await this.roleService.findOneByRolename({ rolename });
      if (!findRole.data) {
        throw new CustomException({
          status: ERROR,
          code: CODE_404,
          message: UNSUCCESSFUL_ROLE_SEARCH,
          data: null,
        });
      }
      const id = findRole.data._id;
      console.log(id);
      const userUpdate = await this.userRepository.update(findUser.data.id, {
        username,
        password,
        email,
        roles: [id],
      });
      return customResponse({
        status: SUCCESS,
        message: SUCCESSFUL_CREATE,
        code: CODE_200,
        data: this.createOrUpdateUserData(userUpdate),
      });
    } catch (error) {
      throw handleException(error);
    }
  }

  async findOneByUsername(username) {
    const user = await this.userRepository.findOneByUsername({ username });
    if (!user)
      return customResponse({
        status: ERROR,
        code: CODE_404,
        message: UNSUCCESSFUL_SEARCH,
        data: null,
      });
    const roles = [];
    for await (const role of user.roles) {
      const { _id } = role;
      const roleAndPermissions =
        await this.roleService.getRoleAndPermissions(_id);

      if (roleAndPermissions) roles.push(roleAndPermissions);
    }
    const userData = this.createOrUpdateUserData(user, roles);
    return customResponse({
      status: SUCCESS,
      code: CODE_200,
      message: SUCCESSFUL_SEARCH,
      data: userData,
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

  async findAllUsers() {
    try {
      const usersResponse = [];
      const users = await this.findAll();
      if (!users.data) return users;
      for await (const user of users.data) {
        const roles = [];
        for await (const role of user.roles) {
          const { _id } = role;
          const roleAndPermissions =
            await this.roleService.getRoleAndPermissions(_id);

          if (roleAndPermissions) roles.push(roleAndPermissions);
        }
        usersResponse.push(this.createOrUpdateUserData(user, roles));
      }
      users.data = usersResponse;
      return users;
    } catch (error) {
      throw handleException(error);
    }
  }

  createOrUpdateUserData(user, rolenames) {
    const userResponse = {
      username: user.username,
      email: user.email,
      roles: rolenames || user.roles,
    };
    return userResponse;
  }
}

export const userService = new UserService(userRepository, roleService);
