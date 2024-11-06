import { Request, Response, NextFunction } from 'express';

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Record the start time of the request
  const start = Date.now();

  // Listen for the 'finish' event to calculate request duration
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Log request details: timestamp, method, URL, status code, and duration
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${duration}ms`
    );
  });

  next();
}