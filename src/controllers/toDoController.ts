import { Request, Response, NextFunction } from 'express';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../services/todo.service';

// create todo
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id
    const todo = await createTodo(userId, req.body);
    res.status(201).json({ todo });
  } catch (error) {
    next(error);
  }
};

// get todos
export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id
    const todos = await getTodos(userId);
    res.json({ todos });
  } catch (error) {
    next(error);
  }
};

// update todo
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id
    const todo = await updateTodo(
      userId,
      parseInt(req.params.id),
      req.body
    );
    res.json({ todo });
  } catch (error) {
    next(error);
  }
};

// delete todo
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id
    await deleteTodo(userId, parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
