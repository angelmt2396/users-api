import permissionModel from '../models/permission.model.js';
import { BaseRepository } from './base.repository.js';

export class PermissionRepository extends BaseRepository {
  constructor(permisionModel) {
    super(permisionModel);
  }
}

export const permissionRepository = new PermissionRepository(permissionModel);
