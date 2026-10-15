import { eq, desc } from 'drizzle-orm';
import { db } from '../db.js';
import { eventos } from '../schema.js';
import { Evento } from '../entities/Evento.js';

export const eventoUseCases = {
  async listar(apenasVisiveis: boolean = false) {
    const consulta = db.select().from(eventos);
    if (apenasVisiveis) {
      return await consulta
        .where(eq(eventos.isVisible, true))
        .orderBy(desc(eventos.date), desc(eventos.createdAt));
    }
    return await consulta.orderBy(desc(eventos.date), desc(eventos.createdAt));
  },

  async buscarPorId(id: number) {
    const resultado = await db.select().from(eventos).where(eq(eventos.id, id)).limit(1);
    if (resultado.length === 0) {
      throw new Error(`Evento com ID #${id} não encontrado.`);
    }
    return resultado[0];
  },

  async cadastrar(dados: any) {
    if (!dados.title || dados.title.trim() === '') {
      throw new Error('O título do evento/notícia é obrigatório.');
    }
    if (!dados.description || dados.description.trim() === '') {
      throw new Error('A descrição do evento/notícia é obrigatória.');
    }

    const entidade = new Evento({
      title: dados.title,
      description: dados.description,
      date: dados.date,
      photoUrl: dados.photoUrl,
      isVisible: dados.isVisible,
    });

    const res = await db
      .insert(eventos)
      .values({
        title: entidade.title,
        description: entidade.description,
        date: entidade.date,
        photoUrl: entidade.photoUrl,
        isVisible: entidade.isVisible,
      })
      .returning();

    return res[0];
  },

  async atualizar(id: number, dados: any) {
    await this.buscarPorId(id);

    const res = await db
      .update(eventos)
      .set(dados)
      .where(eq(eventos.id, id))
      .returning();

    return res[0];
  },

  async alternarVisibilidade(id: number) {
    const atual = await this.buscarPorId(id);

    const res = await db
      .update(eventos)
      .set({ isVisible: !atual.isVisible })
      .where(eq(eventos.id, id))
      .returning();

    return res[0];
  },

  async remover(id: number) {
    await this.buscarPorId(id);
    await db.delete(eventos).where(eq(eventos.id, id));
  },
};
