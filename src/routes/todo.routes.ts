import { Router } from 'express';
import { create, list, update, remove } from '../controllers/toDoController';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// applies auth on all routes
router.use(authenticate);

// endpoints:
router.post('/', create);
router.get('/', list);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
