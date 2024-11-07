import { Todo } from '../models/todo.model';

export const createTodo = async (userId: number, data: any) => {
  const todo = await Todo.create({ ...data, user_id: userId });
  return todo;
};

export const getTodos = async (userId: number) => {
  const todos = await Todo.findAll({ where: { user_id: userId } });
  return todos;
};

export const updateTodo = async (
  userId: number,
  todoId: number,
  data: any
) => {
  const todo = await Todo.findOne({ where: { id: todoId, user_id: userId } });
  if (!todo) throw new Error('Todo not found');
  await todo.update(data);
  return todo;
};

export const deleteTodo = async (userId: number, todoId: number) => {
  const todo = await Todo.findOne({ where: { id: todoId, user_id: userId } });
  if (!todo) throw new Error('Todo not found');
  await todo.destroy();
  return;
};
