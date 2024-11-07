import { Todo } from '../models/todo.model';

export const createTodo = async (userId: number, data: any) => {
  const todo = await Todo.create({ ...data, userId });
  return todo;
};

export const getTodos = async (userId: number) => {
  const todos = await Todo.findAll({ where: { userId } });
  return todos;
};

export const updateTodo = async (
  userId: number,
  todoId: number,
  data: any
) => {
  const todo = await Todo.findOne({ where: { id: todoId, userId } });
  if (!todo) throw new Error('Todo not found');
  await todo.update(data);
  return todo;
};

export const deleteTodo = async (userId: number, todoId: number) => {
  const todo = await Todo.findOne({ where: { id: todoId, userId } });
  if (!todo) throw new Error('Todo not found');
  await todo.destroy();
  return;
};
