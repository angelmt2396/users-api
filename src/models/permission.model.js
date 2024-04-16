import { Schema, model } from 'mongoose';

const PermissionSchema = new Schema(
  {
    permissionname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export default {
  permissionModel: model('Permission', PermissionSchema),
};
