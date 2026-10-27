-- Tabela de Administradores (users)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de Animais para Adoção e Finais Felizes (animals)
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

-- Tabela de Eventos e Notícias da ONG (events)
CREATE TABLE IF NOT EXISTS events (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMPTZ,
    photo_url TEXT,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Verificando tabelas
SELECT * FROM users;
SELECT * FROM animals;
SELECT * FROM events;
