import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/types';

//catches errors
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // returns error status code or 500 if no error code
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // logs the error stack
  console.error(`[Error] ${err.stack}`);

  // returns the error response to client
  res.status(statusCode).json({
    status: 'error',
    code: err.code || 'INTERNAL_ERROR',
    message
  });
}

// returns 404 error if route is not found
export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).json({
    status: 'error',
    code: 'NOT_FOUND',
    message: 'Resource not found'
  });
}
