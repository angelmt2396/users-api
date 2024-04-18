import { check, query, checkSchema } from 'express-validator';
import { Router, request, response } from 'express';
import { ValidateRequest } from '../../middleware/validate-request.js';
import { basicAuth } from '../../middleware/basic-auth.js';
import {
  USERNAME_STRING_VALIDATION,
  EMPTY_USERNAME_VALIDATION,
  USERNAMES_ARRAY_VALIDATION,
} from '../../utils/constants/index.js';
import { UserController } from '../../controllers/v1/user/user.controller.js';
import {
  checkEmail,
  checkPassword,
  checkRole,
  checkUsername,
} from './utils/validations.js';

const userRouter = Router();
const userController = new UserController(request, response);
const ROUTE = '/user/api/v1';
userRouter.get(`${ROUTE}/find-all`, [basicAuth], userController.findAll);
userRouter.get(
  `${ROUTE}/find-one`,
  [basicAuth],
  query('username').notEmpty().withMessage(EMPTY_USERNAME_VALIDATION),
  query('username').isString().withMessage(USERNAME_STRING_VALIDATION),
  [ValidateRequest],
  userController.findOneByUsername,
);
userRouter.post(
  `${ROUTE}/create`,
  [basicAuth],
  checkSchema(checkUsername),
  checkSchema(checkEmail),
  checkSchema(checkPassword),
  checkSchema(checkRole),
  [ValidateRequest],
  userController.createUser,
);

userRouter.patch(
  `${ROUTE}/update`,
  [basicAuth],
  checkSchema(checkUsername),
  checkSchema(checkEmail),
  checkSchema(checkPassword),
  checkSchema(checkRole),
  [ValidateRequest],
  userController.updateUser,
);

userRouter.delete(
  `${ROUTE}/delete`,
  [basicAuth],
  check('usernames', USERNAMES_ARRAY_VALIDATION).isArray({ min: 1 }),
  check('usernames.*', USERNAME_STRING_VALIDATION).isString(),
  check('usernames.*', EMPTY_USERNAME_VALIDATION).not().isEmpty(),
  [ValidateRequest],
  userController.deleteMany,
);

export default userRouter;
