import type { Request, Response } from 'express';
import { eventoUseCases } from '../usecases/eventoUseCases.js';

export const eventoController = {
  async listar(req: Request, res: Response) {
    try {
      const todos = req.query.all === 'true';
      const dados = await eventoUseCases.listar(!todos);

      return res.status(200).json({
        success: true,
        count: dados.length,
        data: dados,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, erro: err.message, message: err.message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, mensagem: 'ID inválido.' });
      }

      const evento = await eventoUseCases.buscarPorId(id);
      return res.status(200).json({ success: true, data: evento });
    } catch (err: any) {
      return res.status(404).json({ success: false, mensagem: err.message });
    }
  },

  async cadastrar(req: Request, res: Response) {
    try {
      const { title, description, date, photoUrl, isVisible } = req.body;

      let finalPhotoUrl = photoUrl;
      if (req.file) {
        finalPhotoUrl = `/uploads/${req.file.filename}`;
      }

      const evento = await eventoUseCases.cadastrar({
        title,
        description,
        date: date ? new Date(date) : null,
        photoUrl: finalPhotoUrl || null,
        isVisible: isVisible !== undefined ? isVisible === true || isVisible === 'true' : true,
      });

      return res.status(201).json({
        success: true,
        mensagem: 'Evento cadastrado com sucesso!',
        message: 'Evento cadastrado com sucesso!',
        data: evento,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, mensagem: err.message, message: err.message });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, mensagem: 'ID inválido.' });
      }

      const corpo = req.body;
      const dadosAtualizados: any = {};

      if (corpo.title !== undefined) dadosAtualizados.title = corpo.title;
      if (corpo.description !== undefined) dadosAtualizados.description = corpo.description;
      if (corpo.date !== undefined) dadosAtualizados.date = corpo.date ? new Date(corpo.date) : null;
      if (corpo.isVisible !== undefined) {
        dadosAtualizados.isVisible = corpo.isVisible === true || corpo.isVisible === 'true';
      }

      if (req.file) {
        dadosAtualizados.photoUrl = `/uploads/${req.file.filename}`;
      } else if (corpo.photoUrl !== undefined) {
        dadosAtualizados.photoUrl = corpo.photoUrl;
      }

      const evento = await eventoUseCases.atualizar(id, dadosAtualizados);
      return res.status(200).json({
        success: true,
        mensagem: 'Evento atualizado com sucesso!',
        message: 'Evento atualizado com sucesso!',
        data: evento,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, mensagem: err.message, message: err.message });
    }
  },

  async alternarVisibilidade(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const evento = await eventoUseCases.alternarVisibilidade(id);
      return res.status(200).json({
        success: true,
        mensagem: `Visibilidade alterada para: ${evento.isVisible ? 'Visível' : 'Oculto'}.`,
        message: `Visibilidade alterada para: ${evento.isVisible ? 'Visível' : 'Oculto'}.`,
        data: evento,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, mensagem: err.message });
    }
  },

  async remover(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      await eventoUseCases.remover(id);
      return res.status(200).json({
        success: true,
        mensagem: 'Evento removido com sucesso.',
        message: 'Evento removido com sucesso.',
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, mensagem: err.message });
    }
  },
};

// Aliases para compatibilidade
export const eventController = eventoController;
export const controladorEvento = eventoController;
