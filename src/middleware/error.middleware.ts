import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/types';

// Main error handler middleware - catches all errors thrown in the application
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Use the error's status code if available, fallback to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the full error stack for debugging
  console.error(`[Error] ${err.stack}`);

  // Send a structured error response to the client
  res.status(statusCode).json({
    status: 'error',
    code: err.code || 'INTERNAL_ERROR',
    message
  });
}

// Handle 404 Not Found errors for undefined routes
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
