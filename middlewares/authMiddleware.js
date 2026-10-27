import jwt from 'jsonwebtoken';

const CHAVE_SECRETA_JWT = process.env.JWT_SECRET || 'ong_apia_jwt_secret_dev_chave_segura_2026';

// Middleware de Autenticação JWT (JSON Web Token)
export function autenticarJWT(req, res, next) {
  const cabecalhoAutorizacao = req.headers.authorization;

  if (!cabecalhoAutorizacao || !cabecalhoAutorizacao.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      mensagem: 'Acesso não autorizado. Token ausente ou inválido.',
      message: 'Acesso não autorizado. Token ausente ou inválido.',
    });
  }

  const token = cabecalhoAutorizacao.split(' ')[1];

  try {
    const dadosDecodificados = jwt.verify(token, CHAVE_SECRETA_JWT);
    req.user = dadosDecodificados;
    req.usuario = dadosDecodificados;
    next();
  } catch (erro) {
    return res.status(403).json({
      success: false,
      mensagem: 'Sessão expirada ou token inválido. Faça login novamente.',
      message: 'Sessão expirada ou token inválido. Faça login novamente.',
    });
  }
}

export const authenticateJWT = autenticarJWT;
