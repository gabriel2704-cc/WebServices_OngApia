import { eq, and, ilike, or, desc } from 'drizzle-orm';
import { db } from '../db.js';
import { animais } from '../schema.js';
import { Animal } from '../entities/Animal.js';

export const animalUseCases = {
  async listar(filtros = {}) {
    const condicoes = [];

    if (filtros.species && filtros.species !== 'todos') {
      condicoes.push(eq(animais.species, filtros.species.toLowerCase()));
    }

    if (filtros.size && filtros.size !== 'todos') {
      condicoes.push(eq(animais.size, filtros.size.toLowerCase()));
    }

    if (filtros.gender && filtros.gender !== 'todos') {
      condicoes.push(eq(animais.gender, filtros.gender.toLowerCase()));
    }

    if (filtros.status && filtros.status !== 'todos') {
      condicoes.push(eq(animais.status, filtros.status.toLowerCase()));
    }

    if (filtros.age && filtros.age !== 'todos') {
      condicoes.push(ilike(animais.age, `%${filtros.age}%`));
    }

    if (filtros.search && filtros.search.trim() !== '') {
      const termo = `%${filtros.search.trim()}%`;
      condicoes.push(
        or(
          ilike(animais.name, termo),
          ilike(animais.breed, termo),
          ilike(animais.temperament, termo),
          ilike(animais.description, termo)
        )
      );
    }

    const consulta = db.select().from(animais);
    if (condicoes.length > 0) {
      return await consulta.where(and(...condicoes)).orderBy(desc(animais.createdAt));
    }
    return await consulta.orderBy(desc(animais.createdAt));
  },

  async buscarPorId(id) {
    const resultado = await db.select().from(animais).where(eq(animais.id, id)).limit(1);
    if (resultado.length === 0) {
      throw new Error(`Animal com ID #${id} não encontrado.`);
    }
    return resultado[0];
  },

  async cadastrar(dados) {
    if (!dados.name || dados.name.trim() === '') {
      throw new Error('O nome do animal é obrigatório.');
    }
    if (!dados.species || !['cachorro', 'gato'].includes(dados.species.toLowerCase())) {
      throw new Error('A espécie deve ser "cachorro" ou "gato".');
    }
    if (!dados.size || !['pequeno', 'medio', 'grande'].includes(dados.size.toLowerCase())) {
      throw new Error('O porte deve ser "pequeno", "medio" ou "grande".');
    }

    const entidade = new Animal({
      name: dados.name,
      species: dados.species,
      breed: dados.breed,
      size: dados.size,
      age: dados.age,
      gender: dados.gender,
      temperament: dados.temperament,
      description: dados.description,
      isCastrated: dados.isCastrated,
      isVaccinated: dados.isVaccinated,
      photoUrl: dados.photoUrl,
      status: dados.status || 'disponivel',
    });

    const res = await db
      .insert(animais)
      .values({
        name: entidade.name,
        species: entidade.species,
        breed: entidade.breed,
        size: entidade.size,
        age: entidade.age,
        gender: entidade.gender,
        temperament: entidade.temperament,
        description: entidade.description,
        isCastrated: entidade.isCastrated,
        isVaccinated: entidade.isVaccinated,
        photoUrl: entidade.photoUrl,
        status: entidade.status,
      })
      .returning();

    return res[0];
  },

  async atualizar(id, dados) {
    await this.buscarPorId(id);

    const res = await db
      .update(animais)
      .set(dados)
      .where(eq(animais.id, id))
      .returning();

    return res[0];
  },

  async marcarComoAdotado(id) {
    await this.buscarPorId(id);

    const res = await db
      .update(animais)
      .set({ status: 'adotado' })
      .where(eq(animais.id, id))
      .returning();

    return res[0];
  },

  async marcarComoDisponivel(id) {
    await this.buscarPorId(id);

    const res = await db
      .update(animais)
      .set({ status: 'disponivel' })
      .where(eq(animais.id, id))
      .returning();

    return res[0];
  },

  async remover(id) {
    await this.buscarPorId(id);
    await db.delete(animais).where(eq(animais.id, id));
  },
};
