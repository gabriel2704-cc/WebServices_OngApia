import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { autenticarJWT } from '../middlewares/authMiddleware.js';

export const rotasAuth = Router();

rotasAuth.post('/login', authController.login);
rotasAuth.get('/me', autenticarJWT, authController.me);

export const authRoutes = rotasAuth;
