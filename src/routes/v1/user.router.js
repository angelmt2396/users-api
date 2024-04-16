import { check, query } from 'express-validator';
import { Router, request, response } from 'express';
import { ValidateRequest } from '../../middleware/validate-request.js';
import {
  USERNAME_STRING_VALIDATION,
  EMPTY_USERNAME_VALIDATION,
  EMPTY_EMAIL_VALIDATION,
  EMAIL_VALIDATION,
  PASSWORD_STRING_VALIDATION,
  EMPTY_PASSWORD_VALIDATION,
  EMPTY_ROLE_VALIDATION,
  ROLE_STRING_VALIDATION,
} from '../../utils/constants/index.js';
import { UserController } from '../../controllers/v1/user/user.controller.js';

const userController = new UserController(request, response);
const userRouter = Router();
const ROUTE = '/user/api/v1';
userRouter.get(`${ROUTE}/find-all`, userController.findAll);
userRouter.get(
  `${ROUTE}/find-one`,
  [
    query('username').notEmpty().withMessage(EMPTY_USERNAME_VALIDATION),
    query('username').isString().withMessage(USERNAME_STRING_VALIDATION),
    ValidateRequest,
  ],
  userController.findOneByUsername,
);
userRouter.post(
  `${ROUTE}/create`,
  [
    check('username', USERNAME_STRING_VALIDATION).isString(),
    check('username', EMPTY_USERNAME_VALIDATION).not().isEmpty(),
    check('email', EMPTY_EMAIL_VALIDATION).not().isEmpty(),
    check('email', EMAIL_VALIDATION).isEmail(),
    check('password', EMPTY_PASSWORD_VALIDATION).not().isEmpty(),
    check('password', PASSWORD_STRING_VALIDATION).isString(),
    check('role', EMPTY_ROLE_VALIDATION).not().isEmpty(),
    check('role', ROLE_STRING_VALIDATION).not().isString(),
    ValidateRequest,
  ],
  userController.findOneByUsername,
);

userRouter.patch(
  `${ROUTE}/update`,
  [
    check('username', USERNAME_STRING_VALIDATION).isString(),
    check('username', EMPTY_USERNAME_VALIDATION).not().isEmpty(),
    check('email', EMPTY_EMAIL_VALIDATION).not().isEmpty(),
    check('email', EMAIL_VALIDATION).isEmail(),
    check('password', EMPTY_PASSWORD_VALIDATION).not().isEmpty(),
    check('password', PASSWORD_STRING_VALIDATION).isString(),
    check('role', EMPTY_ROLE_VALIDATION).not().isEmpty(),
    check('role', ROLE_STRING_VALIDATION).not().isString(),
    ValidateRequest,
  ],
  userController.findOneByUsername,
);

userRouter.patch(
  `${ROUTE}/delete`,
  [
    check('usernames', USERNAME_STRING_VALIDATION).isArray(),
    check('usernames.*', USERNAME_STRING_VALIDATION).isString(),
    check('usernames.*', EMPTY_USERNAME_VALIDATION).not().isEmpty(),
    ValidateRequest,
  ],
  userController.findOneByUsername,
);

export default userRouter;
