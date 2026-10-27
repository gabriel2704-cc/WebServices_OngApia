import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { rotasAnimais } from './routes/rotasAnimais.js';
import { rotasEventos } from './routes/rotasEventos.js';
import { rotasAuth } from './routes/rotasAuth.js';
import { rotasApi } from './routes/index.js';
import { inicializarBanco } from './database/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');

export const app = express();
app.use(cors()); // autoriza que o navegador permita que o front-end faça requisições e receba dados da API
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
    })
    .catch((erro) => {
      console.error('Aviso ao inicializar tabelas do banco:', erro.message);
    })
    .finally(() => {
      app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
    });
}
