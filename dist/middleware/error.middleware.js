"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.catchAsync = exports.AppError = void 0;
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
exports.AppError = AppError;
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
exports.catchAsync = catchAsync;
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
exports.errorHandler = errorHandler;
