import RoleModel from '../models/role.model.js';
import { BaseRepository } from './base.repository.js';

export class RoleRepository extends BaseRepository {
  constructor(roleModel) {
    super(roleModel);
  }
  async findOneByRolename(rolename) {
    return await this.getByIndex(rolename);
  }
}

export const roleRepository = new RoleRepository(RoleModel);
