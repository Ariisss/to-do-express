import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

// user reg
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

// login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { id: userId, token } = await loginUser(email, password);
    res.json({ id: userId, token });
  } catch (error) {
    next(error);
  }
};
