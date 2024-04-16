import mongoose from 'mongoose';
import environment from '../environment/index.js';
export const connectionDB = () => {
  return mongoose.connect(environment.HOST, {});
};
