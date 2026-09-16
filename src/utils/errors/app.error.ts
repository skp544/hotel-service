// AppError <===

export interface AppError extends Error {
  statusCode: number;
}

// 1. help to define type
// 2. do object oriented operations like inheritance
// 3. acts as a contract
// 4.

export class InternalServerError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    ((this.statusCode = 500),
      (this.name = "InternalServerError"),
      (this.message = message));
  }
}

export class BadRequestError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    ((this.statusCode = 400),
      (this.name = "BadRequestError"),
      (this.message = message));
  }
}

export class NotFoundError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    ((this.statusCode = 404),
      (this.name = "NotFoundError"),
      (this.message = message));
  }
}

export class UnauthorizedError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    ((this.statusCode = 401),
      (this.name = "UnauthorizedError"),
      (this.message = message));
  }
}

export class ForbiddenError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    ((this.statusCode = 403),
      (this.name = "ForbiddenError"),
      (this.message = message));
  }
}

export class ConflictError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    ((this.statusCode = 409),
      (this.name = "ConflictError"),
      (this.message = message));
  }
}

export class ValidationError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    ((this.statusCode = 400),
      (this.name = "ValidationError"),
      (this.message = message));
  }
}

export class TooManyRequestsError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    ((this.statusCode = 429),
      (this.name = "TooManyRequestsError"),
      (this.message = message));
  }
}
