// User related types
export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

// Todo related types
export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TodoCreate {
  title: string;
  description?: string;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  is_completed?: boolean;
}

// Auth related types
export interface AuthResponse {
  token: string;
  user: Omit<User, 'password_hash'>;
}

// Error types
export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

// Request augmentation for authenticated routes
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
