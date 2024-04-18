import { BaseRepository } from './base.repository.js';
import UserModel from '../models/user.model.js';
export class UserRepository extends BaseRepository {
  constructor(userModel) {
    super(userModel);
    this.userModel = userModel;
  }

  async deleteMany(where) {
    return await this.userModel.deleteMany(where);
  }

  async findOneByUsername(username) {
    return await this.getByIndex(username);
  }
}

export const userRepository = new UserRepository(UserModel);
