import { Router } from 'express';
import { animalController } from '../controllers/animalController.js';
import { autenticarJWT } from '../middlewares/authMiddleware.js';
import { uploadFoto } from '../middlewares/uploadMiddleware.js';

export const rotasAnimais = Router();

// Rotas públicas
rotasAnimais.get('/', animalController.listar);
rotasAnimais.get('/:id', animalController.buscarPorId);

// Rotas protegidas (Admin)
rotasAnimais.post('/', autenticarJWT, uploadFoto, animalController.cadastrar);
rotasAnimais.post('/upload', autenticarJWT, uploadFoto, animalController.uploadFoto);
rotasAnimais.put('/:id', autenticarJWT, uploadFoto, animalController.atualizar);
rotasAnimais.patch('/:id/adopt', autenticarJWT, animalController.marcarComoAdotado);
rotasAnimais.patch('/:id/available', autenticarJWT, animalController.marcarComoDisponivel);
rotasAnimais.delete('/:id', autenticarJWT, animalController.remover);

// Aliases para compatibilidade
export const animalRoutes = rotasAnimais;
