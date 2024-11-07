import { UserAttributes } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

export interface AppError {
  statusCode?: number;
  message: string;
  code?: string;
  stack?: string;
}