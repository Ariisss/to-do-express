import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import UserModel from '../models/user.model';
import supabase from '../config/database';

interface AuthenticatedUser {
    id: string;
    email: string;
    created_at: string;
}

// updates the request type to include the authenticated user
declare global {
    namespace Express {
        interface Request {
            authUser: AuthenticatedUser;
        }
    }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // bearer token check
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      });
    }

    // extract token from header
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // verify user in db
    const user = await UserModel.findOne({
      where: { id: decoded.id },
      attributes: ['id', 'email', 'created_at']
    })

    if(!user) {
      return res.status(401).json({
        status: 'error',
        code: 'INVALID_TOKEN',
        message: 'Invalid authentication token'
      });
    }
    
    // attach user to request for use in route handlers
    req.authUser = {
      id: user.id,
      email: user.email,
      created_at: user.created_at.toISOString()
    }

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_TOKEN',
      message: 'Invalid authentication token'
    });
  }
}
