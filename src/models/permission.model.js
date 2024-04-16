import { Schema, model } from 'mongoose';

const PermissionSchema = new Schema(
  {
    permissionname: {
      type: String,
      required: true,
    },
    permissiontype: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      require: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const permissionModel = model('Permission', PermissionSchema);
export default permissionModel;
