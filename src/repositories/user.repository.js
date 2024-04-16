import { BaseRepository } from './base.repository.js';
import UserModel from '../models/user.model.js';
export class UserRepository extends BaseRepository {
  constructor(userModel) {
    super(userModel);
  }

  async deleteMany(where) {
    return await this.userModel.deleteMany(where);
  }
}

export const userRepository = new UserRepository(UserModel);
