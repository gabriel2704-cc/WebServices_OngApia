import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const CHAVE_SECRETA_JWT = process.env.JWT_SECRET || 'ong_apia_jwt_secret_dev_chave_segura_2026';

/**
 * Interface do Usuário Administrador Autenticado na requisição Express
 */
export interface UsuarioAutenticado {
  id: number;
  name: string;
  email: string;
}

export type AuthenticatedUser = UsuarioAutenticado;

declare global {
  namespace Express {
    interface Request {
      user?: UsuarioAutenticado;
      usuario?: UsuarioAutenticado;
    }
  }
}

/**
 * Middleware de Autenticação JWT (JSON Web Token)
 * Valida o cabeçalho Authorization: Bearer <token>
 */
export function autenticarJWT(requisicao: Request, resposta: Response, proximo: NextFunction): void {
  const cabecalhoAutorizacao = requisicao.headers.authorization;

  if (!cabecalhoAutorizacao || !cabecalhoAutorizacao.startsWith('Bearer ')) {
    resposta.status(401).json({
      success: false,
      message: 'Acesso não autorizado. Token ausente ou inválido.',
    });
    return;
  }

  const token = cabecalhoAutorizacao.split(' ')[1];

  try {
    const dadosDecodificados = jwt.verify(token, CHAVE_SECRETA_JWT) as UsuarioAutenticado;
    requisicao.user = dadosDecodificados;
    requisicao.usuario = dadosDecodificados;
    proximo();
  } catch (erro) {
    resposta.status(403).json({
      success: false,
      message: 'Sessão expirada ou token inválido. Faça login novamente.',
    });
  }
}

// Exportação para compatibilidade
export const authenticateJWT = autenticarJWT;
