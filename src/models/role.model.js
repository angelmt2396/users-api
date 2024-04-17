import { Schema, model } from 'mongoose';

const RoleSchema = new Schema(
  {
    rolename: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'permission',
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const RoleModel = model('role', RoleSchema);
export default RoleModel;
