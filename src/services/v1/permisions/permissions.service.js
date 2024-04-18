import { BaseService } from '../base/base.service.js';
import { permissionRepository } from '../../../repositories/permission.repository.js';

class PermssionsService extends BaseService {
  constructor(permissionRepository) {
    super(permissionRepository);
    this.permissionRepository = permissionRepository;
  }
}

export const permissionService = new PermssionsService(permissionRepository);
