import { User } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/password.utils';
import { generateToken } from '../utils/jwt.utils';

// register users and hashes password
export const registerUser = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ email, password: hashedPassword });
  return user;
};

// logs user in and returns a token.
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new Error('Invalid password');

  const token = generateToken({ id: user.id, email: user.email });
  return { id: user.id, token };
};
