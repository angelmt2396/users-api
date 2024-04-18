import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'role',
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = model('user', UserSchema);
export default UserModel;
