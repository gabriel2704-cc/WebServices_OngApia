import 'dotenv/config';
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema.js';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ong_apia',
});

pool.on('error', (erro) => {
  console.error('[PostgreSQL] Erro inesperado no cliente:', erro);
});

export const db = drizzle(pool, { schema });
export { pool };
