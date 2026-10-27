import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { rotasAnimais } from './routes/rotasAnimais.js';
import { rotasEventos } from './routes/rotasEventos.js';
import { rotasAuth } from './routes/rotasAuth.js';
import { rotasApi } from './routes/index.js';
import { inicializarBanco } from './database/seed.js';
import { pool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');

export const app = express();
const origensPermitidas = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origem) => origem.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origem, callback) => {
      callback(null, !origem || origensPermitidas.includes(origem));
    },
  })
);
app.use(express.json({ limit: '20mb' })); // recebe o envelope com texto json bruto do front e transforma em obj req.body
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Servidor de fotos enviadas (uploads)
app.use('/uploads', express.static(UPLOADS_DIR));

// Montagem das rotas modulares (padrão igual ao api-gerenciador-pesagens)
app.use('/animais', rotasAnimais);
app.use('/eventos', rotasEventos);
app.use('/auth', rotasAuth);

// Rotas também sob o prefixo /api para integração com o front-end
app.use('/api', rotasApi);

app.get('/', (_req, res) => {
  res.json({
    mensagem: 'API da ONG APIA - Associação de Protetores Incondicionais dos Animais',
    status: 'online',
  });
});

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  inicializarBanco()
    .then(() => {
      console.log('Banco de dados verificado (tabelas users, animals e events prontas).');
      app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
    })
    .catch(async (erro) => {
      console.error('Erro ao inicializar a API:', erro);
      await pool.end();
      process.exitCode = 1;
    });
}
