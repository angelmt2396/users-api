import { Schema, model } from 'mongoose';

const RoleSchema = new Schema(
  {
    rolename: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
  },
  { timestamps: true },
);

export default {
  roleModel: model('Role', RoleSchema),
};
