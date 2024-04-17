import { BaseService } from '../base/base.service.js';
import { roleRepository } from '../../../repositories/role.repository.js';
import { customResponse } from '../../../utils/response/custom.response.js';
import {
  ERROR,
  CODE_200,
  SUCCESS,
  CODE_404,
  UNSUCCESSFUL_SEARCH,
  SUCCESSFUL_SEARCH,
} from '../../../utils/constants/index.js';
import { permissionService } from '../permisions/permissions.service.js';

export class RoleService extends BaseService {
  constructor(roleRepository, permissionService) {
    super(roleRepository);
    this.roleRepository = roleRepository;
    this.permissionService = permissionService;
  }

  async findOneByRolename(rolename) {
    const role = await this.roleRepository.findOneByRolename(rolename);
    if (!role)
      return customResponse({
        status: ERROR,
        code: CODE_404,
        message: UNSUCCESSFUL_SEARCH,
        data: null,
      });
    return customResponse({
      status: SUCCESS,
      code: CODE_200,
      message: SUCCESSFUL_SEARCH,
      data: role,
    });
  }

  async getRoleAndPermissions(id) {
    const permissions = [];
    const role = await this.findOneById(id);
    if (!role.data) return role;
    const permissionsIds = role.data.permissions;
    for await (const permissionId of permissionsIds) {
      const permission = await this.permissionService.findOneById(permissionId);
      if (permission) {
        permissions.push({
          permissionname: permission.data.permissionname,
          permissiontype: permission.data.permissiontype,
          uri: permission.data.uri,
        });
      }
    }
    return {
      rolename: role.data.rolename,
      permissions,
    };
  }
}

export const roleService = new RoleService(roleRepository, permissionService);
