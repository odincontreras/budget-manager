export const ERROR_PROPS = {
  NOT_FOUND: {
    name: "NOT_FOUND",
    message: "Not found",
  },
  BAD_REQUEST: {
    name: "BAD_REQUEST",
    message: "Bad request",
  },
  UNAUTHORIZED: {
    name: "UNAUTHORIZED",
    message: "Unauthorized",
  },
  FORBIDDEN: {
    name: "FORBIDDEN",
    message: "Forbidden",
  },
  PASSWORD_INCORRECT: {
    name: "PASSWORD_INCORRECT",
    message: "Password incorrect",
  },
  INVALID_TOKEN: {
    name: "INVALID_TOKEN",
    message: "Invalid token",
  },
};

interface ResponseStatusCodes {
  [key: string]: number;
}

export const HTTP_STATUS_CODES: ResponseStatusCodes = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  OK: 200,
  NO_CONTENT: 204,
  PASSWORD_INCORRECT: 401,
  INVALID_TOKEN: 401,
};
