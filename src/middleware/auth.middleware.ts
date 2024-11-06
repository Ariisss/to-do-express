import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import supabase from '../config/database';

interface AuthenticatedUser {
    id: string;
    email: string;
    created_at: string;
}

// Update the Request type augmentation
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
    // Check for Bearer token in Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      });
    }

    // Extract and verify the JWT token
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // Verify user exists in database
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, created_at')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return res.status(401).json({
        status: 'error',
        code: 'INVALID_TOKEN',
        message: 'Invalid authentication token'
      });
    }

    // Attach user to request for use in route handlers
    req.authUser = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_TOKEN',
      message: 'Invalid authentication token'
    });
  }
}
