import {
  USERNAME_STRING_VALIDATION,
  EMPTY_USERNAME_VALIDATION,
  EMAIL_VALIDATION,
  EMPTY_EMAIL_VALIDATION,
  PASSWORD_STRING_VALIDATION,
  EMPTY_PASSWORD_VALIDATION,
  ROLE_STRING_VALIDATION,
  EMPTY_ROLE_VALIDATION,
} from '../../../utils/constants/index.js';
export const checkUsername = {
  username: {
    isString: { errorMessage: USERNAME_STRING_VALIDATION },
    isEmpty: {
      negated: true,
      errorMessage: EMPTY_USERNAME_VALIDATION,
    },
  },
};

export const checkEmail = {
  email: {
    isEmail: {
      errorMessage: EMAIL_VALIDATION,
    },
    isEmpty: {
      negated: true,
      errorMessage: EMPTY_EMAIL_VALIDATION,
    },
  },
};

export const checkPassword = {
  password: {
    isString: { errorMessage: PASSWORD_STRING_VALIDATION },
    isEmpty: {
      negated: true,
      errorMessage: EMPTY_PASSWORD_VALIDATION,
    },
  },
};

export const checkRole = {
  role: {
    isString: { errorMessage: ROLE_STRING_VALIDATION },
    isEmpty: {
      negated: true,
      errorMessage: EMPTY_ROLE_VALIDATION,
    },
  },
};
