import { handleException } from '../../../exceptions/handle.exception.js';
import { userService } from '../../../services/v1/user/user.service.js';
import { CustomException } from '../../../exceptions/custom.exception.js';
export class UserController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async createUser(req = this.request, res = this.response) {
    try {
      console.log('Inicia proceso');
      const result = await userService.createUser(req.body);
      console.log('Termina proceso');
      return res.status(result.code).json(result);
    } catch (error) {
      const errorHandler = handleException(error); 
      return res.status(errorHandler.code).json(errorHandler);
    }
  }

  async updateUser(req = this.request, res = this.response) {
    try {
      console.log('Inicia proceso');
      const result = await userService.updateUser(req.body);
      console.log('Termina proceso');
      return res.status(result.code).json(result);
    } catch (error) {
      const errorHandler = handleException(error);
      return res.status(errorHandler.code).json(errorHandler);
    }
  }

  async findAll(_req = this.request, res = this.response) {
    try {
      console.log('Inicia proceso');
      const result = await userService.findAllUsers();
      console.log('Termina proceso');
      return res.status(result.code).json(result);
    } catch (error) {
      const errorHandler = handleException(error);
      return res.status(errorHandler.code).json(errorHandler);
    }
  }

  async findOneByUsername(req = this.request, res = this.response) {
    try {
      console.log('Inicia proceso');
      const result = await userService.findOneByUsername(req.query.username);
      if (!result.data) throw new CustomException(result);
      console.log('Termina proceso');
      return res.status(result.code).json(result);
    } catch (error) {
      const errorHandler = handleException(error);
      return res.status(errorHandler.code).json(errorHandler);
    }
  }

  async deleteMany(req = this.request, res = this.response) {
    try {
      console.log('Inicia proceso');
      const result = await userService.deleteMany(req.body.usernames);
      console.log('Termina proceso');
      return res.status(result.code).json(result);
    } catch (error) {
      const errorHandler = handleException(error);
      return res.status(errorHandler.code).json(errorHandler);
    }
  }
}
