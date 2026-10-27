import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o .env da pasta server (ou da raiz do projeto)
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();
if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
  throw new Error('Defina DATABASE_URL para conectar ao banco PostgreSQL em produção.');
}

const connectionString =
  process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ong_apia';

const usaSSL =
  connectionString.includes('neon.tech') ||
  connectionString.includes('sslmode=require') ||
  process.env.NODE_ENV === 'production';

// cria o pool de conexões com o banco, evitando abrir e fechar conexão a cada requisição
const pool = new pg.Pool({
  connectionString,
  ...(usaSSL ? { ssl: { rejectUnauthorized: false } } : {}),
});

pool.on('error', (erro) => {
  console.error('[PostgreSQL] Erro inesperado no cliente:', erro);
});

// o drizzle se conecta com o postgres e exporta a conexão na constante db pronta para rodar select, insert, etc.
export const db = drizzle(pool, { schema });
export { pool };
