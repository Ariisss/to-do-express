import { Request, Response } from 'express';
import * as todoService from '../services/todo.service';
import { TodoCreate, TodoUpdate } from '../types/types';

export async function createTodo(req: Request, res: Response) {
    
    try {

        const userId = req.authUser.id
        const todoData: TodoCreate = {
            title: req.body.title,
            description: req.body.description
        }

        const todo = await todoService.createTodo(userId, todoData);

        res.status(201).json({
            status: 'success',
            data: todo
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create todo'
        });
    }
}

export async function getTodos(req: Request, res: Response) {

    try {
        const userId = req.authUser.id
        const todos = await todoService.getTodos(userId)

        res.status(200).json({
            status: 'success',
            data: todos
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to get todos'
        });
    }
}

export async function getTodoById(req: Request, res: Response) {

    try {
        const userId = req.authUser.id
        const todoId = req.params.id

        const todo = await todoService.getTodoById(userId, todoId)
        
        res.json({
            status: 'success',
            data: todo
        })
    } catch (error) {
        if (error instanceof Error && error.message === 'Todo not found') {
            return res.status(404).json({
                status: 'error',
                message: 'Todo not found'
            })
        }

        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch todo'
        })
    }
}

export async function updateTodo(req: Request, res: Response) {

    try {

        const userId = req.authUser.id
        const todoId = req.params.id
        const updateData: TodoUpdate = {
            title: req.body.title,
            description: req.body.description,
            is_completed: req.body.is_completed
        };

        const todo = await todoService.updateTodo(userId, todoId, updateData)

        res.json({
            status: 'success',
            data: todo
        })

    } catch (error) {
        if (error instanceof Error && error.message === 'Todo not found') {
            return res.status(404).json({
                status: 'error',
                message: 'Todo not found'
            })
        }

        res.status(500).json({
            status: 'error',
            message: 'Failed to update todo'
        })
    }
}
