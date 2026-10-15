import { pgTable, serial, text, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

/**
 * Tabela de Administradores (users)
 */
export const usuarios = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const users = usuarios;
export type Usuario = InferSelectModel<typeof usuarios>;
export type NovoUsuario = InferInsertModel<typeof usuarios>;

/**
 * Tabela de Animais para Adoção e Finais Felizes (animals)
 */
export const animais = pgTable('animals', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  species: varchar('species', { length: 20 }).notNull(),
  breed: varchar('breed', { length: 50 }).default('SRD (Sem Raça Definida)'),
  size: varchar('size', { length: 20 }).notNull(),
  age: varchar('age', { length: 50 }).notNull(),
  gender: varchar('gender', { length: 10 }).notNull(),
  temperament: text('temperament'),
  description: text('description'),
  isCastrated: boolean('is_castrated').default(false).notNull(),
  isVaccinated: boolean('is_vaccinated').default(false).notNull(),
  photoUrl: text('photo_url').notNull(),
  status: varchar('status', { length: 20 }).default('disponivel').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const animals = animais;
export type AnimalModel = InferSelectModel<typeof animais>;
export type NovoAnimal = InferInsertModel<typeof animais>;

/**
 * Tabela de Eventos e Notícias da ONG (events)
 */
export const eventos = pgTable('events', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 150 }).notNull(),
  description: text('description').notNull(),
  date: timestamp('date', { withTimezone: true }),
  photoUrl: text('photo_url'),
  isVisible: boolean('is_visible').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const events = eventos;
export type EventoModel = InferSelectModel<typeof eventos>;
export type NovoEvento = InferInsertModel<typeof eventos>;
