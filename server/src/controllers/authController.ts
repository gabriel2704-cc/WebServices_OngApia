import type { Request, Response } from 'express';
import { usuarioUseCases } from '../usecases/usuarioUseCases.js';

export const authController = {
  async registrar(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          mensagem: 'Nome, e-mail e senha são obrigatórios.',
          message: 'Nome, e-mail e senha são obrigatórios.',
        });
      }

      const dados = await usuarioUseCases.registrar({ name, email, password });
      return res.status(201).json({
        success: true,
        mensagem: 'Administrador registrado com sucesso!',
        message: 'Administrador registrado com sucesso!',
        data: dados,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, mensagem: err.message, message: err.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          mensagem: 'E-mail e senha são obrigatórios.',
          message: 'E-mail e senha são obrigatórios.',
        });
      }

      const dados = await usuarioUseCases.login({ email, password });
      return res.status(200).json({
        success: true,
        mensagem: 'Login realizado com sucesso!',
        message: 'Login realizado com sucesso!',
        data: dados,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, mensagem: err.message, message: err.message });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const usuarioLogado = (req as any).user || (req as any).usuario;
      if (!usuarioLogado) {
        return res.status(401).json({ success: false, mensagem: 'Não autenticado.' });
      }

      const dados = await usuarioUseCases.buscarPorId(usuarioLogado.id);
      return res.status(200).json({ success: true, data: dados });
    } catch (err: any) {
      return res.status(404).json({ success: false, mensagem: err.message });
    }
  },
};

// Aliases para compatibilidade
export const controladorAutenticacao = authController;
