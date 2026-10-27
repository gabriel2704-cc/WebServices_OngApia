import { usuarioUseCases } from '../usecases/usuarioUseCases.js';

export const authController = {
  async login(req, res) {
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
    } catch (err) {
      return res.status(400).json({ success: false, mensagem: err.message, message: err.message });
    }
  },

  async me(req, res) {
    try {
      const usuarioLogado = req.user || req.usuario;
      if (!usuarioLogado) {
        return res.status(401).json({ success: false, mensagem: 'Não autenticado.' });
      }

      const dados = await usuarioUseCases.buscarPorId(usuarioLogado.id);
      return res.status(200).json({ success: true, data: dados });
    } catch (err) {
      return res.status(404).json({ success: false, mensagem: err.message });
    }
  },
};

export const controladorAutenticacao = authController;
