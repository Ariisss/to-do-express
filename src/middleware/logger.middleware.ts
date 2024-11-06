import { Request, Response, NextFunction } from 'express';

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // records start time
  const start = Date.now();

  res.on('finish', () => {
    // calculates duration
    const duration = Date.now() - start;
    
    // logs request details
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${duration}ms`
    );
  });

  next();
}