import { Router } from 'express';
import { eventoController } from '../controllers/eventoController.js';
import { autenticarJWT } from '../middlewares/authMiddleware.js';
import { uploadFoto } from '../middlewares/uploadMiddleware.js';

export const rotasEventos = Router();

// Rotas públicas
rotasEventos.get('/', eventoController.listar);
rotasEventos.get('/:id', eventoController.buscarPorId);

// Rotas protegidas (Admin)
rotasEventos.post('/', autenticarJWT, uploadFoto, eventoController.cadastrar);
rotasEventos.put('/:id', autenticarJWT, uploadFoto, eventoController.atualizar);
rotasEventos.patch('/:id/toggle', autenticarJWT, eventoController.alternarVisibilidade);
rotasEventos.delete('/:id', autenticarJWT, eventoController.remover);

// Aliases para compatibilidade
export const eventRoutes = rotasEventos;
