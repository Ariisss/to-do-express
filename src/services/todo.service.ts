import { TodoCreate, TodoUpdate } from '../types/types';
import Todo from '../models/todo.model';

// create todo function
export async function createTodo(userId: string, data: TodoCreate) {
  return Todo.create({
    user_id: userId,
    title: data.title,
    description: data.description
  });
}

// get todos (sorts by newest first)
export async function getTodos(userId: string) {
  return Todo.findAll({
    where: { user_id: userId },
    order: [['created_at', 'DESC']]
  });
}

// gets specific todo
export async function getTodoById(userId: string, todoId: string) {
  const todo = await Todo.findOne({
    where: { 
      id: todoId,
      user_id: userId
    }
  });

  if (!todo) {
    throw new Error('Todo not found');
  }

  return todo;
}

// updates a todo
export async function updateTodo(
  userId: string, 
  todoId: string, 
  data: TodoUpdate
) {
  const todo = await Todo.findOne({
    where: { 
      id: todoId,
      user_id: userId
    }
  });

  if (!todo) {
    throw new Error('Todo not found');
  }

  return todo.update({
    ...data,
    is_completed: data.is_completed !== undefined ? data.is_completed : todo.is_completed
  });
}

// deletes a todo
export async function deleteTodo(userId: string, todoId: string) {
  const deleted = await Todo.destroy({
    where: { 
      id: todoId,
      user_id: userId
    }
  });

  if (!deleted) {
    throw new Error('Todo not found');
  }
}