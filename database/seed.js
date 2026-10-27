import bcrypt from 'bcryptjs';
import { db, pool } from '../db.js';
import { users } from '../schema.js';

export async function inicializarBanco() {
  // 1. Garante que as tabelas existam no PostgreSQL
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS animals (
      id SERIAL NOT NULL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      species VARCHAR(20) NOT NULL,
      breed VARCHAR(50) DEFAULT 'SRD (Sem Raça Definida)',
      size VARCHAR(20) NOT NULL,
      age VARCHAR(50) NOT NULL,
      gender VARCHAR(10) NOT NULL,
      temperament TEXT,
      description TEXT,
      is_castrated BOOLEAN NOT NULL DEFAULT FALSE,
      is_vaccinated BOOLEAN NOT NULL DEFAULT FALSE,
      photo_url TEXT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'disponivel',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL NOT NULL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT NOT NULL,
      date TIMESTAMPTZ,
      photo_url TEXT,
      is_visible BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 2. Cria usuário administrador padrão se não existir
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('admin123', salt);

  await db
    .insert(users)
    .values({
      name: 'Administração APIA',
      email: 'admin@apia.org.br',
      passwordHash,
    })
    .onConflictDoNothing();
}

// Caso executado diretamente via `npm run db:seed`
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  console.log('Iniciando criação de tabelas e seed do banco de dados da ONG APIA...');
  inicializarBanco()
    .then(() => {
      console.log('Tabelas verificadas e usuário admin configurado com sucesso!');
    })
    .catch((err) => {
      console.error('Erro no seed:', err);
    })
    .finally(() => {
      pool.end();
    });
}
