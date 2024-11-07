import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// Register endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', login);

export default router;
