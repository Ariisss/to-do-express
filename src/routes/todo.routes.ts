import { Router } from 'express';
import { create, list, update, remove } from '../controllers/toDoController';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all todo routes
router.use(authenticate);

// Create a new todo
router.post('/', create);

// Get all todos
router.get('/', list);

// Update a todo
router.put('/:id', update);

// Delete a todo
router.delete('/:id', remove);

export default router;
