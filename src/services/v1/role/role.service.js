import { BaseService } from '../base/base.service';
import { roleRepository } from '../../../repositories/role.repository.js';

export class RoleService extends BaseService {
  constructor(roleRepository) {
    super(roleRepository);
    this.roleRepository = roleRepository;
  }
}

export const roleService = new RoleService(roleRepository);
