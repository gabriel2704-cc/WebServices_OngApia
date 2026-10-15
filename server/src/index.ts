import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { rotasAnimais } from './routes/rotasAnimais.js';
import { rotasEventos } from './routes/rotasEventos.js';
import { rotasAuth } from './routes/rotasAuth.js';
import { rotasApi } from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, '../uploads');

export const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Servidor de fotos enviadas (uploads)
app.use('/uploads', express.static(UPLOADS_DIR));

// Montagem das rotas modulares (padrão igual ao api-gerenciador-pesagens)
app.use('/animais', rotasAnimais);
app.use('/eventos', rotasEventos);
app.use('/auth', rotasAuth);

// Compatibilidade com o frontend (/api/...)
app.use('/api', rotasApi);

app.get('/', (_req, res) => {
  res.json({
    mensagem: '🐾 API da ONG APIA - Associação de Protetores Incondicionais dos Animais',
    status: 'online',
  });
});

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`🐾 API da ONG APIA rodando na porta ${PORT}`));
}
