import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../utils/jwt.utils';

// Middleware to authenticate JWT tokens
export const authenticate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers['authorization'];
  if (!header) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = header.split(' ')[1]; // Bearer <token>
  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
