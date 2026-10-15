import { Router } from 'express';
import { rotasAnimais } from './rotasAnimais.js';
import { rotasEventos } from './rotasEventos.js';
import { rotasAuth } from './rotasAuth.js';

export const rotasApi = Router();

rotasApi.use('/auth', rotasAuth);
rotasApi.use('/animals', rotasAnimais);
rotasApi.use('/events', rotasEventos);
rotasApi.use('/animais', rotasAnimais);
rotasApi.use('/eventos', rotasEventos);

rotasApi.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    servico: 'API da ONG APIA',
  });
});

export const apiRoutes = rotasApi;
