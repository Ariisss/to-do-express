import jwt from 'jsonwebtoken';
import env from '../config/environment';
import { User } from '../types/types';

export function generateToken(user: Omit<User, 'password_hash'>): string {
  return jwt.sign(
    { 
      id: user.id,
      email: user.email 
    },
    env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
}
